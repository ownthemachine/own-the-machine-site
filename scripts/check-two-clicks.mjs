// Two-click reach: every page of the BASE build must be reachable from the
// NEW home page by following links, in at most two clicks. Links in the page
// footer sitemap are not counted (they would make everything one click away);
// the primary nav and the page body are.
//
// English pages must be within 2 clicks. Pages in the other four languages
// sit one click further by construction (home, language switch, then that
// language's own unchanged structure), so they are held to 3 clicks, or to
// the distance they had from the BASE home if that was more.
//
// The 404 page is not linked from anywhere by design and is skipped.
//
// Usage: node scripts/check-two-clicks.mjs <base-dist> [new-dist]
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages, isEnglishRoute, sections, links, toRoute } from './lib-html.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const baseDist = process.argv[2];
const newDist = process.argv[3] || join(ROOT, 'dist');
if (!baseDist || !existsSync(baseDist)) { console.error('usage: check-two-clicks.mjs <base-dist> [new-dist]'); process.exit(2); }

function distances(dist) {
  const pg = pages(dist);
  const edges = new Map();
  for (const [route, f] of pg) {
    const s = sections(f);
    edges.set(route, new Set([...links(s.nav), ...links(s.main)].map(toRoute).filter((r) => r && pg.has(r))));
  }
  const d = new Map([['/', 0]]);
  let frontier = ['/'];
  while (frontier.length) {
    const next = [];
    for (const r of frontier) for (const to of edges.get(r) || []) {
      if (!d.has(to)) { d.set(to, d.get(r) + 1); next.push(to); }
    }
    frontier = next;
  }
  return d;
}

const dNew = distances(newDist);
const dBase = distances(baseDist);
const problems = [];
const rows = [];
for (const route of [...pages(baseDist).keys()].filter((r) => r !== '/404').sort()) {
  const got = dNew.get(route);
  const limit = isEnglishRoute(route) ? 2 : Math.max(3, dBase.get(route) ?? 0);
  rows.push([route, got ?? 'UNREACHABLE', dBase.get(route) ?? '-', limit]);
  if (got === undefined || got > limit) problems.push(`${route}: ${got ?? 'unreachable'} clicks (limit ${limit})`);
}
if (process.env.OTM_LIST) {
  console.log('route\tnew clicks\tbase clicks\tlimit');
  for (const r of rows) console.log(r.join('\t'));
}
const en = rows.filter((r) => isEnglishRoute(r[0]));
if (problems.length) {
  console.error(`check-two-clicks: ${problems.length} page(s) out of reach:`);
  for (const p of problems) console.error('  ' + p);
  process.exit(1);
}
const hist = {};
for (const r of rows) hist[r[1]] = (hist[r[1]] || 0) + 1;
console.log(`check-two-clicks: all ${rows.length} base pages reachable from the new home (${en.length} English within 2 clicks); clicks histogram ${JSON.stringify(hist)}`);
