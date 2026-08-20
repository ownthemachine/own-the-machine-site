// Favicons from the identity's own geometry. The hero seal's five guilloche
// rings dissolve into grey mush below about 48px, so the icon keeps one ring
// at a weight that survives 16px, on the intaglio ink the site is printed in.
// Written once into public/; re-run only if the palette or the seal changes.
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUB = join(ROOT, 'public');
const INK = '#14352A';   // intaglio ink
const GOLD = '#A87F24';  // seal gold

function gcd(a, b) { a = Math.round(a); b = Math.round(b); while (b) [a, b] = [b, a % b]; return a || 1; }
function ringPath(R, r, d, rot, steps) {
  const loops = r / gcd(R, r);
  let p = '';
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2 * loops;
    const x = (R - r) * Math.cos(t + rot) + d * Math.cos(((R - r) / r) * t + rot);
    const y = (R - r) * Math.sin(t + rot) - d * Math.sin(((R - r) / r) * t + rot);
    p += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  return p;
}

// Two designs, because a guilloche is a texture and textures die at 16px.
// Large sizes get the real rosette; small sizes get the seal's silhouette —
// ring and centre — which stays legible in a browser tab.
const rich = (px, stroke) => `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="-110 -110 220 220">
  <rect x="-110" y="-110" width="220" height="220" rx="34" fill="${INK}"/>
  <circle cx="0" cy="0" r="92" fill="none" stroke="${GOLD}" stroke-width="${stroke * 1.5}" opacity="0.95"/>
  <path d="${ringPath(74, 23, 30, 0, 1600)}" fill="none" stroke="${GOLD}" stroke-width="${stroke}" opacity="0.75"/>
  <circle cx="0" cy="0" r="15" fill="${GOLD}"/>
</svg>`;

const plain = (px) => `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="-110 -110 220 220">
  <rect x="-110" y="-110" width="220" height="220" rx="34" fill="${INK}"/>
  <circle cx="0" cy="0" r="72" fill="none" stroke="${GOLD}" stroke-width="17"/>
  <circle cx="0" cy="0" r="21" fill="${GOLD}"/>
</svg>`;

const svg = (px, stroke) => (px >= 64 ? rich(px, stroke) : plain(px));

mkdirSync(PUB, { recursive: true });
// Scalable icon: modern browsers prefer this and it stays crisp anywhere.
writeFileSync(join(PUB, 'icon.svg'), rich(512, 3.2));

const browser = await puppeteer.launch();
const page = await browser.newPage();
const png = async (px, stroke) => {
  await page.setViewport({ width: px, height: px, deviceScaleFactor: 1 });
  await page.setContent(`<body style="margin:0">${svg(px, stroke)}</body>`);
  return await page.screenshot({ type: 'png', omitBackground: true });
};

// Heavier strokes at small sizes, or the rosette vanishes.
const sizes = { 16: 9, 32: 6, 48: 5, 180: 3.6, 512: 3.2 };
const buffers = {};
for (const [px, stroke] of Object.entries(sizes)) buffers[px] = await png(+px, stroke);
await browser.close();

writeFileSync(join(PUB, 'apple-touch-icon.png'), buffers[180]);
writeFileSync(join(PUB, 'icon-512.png'), buffers[512]);

// favicon.ico: PNG-in-ICO, which every browser since IE11 reads.
function ico(pngs) {
  const n = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(n, 4);
  const entries = [];
  let offset = 6 + n * 16;
  for (const { size, buf } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
    e.writeUInt32LE(buf.length, 8); e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += buf.length;
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]);
}
writeFileSync(join(PUB, 'favicon.ico'), ico([
  { size: 16, buf: buffers[16] }, { size: 32, buf: buffers[32] }, { size: 48, buf: buffers[48] },
]));

writeFileSync(join(PUB, 'site.webmanifest'), JSON.stringify({
  name: 'Own the Machine',
  short_name: 'Own the Machine',
  icons: [
    { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
  ],
  theme_color: INK,
  background_color: INK,
  display: 'browser',
}, null, 2) + '\n');

console.log('icons: favicon.ico (16/32/48), icon.svg, apple-touch-icon.png, icon-512.png, site.webmanifest');
