import puppeteer from 'puppeteer';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const SHOTS_DIR = process.env.OTM_SHOTS_DIR || join(dirname(fileURLToPath(import.meta.url)), '..', 'tmp');
mkdirSync(SHOTS_DIR, { recursive: true });

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 1000 });
for (const path of ['simulator', 'nl/simulator', 'fr/simulator', 'de/simulator', 'es/simulator']) {
  await page.goto(`https://ownthemachine.eu/${path}`, { waitUntil: 'networkidle0' });
  const sentence = await page.$eval('#sentence', (el) => el.textContent);
  console.log(path, '::', sentence);
}
await page.goto('https://ownthemachine.eu/simulator', { waitUntil: 'networkidle0' });
await page.screenshot({ path: join(SHOTS_DIR, 'sim-stake.png'), fullPage: false });
await browser.close();
console.log('shot saved');
