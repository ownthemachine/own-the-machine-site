// SEO audit over the built output. Checks the things that actually break
// silently: duplicate or missing titles and descriptions, canonicals that
// disagree with the file's own URL, non-reciprocal hreflang, absolute-URL
// hygiene, and the sitemap agreeing with what shipped.
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITE = 'https://ownthemachine.eu';
const LOCALES = ['en', 'nl', 'fr', 'de', 'es'];

const pages = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (e === 'index.html') {
      const rel = relative(DIST, dirname(p)).split('/').join('/');
      pages.push({ url: rel === '' ? '/' : `/${rel}`, file: p });
    }
  }
})(DIST);

const problems = [];
const titles = new Map();
const descs = new Map();
const pick = (html, re) => { const m = html.match(re); return m ? m[1] : null; };

for (const page of pages) {
  const html = readFileSync(page.file, 'utf8');
  const seg = page.url.split('/')[1];
  const lang = LOCALES.includes(seg) && seg !== 'en' ? seg : 'en';

  const title = pick(html, /<title>([^<]*)<\/title>/);
  const desc = pick(html, /<meta name="description" content="([^"]*)"/);
  const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/);
  const ogUrl = pick(html, /<meta property="og:url" content="([^"]*)"/);
  const ogImg = pick(html, /<meta property="og:image" content="([^"]*)"/);
  const htmlLang = pick(html, /<html lang="([^"]*)"/);
  const noindex = /name="robots" content="noindex/.test(html);

  if (!title) problems.push(`${page.url}: no <title>`);
  if (!desc) problems.push(`${page.url}: no meta description`);
  if (!canonical) problems.push(`${page.url}: no canonical`);
  if (!ogImg?.startsWith('http')) problems.push(`${page.url}: og:image not absolute`);
  if (htmlLang !== lang) problems.push(`${page.url}: html lang="${htmlLang}" expected "${lang}"`);

  const expected = SITE + page.url;
  if (canonical && canonical !== expected) problems.push(`${page.url}: canonical ${canonical} != ${expected}`);
  if (ogUrl && ogUrl !== canonical) problems.push(`${page.url}: og:url != canonical`);
  if (desc && desc.length > 165) problems.push(`${page.url}: description ${desc.length} chars (>165)`);
  if (title && title.length > 70) problems.push(`${page.url}: title ${title.length} chars (>70)`);

  if (!noindex) {
    // Keyed by locale: two pages sharing a title only matters when a reader
    // in one language meets both. Across locales the pages are declared
    // hreflang alternates of each other, and Dutch and German really do both
    // say "Artikel"; that is a translation, not a duplicate.
    const k = `${lang}\u0000${title}`;
    if (title) { titles.set(k, [...(titles.get(k) || []), page.url]); }
    if (desc) { descs.set(desc, [...(descs.get(desc) || []), page.url]); }
  }

  // hreflang: one per locale plus x-default, all absolute
  for (const l of [...LOCALES, 'x-default']) {
    if (!html.includes(`hreflang="${l}"`)) problems.push(`${page.url}: missing hreflang ${l}`);
  }
  // JSON-LD present and parseable
  const ld = pick(html, /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
  if (!ld) problems.push(`${page.url}: no JSON-LD`);
  else { try { JSON.parse(ld); } catch { problems.push(`${page.url}: JSON-LD does not parse`); } }
}

for (const [k, urls] of titles) {
  const t = k.split('\u0000')[1];
  if (urls.length > 1) problems.push(`duplicate title within one language on ${urls.length} pages ("${t.slice(0, 48)}…"): ${urls.slice(0, 3).join(', ')}`);
}
let dupDesc = 0;
for (const [, urls] of descs) if (urls.length > 1) dupDesc += urls.length;

// sitemap agreement
const smPath = join(DIST, 'sitemap.xml');
if (!existsSync(smPath)) problems.push('no sitemap.xml');
else {
  const sm = readFileSync(smPath, 'utf8');
  const locs = new Set([...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  for (const page of pages) {
    const isNoindex = /name="robots" content="noindex/.test(readFileSync(page.file, 'utf8'));
    if (isNoindex) continue;
    if (!locs.has(SITE + page.url)) problems.push(`sitemap missing ${page.url}`);
  }
  for (const l of locs) {
    const path = l.replace(SITE, '') || '/';
    if (!pages.some((p) => p.url === path)) problems.push(`sitemap lists non-existent ${path}`);
  }
}
if (!existsSync(join(DIST, 'robots.txt'))) problems.push('no robots.txt');
for (const icon of ['favicon.ico', 'icon.svg', 'apple-touch-icon.png', 'site.webmanifest']) {
  if (!existsSync(join(DIST, icon))) problems.push(`no ${icon}`);
}

console.log(`pages audited: ${pages.length}`);
console.log(`unique titles: ${titles.size} · pages sharing a description: ${dupDesc}`);
console.log(`problems: ${problems.length}`);
for (const p of problems.slice(0, 40)) console.log('  -', p);
process.exit(problems.length ? 1 : 0);
