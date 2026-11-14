---
gate: translation-fidelity, native-ear
target: plain front in Spanish (menu, home, Questions and answers, experts, get-involved), src/i18n/es.mjs
verdict: fidelity PUBLISH (round 5, final text); native-ear REVISE (advisory; see disposition)
disposition: merged-with-fixes; remaining native-ear findings rejected and recorded below
date: 2026-11-13
---

# Plain front, Spanish: translation gate

The text was drafted by `review.sh` (machine first; input: the English blocks plainMenu, plainHome, qa, experts, involved, plus the existing Spanish dictionary for terminology and form of address; draft kept verbatim in translations/drafts/2026-11-13-plain-front-es-r1.md), then gated with REVIEW-PROMPT.md (source and target) until PUBLISH and with NATIVE-EAR-PROMPT.md (target only). Reviewer: `vertex/gemini-3.7-flash@eu` (EU, zero retention, not trained on). Fidelity rounds: R1, R2 (es), R3, R4, R5. Native-ear rounds: 3, each given the existing site terms as context.

The English wording is authoritative and was approved by the owner; the points that must not move (the ECI gloss, the money question second, "If the proposal were adopted", the tax answer ending on an open legal question with no mention of lawyers, "Who is behind this?" ending at "acting as a private citizen") were translated for meaning and not re-opened.

Native ear is advisory: it sees no terminology list in the pass itself, so its lists contradict across rounds (for example "Option" versus "Variante" versus "Modell"). Findings that are language errors were applied; the rest are recorded as rejected below. Round 5 fidelity on the final text is PUBLISH; the native-ear pass did not converge and a human native reader should look at it before release.

## Editor disposition (13 November 2026)

| Round | Finding | Disposition |
|---|---|---|
| Draft | involved.title was "Participar" while the menu said "Ayudar"; link label "participar" | Made consistent: "Ayudar" throughout. "Participar" is the join page label, so the menu label must differ; footer heading "Participar y sobre nosotros" became "Ayudar y conocernos". |
| Draft | Other draft fixes | "asumir nuevas acciones" to "suscribir"; "un precio reducido, igual a su valor nominal"; "mi propio país"; "un mosaico de normas nacionales"; numbers as "7 500 millones" and "75 000 millones" with non-breaking spaces (the existing text spaces thousands). |
| Fidelity R1 | "Ayudar" should be "Participar" | Rejected (join page label; the menu label must differ). Reran with editor notes; R2 PUBLISH. |
| Fidelity R1 | Accent-stripped anchors in the objections links | Rejected: they are the ids the site generates for the Spanish objections page, verified against the build. |
| Fidelity R1 | "borrador de reglamento" should be "proyecto de Reglamento" | Rejected: existing Spanish term (home.eyebrow, chrome). |
| Native ear R1 to R3 | Applied: "ciudadano a título particular"; "Determinar si el Derecho de la UE lo calificaría aun así como impuesto es una cuestión jurídica abierta"; "y cuya producción"; "los actuales accionistas conservan una participación ligeramente menor"; "distribución importante a los accionistas"; "gastos de personal"; "participación en lo que produce"; "suministren bienes y servicios". | |
| Native ear R1 to R3 | Rejected: "empleo de personas" to "mano de obra" or "empleo humano" (repeated every round; "mano de obra" means labour as a cost, a different claim). | |


Terminology follows the existing Spanish dictionary (Reserva, warrant, derecho, designación, Reglamento, considerando, anexo, artículo, iniciativa ciudadana europea, "usted"). Link targets in `qa.items[].links` carry the Spanish heading ids of the objections page; `scripts/check-plain-front.mjs` checks each against the built page.

The "not yet translated" hint (`plainMenu.notTranslated`, `plainMenu.langNames`) is removed from all five dictionaries: with every language carrying the plain front no language link leaves its page any more.

## Round outputs (verbatim)

### es-ear-r1

# Review

> Reviewer: `vertex/gemini-3.7-flash@eu` · router router.eu.requesty.ai · geolocation eu · retention 0d · trained-on false · lab google
> 2026-11-13T22:49:38+00:00 · tokens in=3688 out=2290
> Prompt: NATIVE-EAR-PROMPT.md · Verbatim model output below ; do not edit.

> Bundle SHA-256: `d54fd94f53a00e2f31b42c5c54a0c5ee9983da66e083a492397f40db74787ad0`
> Prompt SHA-256: `67fd86112c8d58025a194b3d9b1e17f035ca9faa03d114702358f21516d49aee`

**Exact phrase:** `actúa como ciudadano particular`
**Why it grates:** Calque of the English *acting as a private citizen*. In Spanish, the standard expression in civic and administrative contexts is *a título particular* or simply *como particular*.
**Native phrasing:** `actúa a título particular` (or `a título individual`).

---

**Exact phrase:** `Si el Derecho de la UE seguiría tratándolo como un impuesto es una cuestión jurídica abierta.`
**Why it grates:** Double anglicism in syntax and terminology. First, *tratar como [impuesto]* translates English *treat as a tax*; Spanish legal register uses *calificar como tributo/impuesto* or *considerar un impuesto*. Second, introducing a subject clause with *si* followed directly by a conditional (*si el Derecho... seguiría*) is an unidiomatic rendering of *whether EU law would still treat it...*.
**Native phrasing:** `Determinar si el Derecho de la UE lo calificaría como impuesto es una cuestión jurídica abierta.` (or `Si el Derecho de la UE lo consideraría un impuesto es una cuestión jurídica abierta.`)

---

**Exact phrase:** `o bienes y servicios cuya producción dependa en gran medida de ellos, en al menos tres Estados miembros (...) cuya producción dependa mucho menos del empleo de personas`
**Why it grates:** Broken syntax (anacoluthon) and awkward repetition. The second relative clause (*cuya producción dependa mucho menos...*) dangles after a lengthy parenthesis and duplicates the verb phrase already used right before it (*cuya producción dependa en gran medida...*), leaving the sentence grammatically tangled.
**Native phrasing:** `o bienes y servicios producidos en gran medida mediante estos, en al menos tres Estados miembros (...) y con una dependencia mucho menor del empleo humano`

---

VERDICT: REVISE

### es-ear-r2

# Review

> Reviewer: `vertex/gemini-3.7-flash@eu` · router router.eu.requesty.ai · geolocation eu · retention 0d · trained-on false · lab google
> 2026-11-13T22:50:17+00:00 · tokens in=3694 out=3436
> Prompt: NATIVE-EAR-PROMPT.md · Verbatim model output below ; do not edit.

> Bundle SHA-256: `010b702d7e5d435fd240fcf37b3a932761951e13aaa48ac80385f53c5d129956`
> Prompt SHA-256: `67fd86112c8d58025a194b3d9b1e17f035ca9faa03d114702358f21516d49aee`

**"tras una gran distribución a los propietarios"**
* Why it grates: Literal translation of "a large distribution to owners". In Spanish corporate law and finance, companies do not make *distribuciones a los propietarios*; they execute a *reparto de dividendos* or *distribución de beneficios* to *socios* or *accionistas*.
* Native phrasing: `tras un reparto extraordinario de dividendos a los accionistas` or `tras una distribución cuantiosa de beneficios a los socios`.

**"Los propietarios existentes conservan una porción ligeramente menor."**
* Why it grates: Double anglicism. *Propietarios existentes* is a word-for-word calque of "existing owners" (*accionistas actuales* / *socios actuales*), and *porción* refers to a piece of food or physical slice; an equity holding is a *participación* or *cuota*.
* Native phrasing: `La participación de los actuales accionistas se reduce ligeramente.` or `Los socios actuales conservan una cuota ligeramente menor.`

**"su gasto en personal"**
* Why it grates: In Spanish financial accounting and EU legal directives (e.g., Directive 2013/34/EU), the standardized line item for staff costs is plural (*gastos de personal*).
* Native phrasing: `sus gastos de personal`

**"dependa mucho menos del empleo de personas"**
* Why it grates: Calque of "employment of people". In socio-economic and industrial contexts, Spanish uses *mano de obra* or *trabajo humano*.
* Native phrasing: `dependa mucho menos de la mano de obra` or `dependa mucho menos del trabajo humano`.

VERDICT: REVISE

### es-ear-r3

# Review

> Reviewer: `vertex/gemini-3.7-flash@eu` · router router.eu.requesty.ai · geolocation eu · retention 0d · trained-on false · lab google
> 2026-11-13T22:50:54+00:00 · tokens in=3695 out=3072
> Prompt: NATIVE-EAR-PROMPT.md · Verbatim model output below ; do not edit.

> Bundle SHA-256: `95a39c1c81d273d3514233dd9f4ce431ea334c0c4fc78d6560c17c578db33c9c`
> Prompt SHA-256: `67fd86112c8d58025a194b3d9b1e17f035ca9faa03d114702358f21516d49aee`

* **Exact phrase:** `poseer una pequeña participación de lo que produce la automatización`
  * **Why it grates:** Prepositional calque of "a share of". In Spanish corporate and economic phrasing, one holds a *participación en* (e.g., *participación en los beneficios / en la producción*), never *de*.
  * **Native phrasing:** `poseer una pequeña participación en lo que produce la automatización`

* **Exact phrase:** `presten servicios cognitivos automatizados, o bienes y servicios`
  * **Why it grates:** Syntactic mismatch (faulty zeugma). The verb *prestar* works for *servicios*, but applying *prestar* to *bienes* in this context means "to lend goods", not "to supply goods".
  * **Native phrasing:** `ofrezcan servicios cognitivos automatizados, o comercialicen bienes y servicios` (or `suministren bienes y presten servicios`)

* **Exact phrase:** `tras una gran distribución a los accionistas`
  * **Why it grates:** Calque of "large shareholder distribution". In Spanish corporate law and finance, equity distributions are designated as *reparto de dividendos* or *distribuciones extraordinarias a los accionistas*. "Gran distribución" sounds colloquial and untechnical.
  * **Native phrasing:** `tras una distribución extraordinaria a los accionistas` or `tras un reparto significativo de dividendos`

* **Exact phrase:** `cuya producción dependa mucho menos del empleo de personas`
  * **Why it grates:** Calque of "employment of people". In civic and economic texts, standard Spanish uses *mano de obra* or *empleo humano*.
  * **Native phrasing:** `cuya producción dependa en mucha menor medida de la mano de obra` or `...del empleo humano`

VERDICT: REVISE

### es-fid-r1

# Review

> Reviewer: `vertex/gemini-3.7-flash@eu` · router router.eu.requesty.ai · geolocation eu · retention 0d · trained-on false · lab google
> 2026-11-13T22:47:41+00:00 · tokens in=4259 out=1709
> Prompt: REVIEW-PROMPT.md · Verbatim model output below ; do not edit.

> Bundle SHA-256: `6973739483d20121b831d91e82f468f07d2c8e158af768dc1e71eecd0d4544c8`
> Prompt SHA-256: `9d89a5c37daf4ca29ec53132dd31aabe4b90373476a906c182c63471120b86fe`

- **`plainMenu.involved` and `involved.title`**
  - **Severity:** SHOULD-FIX
  - **Target text:** `"Ayudar"`
  - **Problem:** "Ayudar" translates "Help" (used separately in `qa.items[7]`), which sounds like voluntary charity or tech support rather than civic participation. For European initiatives and civic platforms, "Get involved" is standardly rendered as "Participar" (or "Involúcrate" / "Cómo participar").
  - **Proposed correction:** `"Participar"`

- **`qa.items[2].links[0]` and `qa.items[3].links[0]`**
  - **Severity:** SHOULD-FIX
  - **Target text:** `"/law/objections#2-esto-es-un-impuesto-y-la-ue-no-puede-recaudarlo-as"` and `"/law/objections#1-esto-es-una-expropiacin"`
  - **Problem:** Malformed URL slugification where accented vowels were stripped instead of normalized (`así` $\to$ `as`, `expropiación` $\to$ `expropiacin`), which will break anchor navigation if the target headings use standard transliteration (`asi`, `expropiacion`).
  - **Proposed correction:** `"/law/objections#2-esto-es-un-impuesto-y-la-ue-no-puede-recaudarlo-asi"` and `"/law/objections#1-esto-es-una-expropiacion"` (or preserve the English anchor routes if headings are not translated in the router).

- **`experts.regulationHead` / `experts.allOfIt`**
  - **Severity:** POLISH
  - **Target text:** `"El borrador de reglamento"`, `"El borrador de reglamento, íntegro"`
  - **Problem:** In institutional EU Spanish, "draft regulation" is standardly termed *proyecto de Reglamento* or *propuesta de Reglamento* rather than *borrador de reglamento*.
  - **Proposed correction:** `"El proyecto de Reglamento"`, `"El proyecto de Reglamento, íntegro"`

VERDICT: REVISE

### es-fid-r2

# Review

> Reviewer: `vertex/gemini-3.7-flash@eu` · router router.eu.requesty.ai · geolocation eu · retention 0d · trained-on false · lab google
> 2026-11-13T22:49:40+00:00 · tokens in=4392 out=3283
> Prompt: REVIEW-PROMPT.md · Verbatim model output below ; do not edit.

> Bundle SHA-256: `ceb0659a1c6a41204d004942f7abf5f5f8a03f74da7b53db77849672cdaa0cac`
> Prompt SHA-256: `9d89a5c37daf4ca29ec53132dd31aabe4b90373476a906c182c63471120b86fe`

The translation has been reviewed against all five gates (fidelity, register, consistency, naturalness, mechanics):

- **Fidelity & Register:** Sober, precise civic tone maintained throughout. Institutional EU terminology is rendered accurately (*iniciativa ciudadana europea*, *Estados miembros*, *base jurídica*, *exposición de motivos*, *volumen de negocios*, *investigación de mercado*).
- **Scale and Numbers:** English *billion* is correctly translated using the Spanish long scale (*7 500 millones de euros*, *75 000 millones de euros*) with appropriate non-breaking spaces.
- **Mechanics:** HTML tags preserved, no em-dashes present, link structures and anchor slugs match the site specification.

No defects found.

VERDICT: PUBLISH

### es-fid-r3

# Review

> Reviewer: `vertex/gemini-3.7-flash@eu` · router router.eu.requesty.ai · geolocation eu · retention 0d · trained-on false · lab google
> 2026-11-13T22:50:09+00:00 · tokens in=4398 out=2008
> Prompt: REVIEW-PROMPT.md · Verbatim model output below ; do not edit.

> Bundle SHA-256: `e17dddb684fdca120f8c48c71a883346fc8bdc7df7de3bf5bb419fac6f195c6e`
> Prompt SHA-256: `9d89a5c37daf4ca29ec53132dd31aabe4b90373476a906c182c63471120b86fe`

The translation has been reviewed against the English source according to all criteria:

- **Fidelity & Tone:** The civic, honest, and precise tone is preserved. No claims are overpromised or watered down.
- **EU Legal Register:** EU institutional terminology is accurately rendered (*iniciativa ciudadana europea*, *Estados miembros*, *base jurídica*, *TFUE*, *exposición de motivos*, *borrador de reglamento*, *mercado interior*).
- **Naturalness:** Phrasing reads natively without anglicisms or calques.
- **Mechanics:** Punctuation (including opening question marks `¿`), spacing in numbers and percentages (`7 500`, `3 %`), and inline HTML tags (`<em>`) are correctly maintained.

No blocking defects or necessary revisions found.

VERDICT: PUBLISH

### es-fid-r4

# Review

> Reviewer: `vertex/gemini-3.7-flash@eu` · router router.eu.requesty.ai · geolocation eu · retention 0d · trained-on false · lab google
> 2026-11-13T22:50:50+00:00 · tokens in=4399 out=2706
> Prompt: REVIEW-PROMPT.md · Verbatim model output below ; do not edit.

> Bundle SHA-256: `9b5de9990cbf70092e09a3eea89b83cae411216779c61ed970475902b8551518`
> Prompt SHA-256: `9d89a5c37daf4ca29ec53132dd31aabe4b90373476a906c182c63471120b86fe`

The Spanish translation has been reviewed against the English source.

### Assessment

1. **Fidelity & Register**: Outstanding. The civic and legal tone matches EU Spanish style guidelines and official terminology (e.g., *iniciativa ciudadana europea*, *base jurídica*, *exposición de motivos*, *valor nominal*, *mercado interior*).
2. **Consistency & Terminology**: Consistent across keys and follows EU institutional conventions (capitalisation of *Reserva*, *Estados miembros*, treatment of legal bases).
3. **Naturalness**: Reads smoothly without anglicisms or calques. Legal and civic idioms are rendered cleanly into idiomatic Spanish.
4. **Mechanics**: Proper Spanish typographical standards (space before `%`, non-breaking spaces for thousands, HTML tags intact, no em-dashes).

No defects found.

VERDICT: PUBLISH

### es-fid-r5

# Review

> Reviewer: `vertex/gemini-3.7-flash@eu` · router router.eu.requesty.ai · geolocation eu · retention 0d · trained-on false · lab google
> 2026-11-13T22:51:20+00:00 · tokens in=4401 out=2562
> Prompt: REVIEW-PROMPT.md · Verbatim model output below ; do not edit.

> Bundle SHA-256: `d92a59a91fcd41f2579d325dae7f4b80e638591b936bbf76b76c4eaa479d0a2b`
> Prompt SHA-256: `9d89a5c37daf4ca29ec53132dd31aabe4b90373476a906c182c63471120b86fe`

The translation has been thoroughly reviewed against the English authoritative source dictionary.

### Assessment Summary
- **Fidelity & Register:** Faithful translation matching the sober, institutional civic register of EU public communication. Appropriate legal and administrative terms of art are used throughout (e.g., *base jurídica*, *volumen de negocios*, *Estados miembros*, *exposición de motivos*, *Reserva*, *borrador de reglamento*).
- **Consistency:** Consistent terminology across menu, QA, and experts sections.
- **Naturalness:** Natural Spanish phrasing free of English calques or stiff literalisms.
- **Mechanics:** Inline HTML (`<em>`) preserved; non-breaking spaces used correctly for number formatting (`7 500`, `75 000`) and percentages (`3 %`); no forbidden em-dashes introduced.

No blocking or non-blocking defects identified.

VERDICT: PUBLISH
