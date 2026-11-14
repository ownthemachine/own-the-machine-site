---
gate: translation-fidelity, native-ear
target: plain front in German (menu, home, Questions and answers, experts, get-involved), src/i18n/de.mjs
verdict: fidelity PUBLISH (round 5, final text); native-ear REVISE (advisory; see disposition)
disposition: merged-with-fixes; remaining native-ear findings rejected and recorded below
date: 2026-11-13
---

# Plain front, German: translation gate

The text was drafted by `review.sh` (machine first; input: the English blocks plainMenu, plainHome, qa, experts, involved, plus the existing German dictionary for terminology and form of address; draft kept verbatim in translations/drafts/2026-11-13-plain-front-de-r1.md), then gated with REVIEW-PROMPT.md (source and target) until PUBLISH and with NATIVE-EAR-PROMPT.md (target only). Reviewer: `vertex/gemini-3.7-flash@eu` (EU, zero retention, not trained on). Fidelity rounds: R1, R2 (es), R3, R4, R5. Native-ear rounds: 3, each given the existing site terms as context.

The English wording is authoritative and was approved by the owner; the points that must not move (the ECI gloss, the money question second, "If the proposal were adopted", the tax answer ending on an open legal question with no mention of lawyers, "Who is behind this?" ending at "acting as a private citizen") were translated for meaning and not re-opened.

Native ear is advisory: it sees no terminology list in the pass itself, so its lists contradict across rounds (for example "Option" versus "Variante" versus "Modell"). Findings that are language errors were applied; the rest are recorded as rejected below. Round 5 fidelity on the final text is PUBLISH; the native-ear pass did not converge and a human native reader should look at it before release.

## Editor disposition (13 November 2026)

| Round | Finding | Disposition |
|---|---|---|
| Draft | Menu label "Unterstützen" | Changed to "Helfen": "Unterstützen" reads as the ECI signature ("Unterstützungsbekundung"). Footer heading "Aktiv werden und über uns" became "Helfen und mehr über uns". |
| Draft | "Dem Entwurf nach nicht" for "It is designed not to be" | Applied: "Der Vorschlag ist darauf angelegt, keine zu sein". "wichtigste Variante" to "wichtigste Option" (the text calls the alternatives Optionen); "Noch gibt es nichts" fixed; "wird vererbt" to "geht auf Ihre Erben über"; the market-investigation condition restored ("aber nur nach"); detail link labels made nominative so they read after "Mehr dazu:". |
| Fidelity R1, R3, R4 | "Helfen" should be "Mitmachen" or "Mitwirken" | Rejected, three times: "Mitmachen" is the join page label (the menu label must differ from it and from the footer group heading) and "Mitwirken" is the label of the contribute page. |
| Fidelity R3 | "wichtigste Option" should be "Hauptoption" | Rejected: "Hauptoption" is the calque the Dutch and French versions removed. Native ear asks for "Hauptvariante" or "Kernmodell"; the two passes contradict. |
| Fidelity R3 | "der Anspruch" for the right that starts on designation | Applied: "dieses Recht" (Anspruch is the citizen entitlement). |
| Native ear R1 to R3 | Applied: "ohne eine neue Steuer"; "einen gleich großen Anteil an den Ausschüttungen des Fonds"; "im Lichte des Eigentumsschutzes im EU-Recht angemessen ist"; "Lesen Sie, stellen Sie Fragen"; the list syntax of involved.description; "genug einbehalten"; "Fragen, die Menschen zuerst zu Own the Machine stellen"; the one-sentence answer rewritten without "Vorschlag, dass ... sollte"; "rechtlich tragfähig"; "einen festen Anteil von 3 % am gesamten Unternehmen". | |
| Native ear R2, R3 | Rejected: "Option" to "Variante" or "Modell" (above); "Wertschöpfung weitaus weniger" (reproduces the English comparison); "Gewinnen" to "Erträgen" (existing text says Gewinne); "Kernmodell". | |
| Menu label | "Helfen" next to "Mitmachen" (join page) and the footer group "Helfen und mehr über uns". | Distinct from the join label; the group heading starts with the menu label. |


Terminology follows the existing German dictionary (Reserve, Optionsschein, Anspruch, Benennung, Verordnung, Erwägungsgrund, Anhang, Artikel, Europäische Bürgerinitiative, "Sie"). Link targets in `qa.items[].links` carry the German heading ids of the objections page; `scripts/check-plain-front.mjs` checks each against the built page.

The "not yet translated" hint (`plainMenu.notTranslated`, `plainMenu.langNames`) is removed from all five dictionaries: with every language carrying the plain front no language link leaves its page any more.

## Round outputs (verbatim)

### de-ear-r1

# Review

> Reviewer: `vertex/gemini-3.7-flash@eu` · router router.eu.requesty.ai · geolocation eu · retention 0d · trained-on false · lab google
> 2026-11-13T22:49:41+00:00 · tokens in=3931 out=2845
> Prompt: NATIVE-EAR-PROMPT.md · Verbatim model output below ; do not edit.

> Bundle SHA-256: `ebaa8b0881b1aef64ee4ad1beff6b781e60e2087356d6b931f267f5568c6545e`
> Prompt SHA-256: `67fd86112c8d58025a194b3d9b1e17f035ca9faa03d114702358f21516d49aee`

**"ohne neue Steuer auskommt"** (`plainHome.p3`)
* **Why it grates:** Grammatically unnatural; in German, singular countable nouns require an article here, or the plural is used. Calque of "without new tax".
* **Native phrasing:** "ohne eine neue Steuer auskommt" or "ohne neue Steuern auskommt".

---

**"einen gleichen Anteil dessen, was der Fonds ausschüttet"** (`qa[1].a`)
* **Why it grates:** Stiff genitive construction modelled on the English *"an equal share of what the fund distributes"*. 
* **Native phrasing:** "einen gleichen Anteil an den Ausschüttungen des Fonds" or "zu gleichen Teilen an den Ausschüttungen des Fonds beteiligt werden".

---

**"im Licht des Eigentumsschutzes im EU-Recht fair genug ist"** (`qa[3].a`)
* **Why it grates:** Double anglicism: *"im Licht des"* instead of the idiomatic idiom *"im Lichte"* / *"im Hinblick auf"*, and *"fair genug ist"* as a literal translation of the colloquial/Anglo-legal *"fair enough"*. In a legal context discussing property rights, this register clash is jarring.
* **Native phrasing:** "im Lichte des Eigentumsschutzes im EU-Recht verhältnismäßig ist" or "mit dem Eigentumsschutz im EU-Recht vereinbar ist".

---

**"Lesen Sie mit"** (`qa[7].a`)
* **Why it grates:** Direct calque of English *"read along"* (which in German means following a text while someone reads aloud). 
* **Native phrasing:** "Lesen Sie den Entwurf", "Lesen Sie sich ein" or "Bringen Sie sich ein".

---

**"Wege zur Mitwirkung: mitmachen, wie das Unterzeichnen ablaufen würde und wie Sie beitragen können."** (`involved.description`)
* **Why it grates:** Ungrammatical list syntax: an isolated infinitive (*"mitmachen"*) is coordinated directly with indirect question clauses (*"wie..."*).
* **Native phrasing:** "Wege zur Mitwirkung: wie Sie mitmachen können, wie das Unterzeichnen abläuft und wie Sie beitragen können."

---

VERDICT: REVISE

### de-ear-r2

# Review

> Reviewer: `vertex/gemini-3.7-flash@eu` · router router.eu.requesty.ai · geolocation eu · retention 0d · trained-on false · lab google
> 2026-11-13T22:50:17+00:00 · tokens in=3936 out=3461
> Prompt: NATIVE-EAR-PROMPT.md · Verbatim model output below ; do not edit.

> Bundle SHA-256: `1dd779d260b8fe8114d96a33daed3c4bcb50e2e3f30cff6ee4f321c85ecb3b7f`
> Prompt SHA-256: `67fd86112c8d58025a194b3d9b1e17f035ca9faa03d114702358f21516d49aee`

* **"einen gleichen Anteil"** (in `qa.items[1].a`)  
  *Why it grates:* Calque of English "an equal share". In German, *ein gleicher Anteil* sounds like "an identical/similar share" rather than a mathematically equal portion.  
  *Native phrasing:* "einen gleich großen Anteil" or "zu gleichen Teilen an den Ausschüttungen beteiligt werden".

* **"hinreichend fair"** (in `qa.items[3].a`)  
  *Why it grates:* Direct translation of English "sufficiently fair". In German civic and legal discourse regarding property rights (*Eigentumsschutz*), *fair* is too colloquial and unspecific.  
  *Native phrasing:* "angemessen", "verhältnismäßig" or "rechtlich haltbar".

* **"In der wichtigsten Option"** (in `qa.items[2].a`, `qa.items[3].a`, `qa.items[5].a`)  
  *Why it grates:* Calque of "in the main option". In German, *Option* refers to a choice or an equity derivative (which creates confusion here since the proposal discusses warrants/equity options). Policy choices are *Varianten* or *Modelle*.  
  *Native phrasing:* "In der Hauptvariante" or "Im Kernmodell".

* **"nachdem der Fonds genug zurückbehalten hat, um sein Kapital zu sichern"** (in `qa.items[1].a`)  
  *Why it grates:* Overly literal, colloquial phrasing ("genug zurückbehalten hat") for what is an institutional reserve/capital retention mechanism.  
  *Native phrasing:* "nach Bildung der erforderlichen Rücklagen zur Kapitalsicherung" or "nachdem der Fonds ausreichende Mittel zur Kapitalsicherung einbehalten hat".

* **"Kurze Antworten auf die ersten Fragen"** (in `qa.description`)  
  *Why it grates:* Calque of "initial questions" or "first questions". A native writer would refer to core, basic, or frequently asked questions.  
  *Native phrasing:* "Kurze Antworten auf die wichtigsten Fragen" or "Kurze Antworten auf grundlegende Fragen".

VERDICT: REVISE

### de-ear-r3

# Review

> Reviewer: `vertex/gemini-3.7-flash@eu` · router router.eu.requesty.ai · geolocation eu · retention 0d · trained-on false · lab google
> 2026-11-13T22:50:57+00:00 · tokens in=3939 out=4120
> Prompt: NATIVE-EAR-PROMPT.md · Verbatim model output below ; do not edit.

> Bundle SHA-256: `482cb4d4d6181620aee1b906ba02ff644749cd6e0563f1a76cf203e5cf00e70f`
> Prompt SHA-256: `67fd86112c8d58025a194b3d9b1e17f035ca9faa03d114702358f21516d49aee`

* **Exact phrase:** `Ein Vorschlag, dass jede erwachsene Unionsbürgerin und jeder erwachsene Unionsbürger einen kleinen Anteil an den Gewinnen hochautomatisierter Produktion besitzen sollte.`
  * **Why it grates:** Syntactic calque of the English clause structure (*"A proposal that every adult citizen should own..."*). German requires either an infinitive construction or a relative clause with a precise verb; "Vorschlag, dass [...] besitzen sollte" sounds like unedited translationese.
  * **Phrasing a native writer would use:** `Der Vorschlag, jede erwachsene Unionsbürgerin und jeden erwachsenen Unionsbürger an den Erträgen hochautomatisierter Produktion zu beteiligen.`

* **Exact phrase:** `In der wichtigsten Option` (in `qa.items[2]`, `qa.items[3]`, `qa.items[5]`)
  * **Why it grates:** Word-for-word calque of *"In the main option"*. In German legal, legislative, and policy contexts, structural designs or draft paths are referred to as *Varianten*, *Modelle*, or *Szenarien*.
  * **Phrasing a native writer would use:** `In der Hauptvariante` or `Im Kernmodell`

* **Exact phrase:** `ob dies rechtlich trägt`
  * **Why it grates:** Colloquial shorthand. In a serious civic and legal context, the standard collocations are *rechtlich tragfähig sein* or *rechtlich Bestand haben*.
  * **Phrasing a native writer would use:** `ob dies rechtlich tragfähig ist` or `ob dies rechtlich haltbar ist`

* **Exact phrase:** `erstreckt sich bei Ausübung jedoch auf feste 3 % des gesamten Unternehmens`
  * **Why it grates:** Calque of *"a fixed 3% of the entire company"*. In German corporate law and finance, percentages attach to shares or capital (*Anteil von 3 % am Unternehmen*), not directly as "feste 3 % des gesamten Unternehmens".
  * **Phrasing a native writer would use:** `erstreckt sich bei Ausübung jedoch auf einen festen Anteil von 3 % am Gesamtkapital des Unternehmens` (or `... auf einen festen Anteil von 3 % am Unternehmen`)

* **Exact phrase:** `deren Wertschöpfung weitaus weniger vom Einsatz von Arbeitskräften abhängt`
  * **Why it grates:** Dangling comparative without a comparative baseline (calquing *"whose value creation relies far less on labor"*), embedded in an already overloaded relative construction.
  * **Phrasing a native writer would use:** `deren Wertschöpfung kaum noch auf dem Einsatz menschlicher Arbeitskraft beruht`

* **Exact phrase:** `Wege zur Mitwirkung: wie Sie mitmachen können, wie das Unterzeichnen ablaufen würde und wie Sie beitragen können.`
  * **Why it grates:** Tautological repetition caused by translating distinct English phrasings (*get involved / contribute*) without adapting the German synonyms (*Mitwirkung / mitmachen / beitragen*).
  * **Phrasing a native writer would use:** `Wege zur Beteiligung: wie Sie mitwirken können, wie die Unterzeichnung ablaufen würde und welche Unterstützung gebraucht wird.`

VERDICT: REVISE

### de-fid-r1

# Review

> Reviewer: `vertex/gemini-3.7-flash@eu` · router router.eu.requesty.ai · geolocation eu · retention 0d · trained-on false · lab google
> 2026-11-13T22:47:51+00:00 · tokens in=4405 out=4425
> Prompt: REVIEW-PROMPT.md · Verbatim model output below ; do not edit.

> Bundle SHA-256: `c5c1eac405778decd946385c7e5be7c12ba87da685cbfb5bd56d727476598aa5`
> Prompt SHA-256: `9d89a5c37daf4ca29ec53132dd31aabe4b90373476a906c182c63471120b86fe`

### Review Findings

#### 1. `plainMenu.involved` / `involved.title` / `qa.items[7].links[0][1]`
* **Severity:** POLISH
* **Target text:** `"Helfen"` / `"helfen"`
* **Problem:** In civic and political participation contexts, translating *"Get involved"* as *"Helfen"* ("Help") leans toward charitable or crisis aid. In German civic initiatives, *"Mitmachen"* or *"Mitwirken"* is the natural, adult civic register.
* **Proposed correction:** Change to `"Mitmachen"` (or `"Mitwirken"`), maintaining consistency across the menu, the section title, and the QA link.

---

### Summary
The translation is of outstanding quality:
* **Fidelity & Register:** Precise civic register matching official EU German terminology (*Unionsbürgerinnen und Unionsbürger*, *AEUV*, *Begründung*, *Benennung*, *Reserve*).
* **Mechanics & Numbers:** Correct German number formatting (`7,5 Milliarden Euro`, `80-Fachen`, `3 %`), exact preservation of HTML tags, and clean punctuation with no em-dashes.
* **Naturalness:** Reads naturally as native German prose without English syntax calques.

VERDICT: PUBLISH

### de-fid-r3

# Review

> Reviewer: `vertex/gemini-3.7-flash@eu` · router router.eu.requesty.ai · geolocation eu · retention 0d · trained-on false · lab google
> 2026-11-13T22:50:14+00:00 · tokens in=4410 out=2739
> Prompt: REVIEW-PROMPT.md · Verbatim model output below ; do not edit.

> Bundle SHA-256: `cdaf2bddd3195e8c36f814148096f270ac485244e41545c8571bf3024ea7d9e8`
> Prompt SHA-256: `9d89a5c37daf4ca29ec53132dd31aabe4b90373476a906c182c63471120b86fe`

Here is the translation review for the German (`de`) dictionary:

### Findings

1. **`plainMenu.involved` / `involved.title` / `qa.items[7].links[0][1]`**
   * **Severity:** SHOULD-FIX
   * **Target text:** `"Helfen"` / `"helfen"`
   * **Problem:** "Get involved" in civic participation and EU citizen initiatives corresponds to *"Mitmachen"* or *"Mitwirken"*, whereas *"Helfen"* ("Help") sounds like charitable volunteering or customer assistance. In `involved.description`, the translator already naturally used *"Mitwirkung"* / *"mitmachen"*.
   * **Proposed correction:** Change `plainMenu.involved` and `involved.title` to `"Mitmachen"` (or `"Mitwirken"`), and `qa.items[7].links[0][1]` to `"mitmachen"`.

2. **`qa.items[2].a` / `qa.items[3].a` / `qa.items[5].a`**
   * **Severity:** SHOULD-FIX
   * **Target text:** `"In der wichtigsten Option..."`
   * **Problem:** In legislative/policy proposals presenting regulatory models, "the main option" refers to the baseline/primary regulatory variant (*Hauptoption* or *Grundoption*), not a subjective ranking of importance (*wichtigste Option*).
   * **Proposed correction:** Change `"In der wichtigsten Option"` to `"In der Hauptoption"` in all three occurrences (`qa.items[2].a`, `qa.items[3].a`, and `qa.items[5].a`).

3. **`qa.items[3].a`**
   * **Severity:** POLISH
   * **Target text:** `"In der wichtigsten Option entsteht der Anspruch erst mit der Benennung..."`
   * **Problem:** In `qa.items[2].a`, the company grants the fund a right/warrant (*"das Recht ein, später neue Anteile zu übernehmen"*). Translating "the right" in item 3 as *"der Anspruch"* is slightly inconsistent with item 2 and standard corporate law for share warrants/subscription rights (*Optionsrecht* / *Recht*), reserving *Anspruch* for the citizen payout entitlement.
   * **Proposed correction:** `"In der Hauptoption entsteht dieses Recht erst mit der Benennung des Unternehmens..."`

---

VERDICT: REVISE

### de-fid-r4

# Review

> Reviewer: `vertex/gemini-3.7-flash@eu` · router router.eu.requesty.ai · geolocation eu · retention 0d · trained-on false · lab google
> 2026-11-13T22:50:53+00:00 · tokens in=4536 out=3577
> Prompt: REVIEW-PROMPT.md · Verbatim model output below ; do not edit.

> Bundle SHA-256: `a720dde70b10a65459021fc9a886e16722c35820d6e903f4e0be3517b4c5f246`
> Prompt SHA-256: `9d89a5c37daf4ca29ec53132dd31aabe4b90373476a906c182c63471120b86fe`

The German translation has been reviewed against the English authoritative source.

### Quality and Compliance Assessment

1. **Fidelity:** Precise match to the English source without unjustified softening, exaggeration, or hedging discrepancies.
2. **Register:** High-quality EU civic register throughout. Correct use of institutional German terminology (`Unionsbürgerin und Unionsbürger`, `Rechtsgrundlage: Artikel 114 AEUV`, `Begründung`, `Marktuntersuchung`, `Benennung`, `Schwellenwerte`, `Nennwert`, `Reserve`).
3. **Consistency:** Consistent term mapping across all sections.
4. **Naturalness:** Phrasing is completely natural, idiomatic German suited for public institutional communication (e.g. *„ob dies rechtlich trägt, gehört zu den offenen Fragen“*, *„gehen deshalb leer aus“*).
5. **Mechanics:** 
   - German number formatting respected (`7,5 Milliarden Euro`, `3 %` with narrow/standard space before percent sign, `80-Fachen`).
   - HTML tags (`<em>...</em>`) preserved.
   - No em-dashes introduced.

No defects found.

VERDICT: PUBLISH

### de-fid-r5

# Review

> Reviewer: `vertex/gemini-3.7-flash@eu` · router router.eu.requesty.ai · geolocation eu · retention 0d · trained-on false · lab google
> 2026-11-13T22:51:14+00:00 · tokens in=4542 out=875
> Prompt: REVIEW-PROMPT.md · Verbatim model output below ; do not edit.

> Bundle SHA-256: `a148d8108d2d562713a347b40269a51df1fdf7e6a3a7b24e967462d71a485487`
> Prompt SHA-256: `9d89a5c37daf4ca29ec53132dd31aabe4b90373476a906c182c63471120b86fe`

The translation is exceptionally clean, accurate, and natural. The register is appropriately sober, civic, and aligned with German EU terminology (e.g., *Europäische Bürgerinitiative*, *Benennung*, *Verordnungsentwurf*). German spacing and typography rules (such as `3 %`, `7,5 Milliarden Euro`, `80-Fachen`) are respected, and tags/anchors are properly handled.

VERDICT: PUBLISH
