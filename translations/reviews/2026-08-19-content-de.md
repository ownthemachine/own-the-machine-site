---
gate: translation
target: content/de/ (objections, severability, evidence, about, contribute)
verdict: REVISE
disposition: merged-with-fixes
date: 2026-08-19
---

# Long-form content, de: fidelity gate + native-ear gate

Machine draft by a translation agent under the fixed terminology canon,
then the fidelity gate against the English source (two bundles), fixes
applied under the standing editorial policy, then the native-ear gate on
the rendered pages, and its fixes. Native verification remains the
pending top tier; status: gate-reviewed.

## Editor disposition (19 August 2026)

Fidelity: 9 applied, 1 rejected (benanntes Unternehmen is locked terminology), 3 pattern propagations (Reihenhoch, Bankenrettung, Boden/Untergrenze).
Native-ear round: applied per the locked-precedent policy (warrant stays,
the trimming metaphor stays, campaign voice protected); details in the
fix-agent reports archived with the session.

## Fidelity reviews (verbatim)


### Bundle: objections

# Review

> Reviewer: OpenRouter `google/gemini-3.7-flash` · 2026-08-19T09:50:24+00:00 · tokens in=16740 out=5002
> Prompt: translations/REVIEW-PROMPT.md · Verbatim model output below — do not edit.

### Findings

#### 1. Terminology: `covered undertakings` / `covered firms` vs. `benannte Unternehmen`
* **Key path:** `objections > A.1, B.4, B.5, D.10`
* **Severity:** SHOULD-FIX
* **Target text:** `das benannte Unternehmen` / `die benannten Unternehmen`
* **Problem:** `covered undertakings` / `covered firms` refers to undertakings falling within the material and personal scope of the Regulation (*erfasste Unternehmen*). Translating this as *benannte Unternehmen* conflates general scope coverage with formal administrative designation (*Designation* / *Benennung*, such as DMA gatekeeper designation). Furthermore, Section 6 translates `The covered class` correctly as *Die erfasste Klasse*.
* **Proposed correction:** Replace *benannte(n) Unternehmen* with *erfasste(n) Unternehmen* across Sections 1, 4, 5, and 10 to maintain distinction from formal designation and ensure internal consistency.

---

#### 2. Calque / Translationese: `series high` -> `Reihenhoch`
* **Key path:** `objections > C.7 (Der Einwand, in aller Schärfe)`
* **Severity:** SHOULD-FIX
* **Target text:** `die deutsche steht auf einem Reihenhoch;`
* **Problem:** *Reihenhoch* is an unidiomatic literal calque of "series high" (time series high). In standard German economic analysis, this is rendered as *Höchststand der Zeitreihe* or *historischer Höchststand*.
* **Proposed correction:** `die deutsche verzeichnet einen Höchststand in der Zeitreihe;` or `die deutsche steht auf einem Höchststand;`.

---

#### 3. Calque / Idiom: `on Danish registers` -> `auf dänischen Registern`
* **Key path:** `objections > C.8 (Der Einwand, in aller Schärfe)`
* **Severity:** SHOULD-FIX
* **Target text:** `Humlum und Vestergaard, auf dänischen Registern mit fünfundzwanzigtausend Beschäftigten:`
* **Problem:** *auf dänischen Registern* is a literal calque of the English academic shorthand "on Danish registers". German empirical economics phrasing naturally uses *auf Basis dänischer Registerdaten* or *anhand dänischer Register*.
* **Proposed correction:** `Humlum und Vestergaard, auf Basis dänischer Registerdaten für fünfundzwanzigtausend Beschäftigte:`

---

#### 4. Calque: `arrives net of` -> `kommt netto nach [...] an`
* **Key path:** `objections > B.4 (Der Einwand, in aller Schärfe)`
* **Severity:** SHOULD-FIX
* **Target text:** `die Bürgerdividende kommt netto nach den eigenen höheren Preisen der Bürgerin an.`
* **Problem:** *kommt netto nach [...] an* is a stiff literal calque of "arrives net of...".
* **Proposed correction:** `die Bürgerdividende kommt abzüglich der von den Bürgern selbst gezahlten höheren Preise an.`

---

#### 5. Grammar / Idiom: `vorbehalten sein`
* **Key path:** `objections > D.9 (Die Antwort, die das Instrument geben muss)`
* **Severity:** POLISH
* **Target text:** `[...] und Änderungen der Schutzbestimmungen sind ausdrücklicher Gesetzesänderung vorbehalten [...]`
* **Problem:** The construction without an article (*sind ausdrücklicher Gesetzesänderung vorbehalten*) is grammatically unidiomatic; standard German legal drafting requires *bleiben einer ausdrücklichen Gesetzesänderung vorbehalten* or *sind einer ausdrücklichen Gesetzesänderung vorbehalten*.
* **Proposed correction:** `[...] und Änderungen der Schutzbestimmungen bleiben einer ausdrücklichen Gesetzesänderung vorbehalten [...]`

---

VERDICT: REVISE


### Bundle: rest

# Review

> Reviewer: OpenRouter `google/gemini-3.7-flash` · 2026-08-19T09:50:14+00:00 · tokens in=13172 out=3369
> Prompt: translations/REVIEW-PROMPT.md · Verbatim model output below — do not edit.

### Findings

#### 1. `severability` / Layer 0 / Gate 1 floor
- **Severity**: SHOULD-FIX
- **Target text**: `Die Registrierung von Schicht 0 ist der Boden der Prüfstufe 1`
- **Problem**: Calque of English idiom "floor" (minimum baseline / threshold). In German administrative/civic register, "Boden" sounds unnatural in this context.
- **Proposed correction**: `Die Registrierung von Schicht 0 ist die Mindestanforderung der Prüfstufe 1:` (or `...ist die Untergrenze der Prüfstufe 1:`)

---

#### 2. `severability` / Layer 3 / Gender consistency
- **Severity**: SHOULD-FIX
- **Target text**: `und einer unmittelbaren Eigentumsbeziehung zwischen Union und Bürgerin zu schaffen`
- **Problem**: The English source has "Union-to-citizen property relationship". Throughout the text, the civic register consistently uses the balanced plural `Bürgerinnen und Bürger` (cf. Layer 0, Layer 3 first sentence, about.md). Switching abruptly to the singular feminine `Bürgerin` breaks consistency and shifts legal tone.
- **Proposed correction**: `und einer unmittelbaren Eigentumsbeziehung zwischen Union und Bürgerinnen und Bürgern zu schaffen`

---

#### 3. `severability` / What this costs / Idiom calque
- **Severity**: SHOULD-FIX
- **Target text**: `Schicht 3 an ein zwischenstaatliches oder ein Nachfolgeinstrument zu verlieren, verliert Eleganz, nicht die Sache.`
- **Problem**: Literal calque of the English rhetorical structure "loses elegance, not the point". The repetitive construction `verlieren..., verliert... nicht die Sache` is unidiomatic German.
- **Proposed correction**: `Schicht 3 an ein zwischenstaatliches oder ein Nachfolgeinstrument zu verlieren, bedeutet einen Verlust an Eleganz, nicht an Substanz.` (or `...kostet Eleganz, nicht den Kern des Vorhabens.`)

---

#### 4. `evidence` / Section 4 (Ireland) / Preposition calque
- **Severity**: POLISH
- **Target text**: `weil er in die Bankenrettung liquidiert wurde.`
- **Problem**: Literal translation of "liquidated into the bank rescue". In German financial/legal context, one liquidates an asset *for* or *in the course of* a purpose.
- **Proposed correction**: `weil er für die Bankenrettung liquidiert wurde.` (or `...im Zuge der Bankenrettung liquidiert wurde.`)

---

#### 5. `about` / Funding / Pronoun agreement
- **Severity**: POLISH
- **Target text**: `Keine. Sobald es welche gibt, wird sie hier auf den Cent genau veröffentlicht`
- **Problem**: Grammatical collision between the plural indefinite pronoun `welche` and the singular head noun `Finanzierung` (`wird sie`).
- **Proposed correction**: `Keine. Sobald Finanzierung vorliegt, wird sie hier auf den Cent genau veröffentlicht,` (or `Sobald Mittel vorhanden sind, werden sie...`)

---

VERDICT: REVISE


## Native-ear review (verbatim)

# Review

> Reviewer: OpenRouter `google/gemini-3.7-flash` · 2026-08-19T09:57:13+00:00 · tokens in=12799 out=7034
> Prompt: translations/NATIVE-EAR-PROMPT.md · Verbatim model output below — do not edit.

### Exact Findings

* **»Erklärtes Interesse«** (S. `/de`, `/de/about`)
  * *Warum es stört:* Wörtliche Übersetzung des englischen Fachbegriffs *declaration / conflict of interest*. Im Deutschen unüblich und semantisch schief.
  * *Besseres Deutsch:* »Interessenerklärung«, »Transparenzhinweis« oder »Offenlegung von Interessenkonflikten«.

* **»in Geld zahlbar«** (S. `/de`)
  * *Warum es stört:* Lehnübersetzung von *payable in cash / money*. Im deutschen Zivil- und Wirtschaftsrecht unidiomatisch.
  * *Besseres Deutsch:* »in bar zu entrichten« oder »als Geldleistung zu erbringen«.

* **»gestempelt mit Commit 6e1fd70«** (S. `/de/law`)
  * *Warum es stört:* Ungelenke Lehnübertragung von *stamped with commit*. 
  * *Besseres Deutsch:* »auf Stand von Commit 6e1fd70« oder »gekennzeichnet mit Commit-Hash 6e1fd70«.

* **»Jedes Urteil wird ins Repository eingetragen, auch die, die wehgetan haben.«** (S. `/de/law/ledger`)
  * *Warum es stört:* Plumper Registerbruch. Das emotionale »die wehgetan haben« wirkt wie eine 1:1-Übersetzung von *even the ones that hurt* in einem ansonsten normativ-rechtlichen Dokument.
  * *Besseres Deutsch:* »[...] ausnahmslos jedes Urteil – auch solche mit negativem Ausgang.«

* **»Ein REVISE-Urteil wird nur mit einer schriftlichen Entscheidung des Herausgebers zusammengeführt.«** (S. `/de/law/ledger`)
  * *Warum es stört:* Ein Urteil (*verdict*) wird nicht »zusammengeführt« (*merged*). Hier wurde die Git-Metapher unreflektiert auf den juristischen Begriff übertragen.
  * *Besseres Deutsch:* »Ein Änderungsantrag mit dem Votum REVISE darf nur nach Vorliegen einer schriftlichen Entscheidung des Herausgebers übernommen werden.«

* **»Jede Eingabe unten trägt ihre Unsicherheit«** (S. `/de/simulator`)
  * *Warum es stört:* Schein-Anglizismus (*carries its uncertainty*).
  * *Besseres Deutsch:* »Jeder Eingabewert ist mit Unsicherheit behaftet«.

* **»Private Unternehmen können lange privat bleiben; das Instrument wartet.«** (S. `/de/simulator`)
  * *Warum es stört:* *Private company* bedeutet im Deutschen nicht »privates Unternehmen« (Gegenteil von staatlich), sondern »nicht börsennotiertes Unternehmen«.
  * *Besseres Deutsch:* »Nicht börsennotierte Unternehmen können lange in privater Hand bleiben [...]«.

* **»Das Band rechnet dieselbe Arithmetik an den Ober- und Untergrenzen Ihrer Eingaben.«** (S. `/de/simulator`)
  * *Warum es stört:* Starker Anglizismus (*runs the same arithmetic*). Arithmetik wird im Deutschen nicht »gerechnet«.
  * *Besseres Deutsch:* »Das Band wendet dieselbe Berechnung auf die Ober- und Untergrenzen Ihrer Eingaben an.«

* **»verwässert die bestehenden Anteilseigner«** (S. `/de/law/objections`, A.1)
  * *Warum es stört:* Man verwässert im deutschen Gesellschaftsrecht Anteile, Stimmrechte oder Beteiligungsquoten, nicht Personen (*dilutes the existing shareholders*).
  * *Besseres Deutsch:* »verwässert die Beteiligungen der Altaktionäre / Altgesellschafter«.

* **»feindselige Lesart des Juristischen Dienstes«** (S. `/de/law/objections`, A.1)
  * *Warum es stört:* Wörtliche Übersetzung von *hostile reading*. Im juristischen Kontext spricht man von Auslegung oder Lesart, aber nicht von »feindselig«.
  * *Besseres Deutsch:* »eine strenge/restriktive Auslegung durch den Juristischen Dienst«.

* **»damit die Verhältnismäßigkeitsprüfung einen Halt hat.«** (S. `/de/law/objections`, A.1)
  * *Warum es stört:* Schiefe Kollokation (*has a hold / footing*).
  * *Besseres Deutsch:* »damit die Verhältnismäßigkeitsprüfung tragfähig ist« oder »einer Verhältnismäßigkeitsprüfung standhält«.

* **»Die Dividendenseite hat kein Zuhause.«** (S. `/de/law/objections`, A.3)
  * *Warum es stört:* Metapher aus dem Englischen (*has no home*). In einer Gesetzgebungsanalyse stilistisch deplatziert.
  * *Besseres Deutsch:* »Für die Dividendenseite fehlt jede unionsrechtliche Grundlage.«

* **»Tabelle 29 macht den Punkt gegen uns:«** (S. `/de/law/objections`, A.3)
  * *Warum es stört:* Wörtlicher Calque von *makes the point against us*.
  * *Besseres Deutsch:* »Tabelle 29 liefert den Beleg gegen unsere Position:« oder »Tabelle 29 spricht gegen uns:«.

* **»Verwahrung und Ausschüttung föderieren über bestehende Schienen an die Mitgliedstaaten«** (S. `/de/law/objections`, A.3)
  * *Warum es stört:* Fachsprachlicher Kauderwelsch. *Federate* als transitives Verb (»föderieren an«) existiert so im Deutschen nicht; »Schienen« ist die unkritische Übernahme von *rails*.
  * *Besseres Deutsch:* »Verwahrung und Ausschüttung werden über bestehende nationale Kanäle/Strukturen dezentral an die Mitgliedstaaten übertragen«.

* **»Ein passiver Mega-Halter«** (S. `/de/law/objections`, B.6)
  * *Warum es stört:* Grauenhafte Lehnübersetzung von *mega-holder*.
  * *Besseres Deutsch:* »Ein passiver Großaktionär« oder »Ein passiver Großinvestor«.

* **»und dass, wer anderes verspricht, nicht wir sind.«** (S. `/de/law/objections`, B.6)
  * *Warum es stört:* Vollständiger syntaktischer Calque (*whoever promises otherwise is not us*). Im Deutschen grammatikalisch verunglückt.
  * *Besseres Deutsch:* »[...] und dass solche Versprechungen nicht von uns stammen.«

* **»schneidet die Verbreitungszahl in beide Richtungen«** (S. `/de/law/objections`, C.8)
  * *Warum es stört:* Wörtliche Übersetzung der Redewendung *cuts both ways*.
  * *Besseres Deutsch:* »wirkt die Verbreitungsquote in beide Richtungen« oder »ist die Verbreitungsquote ein zweischneidiges Schwert«.

* **»Ein Mechanismus [...] hatte seine aggregierte Chance noch nicht«** (S. `/de/law/objections`, C.8)
  * *Warum es stört:* Schiefer Calque (*hasn't had its aggregate chance yet*). Völlig unidiomatisch.
  * *Besseres Deutsch:* »Ein Mechanismus [...] konnte seine gesamtwirtschaftliche Wirkung noch gar nicht entfalten«.

* **»Spanien zog seinen Reservefonds um 97 % herunter«** (S. `/de/law/objections`, D.9)
  * *Warum es stört:* Wörtlich *drew down*. Im Deutschen schmilzt man Reserven ab oder baut sie ab.
  * *Besseres Deutsch:* »Spanien baute seinen Reservefonds um 97 % ab«.

* **»Die historische Grundquote dafür, dass europäische Staaten [...]«** (S. `/de/law/objections`, D.9)
  * *Warum es stört:* Falscher Freund für *base rate* (statistischer Begriff). Im Deutschen »Basisrate« oder »Wahrscheinlichkeit«.
  * *Besseres Deutsch:* »Die historische Basisrate dafür, dass [...]«.

* **»Innovatoren rund zwei Prozent des gesellschaftlichen Werts ihrer Innovationen einfangen«** (S. `/de/law/objections`, E.11)
  * *Warum es stört:* *Capture value* = Wert abschöpfen / Erträge vereinnahmen, nicht »Wert einfangen«.
  * *Besseres Deutsch:* »[...] rund zwei Prozent des gesellschaftlichen Werts ihrer Innovationen abschöpfen / für sich vereinnahmen«.

* **»Ein an der Tür beanspruchtes Instrument«** (S. `/de/law/objections`, E.11)
  * *Warum es stört:* Wörtlich aus *claimed at the door*. Sinnentstellend im Deutschen.
  * *Besseres Deutsch:* »Ein direkt beim Markteintritt begründeter Anspruch«.

* **»Eine Dividende kauft weder Status noch Sinn«** (S. `/de/law/objections`, E.12)
  * *Warum es stört:* *Money buys meaning* lässt sich im Deutschen nicht mit »Dividende kauft Sinn« übersetzen.
  * *Besseres Deutsch:* »Eine Dividende stiftet weder Status noch Sinn« oder »Mit einer Dividende lässt sich weder Status noch Sinn erwerben«.

* **»löst die Miete, nicht den Dienstagnachmittag«** (S. `/de/law/objections`, E.12)
  * *Warum es stört:* Völlig unverständliche Direktübersetzung einer englischen Floskel (*solves the rent, not Tuesday afternoon*).
  * *Besseres Deutsch:* »deckt zwar die Miete, strukturiert aber nicht den Alltag / füllt nicht die freie Zeit«.

* **»stehen nicht in der Gabe der Reserve.«** (S. `/de/law/objections`, E.12)
  * *Warum es stört:* Calque von *in the gift of*. Veraltet bis schief.
  * *Besseres Deutsch:* »liegen nicht in der Macht / im Ermessen der Reserve.«

* **»Baut Renten, keine Neuheiten.«** (S. `/de/law/objections`, E.14)
  * *Warum es stört:* Wörtlich *build pensions, not novelties*. Im Deutschen »baut« man Rentensysteme oder Altersvorsorgen aus, nicht »Renten«.
  * *Besseres Deutsch:* »Baut bestehende Rentensysteme aus, statt neue Instrumente zu erfinden.«

* **»Die Rente ist das Rohr; dies ist eine neue Quelle, die es speist.«** (S. `/de/law/objections`, E.14)
  * *Warum es stört:* Metapher aus dem Englischen (*the pipe*).
  * *Besseres Deutsch:* »Die Altersvorsorge ist die Leitung / das Verteilsystem; dies ist eine neue Quelle, die sie speist.«

* **»Wege hinein«** (S. `/de/contribute`)
  * *Warum es stört:* Hölzerne Übersetzung von *Ways in*.
  * *Besseres Deutsch:* »Mitwirkungsmöglichkeiten« oder »Wie Sie beitragen können«.

---

VERDICT: REVISE
