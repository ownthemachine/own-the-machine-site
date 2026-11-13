// Byte identity of whole languages between the BASE build and the NEW build,
// with asset hashes stripped. German and Spanish must not change while Dutch
// and French gain the plain front; this proves it file by file.
//
// Usage: node scripts/check-locales-identical.mjs <base-dist> [new-dist] [--locales=de,es]
// With --locales=en it compares every English page (all files outside the
// language folders) and lists the ones that differ instead of failing, so the
// intended set of changed pages can be read off.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const localesArg = args.find((a) => a.startsWith('--locales='));
const LOCALES = localesArg ? localesArg.slice('--locales='.length).split(',') : ['de', 'es'];
const [baseDist, newDistArg] = args.filter((a) => !a.startsWith('--'));
const newDist = newDistArg || join(ROOT, 'dist');
if (!baseDist || !existsSync(baseDist)) { console.error('usage: check-locales-identical.mjs <base-dist> [new-dist] [--locales=de,es]'); process.exit(2); }

const OTHER = new Set(['nl', 'fr', 'de', 'es']);
const walk = (dir) => readdirSync(dir).flatMap((e) => {
  const p = join(dir, e);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
// /_astro/name.HASH.css -> /_astro/name.HASH.css with the hash masked
const strip = (s) => s.replace(/\.[A-Za-z0-9_-]{8}\.(css|js|mjs|woff2?|png|svg)\b/g, '.HASH.$1');
const inLocale = (rel, loc) => (loc === 'en' ? !OTHER.has(rel.split('/')[0]) && !rel.startsWith('_astro/') : rel.split('/')[0] === loc);
const files = (dist, loc) => new Map(walk(dist).map((p) => [relative(dist, p), p]).filter(([r]) => inLocale(r, loc)));

let checked = 0;
const differ = [];
for (const loc of LOCALES) {
  const a = files(baseDist, loc);
  const b = files(newDist, loc);
  for (const r of new Set([...a.keys(), ...b.keys()])) {
    if (!r.endsWith('.html') && !r.endsWith('.xml')) { if (!a.has(r) || !b.has(r)) differ.push(`${r} (only in one build)`); continue; }
    checked++;
    if (!a.has(r) || !b.has(r)) { differ.push(`${r} (only in ${a.has(r) ? 'base' : 'new'} build)`); continue; }
    if (strip(readFileSync(a.get(r), 'utf8')) !== strip(readFileSync(b.get(r), 'utf8'))) differ.push(r);
  }
}
if (checked === 0) { console.error('check-locales-identical: no files found; wrong directory or locale?'); process.exit(1); }
if (LOCALES.includes('en')) {
  console.log(`check-locales-identical: ${checked} English files compared; ${differ.length} differ:`);
  for (const d of differ) console.log('  ' + d);
  process.exit(0);
}
if (differ.length) {
  console.error(`check-locales-identical: ${differ.length} file(s) differ in ${LOCALES.join(', ')}:`);
  for (const d of differ.slice(0, 40)) console.error('  ' + d);
  process.exit(1);
}
console.log(`check-locales-identical: ${checked} html files in ${LOCALES.join(', ')} identical to the base build (asset hashes masked)`);
