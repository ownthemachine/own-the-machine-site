// Structural completeness check for the translated law-derived pages.
//
// The translations are maintained by carrying changes across as they land in
// the English. That method loses whole passages: a paragraph added to the
// source and not flagged never gets translated, and nothing notices. It has
// happened at least twice, once losing an entire status-section paragraph from
// all four languages and once losing three passages of case law from the
// severability page.
//
// A fidelity review cannot catch this, because it is shown the passages that
// exist and has no way to know what is absent. So compare structure instead:
// headings, table rows and paragraph counts are cheap to count and a missing
// passage moves at least one of them.
//
// This is a warning system, not a formatter. Prose legitimately differs in
// paragraphing between languages, so paragraph counts are compared against a
// tolerance and headings and table rows are compared exactly.
//
// What it catches, tested against the real defects of 21 August 2026: the four
// case citations missing from every severability translation, and the DC-40
// passage missing from all four objections translations plus DC-34 missing
// from the German. What it does NOT catch: a dropped sentence carrying no
// identifier, no case number and no percentage, such as "This is the
// succession logic of merger control rather than an invention", which was also
// missing from all four and was found only by reading the documents side by
// side. Passing this check means no signal was lost. It does not mean the
// translation is complete, and it is not a substitute for the side-by-side
// read before a release that matters.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const LAW = process.env.LAW_REPO
  || join(process.cwd(), '..', 'own-the-machine');
const CONTENT = join(process.cwd(), 'content');
const LOCALES = ['nl', 'fr', 'de', 'es'];

// page name -> the English file in the law repo that it renders
const PAGES = {
  objections: 'regulation/memorandum/counter-arguments.md',
  severability: 'regulation/memorandum/severability.md',
  evidence: 'evidence/EVIDENCE.md',
};

const PARA_TOLERANCE = 0.12; // 12 %, for legitimate paragraphing differences

const stripFrontMatter = (t) =>
  t.startsWith('---') ? t.replace(/^---\n[\s\S]*?\n---\n/, '') : t;

// Note: unlike the article files, these three documents are rendered whole by
// sync-law.mjs. Their "---" lines are section separators, not the start of a
// drafting-notes block, so nothing is stripped from the body here. Cutting at
// the first one silently truncated every document to its first section and
// made this check pass while comparing almost nothing.
const shape = (raw) => {
  const t = stripFrontMatter(raw);
  const headings = (t.match(/^#{2,4} .+$/gm) || []).length;
  const dcRows = (t.match(/^\| DC-\d+/gm) || []).length;
  const paras = t
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter((b) => b && !b.startsWith('#') && !b.startsWith('|')).length;
  // Citations are the sharp instrument here. A case number is identical in
  // every language, so a dropped sentence almost always shows up as a missing
  // one, and paragraph counts cannot see a sentence that went missing inside a
  // paragraph that survived. This is how three passages of case law were lost
  // from the severability translations without any count changing.
  const cites = (t.match(/\b[CT]-\d+\/\d+\b/g) || []).sort();
  // Headings, rows, paragraphs and case numbers all matched on the objections
  // page while four languages were each missing several sentences, including
  // three of the source-taxation honesty passage. Two further language-invariant
  // signals caught what those missed, so they are counted here too: how often
  // each DC identifier is referred to in the prose, and how many percentage
  // figures appear. A dropped sentence usually takes one or the other with it.
  const dcRefs = (t.match(/\bDC-\d+\b/g) || []).sort();
  const pcts = (t.match(/\d+(?:[.,]\d+)?\s*%/g) || []).length;
  return { headings, dcRows, paras, cites, dcRefs, pcts };
};

const missingFrom = (want, have) => {
  const pool = [...have];
  const gone = [];
  for (const c of want) {
    const i = pool.indexOf(c);
    if (i === -1) gone.push(c);
    else pool.splice(i, 1);
  }
  return gone;
};

let problems = 0;
const rows = [];

for (const [page, source] of Object.entries(PAGES)) {
  const srcPath = join(LAW, source);
  if (!existsSync(srcPath)) {
    console.error(`check-translations: missing source ${source}`);
    problems++;
    continue;
  }
  const en = shape(readFileSync(srcPath, 'utf8'));
  for (const loc of LOCALES) {
    const f = join(CONTENT, loc, `${page}.md`);
    if (!existsSync(f)) continue;
    const tr = shape(readFileSync(f, 'utf8'));
    const issues = [];
    const notes = [];
    if (tr.headings !== en.headings) {
      issues.push(`headings ${tr.headings} vs ${en.headings}`);
    }
    if (tr.dcRows !== en.dcRows) {
      issues.push(`DC rows ${tr.dcRows} vs ${en.dcRows}`);
    }
    const drift = Math.abs(tr.paras - en.paras) / Math.max(en.paras, 1);
    if (drift > PARA_TOLERANCE) {
      issues.push(`paragraphs ${tr.paras} vs ${en.paras}`);
    } else if (tr.paras !== en.paras) {
      // Below tolerance is not the same as fine. A 14-against-15 slipped
      // through here once and it was a whole paragraph of the English that
      // had never been translated, so any difference is now shown even when
      // it does not fail the check.
      notes.push(`paragraphs ${tr.paras} vs ${en.paras}`);
    }
    const lost = missingFrom(en.cites, tr.cites);
    const extra = missingFrom(tr.cites, en.cites);
    if (lost.length) issues.push(`citations absent: ${lost.join(', ')}`);
    if (extra.length) issues.push(`citations not in source: ${extra.join(', ')}`);
    const lostDc = missingFrom(en.dcRefs, tr.dcRefs);
    if (lostDc.length) {
      issues.push(`DC references absent: ${[...new Set(lostDc)].join(', ')}`);
    }
    if (tr.pcts !== en.pcts) {
      issues.push(`percentage figures ${tr.pcts} vs ${en.pcts}`);
    }
    rows.push({ page, loc, ...tr, issues, notes });
    if (issues.length) problems++;
  }
  rows.push({ page, loc: 'en', ...en, issues: [] });
}

for (const r of rows) {
  const tag = r.issues.length ? `PROBLEM: ${r.issues.join('; ')}`
    : (r.notes && r.notes.length ? `ok, but ${r.notes.join('; ')}` : 'ok');
  console.log(
    `${r.page.padEnd(14)} ${r.loc}  headings=${String(r.headings).padStart(3)}`
    + `  dc=${String(r.dcRows).padStart(3)}  paras=${String(r.paras).padStart(4)}`
    + `  cites=${String(r.cites.length).padStart(3)}  ${tag}`
  );
}

// ---- plain-language layer -------------------------------------------
// These carry a source-commit naming the article version they were written
// against, and go stale per article. A stale plain page is not a failure: the
// banner tells the reader the article governs, which is honest. What IS worth
// saying out loud at deploy time is how many pages are in that state, because
// "a few" is a work queue and "all of them in four languages" is a decision
// nobody made on purpose.
import { execSync } from 'node:child_process';
import { readdirSync } from 'node:fs';

const artDir = join(LAW, 'regulation', 'articles');
const blame = {};
for (const f of readdirSync(artDir).filter((f) => f.endsWith('.md'))) {
  const n = Number(f.split('-')[0]);
  try {
    blame[n] = execSync(`git log -1 --format=%h -- regulation/articles/${f}`,
      { cwd: LAW }).toString().trim();
  } catch { blame[n] = null; }
}
const plainStale = {};
for (const loc of ['en', ...LOCALES]) {
  const d = join(CONTENT, loc, 'plain');
  if (!existsSync(d)) continue;
  plainStale[loc] = [];
  for (const f of readdirSync(d).filter((f) => f.endsWith('.md'))) {
    const n = Number(f.replace('article-', '').replace('.md', ''));
    const raw = readFileSync(join(d, f), 'utf8');
    const m = raw.match(/^source-commit:\s*(\S+)/m);
    if (!m || m[1] !== blame[n]) plainStale[loc].push(n);
  }
}
console.log('');
for (const [loc, list] of Object.entries(plainStale)) {
  console.log(`plain          ${loc}  ${list.length
    ? `${list.length} page(s) stale, shown with a banner: ${list.sort((a, b) => a - b).join(', ')}`
    : 'all current'}`);
}

if (problems) {
  console.error(`\ncheck-translations: ${problems} page(s) structurally adrift `
    + `from the English. A missing heading or DC row means a passage was never `
    + `translated, not that the wording differs.`);
  process.exit(1);
}
console.log('\ncheck-translations: all translated pages match their source structurally');
