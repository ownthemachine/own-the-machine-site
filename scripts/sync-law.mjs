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

// Staleness is per source file, not per repository. Comparing a page against
// the repo's HEAD marks every translation stale whenever anything at all is
// committed, including a review record or a campaign note, and a warning that
// fires constantly is a warning nobody reads. What a reader needs to know is
// whether the English text THIS page renders has moved since the page was
// written, so compare against the last commit that touched that file.
const sourceCommits = new Map();
const commitFor = (relPath) => {
  if (!sourceCommits.has(relPath)) {
    let c = lawCommit;
    try {
      c = execSync(`git log -1 --format=%h -- ${relPath}`, { cwd: LAW })
        .toString().trim() || lawCommit;
    } catch { /* fine: not a git checkout */ }
    sourceCommits.set(relPath, c);
  }
  return sourceCommits.get(relPath);
};

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
  return { number, title, slug: `article-${number}`, html, file: f };
}).sort((a, b) => a.number - b.number);

// ---- plain-language layers (L0/L1) per locale -----------------------
// content/{lang}/plain/article-N.md: frontmatter + "L0: ..." line + L1
// paragraph. Gated by the layer-fidelity gate before deploy. Like the
// other law-derived content below, a plain page carries its own
// source-commit and goes stale the same way: written against one
// commit of the article, silently wrong the moment the article moves on.
const plainFor = (n, sourceFile) => {
  const out = {};
  for (const loc of ['en', 'nl', 'fr', 'de', 'es']) {
    const f = join(process.cwd(), 'content', loc, 'plain', `article-${n}.md`);
    if (!existsSync(f)) continue;
    const raw = readFileSync(f, 'utf8');
    const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!m) continue;
    const meta = {};
    for (const line of m[1].split('\n')) {
      const i = line.indexOf(':');
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
    const body = m[2].trim();
    const l0m = body.match(/^L0:\s*(.+)$/m);
    const l1 = body.replace(/^L0:.*$/m, '').trim();
    // A missing source-commit must read as stale, not as current: a new
    // plain page without the field should fail loudly (banner shows) the
    // moment it ships, rather than silently claiming to be up to date.
    out[loc] = {
      l0: l0m ? l0m[1].trim() : '',
      l1: marked.parse(l1),
      stale: (meta['source-commit'] || '')
        !== commitFor(`regulation/articles/${sourceFile}`),
    };
  }
  return out;
};
for (const a of articles) a.plain = plainFor(a.number, a.file);

// ---- translated rubrics ---------------------------------------------
// content/{lang}/rubrics.md: | slug | english | rubric |. The English column
// is the drift check. A rubric that moves in the law repo must not leave a
// translation of the old heading standing, so a mismatch fails the build
// rather than shipping a heading that no longer exists upstream.
const rubricsFor = () => {
  const out = {};
  for (const loc of ['nl', 'fr', 'de', 'es']) {
    const f = join(process.cwd(), 'content', loc, 'rubrics.md');
    if (!existsSync(f)) continue;
    for (const line of readFileSync(f, 'utf8').split('\n')) {
      const cells = line.split('|').map((c) => c.trim());
      if (cells.length !== 5 || !cells[1] || cells[1] === 'slug'
          || cells[1].startsWith('---')) continue;
      const [, slug, english, rubric] = cells;
      (out[slug] ||= {})[loc] = { english, rubric };
    }
  }
  return out;
};
const rubrics = rubricsFor();
const attachRubrics = (item, englishRubric) => {
  const per = rubrics[item.slug] || {};
  item.titles = {};
  for (const [loc, { english, rubric }] of Object.entries(per)) {
    if (english !== englishRubric) {
      throw new Error(
        `rubric drift: content/${loc}/rubrics.md records ${item.slug} as\n`
        + `  "${english}"\nbut the law repo now says\n  "${englishRubric}"\n`
        + 'Update the translation, then the english column.'
      );
    }
    item.titles[loc] = rubric;
  }
};
for (const a of articles) attachRubrics(a, a.title);

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
  const item = {
    numeral: ['I', 'II', 'III'][i],
    slug: basename(f, '.md'),
    title,
    html: marked.parse(body.replace(/^# .+$/m, '').trim()),
  };
  // the annex rubric is stored without its "Annex I: " prefix, like the
  // article rubrics, so both sides of the drift check compare like with like
  attachRubrics(item, title.replace(/^Annex [IVX]+:\s*/, ''));
  return item;
});

// Mentions of repo files in prose become links to the repository, so a
// site reader lands on the real file instead of a dead relative path.
const REPO = 'https://github.com/ownthemachine/own-the-machine/blob/main';
const KNOWN = { 'EVIDENCE.md': 'evidence/EVIDENCE.md', 'GATES.md': 'campaign/GATES.md',
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
const withToc = (html, depth = 2) => {
  const toc = [];
  const seen = new Set();
  const out = html.replace(/<h([23])>([\s\S]*?)<\/h\2?[23]>/g, (m, lvl, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    let id = slug(text) || 'section';
    while (seen.has(id)) id += '-b';
    seen.add(id);
    if (lvl === '2') toc.push({ id, text, children: [] });
    else if (depth >= 3 && toc.length) toc[toc.length - 1].children.push({ id, text });
    return `<h${lvl} id="${id}">${inner}</h${lvl}>`;
  });
  return { html: out, toc };
};

// ---- localised long-form content ------------------------------------
// content/{lang}/{name}.md are gated translations with frontmatter
// (source, source-commit, status). Missing file = English fallback with
// an honesty banner; stale source-commit = an extra staleness line.
const CONTENT = join(process.cwd(), 'content');
const parseFM = (raw) => {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/);
  const meta = {};
  let body = raw;
  if (m) {
    for (const line of m[1].split('\n')) {
      const i = line.indexOf(':');
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
    body = raw.slice(m[0].length);
  }
  return { meta, body };
};
// A translated page that links to /law/versions sends its reader to the
// ENGLISH page, silently, in the middle of a Dutch sentence. Every localised
// file in this repository carried unprefixed internal links, because the
// prefix is a property of where the page is served and not of what the
// translator wrote. Rewrite at render time instead of asking four translators
// to remember it. Asset paths are not localised and are left alone.
const ASSET_PREFIXES = ['/downloads/', '/og/', '/_astro/', '/fonts/'];
const localiseLinks = (html, loc) => html.replace(
  /href="(\/[^"#]*)"/g,
  (m, path) => (
    path.startsWith(`/${loc}/`) || ASSET_PREFIXES.some((a) => path.startsWith(a))
      ? m
      : `href="/${loc}${path}"`
  ));

const loadLocalized = (name, opts = {}) => {
  const out = {};
  for (const loc of ['nl', 'fr', 'de', 'es']) {
    const f = join(CONTENT, loc, `${name}.md`);
    if (!existsSync(f)) continue;
    const { meta, body } = parseFM(readFileSync(f, 'utf8'));
    const html = localiseLinks(linkRepoPaths(marked.parse(body.trim())), loc);
    const doc = opts.toc ? withToc(html, opts.depth || 2) : { html, toc: [] };
    out[loc] = {
      ...doc,
      status: meta.status || 'machine',
      stale: opts.source
        ? (meta['source-commit'] || '') !== commitFor(opts.source)
        : false,
    };
  }
  return out;
};

// ---- memorandum: objections + severability --------------------------
const objections = {
  en: withToc(linkRepoPaths(marked.parse(read('regulation/memorandum/counter-arguments.md'))), 3),
  ...loadLocalized('objections', { toc: true, depth: 3, source: 'regulation/memorandum/counter-arguments.md' }),
};
const severability = {
  en: withToc(linkRepoPaths(marked.parse(read('regulation/memorandum/severability.md')))),
  ...loadLocalized('severability', { toc: true, source: 'regulation/memorandum/severability.md' }),
};
const explanatory = {
  en: withToc(linkRepoPaths(marked.parse(read('regulation/memorandum/explanatory-memorandum.md'))), 3),
  ...loadLocalized('explanatory', { toc: true, depth: 3, source: 'regulation/memorandum/explanatory-memorandum.md' }),
};

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
let evidence = { en: { html: '', toc: [] } };
try {
  evidence = {
    en: withToc(linkRepoPaths(marked.parse(read('evidence/EVIDENCE.md').replace(/^# .+\n/, '')))),
    ...loadLocalized('evidence', { toc: true, source: 'evidence/EVIDENCE.md' }),
  };
} catch (e) { console.error('sync-law: WARNING, evidence source missing, page will be empty:', e.message); }

// ---- about + contribute (site-native content) -----------------------
const siteDoc = (name) => ({
  en: { html: marked.parse(readFileSync(join(CONTENT, 'en', `${name}.md`), 'utf8')) },
  ...loadLocalized(name),
});
const about = siteDoc('about');
const contribute = siteDoc('contribute');
const versions = siteDoc('versions');
const joinDoc = siteDoc('join');
const brief = siteDoc('brief');
const faq = siteDoc('faq');
const press = siteDoc('press');
const sign = siteDoc('sign');

// ---- registered version state ---------------------------------------
// Whether a version of this draft has been filed and registered is a fact
// about the world, not a fact about this build, so it is read from the law
// repo instead of being asserted in a page. A missing or null entry means
// nothing is registered, which is both the honest default and the current
// truth. Everything downstream keys off this: the versions page reports it,
// and the draft notice on the law pages only appears once it is non-null,
// because before registration there is no second text to distinguish from.
let registered = null;
try {
  const parsed = JSON.parse(read('versions/REGISTERED.json'));
  registered = parsed.registered || null;
} catch (e) {
  console.error('sync-law: no versions/REGISTERED.json, treating as unregistered');
}

// ---- structure ------------------------------------------------------
const structure = marked.parse(stripNotes(read('regulation/STRUCTURE.md')).replace(/^# .+$/m, '').trim());

writeFileSync(join(OUT, 'law.json'), JSON.stringify({
  lawCommit,
  builtAt: new Date().toISOString(),
  articles, recitals, annexes, objections, severability, ledger, evidence, about, contribute, structure,
  versions, join: joinDoc, brief, faq, press, sign, explanatory, registered,
}, null, 1));
console.log(`sync-law: ${articles.length} articles, ${annexes.length} annexes, ${ledger.length} ledger entries @ ${lawCommit}`);
console.log(`sync-law: registered version: ${registered ? registered.number : 'none'}`);
