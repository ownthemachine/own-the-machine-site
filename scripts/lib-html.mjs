// Shared helpers for the base-versus-new build checks (content parity and
// two-click reach). Plain regex over the built HTML: the pages are generated
// from a small set of templates, so a parser is not needed.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';

const LOCALE_DIRS = new Set(['nl', 'fr', 'de', 'es']);

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
export const decode = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
  .replace(/&([a-z]+);/gi, (m, n) => ENT[n.toLowerCase()] ?? m);
export const clean = (html) => decode(
  html.replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' '),
).replace(/\s+/g, ' ').trim();

// Every built page as route -> file path ('/' , '/law', '/nl/law', ...).
export function pages(dist) {
  const out = new Map();
  (function walk(dir) {
    for (const e of readdirSync(dir)) {
      const p = join(dir, e);
      if (statSync(p).isDirectory()) walk(p);
      else if (e === 'index.html' || (e === '404.html' && dir === dist)) {
        const rel = relative(dist, dirname(p)).split('\\').join('/');
        out.set(e === '404.html' ? '/404' : (rel ? `/${rel}` : '/'), p);
      }
    }
  })(dist);
  return out;
}

export const isEnglishRoute = (route) => !LOCALE_DIRS.has(route.split('/')[1]);

export function sections(file) {
  const html = readFileSync(file, 'utf8');
  const grab = (re) => (html.match(re) || [''])[0];
  const main = grab(/<main\b[\s\S]*?<\/main>/);
  const nav = grab(/<nav aria-label="Primary"[\s\S]*?<\/nav>/);
  const foot = grab(/<footer\b[\s\S]*?<\/footer>/);
  return { html, main, nav, foot };
}

// Visible text units of a region: headings, paragraphs, list items, table
// cells, and every link as "text -> href".
export function units(region) {
  const out = new Set();
  for (const m of region.matchAll(/<(h[1-6]|p|li|td|th|dt|dd|blockquote|figcaption)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
    const t = clean(m[2]);
    if (t) out.add(`${m[1].startsWith('h') ? 'heading' : 'text'}: ${t}`);
  }
  for (const m of region.matchAll(/<a\b[^>]*\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)) {
    out.add(`link: ${clean(m[2])} -> ${decode(m[1])}`);
  }
  return out;
}

export const links = (region) =>
  [...region.matchAll(/<a\b[^>]*\bhref="([^"#]*)(#[^"]*)?"/g)].map((m) => decode(m[1]));

// Internal href -> route ('/law/' -> '/law'), or null for external/files.
export function toRoute(href) {
  if (!href || /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//')) return null;
  if (/\.[a-z0-9]+$/i.test(href)) return null;
  const r = href.replace(/\/+$/, '');
  return r === '' ? '/' : r;
}
