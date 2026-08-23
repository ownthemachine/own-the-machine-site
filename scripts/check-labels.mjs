// Do the nav and footer labels use the words the pages themselves use?
//
// The footer sitemap added on 23 August introduced thirty-five short labels
// written as a set, without checking them against terminology already
// gate-reviewed in the pages they point at. Two were inventions: the Dutch
// footer said "Scheidbaarheid" where the page says "Deelbaarheid", and the
// German said "Trennbarkeit" where the page says "Teilbarkeit". Neither word
// appeared anywhere in the page it labelled.
//
// This is the defect class the translation gates keep finding and no
// structural check can see: counts match, links resolve, and the vocabulary
// silently forks between the chrome and the content. A reader who clicks
// "Scheidbaarheid" and lands on a page headed "Deelbaarheid" has been given
// two names for one thing by a project whose whole argument is precision.
//
// The rule: a label's longest word must appear in the page's own title or
// body. Deliberate exceptions are listed, with reasons, and nowhere else.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const LOCALES = ['en', 'nl', 'fr', 'de', 'es'];

// chrome key -> { section: dictionary section holding the page title,
//                 content: content file basename, why: exception reason }
const LABELS = {
  law:          { section: 'lawIndex' },
  objections:   { section: 'objections', content: 'objections' },
  faq:          { section: 'faq', content: 'faq' },
  join:         { section: 'join', content: 'join' },
  explanatory:  { section: 'explanatory' },
  severability: { section: 'memorandum', content: 'severability' },
  versions:     { section: 'versions', content: 'versions' },
  brief:        { section: 'brief', content: 'brief' },
  sign:         { section: 'sign', content: 'sign' },
  press:        { section: 'press', content: 'press' },
  contribute:   { section: 'contribute', content: 'contribute' },
  evidence:     { section: 'evidence', content: 'evidence' },
  ledger:       { section: 'ledger' },
  about:        { section: 'about', content: 'about' },
};

// Exceptions, each with the reason it is one. A short UI word is allowed to
// differ from an editorial page title; an invented synonym is not.
// An entry may exempt every locale, or name the locales it exempts. The `law`
// case is why the distinction exists: English "law" is generic and covers a
// draft regulation, while wet, loi, Gesetz and ley denote a national statute
// specifically, so those four must use the instrument type and are checked.
const ALLOWED = {
  simulator: { why: 'the control is named for what it is; the page title is editorial' },
  faq: { locales: ['en'], why: 'FAQ is a recognised English abbreviation; the other four use conventional full forms and are checked' },
  recitals: { why: 'no page title of its own; titled from the law' },
  law: { locales: ['en'], why: 'English "law" is generic; the other four locales name the instrument and are checked' },
};

const dict = (loc) => readFileSync(join(ROOT, 'src', 'i18n', `${loc}.mjs`), 'utf8');
const unesc = (s) => s.replace(/\\'/g, "'").replace(/\\u2019/g, '’');

function chromeLabels(loc) {
  const m = dict(loc).match(/ {2}chrome: \{([\s\S]*?)\n {2}\},/);
  const out = {};
  for (const [, k, v] of m[1].matchAll(/(\w+):\s*'((?:[^'\\]|\\.)*)'/g)) out[k] = unesc(v);
  return out;
}

function sectionTitle(loc, section) {
  const m = dict(loc).match(new RegExp(` {2}${section}: \\{([\\s\\S]*?)\\n {2}\\},`));
  if (!m) return null;
  const t = m[1].match(/title:\s*'((?:[^'\\]|\\.)*)'/);
  return t ? unesc(t[1]) : null;
}

// Articles and prepositions carry no terminology, and letting one satisfy the
// match is how "De wet" slipped through against a page titled "De
// ontwerpverordening": the article matched and the wrong noun was never
// tested. Found by putting the original defects back after the rule was
// loosened, which is the only way to know a loosening did not gut the check.
const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'of', 'in', 'for', 'on', 'to',
  'de', 'het', 'een', 'en', 'van', 'over', 'bij',
  'le', 'la', 'les', 'des', 'du', 'et', 'une', 'un', 'aux',
  'der', 'die', 'das', 'und', 'fur', 'auf', 'uber', 'ein', 'einen', 'im',
  'el', 'los', 'las', 'y', 'sobre', 'del', 'al',
]);

const norm = (s) => s.toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N} ]/gu, '');
const stem = (w) => { const c = norm(w).replace(/ /g, ''); return c.length > 6 ? c.slice(0, 6) : c; };

const problems = [];
for (const loc of LOCALES) {
  const labels = chromeLabels(loc);
  for (const [key, spec] of Object.entries(LABELS)) {
    const exempt = ALLOWED[key];
    if (exempt && (!exempt.locales || exempt.locales.includes(loc))) continue;
    const label = labels[key];
    if (!label) { problems.push(`${loc}: chrome.${key} is missing`); continue; }
    const title = sectionTitle(loc, spec.section);
    const f = spec.content && join(ROOT, 'content', loc, `${spec.content}.md`);
    const body = f && existsSync(f) ? readFileSync(f, 'utf8') : null;
    if (title === null && body === null) continue;
    // Any content word of the label must appear. Taking only the longest word
    // picked the qualifier over the head noun and flagged "Questions
    // fréquentes" against a page full of questions; requiring every word
    // would forbid a short label from ever differing from a long title.
    // Words under four characters are articles and prepositions and carry
    // no terminology.
    const words = label.split(/\s+/).filter((w) => !STOPWORDS.has(norm(w)));
    const check = words.length ? words : label.split(/\s+/);
    const flat = (s) => norm(s).replace(/ /g, '');
    const hit = check.some((w) => (title && flat(title).includes(stem(w)))
                               || (body && flat(body).includes(stem(w))));
    if (!hit) {
      problems.push(`${loc}: chrome.${key} = "${label}" uses ${check.map((w) => `"${w}"`).join(', ')}, `
        + `none of which appears in the page title (${title ?? 'none'}) or the page text`);
    }
  }
}

if (problems.length) {
  console.error(`check-labels: ${problems.length} label(s) not grounded in the page they point at:`);
  for (const p of problems) console.error('  ' + p);
  console.error('\nEither use the page\'s own word, or add a reasoned exception to ALLOWED.');
  process.exit(1);
}
console.log('check-labels: every nav and footer label uses its page\'s own vocabulary');
