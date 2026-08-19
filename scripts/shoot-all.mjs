// Visual sweep: screenshot every screen at desktop and mobile widths.
// Starts its own static server so no external setup is needed.
import puppeteer from 'puppeteer';
import { createServer } from 'node:http';
import { readFileSync, mkdirSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = '/Users/dave/.claude/jobs/44518f3c/tmp/site/.vercel/output/static';
const OUT = '/Users/dave/.claude/jobs/44518f3c/tmp/shots';
mkdirSync(OUT, { recursive: true });

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png',
  '.pdf': 'application/pdf', '.epub': 'application/epub+zip' };
const server = createServer((req, res) => {
  try {
    const path = decodeURIComponent(req.url.split('?')[0]);
    const file = join(ROOT, path);
    const body = readFileSync(file);
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch { res.writeHead(404); res.end('nope'); }
});
await new Promise((r) => server.listen(4598, r));

const DESKTOP = ['index', 'law', 'law/recitals', 'law/article-5', 'law/objections',
  'simulator', 'evidence', 'contribute', 'about', '404', 'nl', 'de/simulator'];
const MOBILE = ['index', 'law', 'law/article-5', 'simulator', 'evidence', 'nl'];

const browser = await puppeteer.launch();
const page = await browser.newPage();
async function shot(p, w, prefix) {
  await page.setViewport({ width: w, height: w < 500 ? 844 : 1000 });
  await page.goto(`http://127.0.0.1:4598/${p}.html`, { waitUntil: 'networkidle0' });
  const name = `${prefix}-${p.replace(/\//g, '-')}.png`;
  await page.screenshot({ path: join(OUT, name) });
  console.log(name);
}
for (const p of DESKTOP) await shot(p, 1400, 'd');
for (const p of MOBILE) await shot(p, 390, 'm');
await browser.close();
server.close();
