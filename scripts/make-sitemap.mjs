// Sitemap for a five-language static site, generated from the built output
// so it can never drift from what actually shipped. Every URL carries the
// xhtml:link alternates for all locales plus x-default, which is what a
// search engine needs to treat the five as one page in five languages
// rather than five competing pages.
//
// lastmod is the law repo's commit date, not the build time: the pages are a
// rendering of that snapshot, and a build-time lastmod would claim a change
// on every deploy that changed nothing.
import { readdirSync, statSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITE = 'https://ownthemachine.eu';
const LOCALES = ['en', 'nl', 'fr', 'de', 'es'];

if (!existsSync(DIST)) {
  console.error('make-sitemap: no dist/; run astro build first');
  process.exit(1);
}

let lastmod;
try {
  const law = process.env.LAW_REPO || join(ROOT, '..', 'own-the-machine');
  lastmod = execSync('git log -1 --format=%cI', { cwd: law }).toString().trim().slice(0, 10);
} catch {
  lastmod = new Date().toISOString().slice(0, 10);
}

// Every directory holding an index.html is a page.
const pages = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else if (entry === 'index.html') {
      const rel = relative(DIST, dirname(p)).split('/').join('/');
      pages.push(rel === '' ? '/' : `/${rel}`);
    }
  }
})(DIST);

// Reduce to locale-independent paths; each becomes one <url> per locale.
const basePaths = new Set();
for (const p of pages) {
  const seg = p.split('/')[1];
  basePaths.add(LOCALES.includes(seg) && seg !== 'en' ? (p.replace(`/${seg}`, '') || '/') : p);
}

const loc = (lang, base) =>
  SITE + (lang === 'en' ? base : (base === '/' ? `/${lang}` : `/${lang}${base}`));

const urls = [];
for (const base of [...basePaths].sort()) {
  for (const lang of LOCALES) {
    const alts = LOCALES.map(
      (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${loc(l, base)}"/>`
    ).join('\n');
    urls.push(
      `  <url>\n    <loc>${loc(lang, base)}</loc>\n    <lastmod>${lastmod}</lastmod>\n` +
      `${alts}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${loc('en', base)}"/>\n  </url>`
    );
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
writeFileSync(join(DIST, 'sitemap.xml'), xml);
console.log(`sitemap: ${basePaths.size} pages x ${LOCALES.length} locales = ${urls.length} urls, lastmod ${lastmod}`);
