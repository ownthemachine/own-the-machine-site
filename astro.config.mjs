import { defineConfig } from 'astro/config';

// Static output; the law pages are generated at build time from the law
// repo (scripts/sync-law.mjs). No server state, no client JS except the
// simulator island and the seal animation.
export default defineConfig({
  site: 'https://ownthemachine.eu',
  output: 'static',
  trailingSlash: 'never',
  // Directory output so any static host serves the pages: the bucket
  // resolves /law/article-1/ to its index document without rewrite rules,
  // and deploy-eu.sh writes the extensionless twin beside it.
  build: { format: 'directory' },
});
