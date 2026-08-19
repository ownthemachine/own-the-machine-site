#!/usr/bin/env node
// Generates one og-image PNG (1200x630) per page per locale, in the
// site's citizen's-certificate identity, into public/og/. Run after
// sync-law, before astro build (og-slug.mjs / Base.astro reference the
// filenames this produces).
import { mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import puppeteer from 'puppeteer';
import { dict, LOCALES } from '../src/lib/i18n.mjs';
import { heroSeal } from '../src/lib/seal.mjs';
import { OG_PAGES, ogFilename } from '../src/lib/og-slug.mjs';

if (!existsSync(join(process.cwd(), 'src', 'generated', 'law.json'))) {
  console.error('make-og: src/generated/law.json missing; run scripts/sync-law.mjs first');
  process.exit(1);
}

const OUT = join(process.cwd(), 'public', 'og');
mkdirSync(OUT, { recursive: true });

// The identity: bond paper, ink, soft ink, a gold rule (never a
// typeface). No other colours, no gradients, no images.
const css = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root { --ink-soft: #3E5A4E; }
  body {
    width: 1200px; height: 630px; background: #F4F3EE; color: #14352A;
    font-family: Georgia, 'Times New Roman', serif;
    display: flex; flex-direction: column; padding: 64px;
    position: relative;
  }
  .rule-double { border: 0; border-top: 2px solid #14352A; margin-bottom: 3px; }
  .rule-fine { border: 0; border-top: 1px solid #14352A; }
  .wordmark {
    font-size: 15px; letter-spacing: 0.22em; font-weight: bold;
    margin-top: 22px; text-transform: uppercase;
  }
  .seal { position: absolute; top: 64px; right: 64px; }
  .accent { width: 48px; height: 3px; background: #A87F24; margin-top: auto; margin-bottom: 20px; }
  .title {
    font-size: 58px; line-height: 1.16; max-width: 820px;
    text-wrap: balance;
  }
  .eyebrow {
    font-size: 16px; letter-spacing: 0.12em; text-transform: uppercase;
    color: #3E5A4E; margin-top: 28px;
  }
`;

const html = (title) => `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head>
<body>
  <hr class="rule-double" /><hr class="rule-fine" />
  <div class="wordmark">Own the Machine</div>
  <div class="seal">${heroSeal({ size: 150, animate: false })}</div>
  <div class="accent"></div>
  <div class="title">${title}</div>
  <div class="eyebrow">OWNTHEMACHINE.EU</div>
</body></html>`;

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630 });

let count = 0;
for (const lang of LOCALES) {
  const t = dict(lang);
  for (const { slug, dictKey } of OG_PAGES) {
    const title = t[dictKey].title;
    await page.setContent(html(title), { waitUntil: 'load' });
    await page.screenshot({ path: join(OUT, ogFilename(lang, slug)) });
    count++;
  }
}
await browser.close();
console.log(`make-og: ${count} images @ ${OUT}`);
