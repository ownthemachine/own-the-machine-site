// Two-click reach: every page of the BASE build must be reachable from the
// NEW home page by following links, in at most two clicks. Links in the page
// footer sitemap are not counted (they would make everything one click away);
// the primary nav and the page body are.
//
// Every page must be within 2 clicks of its own language's home ('/', '/nl',
// '/fr', '/de', '/es'): all five carry the plain front.
//
// The 404 page is not linked from anywhere by design and is skipped.
//
// Usage: node scripts/check-two-clicks.mjs <base-dist> [new-dist]
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages, localeOf, sections, links, toRoute } from './lib-html.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const baseDist = process.argv[2];
const newDist = process.argv[3] || join(ROOT, 'dist');
if (!baseDist || !existsSync(baseDist)) { console.error('usage: check-two-clicks.mjs <base-dist> [new-dist]'); process.exit(2); }

function distances(dist, start = '/') {
  const pg = pages(dist);
  const edges = new Map();
  for (const [route, f] of pg) {
    const s = sections(f);
    edges.set(route, new Set([...links(s.nav), ...links(s.main)].map(toRoute).filter((r) => r && pg.has(r))));
  }
  const d = new Map([[start, 0]]);
  let frontier = [start];
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
const dNewBy = { nl: distances(newDist, '/nl'), fr: distances(newDist, '/fr'), de: distances(newDist, '/de'), es: distances(newDist, '/es') };
const problems = [];
const rows = [];
for (const route of [...pages(baseDist).keys()].filter((r) => r !== '/404').sort()) {
  const loc = localeOf(route);
  const got = (dNewBy[loc] || dNew).get(route);
  const limit = 2;
  rows.push([route, got ?? 'UNREACHABLE', dBase.get(route) ?? '-', limit]);
  if (got === undefined || got > limit) problems.push(`${route}: ${got ?? 'unreachable'} clicks (limit ${limit})`);
}
if (rows.length === 0) {
  console.error('check-two-clicks: no pages found in the base build; wrong directory?');
  process.exit(1);
}
if (process.env.OTM_LIST) {
  console.log('route\tnew clicks\tbase clicks\tlimit');
  for (const r of rows) console.log(r.join('\t'));
}
if (problems.length) {
  console.error(`check-two-clicks: ${problems.length} page(s) out of reach:`);
  for (const p of problems) console.error('  ' + p);
  process.exit(1);
}
const hist = {};
for (const r of rows) hist[r[1]] = (hist[r[1]] || 0) + 1;
console.log(`check-two-clicks: all ${rows.length} base pages reachable from the new home (each within 2 clicks of its own language's home); clicks histogram ${JSON.stringify(hist)}`);
