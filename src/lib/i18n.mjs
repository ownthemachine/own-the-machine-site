// The i18n spine. English is the source of truth; every dictionary is
// reviewed against it by the translation gate (translations/reviews/).
import en from '../i18n/en.mjs';
import nl from '../i18n/nl.mjs';
import fr from '../i18n/fr.mjs';
import de from '../i18n/de.mjs';
import es from '../i18n/es.mjs';

export const DICTS = { en, nl, fr, de, es };
export const LOCALES = Object.keys(DICTS);
export const EXTRA_LOCALES = LOCALES.filter((l) => l !== 'en');

export const dict = (lang) => DICTS[lang] || DICTS.en;

// %VAR% substitution for strings that carry links or numbers.
export const fmt = (s, vars = {}) =>
  Object.entries(vars).reduce((acc, [k, v]) => acc.split(`%${k}%`).join(v), s);

// Locale-prefixed hrefs: EN lives at the root, everything else under /xx.
export const href = (lang, path) => (lang === 'en' ? path : `/${lang}${path}`);

// Per-page translation status drives the honesty banner:
//   'localised'  -> page copy translated and gate-reviewed, no banner
//   'law-en'     -> legal text stays English by design, lawEnglish banner
//   'en-only'    -> body not yet translated, enOnly banner above EN text
export const STATUS = {
  home: 'localised',
  lawIndex: 'localised',
  lawDoc: 'law-en',
  objections: 'en-only',
  memorandum: 'en-only',
  ledger: 'en-only',
  simulator: 'localised',
  evidence: 'en-only',
  contribute: 'en-only',
  about: 'en-only',
};
