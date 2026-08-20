// Accessibility audit: axe-core (via puppeteer) against every page, every locale.
// Modelled on scripts/shoot-all.mjs (self-contained static server, no external setup).
// Checks WCAG 2.1 AA (+ WCAG 2.2 focus-appearance/target-size best-effort via wcag22aa tag).
//
// Usage: node scripts/a11y.mjs
// Exit code: non-zero if any critical or serious violations were found (build-gate friendly).
import puppeteer from 'puppeteer';
import { AxePuppeteer } from '@axe-core/puppeteer';
import { createServer } from 'node:http';
import { readFileSync, mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

let ROOT = join(REPO_ROOT, 'dist');
let AUDITED_DIR = 'dist';
if (!existsSync(ROOT)) {
  console.log('.vercel/output/static not found — building via sync-law + astro build...');
  execSync('node scripts/sync-law.mjs && npx astro build', { cwd: REPO_ROOT, stdio: 'inherit' });
  ROOT = join(REPO_ROOT, 'dist');
  AUDITED_DIR = 'dist';
}

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png',
  '.pdf': 'application/pdf', '.epub': 'application/epub+zip' };
const server = createServer((req, res) => {
  try {
    const path = decodeURIComponent(req.url.split('?')[0]);
    const file = join(ROOT, path);
    const body = readFileSync(file);
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch { res.writeHead(404); res.end('nope'); }
});
const PORT = 4600;
await new Promise((r) => server.listen(PORT, r));

// Page list, root-relative slugs (without locale prefix, without .html).
const PAGES = ['index', 'law', 'law/recitals', 'law/article-5', 'law/objections',
  'law/memorandum', 'law/ledger', 'simulator', 'evidence', 'contribute', 'about'];
const LOCALES = ['en', 'nl', 'fr', 'de', 'es'];
const TAGS = ['wcag2a', 'wcag21aa', 'wcag22aa', 'best-practice'];

function urlFor(locale, page) {
  if (locale === 'en') return `${page}.html`;
  // Non-en index page is built as {locale}.html, not {locale}/index.html.
  if (page === 'index') return `${locale}.html`;
  return `${locale}/${page}.html`;
}

const targets = [];
for (const locale of LOCALES) {
  for (const page of PAGES) targets.push({ locale, page, url: urlFor(locale, page) });
}
targets.push({ locale: 'en', page: '404', url: '404.html' });

const browser = await puppeteer.launch();
const page = await browser.newPage();

const results = []; // { locale, page, url, violationsByImpact, violations }
for (const t of targets) {
  const fileOnDisk = join(ROOT, t.url);
  if (!existsSync(fileOnDisk)) {
    console.log(`SKIP  ${t.url} (not found in ${AUDITED_DIR})`);
    continue;
  }
  await page.goto(`http://127.0.0.1:${PORT}/${t.url}`, { waitUntil: 'networkidle0' });
  const axeResults = await new AxePuppeteer(page).withTags(TAGS).analyze();
  const byImpact = { critical: 0, serious: 0, moderate: 0, minor: 0 };
  for (const v of axeResults.violations) byImpact[v.impact || 'minor']++;
  const total = axeResults.violations.length;
  console.log(
    `${total === 0 ? 'PASS' : 'FAIL'}  ${t.url}  ` +
    `(critical:${byImpact.critical} serious:${byImpact.serious} moderate:${byImpact.moderate} minor:${byImpact.minor})`
  );
  results.push({ locale: t.locale, page: t.page, url: t.url, byImpact, violations: axeResults.violations });
}

await browser.close();
server.close();

// --- Aggregate: dedupe by rule id + selector "pattern" (selector with locale-prefix stripped) ---
function normaliseSelector(sel) {
  // Collapse nth-child / index-ish noise so identical structural issues across pages group together.
  return sel.replace(/:nth-child\(\d+\)/g, ':nth-child(n)').replace(/\[\d+\]/g, '[n]');
}

const dedup = new Map(); // key: ruleId + '|' + normalisedSelectorPattern
for (const r of results) {
  for (const v of r.violations) {
    for (const node of v.nodes) {
      const selector = node.target.join(' ');
      const pattern = normaliseSelector(selector);
      const key = `${v.id}|${pattern}`;
      if (!dedup.has(key)) {
        dedup.set(key, {
          id: v.id,
          impact: v.impact || 'minor',
          help: v.help,
          helpUrl: v.helpUrl,
          selectorPattern: pattern,
          exampleSelector: selector,
          exampleHtml: node.html,
          pages: new Set(),
        });
      }
      dedup.get(key).pages.add(r.url);
    }
  }
}

const IMPACT_ORDER = { critical: 0, serious: 1, moderate: 2, minor: 3 };
const SUGGESTED_FIXES = {
  'color-contrast': 'Increase foreground/background contrast to at least 4.5:1 (3:1 for large text).',
  'image-alt': 'Add a descriptive alt attribute (or alt="" if the image is purely decorative).',
  'link-name': 'Give the link accessible text (visible text, aria-label, or aria-labelledby).',
  'button-name': 'Give the button accessible text (visible text, aria-label, or aria-labelledby).',
  'label': 'Associate a <label> with the form control via for/id or wrap the input in the label.',
  'html-has-lang': 'Set a valid lang attribute on the <html> element.',
  'landmark-one-main': 'Wrap the primary content in a single <main> landmark.',
  'region': 'Ensure all content is contained within a landmark region (header/nav/main/footer).',
  'heading-order': 'Fix heading levels so they increase by one and do not skip levels.',
  'target-size': 'Ensure interactive targets are at least 24x24 CSS px (WCAG 2.2 2.5.8).',
  'focus-order-semantics': 'Ensure focusable elements are semantically correct and reachable in order.',
  'aria-allowed-attr': 'Remove ARIA attributes not allowed on this role, or fix the role.',
  'aria-required-attr': 'Add the ARIA attributes required by this role.',
  'duplicate-id': 'Make id values unique across the document.',
  'list': 'Ensure <ul>/<ol> only contain <li> children (no other elements between them).',
  'meta-viewport': 'Remove user-scalable=no / maximum-scale restrictions from the viewport meta tag.',
};
function suggestFix(id, help) {
  return SUGGESTED_FIXES[id] || `Review: ${help}`;
}

const distinctViolations = [...dedup.values()].sort((a, b) => {
  const impactDiff = IMPACT_ORDER[a.impact] - IMPACT_ORDER[b.impact];
  if (impactDiff !== 0) return impactDiff;
  return b.pages.size - a.pages.size;
});

// --- Summary numbers ---
const totalsByImpact = { critical: 0, serious: 0, moderate: 0, minor: 0 };
let totalViolationInstances = 0;
for (const r of results) {
  for (const k of Object.keys(totalsByImpact)) totalsByImpact[k] += r.byImpact[k];
  totalViolationInstances += Object.values(r.byImpact).reduce((a, b) => a + b, 0);
}

console.log('\n=== SUMMARY ===');
console.log(`Audited output: ${AUDITED_DIR}`);
console.log(`Pages audited: ${results.length}`);
console.log(`Violation instances (page x rule occurrences): ${totalViolationInstances}`);
console.log(`By impact — critical: ${totalsByImpact.critical}, serious: ${totalsByImpact.serious}, ` +
  `moderate: ${totalsByImpact.moderate}, minor: ${totalsByImpact.minor}`);
console.log(`Distinct violations (rule + selector pattern): ${distinctViolations.length}`);

// --- Write JSON report ---
const jsonReport = {
  generatedAt: new Date().toISOString(),
  auditedOutput: AUDITED_DIR,
  axeCoreVersion: (() => {
    try {
      return JSON.parse(readFileSync(join(REPO_ROOT, 'node_modules/axe-core/package.json'), 'utf8')).version;
    } catch { return 'unknown'; }
  })(),
  tags: TAGS,
  pagesAudited: results.length,
  totalsByImpact,
  totalViolationInstances,
  pages: results.map((r) => ({
    locale: r.locale, page: r.page, url: r.url, byImpact: r.byImpact,
    violations: r.violations.map((v) => ({
      id: v.id, impact: v.impact, help: v.help, helpUrl: v.helpUrl,
      nodes: v.nodes.map((n) => ({ target: n.target, html: n.html })),
    })),
  })),
  distinctViolations: distinctViolations.map((d) => ({
    id: d.id, impact: d.impact, help: d.help, helpUrl: d.helpUrl,
    affectedPages: [...d.pages].sort(),
    affectedPageCount: d.pages.size,
    exampleSelector: d.exampleSelector,
    exampleHtml: d.exampleHtml,
    suggestedFix: suggestFix(d.id, d.help),
  })),
};
writeFileSync(join(REPO_ROOT, 'a11y-report.json'), JSON.stringify(jsonReport, null, 2));

// --- Write Markdown report ---
const md = [];
md.push('# Accessibility audit report');
md.push('');
md.push(`Generated: ${jsonReport.generatedAt}`);
md.push(`Audited output: \`${AUDITED_DIR}\``);
md.push(`axe-core version: ${jsonReport.axeCoreVersion}`);
md.push(`Tags checked: ${TAGS.join(', ')}`);
md.push(`Pages audited: ${results.length}`);
md.push('');
md.push('## Summary');
md.push('');
md.push('| Impact | Count |');
md.push('| --- | --- |');
md.push(`| critical | ${totalsByImpact.critical} |`);
md.push(`| serious | ${totalsByImpact.serious} |`);
md.push(`| moderate | ${totalsByImpact.moderate} |`);
md.push(`| minor | ${totalsByImpact.minor} |`);
md.push('');
md.push(`Distinct violations (deduped by rule id + selector pattern): ${distinctViolations.length}`);
md.push('');
md.push('## Distinct violations');
md.push('');
for (const d of distinctViolations) {
  md.push(`### ${d.id} — ${d.impact}`);
  md.push('');
  md.push(`${d.help} ([more info](${d.helpUrl}))`);
  md.push('');
  md.push(`- Affected pages: ${d.pages.size}`);
  md.push(`- Example selector: \`${d.exampleSelector}\``);
  md.push('- Example HTML:');
  md.push('  ```html');
  md.push(`  ${d.exampleHtml}`);
  md.push('  ```');
  md.push(`- Suggested fix: ${suggestFix(d.id, d.help)}`);
  md.push('');
}
writeFileSync(join(REPO_ROOT, 'a11y-report.md'), md.join('\n'));

console.log('\nWrote a11y-report.json and a11y-report.md');

const failed = totalsByImpact.critical > 0 || totalsByImpact.serious > 0;
process.exit(failed ? 1 : 0);
