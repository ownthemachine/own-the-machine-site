import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 1200 });
for (const path of ['simulator', 'nl/simulator', 'fr/simulator', 'de/simulator', 'es/simulator']) {
  await page.goto(`https://ownthemachine.eu/${path}`, { waitUntil: 'networkidle0' });
  const gen = await page.$eval('#generation', (el) => el.textContent);
  console.log(path, 'GEN ::', gen);
}
await page.goto('https://ownthemachine.eu/simulator', { waitUntil: 'networkidle0' });
await page.click('#forecast');
const gen = await page.$eval('#generation', (el) => el.textContent);
const sen = await page.$eval('#sentence', (el) => el.textContent);
console.log('FORECAST sentence ::', sen);
console.log('FORECAST gen ::', gen);
await page.screenshot({ path: '[path removed]', fullPage: false });
await browser.close();
console.log('shot saved');
