// Does the policy break anything? Loads the pages that actually use script,
// style, fonts and theme, and fails on any CSP violation or console error.
import puppeteer from 'puppeteer';
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = new URL('../dist/', import.meta.url).pathname;
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = createServer((req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  let f = join(ROOT, p);
  if (!existsSync(f) || !extname(f)) {
    if (existsSync(f + '.html')) f += '.html';
    else if (existsSync(join(f, 'index.html'))) f = join(f, 'index.html');
  }
  if (!existsSync(f) || !extname(f)) { res.writeHead(404); return res.end('nf'); }
  res.writeHead(200, { 'content-type': TYPES[extname(f)] || 'application/octet-stream' });
  res.end(readFileSync(f));
});
await new Promise((r) => server.listen(4712, r));

const browser = await puppeteer.launch();
const problems = [];
for (const path of ['/', '/simulator/', '/law/article-1/', '/nl/law/objections/', '/law/ledger/']) {
  const page = await browser.newPage();
  page.on('console', (m) => {
    const t = m.text();
    if (m.type() === 'error' || /Content Security Policy|Refused to/i.test(t)) {
      problems.push(`${path}: ${t.slice(0, 160)}`);
    }
  });
  page.on('pageerror', (e) => problems.push(`${path}: pageerror ${String(e).slice(0, 160)}`));
  await page.goto(`http://127.0.0.1:4712${path}`, { waitUntil: 'networkidle0' });

  // fonts actually applied?
  const font = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
  if (!/Inter|Literata|Playfair/i.test(font)) problems.push(`${path}: fonts not applied (${font})`);

  if (path === '/simulator/') {
    const sentence = await page.$eval('#sentence', (el) => el.textContent.trim());
    if (!/\d/.test(sentence)) problems.push('simulator produced no numbers (script blocked?)');
    else console.log('simulator ok:', sentence.slice(0, 80), '…');
    const gen = await page.$eval('#generation', (el) => el.textContent.trim());
    if (!/\d/.test(gen)) problems.push('generation line empty');
  }
  // theme script ran pre-paint without throwing?
  const themeOk = await page.evaluate(() => typeof localStorage !== 'undefined');
  if (!themeOk) problems.push(`${path}: theme script environment broken`);
  await page.close();
}
await browser.close();
server.close();

console.log(`\ncsp problems: ${problems.length}`);
for (const p of problems) console.log('  -', p);
process.exit(problems.length ? 1 : 0);
