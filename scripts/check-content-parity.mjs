// Content parity: every visible text unit of the BASE build's English pages
// (headings, paragraphs, list items, table cells, and each link as text plus
// href) must still appear on some page of the NEW build. A restructure moves
// content; it must not delete it. Intentional removals are listed, with a
// reason each, in scripts/content-parity-allowlist.json.
//
// Usage: node scripts/check-content-parity.mjs <base-dist> [new-dist]
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages, isEnglishRoute, sections, units } from './lib-html.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const baseDist = process.argv[2];
const newDist = process.argv[3] || join(ROOT, 'dist');
if (!baseDist || !existsSync(baseDist)) { console.error('usage: check-content-parity.mjs <base-dist> [new-dist]'); process.exit(2); }

const allow = JSON.parse(readFileSync(join(ROOT, 'scripts', 'content-parity-allowlist.json'), 'utf8')).allowed;
for (const a of allow) if (!a.unit || !a.reason) { console.error('allowlist entry without unit and reason'); process.exit(2); }
const allowed = new Set(allow.map((a) => a.unit));

// All units anywhere in the new build (any language; English wins in practice).
const have = new Set();
for (const [, f] of pages(newDist)) for (const u of units(sections(f).main)) have.add(u);

let total = 0, pagesChecked = 0;
const missing = [];
for (const [route, f] of pages(baseDist)) {
  if (!isEnglishRoute(route)) continue;
  pagesChecked++;
  for (const u of units(sections(f).main)) {
    total++;
    if (!have.has(u) && !allowed.has(u)) missing.push(`${route}  ${u.slice(0, 160)}`);
  }
}
if (missing.length) {
  console.error(`check-content-parity: ${missing.length} unit(s) of the base build are missing from the new build:`);
  for (const m of missing.slice(0, 60)) console.error('  ' + m);
  process.exit(1);
}
console.log(`check-content-parity: ${total} text units on ${pagesChecked} base English pages all present in the new build (${allow.length} allowlisted)`);
