#!/usr/bin/env bash
# EU deployment target: Scaleway Object Storage (fr-par) behind Scaleway
# Edge Services. Dark until Gate 1; the go-live flip is a DNS change.
#
# Usage: scripts/deploy-eu.sh   (after a local `vercel build --prod` or
#        `npm run build`; syncs the static output to the bucket)
#
# Project: own-the-machine (da956a45-21c3-4d10-8a0b-e537f451f5a2), separate
# from [private project]/[private project]/[private project] so billing, IAM and resources for the campaign stand
# on their own. Bucket: ownthemachine-eu (fr-par). Deploy identity: IAM
# application own-the-machine-deploy, scoped by policy to this project only,
# stored as the scw profile "own-the-machine".
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
#   - response security headers (vercel.json) cannot come from a bucket,
#     and Edge Services cannot add them either: its route rules only
#     match method and path to pick a backend. Flipping to Edge
#     Services alone therefore DROPS X-Content-Type-Options,
#     X-Frame-Options, Referrer-Policy and Permissions-Policy. Keeping
#     them means putting Cloudflare's proxy in front with Transform
#     Rules, which puts a US company back in the serving path. That
#     trade-off is the editor's to make.
#
# Staging (live since 20 Aug): https://eu.ownthemachine.eu — Cloudflare
# CNAME (DNS-only) to the pipeline endpoint, FQDN on the dns-stage,
# Scaleway-managed Let's Encrypt certificate. verify-eu.py: 0 failures.
#
# Go-live steps (need a browser session, run once when flipping):
#   1. Scaleway console: Edge Services pipeline on the bucket, attach
#      ownthemachine.eu, let Scaleway issue the certificate; set the
#      404 page and the security headers there.
#   2. Cloudflare: point the records at the Edge Services endpoint
#      (apex via CNAME flattening), remove the Vercel records.
#   3. Verify with scripts/verify-eu.py against the live domain before
#      and after, then keep Vercel one deploy behind as a rollback.
set -euo pipefail
cd "$(dirname "$0")/.."

OUT=".vercel/output/static"
[[ -d "$OUT" ]] || OUT="dist"
[[ -d "$OUT" ]] || { echo "no build output; run the build first" >&2; exit 1; }

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
# long-cache immutable assets
aws s3 cp "$OUT/_astro" "$BUCKET/_astro" --endpoint-url "$ENDPOINT" \
  --recursive --acl public-read \
  --cache-control "public, max-age=31536000, immutable" \
  --only-show-errors
echo "synced $OUT to $BUCKET (fr-par)"
