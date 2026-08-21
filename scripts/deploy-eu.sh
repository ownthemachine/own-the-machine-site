#!/usr/bin/env bash
# EU deployment target: Scaleway Object Storage (fr-par) behind Scaleway
# Edge Services.
#
# Usage: npm run build && scripts/deploy-eu.sh
#
# Project: own-the-machine (da956a45-21c3-4d10-8a0b-e537f451f5a2), a
# dedicated Scaleway project so billing, IAM and resources for the campaign
# stand on their own, separate from anything else on the account. Bucket:
# ownthemachine-eu (fr-par). Deploy identity: IAM application
# own-the-machine-deploy, scoped by policy to this project only, stored as
# the scw profile "own-the-machine". The project, application and pipeline
# identifiers below are not secrets (they are opaque resource IDs, not
# credentials) and are recorded here so the deploy commands are legible.
#
# State (20 Aug 2026): the bucket IS a working website. Website
# configuration is set (index.html, 404.html), objects are public-read,
# and every page type, language, download and OG image serves 200 on
#   https://ownthemachine-eu.s3-website.fr-par.scw.cloud
# The site is still SERVED from Vercel; this is a warm standby.
#
# Two known differences from Vercel, both for the CDN layer to close:
#   - /law/article-1 302s to /law/article-1/ (S3 index-document
#     behaviour). Links still work; it costs one redirect per hop.
#   - FIXED 20 Aug: a bucket policy now grants anonymous GetObject AND
#     ListBucket, so an absent key returns 404 with 404.html instead of
#     403. Scaleway policies REPLACE owner rights, so the policy's
#     first statement grants s3:* to application_id
#     1058665d-eb87-4e9a-ac56-ad16347fe7c3 (own-the-machine-deploy).
#     Omit that statement and the deploy key loses its own bucket;
#     recovery is `aws s3api delete-bucket-policy`.
#   - response security headers cannot come from a bucket, and Edge
#     Services cannot add them either: its route rules only match
#     method and path to pick a backend. The two that HTML can carry
#     (a Content-Security-Policy and the referrer policy) live in the
#     document; frame-ancestors and HSTS are the accepted cost of
#     serving from Europe without a proxy in front.
#
# LIVE since 20 August 2026: ownthemachine.eu is served from this bucket
# through Edge Services pipeline 14a105a7-127d-4eed-aae4-5164e6378a6a,
# with a Scaleway-managed Let's Encrypt certificate. Cloudflare holds the
# zone and answers DNS only; no request for site content transits a
# proxy. www is a 301 to the apex (Edge Services takes one custom domain
# per pipeline, and a bucket backs one pipeline), which is the single
# hostname that still passes through Cloudflare, carrying no content.
#
# Rollback, if ever needed: the site is a static build from this repo, so
# any host will serve it. Point the apex elsewhere and deploy dist/.
set -euo pipefail
cd "$(dirname "$0")/.."

OUT="dist"
[[ -d "$OUT" ]] || { echo "no build output; run the build first" >&2; exit 1; }

# A translation that quietly lost a passage is worse than an obviously
# untranslated one, because nothing on the page says so. Publishing is the
# point at which that stops being recoverable, so the structural check runs
# here rather than in the build: work in progress can still be built and
# previewed, but it cannot be shipped.
node scripts/check-translations.mjs

# The on-page contents list is sticky. Once it grows taller than the viewport
# its bottom becomes unreachable at any scroll position, which is invisible to
# every other check here because the markup and the stylesheet are both valid.
# Measured against the rendered page instead.
node scripts/check-toc.mjs

# The site has its own Scaleway project and its own deploy identity, so a
# key that leaks can touch this bucket and nothing else in the account.
SCW_PROFILE_NAME="${SCW_PROFILE_NAME:-own-the-machine}"
export AWS_ACCESS_KEY_ID="$(scw -p "$SCW_PROFILE_NAME" config get access-key)"
export AWS_SECRET_ACCESS_KEY="$(scw -p "$SCW_PROFILE_NAME" config get secret-key)"
export AWS_DEFAULT_REGION=fr-par
ENDPOINT="https://s3.fr-par.scw.cloud"
BUCKET="s3://ownthemachine-eu"

# Pass 1: mirror the tree and drop what no longer exists.
aws s3 sync "$OUT" "$BUCKET" --endpoint-url "$ENDPOINT" --delete \
  --acl public-read --cache-control "public, max-age=300" --only-show-errors
# Pass 2: re-state ACL and headers on EVERY object. `sync` only touches files
# whose content changed, so unchanged objects would keep a stale private ACL
# and 403 to the public; this pass is what makes the mirror actually servable.
aws s3 cp "$OUT" "$BUCKET" --endpoint-url "$ENDPOINT" --recursive \
  --acl public-read --cache-control "public, max-age=300" \
  --metadata-directive REPLACE --only-show-errors

# Pass 3: HTML with an explicit charset. S3 serves exactly the content-type it
# was given, and `cp` guesses "text/html" with none, leaving the encoding to
# whatever the reader's browser defaults to. The pages declare utf-8 in a meta
# tag, but the header should not contradict them by omission.
aws s3 cp "$OUT" "$BUCKET" --endpoint-url "$ENDPOINT" --recursive \
  --exclude "*" --include "*.html" \
  --content-type "text/html; charset=utf-8" --metadata-directive REPLACE \
  --acl public-read --cache-control "public, max-age=300" --only-show-errors

# Pass 4: extensionless twins. The site links to /law/article-1; a bucket holds
# law/article-1/index.html and answers that link with a 302 to the trailing
# slash. One redirect per deep link is a permanent tax on a site made of deep
# links, so each page is also written to the key the link actually names.
# These twins are not in the build output, so pass 1's --delete removes them
# first and this pass restores them; that is churn, not drift.
( cd "$OUT" && find . -mindepth 2 -name index.html -print ) | while read -r page; do
  key="${page#./}"; key="${key%/index.html}"
  aws s3 cp "$OUT/${page#./}" "$BUCKET/$key" --endpoint-url "$ENDPOINT" \
    --content-type "text/html; charset=utf-8" \
    --acl public-read --cache-control "public, max-age=300" --only-show-errors
done
# long-cache immutable assets
aws s3 cp "$OUT/_astro" "$BUCKET/_astro" --endpoint-url "$ENDPOINT" \
  --recursive --acl public-read \
  --cache-control "public, max-age=31536000, immutable" \
  --only-show-errors
echo "synced $OUT to $BUCKET (fr-par)"
