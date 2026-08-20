import { defineConfig } from 'astro/config';

// Static output; the law pages are generated at build time from the law
// repo (scripts/sync-law.mjs). No server state, no client JS except the
// simulator island and the seal animation.
export default defineConfig({
  site: 'https://ownthemachine.eu',
  output: 'static',
  trailingSlash: 'never',
  // Directory output so any static host serves the pages: the EU mirror
  // resolves /law/article-1/ to its index document without rewrite rules,
  // and Vercel's cleanUrls keeps the extensionless URLs identical.
  build: { format: 'directory' },
});
