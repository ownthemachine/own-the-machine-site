// Can a reader get to every page, from any page, in their own language?
//
// The nav grew to eight items because the footer carried no links, and when
// it was cut back to five the footer became a sitemap. That trade is only an
// improvement if the footer really carries what the nav dropped, and "really"
// is not something to take on trust: five pages built in one week had been
// reachable from exactly one place before anyone noticed.
//
// So this walks the built HTML rather than the source, and checks the locale
// prefix too: a Dutch reader offered a link to the English page has not been
// given a route, they have been given an exit.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.env.OTM_BUILD_DIR || join(process.cwd(), 'dist');
const LOCALES = [['en', ''], ['nl', '/nl'], ['fr', '/fr'], ['de', '/de'], ['es', '/es']];

// Every page a reader should be able to find. Article and annex pages are
// reached from /law and are checked through it rather than listed here.
const PAGES = [
  '/law', '/law/recitals', '/law/objections', '/law/explanatory-memorandum',
  '/law/memorandum', '/law/versions', '/law/ledger', '/evidence',
  '/brief', '/faq', '/simulator', '/join', '/sign', '/press',
  '/contribute', '/about',
];

// Sampled starting points: a home page, a deep legal page, and a leaf page.
const FROM = ['', '/law/article-5', '/faq'];

const body = (file) => {
  const t = readFileSync(file, 'utf8');
  return t.slice(t.indexOf('<body'));
};

const problems = [];
for (const [loc, prefix] of LOCALES) {
  for (const from of FROM) {
    const file = join(ROOT, prefix.slice(1), from.slice(1), 'index.html');
    if (!existsSync(file)) { problems.push(`${loc}: start page ${prefix}${from}/ not built`); continue; }
    const hrefs = new Set([...body(file).matchAll(/href="([^"]+)"/g)].map((m) => m[1]));
    const missing = PAGES.filter((p) => !hrefs.has(`${prefix}${p}`) && !hrefs.has(`${prefix}${p}/`));
    if (missing.length) {
      problems.push(`${loc}: from ${prefix}${from || '/'} unreachable -> ${missing.join(', ')}`);
    }
  }
}

if (problems.length) {
  console.error(`check-reach: ${problems.length} reachability failure(s):`);
  for (const p of problems) console.error('  ' + p);
  process.exit(1);
}
console.log(`check-reach: all ${PAGES.length} pages reachable from every sampled page, in all ${LOCALES.length} languages`);
