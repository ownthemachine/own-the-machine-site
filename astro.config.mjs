import { defineConfig } from 'astro/config';

// Static output; the law pages are generated at build time from the law
// repo (scripts/sync-law.mjs). No server state, no client JS except the
// simulator island and the seal animation.
export default defineConfig({
  site: 'https://ownthemachine.eu',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
});
