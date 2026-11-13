// Plain front in every language that carries it (all five).
//
// Dictionary: the Dutch, French, German and Spanish plain-front blocks have the same keys,
// the same number of questions and links per question, and the same link
// targets (page, not anchor) as the English source; no string is empty; no
// dash is used as punctuation; placeholders and tags match.
//
// Build: each language has its home with the five-section menu, a Questions
// page with the same number of questions whose second heading is the
// translated money question, the experts, overview and get-involved pages; the
// language links of those pages point every language at the same page of the
// other four, with an hreflang alternate each; every detail link into a page section lands
// on an id that exists on the page it names.
//
// Usage: node scripts/check-plain-front.mjs [dist]
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DICTS, PLAIN_LOCALES } from '../src/lib/i18n.mjs';
import { decode } from './lib-html.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = process.argv[2] || join(ROOT, 'dist');
const BLOCKS = ['plainMenu', 'plainHome', 'qa', 'experts', 'involved'];
const problems = [];
const bad = (m) => problems.push(m);

// ---- dictionary --------------------------------------------------------
const shape = (v, path = '') => {
  if (Array.isArray(v)) return v.flatMap((x, i) => shape(x, `${path}[${i}]`));
  if (v && typeof v === 'object') return Object.entries(v).flatMap(([k, x]) => shape(x, `${path}.${k}`));
  return [path];
};
const strings = (v) => (Array.isArray(v) ? v.flatMap(strings) : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : [v]);
// keys the translated dictionaries may carry in addition to the source
const EXTRA = new Set(['qa.sep']);
const en = DICTS.en;
for (const loc of PLAIN_LOCALES.filter((l) => l !== 'en')) {
  const d = DICTS[loc];
  for (const b of BLOCKS) {
    if (!d[b]) { bad(`${loc}: block ${b} is missing`); continue; }
    const want = new Set(shape(en[b], b));
    const have = new Set(shape(d[b], b));
    for (const k of want) if (!have.has(k)) bad(`${loc}: missing ${k}`);
    for (const k of have) if (!want.has(k) && !EXTRA.has(k)) bad(`${loc}: unexpected ${k}`);
  }
  (d.qa?.items || []).forEach((it, i) => {
    const src = en.qa.items[i];
    if (!src) return;
    const page = (h) => h.split('#')[0];
    if (JSON.stringify(it.links.map((l) => page(l[0]))) !== JSON.stringify(src.links.map((l) => page(l[0])))) bad(`${loc}: qa.items[${i}] links point at different pages`);
    const tags = (s) => (s.match(/<[^>]+>/g) || []).join('');
    if (tags(it.a) !== tags(src.a)) bad(`${loc}: qa.items[${i}].a HTML tags differ from the source`);
  });
  for (const s of strings(BLOCKS.map((b) => d[b]))) {
    if (typeof s !== 'string' || s.trim() === '') bad(`${loc}: empty string`);
    else if (/[\u2013\u2014]/.test(s)) bad(`${loc}: dash used as punctuation in "${s.slice(0, 50)}"`);
  }
}

// ---- build -------------------------------------------------------------
const page = (loc, path) => join(dist, loc === 'en' ? '' : loc, path, 'index.html');
const read = (loc, path) => {
  const f = page(loc, path);
  if (!existsSync(f)) { bad(`${loc}: ${path || '/'} was not built (${f.replace(ROOT + '/', '')})`); return null; }
  return readFileSync(f, 'utf8');
};
const main = (html) => (html.match(/<main\b[\s\S]*?<\/main>/) || [''])[0];
const nav = (html) => (html.match(/<nav aria-label="Primary"[\s\S]*?<\/nav>/) || [''])[0];
const idsOf = (html) => new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
const hrefOf = (loc, p) => (loc === 'en' ? p : p === '/' ? `/${loc}/` : `/${loc}${p}`);
const switcher = (html) => Object.fromEntries([...html.matchAll(/<a class="lang" href="([^"]*)"[^>]*\blang="(\w+)"/g)].map((m) => [m[2], m[1]]));

for (const loc of PLAIN_LOCALES) {
  const d = DICTS[loc];
  const home = read(loc, '');
  if (home) {
    const links = [...nav(home).matchAll(/<a href="([^"]*)"[^>]*>([^<]*)<\/a>/g)].map((m) => [m[1], decode(m[2])]);
    const want = [['/', d.plainMenu.home], ['/questions', d.plainMenu.qa], ['/experts', d.plainMenu.experts], ['/get-involved', d.plainMenu.involved], ['/about', d.plainMenu.about]]
      .map(([p, l]) => [hrefOf(loc, p), l]);
    for (const [h, l] of want) if (!links.some(([a, b]) => a === h && b === l)) bad(`${loc}: home menu lacks "${l}" -> ${h}`);
    if (!new RegExp(`<h1[^>]*>${d.plainHome.title}`).test(home)) bad(`${loc}: home has no plain h1`);
    if (!home.includes(`>${d.plainHome.ctaQa}<`)) bad(`${loc}: home lacks its Questions button`);
  }
  const q = read(loc, 'questions');
  if (q) {
    const h2 = [...main(q).matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => decode(m[1].replace(/<[^>]+>/g, '').trim()));
    if (h2.length !== en.qa.items.length) bad(`${loc}: /questions has ${h2.length} questions, expected ${en.qa.items.length}`);
    if (h2[1] !== d.qa.items[1].q) bad(`${loc}: second question is "${h2[1]}", expected the money question "${d.qa.items[1].q}"`);
    // every detail link with an anchor lands on an existing id
    for (const m of main(q).matchAll(/<a href="([^"#]*)#([^"]+)"/g)) {
      const t = readFileSync(join(dist, m[1].replace(/^\//, ''), 'index.html'), 'utf8');
      if (!idsOf(t).has(m[2])) bad(`${loc}: /questions links to ${m[1]}#${m[2]}, which has no such id`);
    }
  }
  for (const p of ['experts', 'experts/overview', 'get-involved']) {
    const html = read(loc, p);
    if (!html) continue;
    const sw = switcher(html);
    for (const l of PLAIN_LOCALES) if (sw[l] !== hrefOf(l, `/${p}`)) bad(`${loc}: /${p} language link ${l} is "${sw[l]}", expected "${hrefOf(l, `/${p}`)}"`);
    for (const l of PLAIN_LOCALES) if (!html.includes(`hreflang="${l}" href="https://ownthemachine.eu${hrefOf(l, `/${p}`)}"`)) bad(`${loc}: /${p} lacks hreflang ${l}`);
  }
}
if (problems.length) {
  console.error(`check-plain-front: ${problems.length} problem(s):`);
  for (const p of problems.slice(0, 40)) console.error('  ' + p);
  process.exit(1);
}
console.log(`check-plain-front: ${PLAIN_LOCALES.join(', ')} carry the plain front: dictionary shape, home menu, ${en.qa.items.length} questions with the money question second, detail anchors, language links and hreflang all correct`);
