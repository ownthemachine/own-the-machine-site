# ownthemachine.eu: product requirements

Gate 0 document. Supersedes the "ownthestable.eu SRS" of 17-18 August, whose
signature engine (FR-1.1 to FR-1.5) is void: since 2023 all ECI signatures are
collected on the Commission's Central Online Collection System, so this site
links out and collects nothing. That legal fact removes roughly half the
original system and most of its GDPR surface, and this PRD is written around
it.

## 1. What the site is

The public face of an open-source draft EU Regulation. Three jobs, in order:

1. **Make the law readable.** The full draft, its memorandum and its
   counter-arguments, navigable to the paragraph, in the reader's language.
2. **Make the stakes personal.** The dividend simulator: what would this mean
   for me, honestly, with every uncertainty labelled.
3. **Route action outward.** To COCS when an ECI is live, to GitHub for
   contributors, to the organiser kit for partners. The site is a junction,
   never a database.

What it is not: a petition platform, a data collector, a newsletter engine or
a funnel to the book.

## 2. Who it serves

| Persona | Arrives via | Must find within one screen |
|---|---|---|
| Curious citizen | social card, press | the ask in one sentence, the simulator, sign (when live) |
| Journalist | press kit, search | the memorandum, the counter-arguments, the ledger, a contact |
| MEP staffer / policy analyst | Brussels channels | the full legal text, article-numbered, citable |
| Potential organiser | distribution phase | the gates, the kit, who is behind this |
| Developer | HN, GitHub | the repo, GOVERNANCE.md, how to open a PR |
| Sceptic | argument threads | objections 1-14 at full strength, and the ledger showing findings acted on |

The sceptic is a first-class persona. The counter-arguments page is not
buried; it is in the primary navigation. That is the differentiator and the
credibility strategy.

## 3. Pages

### Phase 1 (public launch, gated on Gate 1 passing)

- **/**: the ask in one sentence, the tagline (capital for all, so the
  dividend follows), three numbers (60/11 ownership, the platform-capture
  line, Denmark's 27x), simulator teaser, declared-interest line.
- **/law**: the reader. Recitals, chapters, articles, paragraphs, each with
  a stable anchor (#art-4-2) and a per-paragraph "history" link to the git
  blame. Language switcher. Print stylesheet worthy of a lawyer's desk.
- **/law/memorandum**: explanatory memorandum, including
  **/law/objections**: the fourteen counter-arguments, verbatim from the
  repo, with their design-consequence table.
- **/law/ledger**: the public change history of the draft. Each versioned
  change with what prompted it (issue, objection), what the adversarial
  review found, the editor's disposition and a diff link, rendered from the
  law repo's structured review files and release notes. This page, not the
  review tooling, is the public story: the machinery stays inspectable in
  the tools repo, under the hood; the product is a law that shows its work.
  One disclosure line on the page: reviews are run adversarially by AI under
  the editor's responsibility.
- **/simulator**: client-side only. Inputs: covered Single Market activity,
  reserve rate, crystallisation assumptions, eligible adults. Outputs:
  per-citizen EUR/yr trajectory (compounding curve, NOT a first-year
  headline, per DC-14), fund pool. Every parameter carries an uncertainty
  note and a source link. Shareable result card (locale-aware, campaign
  livery) rendered client-side to PNG. Exports .json/.csv.
- **/evidence**: the ranked numbers from evidence/EUROPE.md with sources,
  the dead-citations list included (we publish what not to cite, including
  against ourselves).
- **/contribute**: GitHub, GOVERNANCE.md summary (the four tests as merge
  criteria), translation workflow, licence table.
- **/about**: who, the declared interest (verbatim standing line), the
  gates and kill criteria in public, funding (none yet; when any exists, to
  the cent).

### Phase 2 (ECI live, gated on Gate 2-3)

- **/sign**: one page: what signing means legally, then the COCS handoff
  button. Per-country identity requirements explained BEFORE the handoff so
  nobody bounces confused. No tracking of the outbound click.
- **/progress**: signature counter and per-country threshold bars, read
  from COCS public data server-side at build/refresh, never client-tracked.
- **/kit**: organiser and partner materials, all CC-licensed, localisable.

### Explicitly deferred

Custom annotation/commenting engine (GitHub PRs and issues ARE the annotation
layer at this scale; revisit only if non-technical legal reviewers stall),
newsletters, accounts of any kind, forums.

## 4. Languages

EN is the source of truth. Launch languages: EN, NL, FR, DE. Then by ECI
threshold weight: ES, IT, PL, then the remainder of the 24 on the
translate-then-gate pipeline (machine-first draft, adversarial review with
thread/context rules, native read before publish). The legal text itself
carries a banner in every non-EN language: "The English text is the draft;
translations are for understanding." Legal-register translations get their own
review prompt (EU legal drafting register, not the essay register).

## 5. Design language

Own identity, not the book's. Related by descent, distinguishable at a
glance: the campaign must read as a civic object, not an author's site.
Requirements rather than prescriptions: WCAG 2.2 AA contrast as a floor, a
duotone-plus-one-accent system NOT the book's amber-on-ivory, typography that
survives 24 languages including Greek and Bulgarian scripts, and the
standing question rendered in the local language on every page footer. A
design exploration happens before Phase 1; this PRD deliberately does not
pick the palette.

## 6. Technical requirements

- **Static-first.** Astro or Next static export; no server state in Phase 1.
  The law pages build FROM regulation/ in this repo at deploy time: the site
  is a rendering of the repo, never a second copy (the leesgids lesson:
  one source, two surfaces, zero drift).
- **Hosting:** Cloudflare Pages on ownthemachine.eu (DNS heading to
  Cloudflare already); whoownsthemachine.eu 301s to it. AGPL-3.0 for site
  code per LICENSING.md.
- **Privacy:** zero third-party requests. No analytics beyond Cloudflare's
  aggregate, cookieless stats; no cookies at all in Phase 1; no consent
  banner because nothing needs consenting to. This is a feature with a name
  on the /about page.
- **Performance:** FCP under 1.2s and TTI under 2.0s on mid-range mobile
  over 4G; total JS under 100KB on content pages; the simulator lazy-loads.
- **Accessibility:** WCAG 2.2 AA verified per release, keyboard-complete,
  reduced-motion respected, simulator fully operable without pointer.
- **Offline:** service worker caches the law reader and simulator after
  first visit (Phase 1 nice-to-have, Phase 2 requirement: campaign events
  have bad wifi).
- **The AI policies** set at the zone level stay: search and agent crawlers
  allowed, no training block. Being in the models IS distribution for an
  openly licensed law.

## 7. Success measures (privacy-compatible)

Phase 1: unique visitors to /law (aggregate), simulator completion rate
measured client-side without beacons (session-local only, surfaced in user's
own export), GitHub stars/PRs/issues from non-team contributors, citations
in press and by MEP offices (tracked manually in campaign/).
Phase 2: COCS conversion cannot be tracked and will not be estimated by
tricks; the public counter is the metric.

## 8. Build phasing and effort

- **Phase 0 (now):** repo-driven static skeleton, EN only, password-gated
  preview. Roughly a week of agent work.
- **Phase 1:** four launch languages, simulator, evidence, design pass.
  Two to three weeks, parallelisable.
- **Phase 2:** COCS integration surface, progress, kit. One week, but only
  after Gate 2 passes.

Nothing goes to the public domain before Gate 1's admissibility opinion, per
campaign/GATES.md. The site can be fully built and sitting dark; the gates
control visibility, not construction.
