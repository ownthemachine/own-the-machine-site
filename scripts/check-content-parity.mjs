// Content parity: every visible text unit of the BASE build's pages in the
// checked languages (all five)
// (headings, paragraphs, list items, table cells, and each link as text plus
// href) must still appear on some page of the NEW build. A restructure moves
// content; it must not delete it. Intentional removals are listed, with a
// reason each, in scripts/content-parity-allowlist.json.
//
// English units may be found on any page of the new build (the first plain
// front moved English content between pages). Units of the other four
// languages must be found on a page of the SAME language in the new build.
//
// Usage: node scripts/check-content-parity.mjs <base-dist> [new-dist] [--locales=en,nl,fr,de,es]
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages, localeOf, sections, units } from './lib-html.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const localesArg = args.find((a) => a.startsWith('--locales='));
const LOCALES = localesArg ? localesArg.slice('--locales='.length).split(',') : ['en', 'nl', 'fr', 'de', 'es'];
const [baseDist, newDistArg] = args.filter((a) => !a.startsWith('--'));
const newDist = newDistArg || join(ROOT, 'dist');
if (!baseDist || !existsSync(baseDist)) { console.error('usage: check-content-parity.mjs <base-dist> [new-dist]'); process.exit(2); }

const allow = JSON.parse(readFileSync(join(ROOT, 'scripts', 'content-parity-allowlist.json'), 'utf8')).allowed;
for (const a of allow) if (!a.unit || !a.reason) { console.error('allowlist entry without unit and reason'); process.exit(2); }
const allowed = new Set(allow.map((a) => a.unit));

// All units anywhere in the new build, and per language.
const have = new Set();
const haveBy = {};
for (const [route, f] of pages(newDist)) {
  const set = (haveBy[localeOf(route)] ||= new Set());
  for (const u of units(sections(f).main)) { have.add(u); set.add(u); }
}

let total = 0, pagesChecked = 0;
const perLocale = {};
const missing = [];
for (const [route, f] of pages(baseDist)) {
  const loc = localeOf(route);
  if (!LOCALES.includes(loc)) continue;
  pagesChecked++;
  perLocale[loc] = (perLocale[loc] || 0) + 1;
  const pool = loc === 'en' ? have : (haveBy[loc] || new Set());
  for (const u of units(sections(f).main)) {
    total++;
    if (!pool.has(u) && !allowed.has(u)) missing.push(`${route}  ${u.slice(0, 160)}`);
  }
}
if (total === 0 || pagesChecked === 0) {
  console.error('check-content-parity: no pages or text units found in the base build; wrong directory?');
  process.exit(1);
}
if (missing.length) {
  console.error(`check-content-parity: ${missing.length} unit(s) of the base build are missing from the new build:`);
  for (const m of missing.slice(0, 60)) console.error('  ' + m);
  process.exit(1);
}
console.log(`check-content-parity: ${total} text units on ${pagesChecked} base pages (${JSON.stringify(perLocale)}) all present in the new build (${allow.length} allowlisted)`);
