import puppeteer from 'puppeteer';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const SHOTS_DIR = process.env.OTM_SHOTS_DIR || join(dirname(fileURLToPath(import.meta.url)), '..', 'tmp');
mkdirSync(SHOTS_DIR, { recursive: true });

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 1000 });
await page.goto('https://ownthemachine.eu/law/objections#16-this-is-a-golden-share-and-the-court-strikes-golden-shares-down', { waitUntil: 'networkidle0' });
const h = await page.evaluate(() => {
  const el = [...document.querySelectorAll('h3')].find((e) => e.textContent.includes('golden share'));
  if (el) el.scrollIntoView({ block: 'start' });
  return el ? el.textContent.trim() : 'not found';
});
console.log('heading ::', h);
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: join(SHOTS_DIR, 'obj16-live.png') });
await browser.close();
console.log('shot saved');
