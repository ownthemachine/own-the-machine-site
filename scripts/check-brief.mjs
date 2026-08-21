// Prove the one-page brief is one page.
//
// The brief exists because a policy officer reads one sheet and puts down
// two. That claim lives in a stylesheet, which means it is true until
// somebody adds a sentence, and then it is quietly false in one language
// while still looking right in the other four. Nothing else in this
// repository would notice: the page builds, the text reads, and the second
// sheet only appears on paper.
//
// So print it, in every language, and count the pages.

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

const PAGES = ['/brief/', '/nl/brief/', '/fr/brief/', '/de/brief/', '/es/brief/'];

const browser = await puppeteer.launch();
let failures = 0;

for (const path of PAGES) {
  const page = await browser.newPage();
  await page.goto(base + path, { waitUntil: 'networkidle0' });
  await page.emulateMediaType('print');
  const pdf = await page.pdf({ format: 'A4', printBackground: false });
  // Count page objects in the PDF. Puppeteer emits an uncompressed object
  // tree, so the /Type /Page entries are countable directly; the negative
  // lookahead keeps /Type /Pages (the tree root) out of the tally.
  const buf = Buffer.from(pdf).toString('latin1');
  const count = (buf.match(/\/Type\s*\/Page(?![s])/g) || []).length;
  const ok = count === 1;
  if (!ok) failures++;
  console.log(`  ${path.padEnd(12)} ${count} page(s) -> ${ok ? 'one sheet' : 'TOO LONG'}`);
  await page.close();
}

await browser.close();
server.close();
console.log(failures
  ? `\ncheck-brief: ${failures} language(s) spill onto a second sheet`
  : '\ncheck-brief: the brief is one page in every language');
process.exit(failures ? 1 : 0);
