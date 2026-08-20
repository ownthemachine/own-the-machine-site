#!/usr/bin/env bash
# EU deployment target: Scaleway Object Storage (fr-par) behind Scaleway
# Edge Services. Dark until Gate 1; the go-live flip is a DNS change.
#
# Usage: scripts/deploy-eu.sh   (after a local `vercel build --prod` or
#        `npm run build`; syncs the static output to the bucket)
#
# State (20 Aug 2026): the bucket IS a working website. Website
# configuration is set (index.html, 404.html), objects are public-read,
# and every page type, language, download and OG image serves 200 on
#   https://own-the-machine-site.s3-website.fr-par.scw.cloud
# The site is still SERVED from Vercel; this is a warm standby.
#
# Two known differences from Vercel, both for the CDN layer to close:
#   - /law/article-1 302s to /law/article-1/ (S3 index-document
#     behaviour). Links still work; it costs one redirect per hop.
#   - a missing path returns 403, not the 404 page: S3 returns 403 for
#     an absent key unless the caller may list the bucket. A bucket
#     policy granting anonymous ListBucket would fix it, but Scaleway
#     policies REPLACE owner rights: setting one without the owner
#     principal locked this key out of its own bucket (recovered by
#     deleting the policy). Do it from the console, or let the CDN
#     serve the error page.
#   - response security headers (vercel.json) cannot come from a
#     bucket at all; they must be set at the CDN.
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

export AWS_ACCESS_KEY_ID="$(scw config get access-key)"
export AWS_SECRET_ACCESS_KEY="$(scw config get secret-key)"
export AWS_DEFAULT_REGION=fr-par
ENDPOINT="https://s3.fr-par.scw.cloud"
BUCKET="s3://own-the-machine-site"

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
