#!/usr/bin/env bash
# EU deployment target: Scaleway Object Storage (fr-par) behind Scaleway
# Edge Services. Dark until Gate 1; the go-live flip is a DNS change.
#
# Usage: scripts/deploy-eu.sh   (after a local `vercel build --prod` or
#        `npm run build`; syncs the static output to the bucket)
#
# Go-live steps (documented, not automated, run once at Gate 1):
#   1. scw edge-services: create a pipeline on the bucket, attach the
#      custom domain ownthemachine.eu, let Scaleway issue the cert.
#   2. Point the Cloudflare A/CNAME records at the Edge Services
#      endpoint (DNS-only), remove the Vercel records.
#   3. Remove middleware.ts and the PREVIEW_PASSWORD env (the password
#      gate exists only on the Vercel preview).
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
