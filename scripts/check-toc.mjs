// Prove the on-page table of contents is reachable.
//
// It is position: sticky. A sticky element taller than the viewport pins its
// top and pushes its own bottom permanently off-screen, so the last entries
// cannot be reached at any scroll position. That happened once the objections
// list grew past nineteen entries, and it is invisible to every other check
// this repo runs, because the markup and the stylesheet are both correct.
//
// Measured here instead: is the element taller than the space it has, and if
// so can it scroll itself.

import puppeteer from 'puppeteer';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.env.OTM_BUILD_DIR || join(process.cwd(), 'dist');
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
                '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon',
                '.woff2': 'font/woff2', '.json': 'application/json' };

const server = createServer((req, res) => {
  let p = join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  if (!existsSync(p)) { res.writeHead(404); return res.end('nope'); }
  res.writeHead(200, { 'content-type': TYPES[extname(p)] || 'application/octet-stream' });
  res.end(readFileSync(p));
});

await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;

const PAGES = ['/law/objections/', '/nl/law/objections/', '/evidence/', '/law/severability/'];
// a short viewport is the honest test: it is where the list overflows
const VIEWPORTS = [{ width: 1440, height: 700 }, { width: 1280, height: 620 }];

const browser = await puppeteer.launch();
let failures = 0;

for (const viewport of VIEWPORTS) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  for (const path of PAGES) {
    await page.goto(base + path, { waitUntil: 'load' });
    const r = await page.evaluate(() => {
      const el = document.querySelector('.onpage-side');
      if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
        overflowY: cs.overflowY,
        position: cs.position,
        canScrollSelf: el.scrollHeight > el.clientHeight
          ? (el.scrollTop = el.scrollHeight, el.scrollTop > 0)
          : true,
      };
    });
    if (!r) { console.log(`  ${viewport.width}x${viewport.height} ${path}  no sidebar (fine)`); continue; }

    const overflows = r.scrollHeight > r.clientHeight;
    const ok = !overflows || (r.overflowY !== 'visible' && r.canScrollSelf);
    if (!ok) failures++;
    console.log(
      `  ${viewport.width}x${viewport.height} ${path.padEnd(24)} `
      + `content ${r.scrollHeight}px in ${r.clientHeight}px, overflow-y:${r.overflowY}, `
      + `${overflows ? 'overflows' : 'fits'} -> ${ok ? 'reachable' : 'BOTTOM UNREACHABLE'}`);
  }
  await page.close();
}

await browser.close();
server.close();
console.log(failures ? `\ncheck-toc: ${failures} unreachable` : '\ncheck-toc: every entry reachable');
process.exit(failures ? 1 : 0);
