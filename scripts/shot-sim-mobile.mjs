import puppeteer from 'puppeteer';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const SHOTS_DIR = process.env.OTM_SHOTS_DIR || join(dirname(fileURLToPath(import.meta.url)), '..', 'tmp');
mkdirSync(SHOTS_DIR, { recursive: true });

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 430, height: 950, deviceScaleFactor: 2 });
await page.goto('https://ownthemachine.eu/simulator', { waitUntil: 'networkidle0' });
await page.evaluate(() => document.querySelector('.chart').scrollIntoView({ block: 'center' }));
await new Promise((r) => setTimeout(r, 300));
console.log('GEN ::', await page.$eval('#generation', (el) => el.textContent));
await page.screenshot({ path: join(SHOTS_DIR, 'sim-live-mobile.png') });
await browser.close();
console.log('done');
