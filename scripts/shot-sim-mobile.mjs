import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 430, height: 950, deviceScaleFactor: 2 });
await page.goto('https://ownthemachine.eu/simulator', { waitUntil: 'networkidle0' });
await page.evaluate(() => document.querySelector('.chart').scrollIntoView({ block: 'center' }));
await new Promise((r) => setTimeout(r, 300));
console.log('GEN ::', await page.$eval('#generation', (el) => el.textContent));
await page.screenshot({ path: '[path removed]' });
await browser.close();
console.log('done');
