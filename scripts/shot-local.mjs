// Screenshot built pages from a throwaway static server (no deploy needed).
import puppeteer from 'puppeteer';
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, extname, dirname } from 'node:path';

const ROOT = new URL('../dist/', import.meta.url).pathname;
const SHOTS_DIR = process.env.OTM_SHOTS_DIR || join(dirname(fileURLToPath(import.meta.url)), '..', 'tmp');
mkdirSync(SHOTS_DIR, { recursive: true });
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };
const server = createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let f = join(ROOT, p);
  if (!existsSync(f) || !extname(f)) {
    if (existsSync(f + '.html')) f += '.html';
    else if (existsSync(join(f, 'index.html'))) f = join(f, 'index.html');
  }
  if (!existsSync(f) || !extname(f)) { res.writeHead(404); return res.end('nf'); }
  res.writeHead(200, { 'content-type': TYPES[extname(f)] || 'application/octet-stream' });
  res.end(readFileSync(f));
});
await new Promise((r) => server.listen(4711, r));

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 800, height: 1100, deviceScaleFactor: 2 });
for (const [path, out] of [
  ['/nl/law/article-1', 'nl-article1'],
  ['/law/article-1', 'en-article1'],
]) {
  await page.goto(`http://127.0.0.1:4711${path}`, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: join(SHOTS_DIR, `${out}.png`) });
  console.log('shot', out);
}
await browser.close();
server.close();
