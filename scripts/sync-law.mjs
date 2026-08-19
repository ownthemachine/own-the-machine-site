#!/usr/bin/env node
// Renders the law repo into src/generated/ as JSON the pages import.
// The site is a rendering of the law repo, never a second copy: this
// output is gitignored and rebuilt on every build. Point LAW_REPO at a
// checkout of ownthemachine/own-the-machine.
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { execSync } from 'node:child_process';
import { marked } from 'marked';

const LAW = process.env.LAW_REPO || join(process.cwd(), '..', 'own-the-machine');
if (!existsSync(join(LAW, 'regulation'))) {
  console.error(`sync-law: no law repo at ${LAW}; set LAW_REPO`);
  process.exit(1);
}
const OUT = join(process.cwd(), 'src', 'generated');
mkdirSync(OUT, { recursive: true });

marked.setOptions({ mangle: false, headerIds: false });

const read = (p) => readFileSync(join(LAW, p), 'utf8');
// Everything after the first horizontal rule is drafting notes: never
// rendered on the public site (the ledger carries the story instead).
const stripNotes = (t) => t.split(/\n---\n/)[0].trim();

let lawCommit = 'unknown';
try {
  lawCommit = execSync('git rev-parse --short HEAD', { cwd: LAW }).toString().trim();
} catch { /* fine: not a git checkout */ }

// ---- articles -------------------------------------------------------
const artDir = join(LAW, 'regulation', 'articles');
const articles = readdirSync(artDir).filter((f) => f.endsWith('.md')).sort().map((f) => {
  const raw = readFileSync(join(artDir, f), 'utf8');
  const body = stripNotes(raw);
  const m = body.match(/^# Article (\d+): (.+)$/m);
  const number = Number(m[1]);
  const title = m[2].trim();
  const text = body.replace(/^# .+$/m, '').trim();
  // Legal paragraphs ("3. The ...") must not become markdown ordered
  // lists: render each blank-line block as one anchored paragraph, with
  // lettered points on their own lines.
  const html = text.split(/\n\n+/).map((block) => {
    const pm = block.match(/^(\d+)\.\s+([\s\S]*)$/);
    const NL = String.fromCharCode(10);
    const inline = (t) => marked.parseInline(
      t.split(NL + '(').join('@@BR@@(').split(NL).join(' ')
    ).replace(/@@BR@@/g, '<br>');
    if (pm) {
      return `<p id="art-${number}-${pm[1]}"><span class="para-num">${pm[1]}.</span> ${inline(pm[2])}</p>`;
    }
    return `<p>${inline(block)}</p>`;
  }).join('\n');
  return { number, title, slug: `article-${number}`, html };
}).sort((a, b) => a.number - b.number);

// ---- recitals -------------------------------------------------------
const recBody = stripNotes(read('regulation/recitals.md'))
  .replace(/^# Recitals$/m, '').replace(/^Whereas:$/m, '').trim();
const recitals = marked.parse(recBody).replace(
  /<p>\((\d+)\)/g,
  (_, n) => `<p id="recital-${n}"><span class="para-num">(${n})</span>`
);

// ---- annexes --------------------------------------------------------
const annexDir = join(LAW, 'regulation', 'annexes');
const annexes = readdirSync(annexDir).filter((f) => f.endsWith('.md')).sort().map((f, i) => {
  const body = stripNotes(readFileSync(join(annexDir, f), 'utf8'));
  const title = body.match(/^# (.+)$/m)[1];
  return {
    numeral: ['I', 'II', 'III'][i],
    slug: basename(f, '.md'),
    title,
    html: marked.parse(body.replace(/^# .+$/m, '').trim()),
  };
});

// Mentions of repo files in prose become links to the repository, so a
// site reader lands on the real file instead of a dead relative path.
const REPO = 'https://github.com/ownthemachine/own-the-machine/blob/main';
const KNOWN = { 'EUROPE.md': 'campaign/EUROPE.md', 'GATES.md': 'campaign/GATES.md',
  'GOVERNANCE.md': 'GOVERNANCE.md', 'CONTRIBUTING.md': 'CONTRIBUTING.md' };
const linkRepoPaths = (html) => html.replace(
  new RegExp('(^|[\\s(])((?:[a-z][a-z0-9-]*/)*[A-Za-z0-9_.-]+[.]md)(?=[\\s,.)<]|$)', 'g'),
  (m, pre, path) => {
    const target = path.includes('/') ? path : (KNOWN[path] || null);
    return target ? pre + '<a href="' + REPO + '/' + target + '">' + path + '</a>' : m;
  });

// Long texts get an "On this page" contents list generated from their
// h2 headings (the EUR-Lex / ECL in-page navigation pattern).
const slug = (t) => t.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ')
  .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 60);
const withToc = (html) => {
  const toc = [];
  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (m, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    let id = slug(text) || 'section';
    while (toc.some((t) => t.id === id)) id += '-b';
    toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
};

// ---- memorandum: objections + severability --------------------------
const objections = withToc(linkRepoPaths(marked.parse(read('regulation/memorandum/counter-arguments.md'))));
const severability = withToc(linkRepoPaths(marked.parse(read('regulation/memorandum/severability.md'))));

// ---- ledger: review files with front matter -------------------------
const revDir = join(LAW, 'pipeline', 'reviews');
const ledger = readdirSync(revDir).filter((f) => f.endsWith('.md')).sort().reverse().map((f) => {
  const raw = readFileSync(join(revDir, f), 'utf8');
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n/);
  const meta = {};
  if (fm) for (const line of fm[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  const dispo = raw.match(/## Editor disposition[^\n]*\n([\s\S]*)$/);
  return {
    file: f,
    gate: meta.gate || 'unknown',
    target: meta.target || '',
    commit: meta.commit || '',
    verdict: meta.verdict || '',
    disposition: meta.disposition || '',
    date: meta.date || '',
    dispositionHtml: dispo ? marked.parse(dispo[1].trim()) : '',
  };
});

// ---- evidence -------------------------------------------------------
let evidence = { html: '', toc: [] };
try { evidence = withToc(linkRepoPaths(marked.parse(read('campaign/EUROPE.md')))); } catch { /* optional */ }

// ---- structure ------------------------------------------------------
const structure = marked.parse(stripNotes(read('regulation/STRUCTURE.md')).replace(/^# .+$/m, '').trim());

writeFileSync(join(OUT, 'law.json'), JSON.stringify({
  lawCommit,
  builtAt: new Date().toISOString(),
  articles, recitals, annexes, objections, severability, ledger, evidence, structure,
}, null, 1));
console.log(`sync-law: ${articles.length} articles, ${annexes.length} annexes, ${ledger.length} ledger entries @ ${lawCommit}`);
