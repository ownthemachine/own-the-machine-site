# ownthemachine.eu: product requirements (v2)

Supersedes the Gate 0 PRD of 18 August, which deliberately deferred the
design language. This version carries the full identity, the layered
plain-language reading system and the multilingual architecture. The
earlier decisions stand unchanged: the site is a junction never a
database, the sceptic is a first-class persona, the ledger is the story,
zero third-party requests.

## 1. What the site is

The public face of an open-source draft EU Regulation. Three jobs, in
order:

1. **Make the law readable.** The full draft, its memorandum and its
   counter-arguments, navigable to the paragraph, in the reader's
   language, at three depths (one line, plain language, legal text).
2. **Make the stakes personal.** The dividend simulator: what would this
   mean for me, honestly, with every uncertainty labelled.
3. **Route action outward.** To COCS when an ECI is live, to GitHub for
   contributors, to the organiser kit for partners.

What it is not: a petition platform, a data collector, a newsletter
engine or a funnel to the book.

## 2. Who it serves

| Persona | Arrives via | Must find within one screen |
|---|---|---|
| Curious citizen | social card, press | the ask in one sentence, the simulator, sign (when live) |
| Journalist | press kit, search | the memorandum, the counter-arguments, the ledger, a contact |
| MEP staffer / policy analyst | Brussels channels | the full legal text, article-numbered, citable |
| Potential organiser | distribution phase | the gates, the kit, who is behind this |
| Developer | HN, GitHub | the repo, GOVERNANCE.md, how to open a PR |
| Sceptic | argument threads | objections at full strength, and the ledger showing findings acted on |

The sceptic is a first-class persona. The counter-arguments page sits in
the primary navigation. That is the differentiator and the credibility
strategy.

## 3. Identity: the citizen's certificate

### 3.1 The concept

The campaign's visual language is drawn from the one tradition in which
Europeans have always seen ownership made visible: the engraved
certificate. Share certificates, bonds and banknotes carry guilloche,
the interlaced ornament produced by an engine-turning lathe. It is
ornament made by a machine, and for two centuries it has meant exactly
one thing: this document certifies that you own something.

That is the campaign in a single image. The machine's own signature
pattern becomes the citizen's seal of ownership. Every page of the site
is a page of the certificate; the proposition "you hold a share" is not
illustrated, it is typeset.

This identity is the campaign's own, not the book's. Related by craft
discipline (one accent used as a mark, a generated-image pipeline,
palette rules written down), unmistakably different in every token.

### 3.2 The Seal (signature element)

A parametric guilloche rosette, generated in code (hypotrochoid curves,
inline SVG, under 3 KB), never a raster asset. Three applications:

- **Hero**: one rosette draws itself once on the landing page, about two
  seconds, then rests. With `prefers-reduced-motion`: rendered complete,
  no animation. This is the site's single orchestrated motion moment;
  nothing else on the site animates beyond hover states.
- **Ledger micro-seals**: every entry in /law/ledger carries a small
  rosette whose curve parameters derive deterministically from the git
  commit hash. Each amendment of the law gets its own machine-engraved
  seal: the machinery stays under the hood, its signature sits on the
  page. Two entries never wear the same seal.
- **The certificate card**: the simulator's share card and all social
  og-images carry the full seal plus the certificate frame (double rule,
  fine inner line).

The Seal generator lives in the site repo under `viz/seal.ts` and is the
only permitted decorative element. If a page seems to need more
ornament, the answer is less content per page, not more ornament.

### 3.3 Palette (design tokens)

Certificate colours: paper, ink, seal. The single move that makes the
site unmistakable is that body ink is intaglio green, not black.

| Token | Light | Dark ("plate") | Use |
|---|---|---|---|
| `--paper` | #F4F3EE | #0D1712 | page ground |
| `--ink` | #14352A | #DCE5DC | all text; the engraving ink |
| `--ink-soft` | #3E5A4E | #9FB4A6 | secondary text, captions |
| `--guilloche` | #C9D6CC | #22382E | ornament lines, rules, borders |
| `--seal-gold` | #A87F24 | #C79A3B | THE accent: CTAs, active nav, the seal, links on hover |
| `--serial-red` | #983D26 | #C05B3F | ledger serial numbers, objection markers, REVISE verdicts |

Rules, written down the way the book's palette rules were:

- **Gold is a seal, never a typeface.** It marks the one action or the
  one live element on a screen. Never body text, never headings, never
  backgrounds. Contrast-checked usages only (AA against `--paper`).
- **Red is a serial number.** Monospace figures and objection markers
  only, in the banknote tradition of red serials. Never decorative.
- Dark mode is the engraving plate: the same drawing, inverted. Both
  modes are first-class and both are committed to; no "dark later".

### 3.4 Typography

Three faces, all OFL-licensed, all self-hosted, subset per locale. The
hard constraint is 24 official languages including Greek and Bulgarian
Cyrillic; every face below is chosen for script coverage first.

| Role | Face | Why |
|---|---|---|
| Certificate caps (display) | Playfair Display | Didone contrast reads as engraving; Latin plus Cyrillic; letterspaced caps only, never sentence case; Greek falls back to Noto Serif Display in the same weight |
| The law and long reading | Literata | designed for long-form reading; complete Latin, Greek, Cyrillic; the legal text deserves a book face, not a UI face |
| UI, navigation, simulator, tables | Inter | complete script coverage, tabular figures for the ledger and simulator |

The wordmark is a certificate titling lockup: OWN THE MACHINE in
letterspaced Playfair caps between a double rule above and a fine rule
below, exactly as a banknote names its issuer. The name stays English as
a mark; the tagline localises beneath it in Literata italic. The
standing question, "who owns the machine?", renders in the reader's
language in every page footer.

### 3.5 What the identity refuses

No stock photography, no illustration of robots, no EU flag circles of
stars (the identity is European by craft tradition, not by insignia), no
gradients, no glassmorphism, no counters ticking for excitement. The
site of a law should feel like the law: composed, engraved, certain.

## 4. Pages

### Phase 1 (public launch, gated on Gate 1 passing)

- **/**: the certificate cover. Wordmark lockup, the ask in one
  sentence, the Seal drawing itself, three sourced numbers, simulator
  teaser, declared-interest line. One gold action.
- **/law**: the reader (see section 5). Recitals, chapters, articles,
  paragraphs, each with a stable anchor (#art-5-2) and a per-paragraph
  history link. Language switcher preserves the anchor. Print stylesheet
  worthy of a lawyer's desk.
- **/law/memorandum** and **/law/objections**: the memorandum and the
  fourteen counter-arguments verbatim from the repo, with the
  design-consequence table. Objections wear their serial-red markers.
- **/law/ledger**: the public change history. Each entry: micro-seal
  from the commit hash, serial number in red, what prompted the change,
  what the adversarial review found, verdict, the editor's disposition
  and a diff link, rendered from the law repo's review files. One
  disclosure line: reviews are run adversarially by AI under the
  editor's responsibility.
- **/simulator**: per simulator/SPEC.md. The result card is the
  certificate card: seal, frame, curve, assumptions in small print.
- **/evidence**: the ranked numbers with sources, dead-citations list
  included.
- **/contribute**: GitHub, GOVERNANCE.md summary, translation workflow
  (see section 6), licence table.
- **/about**: who, the declared interest verbatim, the gates and kill
  criteria in public, funding to the cent.

### Phase 2 (ECI live, gated on Gates 2-3)

- **/sign**: what signing means legally, per-country identity
  requirements explained BEFORE the COCS handoff, then the handoff
  button. No tracking of the outbound click.
- **/progress**: signature counter and per-country threshold bars from
  COCS public data, fetched server-side at build or refresh.
- **/kit**: organiser and partner materials, CC-licensed, localisable.

### Explicitly deferred

Custom annotation engine, newsletters, accounts, forums.

## 5. The reader: three depths, one truth

Every article renders in three layers, stacked and individually
linkable:

- **L0, one line.** What the article does, in one plain sentence.
  Renders as the article's subtitle everywhere the article is listed.
- **L1, plain language.** A short citizens'-summary paragraph in the
  register of the Commission's citizens' summaries: no legal terms
  without inline explanation, active voice, the reader addressed as
  "you" where honest.
- **L2, the law.** The enacting text verbatim from the law repo,
  Literata, hanging indents, paragraph anchors.

Default view: L0 and L1 visible, L2 one tap away and always visible on
print and on wide screens. The reader must never wonder whether the
plain language IS the law: L1 carries a standing marginal label, "plain
language, not the legal text".

L0 and L1 are site-repo content, per locale, and every change to them
runs the pipeline's layer-fidelity gate against the articles they
explain: the gate exists precisely so the plain layer cannot drift from
the law. A REVISE verdict blocks the deploy exactly as a lint error
does.

## 6. Languages

EN is the source of truth for the law; the site's job is to make every
citizen able to read it anyway.

- **Architecture**: path prefix per locale (/nl/, /fr/), EN at the
  root. hreflang pairs on every page. The language switcher preserves
  the current anchor. Untranslated pages fall back to EN with a plain
  banner in the target language, never a silent switch.
- **Launch languages**: EN, NL, FR, DE, human-quality via the
  translate-then-gate pipeline (machine-first draft, adversarial review
  with the legal-register prompt, native read before publish).
- **Scale order**: by ECI threshold weight: ES, IT, PL, then the
  remainder of the 24. Machine-translated pages are labelled as such at
  the top of the page until they pass the gate; being honest about
  translation quality is cheaper than being caught pretending.
- **The legal text** carries in every non-EN language: "The English text
  is the draft; translations are for understanding."
- **Localisation is more than language**: dates, number formatting
  (EUR 1 234,56 vs EUR 1,234.56) and the simulator's locale follow the
  page locale. The footer question renders in the page language.

Findings from the multilingual research (running under
`docs/ux-research.md` when it lands) adjust the mechanics here, not the
commitments.

## 7. Accessibility

WCAG 2.2 AA as the floor, verified per release, not per launch.
Keyboard-complete including the simulator; visible focus in seal-gold;
`prefers-reduced-motion` respected (the Seal renders static); contrast
tokens checked in CI against the palette table; the reader's L2 legal
text zoomable to 200 percent without loss. The European Accessibility
Act applies from June 2025 and this site intends to clear it as a
matter of course, and to say so on /about.

## 8. Technical requirements

- **Static-first.** Astro; no server state in Phase 1. The law pages
  build FROM the law repo at deploy time (git submodule or build-time
  clone): the site is a rendering of the repo, never a second copy.
- **Hosting**: Cloudflare Pages on ownthemachine.eu;
  whoownsthemachine.eu 301s to it. AGPL-3.0 per LICENSING.md.
- **Fonts self-hosted**, subset per locale at build; no external font
  hosts. Zero third-party requests site-wide.
- **Privacy**: no cookies, no consent banner because nothing needs
  consent, Cloudflare aggregate stats only. Named as a feature on
  /about.
- **Performance**: FCP under 1.2 s, TTI under 2.0 s on mid-range mobile
  over 4G. Total JS under 100 KB on content pages; the simulator
  lazy-loads; the Seal is inline SVG, not a library.
- **Offline**: service worker caches the reader and simulator after
  first visit (Phase 1 nice-to-have, Phase 2 requirement).
- **AI policies**: zone-level settings stand; search and agent crawlers
  allowed, no training block. Being in the models is distribution for
  an openly licensed law.

## 9. The image pipeline

All social and share imagery is generated, never hand-made, in the
identity above: `viz/card.ts` renders og-images per page (wordmark
lockup, Seal, one fact, source line) and the simulator's certificate
card client-side. Rules carried over from the book's social ledger,
which cost real experiments to learn: never repost the same image, the
accent is a mark not a typeface, every chart carries its conclusion in
the headline and its source in the footer, no AI-generated illustrative
images (C2PA badges undermine a campaign about machines).

## 10. Success measures (privacy-compatible)

Phase 1: aggregate uniques on /law; simulator completion measured
session-local only; GitHub stars, PRs and issues from non-team
contributors; citations in press and by MEP offices, tracked manually
in campaign/. Phase 2: the public COCS counter is the metric; no
conversion tricks.

## 11. Build phasing

- **Phase 0 (now)**: repo-driven static skeleton, EN only,
  password-gated preview on Cloudflare Pages. Includes the Seal
  generator, the token system and the reader with L2 only. Agent work,
  roughly a week.
- **Phase 1**: L0/L1 layers EN, then NL, FR, DE through the gate;
  simulator; evidence; the full design pass against this PRD; WCAG
  audit. Two to three weeks, parallelisable.
- **Phase 2**: /sign, /progress, /kit after Gate 2.

Nothing goes public before Gate 1's outcome, per campaign/GATES.md. The
site can be fully built and sitting dark; the gates control visibility,
not construction.
