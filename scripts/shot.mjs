// Screenshot a built page for visual verification, before deploying.
import puppeteer from 'puppeteer';
import { pathToFileURL } from 'node:url';

const [page_, out, width] = process.argv.slice(2);
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: Number(width) || 1400, height: 1000 });
await page.goto(`http://127.0.0.1:4599/${page_}`, { waitUntil: 'networkidle0' });
await page.screenshot({ path: out, fullPage: false });
await browser.close();
console.log('shot:', out);
