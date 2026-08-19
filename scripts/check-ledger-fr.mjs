import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 430, height: 900, deviceScaleFactor: 2 });
await page.goto('https://ownthemachine.eu/fr/law/ledger', { waitUntil: 'networkidle0' });
const banner = await page.$eval('.lang-banner', (el) => el.textContent.trim());
const toc = await page.$eval('.onpage-mobile summary', (el) => el.textContent.trim());
console.log('FR banner ::', banner);
console.log('FR toc    ::', toc);
await page.evaluate(() => document.querySelector('.lang-banner').scrollIntoView({ block: 'center' }));
await new Promise((r) => setTimeout(r, 300));
await page.screenshot({ path: '[path removed]' });
for (const [path, sel] of [['nl/law/ledger', 'NL'], ['de/law/ledger', 'DE'], ['es/law/ledger', 'ES']]) {
  await page.goto(`https://ownthemachine.eu/${path}`, { waitUntil: 'networkidle0' });
  console.log(sel, 'banner ::', await page.$eval('.lang-banner', (el) => el.textContent.trim()));
  console.log(sel, 'toc    ::', await page.$eval('.onpage-mobile summary', (el) => el.textContent.trim()));
}
await browser.close();
console.log('done');
