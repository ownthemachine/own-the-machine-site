// Shared mapping between site paths and og-image filenames, used by both
// the build-time generator (scripts/make-og.mjs) and the layout's meta
// tags. One source of truth so the two can never drift apart.

// path: locale-stripped pathname (e.g. '/', '/law', '/law/objections')
// slug: the {slug} half of public/og/{locale}-{slug}.png
// dictKey: the dictionary section whose .title is the page title
export const OG_PAGES = [
  // Every language carries the plain home; the card shows its subtitle.
  { path: '/', slug: 'index', dictKey: 'home', plainDictKey: 'plainHome', plainTitleField: 'subtitle' },
  { path: '/law', slug: 'law', dictKey: 'lawIndex' },
  { path: '/law/registration', slug: 'law-registration', dictKey: 'registration' },
  { path: '/law/objections', slug: 'law-objections', dictKey: 'objections' },
  { path: '/law/memorandum', slug: 'law-memorandum', dictKey: 'memorandum' },
  { path: '/law/ledger', slug: 'law-ledger', dictKey: 'ledger' },
  { path: '/simulator', slug: 'simulator', dictKey: 'simulator' },
  { path: '/evidence', slug: 'evidence', dictKey: 'evidence' },
  { path: '/contribute', slug: 'contribute', dictKey: 'contribute' },
  { path: '/about', slug: 'about', dictKey: 'about' },
  { path: '/questions', slug: 'questions', dictKey: 'qa' },
  { path: '/experts', slug: 'experts', dictKey: 'experts' },
  { path: '/experts/overview', slug: 'experts-overview', dictKey: 'home' },
  { path: '/get-involved', slug: 'get-involved', dictKey: 'involved' },
];

// Locale-stripped path -> og-image slug, falling back to 'index' for any
// page without a certificate of its own (per-article pages, 404, etc).
export function ogSlugForPath(basePath) {
  const found = OG_PAGES.find((p) => p.path === basePath);
  return found ? found.slug : 'index';
}

export const ogFilename = (lang, slug) => `${lang}-${slug}.png`;
