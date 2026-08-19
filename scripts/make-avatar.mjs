// One-off: the organisation avatar, the Seal on paper, 500x500.
import puppeteer from 'puppeteer';
import { heroSeal } from '../src/lib/seal.mjs';

const html = `<!doctype html><html><head><style>
  body { margin:0; width:500px; height:500px; background:#F4F3EE;
         display:flex; align-items:center; justify-content:center; }
  svg path { stroke:#14352A !important; stroke-width:0.9 !important; }
</style></head><body>${heroSeal({ size: 420, animate: false })}</body></html>`;

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 500, height: 500 });
await page.setContent(html, { waitUntil: 'load' });
await page.screenshot({ path: '[path removed]' });
await browser.close();
console.log('avatar written');
