---
gate: translation-fidelity, native-ear
target: footer labels in four languages (nl, fr, de, es): last footer group heading (chrome.footNavAct), join link (chrome.join), contribute link (chrome.contribute)
verdict: fidelity PUBLISH (nl R3, fr R1, de R3, es R3); native-ear REVISE (advisory; see disposition)
disposition: merged-with-fixes; remaining findings rejected and recorded below
date: 2026-11-15
---

# Footer labels: translation gate

Intent: intent/site/2026-11-11-plain-front-launch.md, section "Footer labels (owner decision 23, 15/11/2026)". English is authoritative and unchanged in the heading; the English join and contribute labels are "Volunteer or become an organiser" and "Improve the text". Reviewer: `vertex/gemini-3.7-flash@eu` (EU, zero retention, not trained on). Input per language: the English footer labels, what each linked page is about, and the existing target dictionary for terminology. Dutch is neutral standard Dutch.

## Editor disposition (15 November 2026)

| Round | Finding | Disposition |
|---|---|---|
| nl R1, de R1, es R1 | "Ondertekenen" / "Unterzeichnen" (sign link) should say how signing works, as "How to sign" does | Rejected: the sign link is an existing label the owner decision keeps; the page title is unchanged. Not part of this change. |
| de R1 | Heading "Handeln, und über das Projekt" repeats the About link "Über das Projekt"; comma before "und" | Applied: "Handeln und wer wir sind". |
| es R1 | Heading "Actuar, y quiénes somos" repeats the About link "Quiénes somos"; comma before "y" | Applied: "Actuar y conocernos" (parallel to the French "Agir et nous connaître"); the About link is kept. |
| nl (editor) | Heading "Aan de slag, en over ons" repeats the About link "Over ons" (same defect as de; the reviewer missed it in R1 and caught it in R2) | Applied: "Aan de slag en wie we zijn". |
| nl R2, de R2, es R2 | Re-run by mistake on the unfixed headings (the edit script failed on macOS sed); the findings repeated R1 | Superseded by R3, run on the final text. |
| nl R3, de R3, es R3 | none | PUBLISH. |
| fr R1 | none | PUBLISH. |
| Native ear (all four) | "Helpen"/"Aider"/"Ayudar" bare infinitives; "Vrijwilliger of organisator worden", "Ser voluntario u organizador" infinitive strings; "Organisateur" as a calque; "Den Text verbessern" article; "Handeln und wer wir sind" unbalanced; bare "À propos" | Rejected: advisory pass, no terminology list, contradicts itself across languages. The infinitive label form is the existing register of the site (help, sign, press labels). "Organisateur" and "Organisator" are the words the join pages use (check-labels). The help-page and About labels are out of scope. A human native reader should still look before release. |

## Deviations from the owner table

English and French labels as proposed. Dutch, German and Spanish join and contribute labels as proposed. Three headings differ from the table, for the reason above: nl "Aan de slag en wie we zijn" (table: "Aan de slag, en over ons"), de "Handeln und wer wir sind" (table: "Handeln, und über das Projekt"), es "Actuar y conocernos" (table: "Actuar, y quiénes somos").

## Round outputs (verbatim)

### nl-r1

### Findings

**`signPageLink`** - **SHOULD-FIX**
* Target text: `"Ondertekenen"`
* Problem: Fidelity issue. The English source is `"How to sign"` because the page explains the signing mechanism (no signatures are collected yet). Rendering this as `"Ondertekenen"` implies an action link to sign immediately.
* Proposed correction: `"Hoe ondertekenen werkt"` (or `"Hoe u ondertekent"`)

---

VERDICT: REVISE

### nl-r3

No defects found. The Dutch translations are accurate, natural, follow standard Dutch conventions, and respect the explicit owner constraints regarding existing labels.

VERDICT: PUBLISH

### fr-r1

Findings: None.

The target strings are faithful, use natural and sober French civic phrasing, correctly preserve the target-language typographical rules (including capital accents like *À propos*), and align cleanly with the intended navigation semantics.

VERDICT: PUBLISH

### de-r1

### Findings

#### `footerGroupHeading` - SHOULD-FIX
* **Target text:** `"Handeln, und über das Projekt"`
* **Problem:** 
  1. Contains an ungrammatical comma before *und*.
  2. Repeats `aboutPageLink` (*"Über das Projekt"*), violating the requirement that the group heading must not repeat any link.
  3. Loses the personal civic tone of *"who we are"*.
* **Proposed correction:** `"Handeln und wer wir sind"`

---

#### `signPageLink` - SHOULD-FIX
* **Target text:** `"Unterzeichnen"`
* **Problem:** Fidelity / register defect. *"Unterzeichnen"* functions as a call-to-action button to sign immediately. The English source specifically uses *"How to sign"* because signatures are not yet being collected and the page explains the signing process.
* **Proposed correction:** `"Wie Sie unterzeichnen"` or `"So funktioniert die Unterzeichnung"`

---

VERDICT: REVISE

### de-r3

No defects found. The proposed German translations are accurate, natural, and respect all owner constraints and terminology choices.

VERDICT: PUBLISH

### es-r1

### Findings

#### `footerGroupHeading` - SHOULD-FIX
* **Target text:** `"Actuar, y quiénes somos"`
* **Problem:** 
  1. The comma before the conjunction *y* is an English punctuation calque. In Spanish, short coordinated phrases linked by *y* do not take a comma.
  2. With `aboutPageLink` translated as `"Quiénes somos"`, the heading directly repeats the link label, violating the requirement that the group heading must not repeat any link.
* **Proposed correction:** `"Actuar y quiénes somos"`

---

#### `aboutPageLink` - SHOULD-FIX
* **Target text:** `"Quiénes somos"`
* **Problem:** Direct repetition of the second element in `footerGroupHeading` (`"Actuar y quiénes somos"`). Translating `"About"` as `"Sobre nosotros"` or `"Acerca de"` resolves the redundancy and preserves natural Spanish site navigation terminology.
* **Proposed correction:** `"Sobre nosotros"`

---

VERDICT: REVISE

### es-r3

No defects found. The translations are faithful, use natural Spanish phrasing (including the correct use of the conjunction *u* before *organizador* in `joinPageLink`), and adhere to the project's sober civic register while avoiding duplicate labels.

VERDICT: PUBLISH

### nl-ear-r1

- **"Aan de slag en wie we zijn"**
  - *Why it grates:* An awkward coordination combining a dynamic idiom (*Aan de slag*) with a descriptive subordinate clause (*wie we zijn*). A native UI/editorial structure does not mix these styles into one nav header.
  - *Native phrasing:* "Meedoen en achtergrond" or "Aan de slag & Over ons".

- **"Helpen"**
  - *Why it grates:* Bare infinitive. In standard Dutch interface and civic copy, a call to action requires either the imperative (*Help mee*) or a nominal form (*Ondersteuning* / *Hulp*). Standalone *Helpen* sounds translated and childish.
  - *Native phrasing:* "Help mee" (call to action) or "Hulp" (support/FAQ).

- **"Vrijwilliger of organisator worden"**
  - *Why it grates:* Stilted and overly verbose infinitive string for a navigation element. 
  - *Native phrasing:* "Word vrijwilliger of organisator" (imperative) or "Aansluiten als vrijwilliger of organisator".

VERDICT: REVISE

### fr-ear-r1

* **"Agir et nous connaître"**  
  *Why it grates:* Unnatural pairing and sequencing for a navigation heading (likely a calque of an English label like "Take action and learn about us"). In French, institutional identification precedes action, or the two concepts are kept distinct.  
  *Native phrasing:* "Nous connaître et s'engager" or simply split into "Qui sommes-nous ?" and "Agir".

* **"Aider"**  
  *Why it grates:* An isolated transitive verb used as a navigation label without an object feels incomplete and awkward in a civic context. If it means "Help us", it lacks an object pronoun; if it means "FAQ / Support", it should be a noun.  
  *Native phrasing:* "Nous soutenir" (for civic/financial support) or "Aide" / "Besoin d'aide ?" (for technical/user support).

* **"Devenir bénévole ou organisateur"**  
  *Why it grates:* "Organisateur" used this way is a literal calque of the English "community organizer". In French civic and NGO contexts, "organisateur" refers specifically to an event planner, not an activist or core contributor.  
  *Native phrasing:* "Devenir bénévole ou coordinateur" or "Rejoindre l'équipe / le mouvement".

* **"À propos"**  
  *Why it grates:* Bare "À propos" is a pervasive web calque of English "About". In serious civic or institutional French, the preposition requires a complement or a proper heading noun phrase.  
  *Native phrasing:* "Qui sommes-nous ?" or "Présentation".

VERDICT: REVISE

### de-ear-r1

* **"Handeln und wer wir sind"**
  * *Why it grates:* Unbalanced, literal pairing of a substantivized verb/action concept with a subordinate clause (calque of "Take action and who we are" or "Act / Who we are"). Unnatural for German navigation structures.
  * *Native phrasing:* "Aktiv werden & Über uns" or "Mitmachen und Über uns".

* **"Freiwillig oder als Organisator mitarbeiten"**
  * *Why it grates:* Far too verbose and clumsy for a UI navigation element. "Freiwillig" as an isolated adverbial modifier in this coordination sounds translated and unidiomatic; German civic initiatives use standard terms like "ehrenamtlich".
  * *Native phrasing:* "Mitmachen" or "Ehrenamtlich mitwirken / mitorganisieren".

* **"Den Text verbessern"**
  * *Why it grates:* Unidiomatic use of the definite article ("Den") in a navigation label; reads like a literal translation of an English full-sentence string rather than standard German UI microcopy.
  * *Native phrasing:* "Text verbessern" or "Beitragen / Änderungsvorschlag einreichen".

VERDICT: REVISE

### es-ear-r1

- **"Actuar y conocernos"**  
  *Why it grates:* Clunky hybrid that mixes an intransitive action verb with a reciprocal/reflexive one. As a navigation section header in a civic context, it sounds artificially translated. Native navigation uses matching imperatives or concise nominal forms.  
  *Natural phrasing:* "Participa y conócenos", "Actúa y conócenos" or simply "Participación".

- **"Ser voluntario u organizador"**  
  *Why it grates:* Overly literal translation of an English infinitive ("To be a volunteer..."). In Spanish UI navigation and civic action calls, infinitive states sound passive and unnatural; active calls to action or nominal labels are expected.  
  *Natural phrasing:* "Hazte voluntario u organizador", "Súmate como voluntario u organizador" or "Voluntariado y organización".

- **"Ayudar"**  
  *Why it grates:* Bare infinitive that sounds rudimentary and robotic in navigation menus. Spanish civic platforms prefer collaborative action verbs or structured labels.  
  *Natural phrasing:* "Colabora", "Cómo ayudar" or "Cómo colaborar".

VERDICT: REVISE

