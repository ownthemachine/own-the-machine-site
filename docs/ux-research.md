# Multilingual EU civic site research (19 August 2026)

Commissioned before committing the PRD's language, accessibility and
component decisions. Every claim was verified against live pages on
18-19 August 2026; citations inline. Findings feed PRD sections 5, 6, 7
and 8.

## 1. Multilingual architecture in practice

All four reference sites (europa.eu portal, ECI portal, ECI Forum,
European Parliament) use path-based language identifiers, never
subdomains: the Commission family a path suffix (`/index_nl`), the
Parliament a path segment (`/portal/nl`). None negotiate
`Accept-Language`; tested and ignored. The Commission's fallback for an
untranslated page, verified end-to-end on the ECI portal: serve the
English content, show a banner in the reader's language ("Deze pagina
is niet beschikbaar in het Nederlands."), offer on-demand eTranslation
with an explicit machine-translation disclaimer. The Parliament simply
serves mixed-language pages with no notice, which is the anti-pattern.

**eTranslation is available to us.** Eligibility (page updated 30 July
2026): public administrations, small businesses including
self-employed, academia, NGOs, based in the EU. Free, no usage cap, API
key route plus a "Web-T" website plugin. Exad CommV qualifies; a future
campaign vzw/asbl would too. Separately, on registration of an ECI the
Commission itself translates the title, objectives (max 1100 chars) and
annex (max 5000 chars) into all 24 languages (Regulation (EU) 2019/788,
Article 4(4)).

Sources:
https://citizens-initiative.europa.eu/news/commission-registers-two-new-european-citizens-initiatives-2026-07-17_en?prefLang=nl ·
https://european-union.europa.eu/select-language?destination=/node/1 ·
https://translation.ec.europa.eu/tools-and-resources/ai-translation-and-language-tools_en ·
https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019R0788

## 2. What successful ECIs actually shipped

The signing step comes in all 24 languages for free: the central
collection system is mandatory for initiatives registered after
1 January 2023 and provides the full 24-language UI. Campaign sites
carry no language obligation at all, and winners shipped 3 to 23:

| Campaign | Site languages | Landing page priorities |
|---|---|---|
| Stop Killing Games (1,29 M valid) | 3 live (EN/DE/FR), others "coming soon"; EN authoritative | one-line ask, join CTA, FAQ |
| Stop Finning (1,12 M) | 5 (EN/DE/ES/FR/IT) | one-line ask, take action |
| Fur Free Europe (1,50 M valid) | 23, run by an 80+ member NGO federation | embedded sign form (pre-2023 window) |
| Minority SafePack | 16, constituency-driven | sign ask, video, FAQ |

Two of the biggest cleared a million signatures with five or fewer site
languages. Landing pages consistently lead with the one-sentence ask
and a single dominant CTA to the EU signing page.

Sources:
https://citizens-initiative.europa.eu/how-it-works/faq_en ·
https://citizens-initiative-forum.europa.eu/document/fur-free-europe_en ·
https://www.stopkillinggames.com/en/privacy

## 3. Plain-language explanation of legislation

Three verified layered patterns:

- **EUR-Lex "Summaries of EU legislation"**: summary and statute are
  two views of one CELEX identifier (`/LSU/` vs `/TXT/`), 24 languages,
  fixed template (aim, key points, application date, key terms, link to
  main document). Actively maintained.
- **Commission policy hub** (AI Act model): one-liner, everyday-example
  graphic, Q&A, link to the full act.
- **gdpr-info.eu**: chapters, article pages with inlined recital links,
  parallel plain-language "Key issues" essays. The best structural
  model for an article-by-article open-source law site.

The classic six-question citizens' summary (what is proposed, what is
the issue, who benefits, why EU action, what exactly changes, from
when) survives in archived examples; no post-2015 example found, so
treat the format as ours to revive rather than an active Commission
practice. Easy-to-read is a distinct, stricter tier (Inclusion Europe
"Information for all": simple words, one idea per sentence, testing by
people with intellectual disabilities); the ECI portal easy-read
section could not be verified to exist (404), so if easy-read matters
it must be produced and user-tested ourselves, which is
wall-clock-bound.

Sources:
https://eur-lex.europa.eu/legal-content/EN/LSU/?uri=CELEX:32016R0679 ·
https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai ·
https://www.inclusion-europe.eu/easy-to-read-standards-guidelines/

## 4. Accessibility baseline

The Web Accessibility Directive (2016/2102) binds public bodies only.
The European Accessibility Act (2019/882, applying 28 June 2025)
reaches listed services, not advocacy content, and exempts
microenterprises. So a campaign site owes nothing legally; the
obligation is credibility. The harmonised standard is EN 301 549
v3.2.1 = WCAG 2.1 AA (Implementing Decision 2021/1339); draft v4.1.0
adopts WCAG 2.2 AA with adoption expected in 2026. The Commission and
Parliament both declare partial WCAG 2.1 AA.

Sources:
https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016L2102 ·
https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019L0882 ·
https://commission.europa.eu/accessibility-statement_en ·
https://www.etsi.org/deliver/etsi_en/301500_301599/301549/04.01.00_20/en_301549v040100ev.pdf

## 5. Civic-tech design systems

- **Europa Component Library**: EUPL-1.1, framework-free, the only
  system engineered for 24-language content; but the licence grants
  code not branding, and an EU-topic campaign must not be mistaken for
  an official EU site. Pattern reference only.
- **GOV.UK Frontend**: MIT, WCAG 2.2 AA target, best-documented civic
  components anywhere; must be rebranded (no crown, no GDS Transport
  font); ships no translations and no language switcher; all EU-24
  are LTR so the missing RTL support is moot. Chosen base.
- **Decidim**: AGPL full participation platform, hold in reserve for a
  deliberation phase. USWDS: CC0 parts-bin. CitizenLab: open-core,
  skip.

Sources:
https://github.com/ec-europa/europa-component-library ·
https://github.com/alphagov/govuk-frontend ·
https://github.com/decidim/decidim ·
https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:42012Y0908(01)

## Recommendation adopted in the PRD

EN/NL/FR/DE human-quality at launch; the other 20 machine-translated
via eTranslation behind the Commission's own banner pattern; English
authoritative on every legal page; the draft Regulation itself never
hand-translated into 24 (the Commission does the registered core for
free and the collection system signs in all 24 regardless). Languages
promote from MT to human-verified per page as volunteers arrive, with
verification status tracked in the repo. Build on GOV.UK Frontend
rebranded to the certificate identity; borrow ECL patterns, never its
code. Declare WCAG 2.1 AA plus the cheap 2.2 additions, with an
institutional-format accessibility statement.

Human-gated actions this creates: register for eTranslation via EU
Login as Exad CommV; recruit NL/FR/DE native readers for the
translate-then-gate pipeline.
