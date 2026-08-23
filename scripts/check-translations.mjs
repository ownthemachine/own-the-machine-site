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
  explanatory: 'regulation/memorandum/explanatory-memorandum.md',
  evidence: 'evidence/EVIDENCE.md',
};

// The site-native pages keep their English source in this repository rather
// than in the law repo, and were outside this check entirely. That is how the
// funding disclosure could be rewritten in English on 21 August 2026 and left
// saying something materially different in four other languages: the checker
// was only ever pointed at the law-derived pages, so nothing looked.
const SITE_PAGES = {
  about: 'content/en/about.md',
  contribute: 'content/en/contribute.md',
  versions: 'content/en/versions.md',
  join: 'content/en/join.md',
  brief: 'content/en/brief.md',
  faq: 'content/en/faq.md',
  press: 'content/en/press.md',
  sign: 'content/en/sign.md',
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

const SOURCES = [
  ...Object.entries(PAGES).map(([page, s]) => [page, join(LAW, s)]),
  ...Object.entries(SITE_PAGES).map(([page, s]) => [page, join(process.cwd(), s)]),
];

for (const [page, srcPath] of SOURCES) {
  if (!existsSync(srcPath)) {
    console.error(`check-translations: missing source ${srcPath}`);
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

// ---- table integrity ------------------------------------------------
// The DC-row count above passed while the German and Spanish tables did not
// render at all: a re-wrapping script had split the header row across two
// lines, so every DC row was still present and countable and the browser saw
// a paragraph of pipes. Counting rows is not the same as having a table. A
// markdown table line is malformed if it opens with a pipe and does not carry
// at least two more, which is exactly what a split row looks like.
const badRows = [];
for (const loc of ['en', ...LOCALES]) {
  const dir = join(CONTENT, loc);
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.md'))) {
    const raw = readFileSync(join(dir, f), 'utf8');
    raw.split('\n').forEach((line, i) => {
      const s = line.trim();
      if (s.startsWith('|') && (s.match(/\|/g) || []).length < 3) {
        badRows.push(`${loc}/${f}:${i + 1}: ${s.slice(0, 50)}`);
      }
    });
  }
}
if (badRows.length) {
  problems += badRows.length;
  console.error(`tables        ${badRows.length} malformed table line(s), which means a `
    + `row was split and the table will not render:`);
  for (const b of badRows) console.error(`  ${b}`);
} else {
  console.log('tables         every markdown table row is well formed');
}

// ---- link integrity -------------------------------------------------
// These files are hard-wrapped at 76 columns. A wrap that lands inside a
// markdown link target silently produces a dead link: the page still builds,
// the text still reads correctly, and the anchor points at a URL containing a
// newline. It happened to all four translations of the versions page in one
// pass on 21 August 2026, introduced by a re-wrapping script and caught by a
// translation reviewer rather than by anything here. A URL never legitimately
// contains whitespace, so this is cheap and exact.
const badLinks = [];
for (const loc of ['en', ...LOCALES]) {
  const dir = join(CONTENT, loc);
  if (!existsSync(dir)) continue;
  const files = readdirSync(dir).filter((f) => f.endsWith('.md'));
  for (const f of files) {
    const raw = readFileSync(join(dir, f), 'utf8');
    for (const m of raw.matchAll(/\]\(([^)]*)\)/g)) {
      if (/\s/.test(m[1])) badLinks.push(`${loc}/${f}: ${m[1].slice(0, 60)}`);
    }
  }
}
console.log('');
if (badLinks.length) {
  problems += badLinks.length;
  console.error(`links         ${badLinks.length} link target(s) contain whitespace, `
    + `which means a line wrap landed inside a URL:`);
  for (const b of badLinks) console.error(`  ${b}`);
} else {
  console.log('links          every markdown link target is intact');
}

// Rubrics. A missing rubric falls back to the English heading, which renders
// perfectly and says nothing, so it would never be noticed by looking at the
// page. Absence has to be an error here or it is invisible everywhere else.
const law = JSON.parse(
  readFileSync(join(process.cwd(), 'src/generated/law.json'), 'utf8'));
const rubricGaps = [];
for (const item of [...law.articles, ...law.annexes]) {
  for (const loc of LOCALES) {
    if (!item.titles || !item.titles[loc]) rubricGaps.push(`${loc}: ${item.slug}`);
  }
}
console.log('');
if (rubricGaps.length) {
  problems += rubricGaps.length;
  console.error(`rubrics       ${rubricGaps.length} article/annex heading(s) with no `
    + `translation, which would silently render in English:`);
  for (const g of rubricGaps.slice(0, 12)) console.error(`  ${g}`);
} else {
  console.log(`rubrics        all ${law.articles.length + law.annexes.length} `
    + `article and annex headings translated in every locale`);
}

if (problems) {
  console.error(`\ncheck-translations: ${problems} page(s) structurally adrift `
    + `from the English. A missing heading or DC row means a passage was never `
    + `translated, not that the wording differs.`);
  process.exit(1);
}
console.log('\ncheck-translations: all translated pages match their source structurally');
