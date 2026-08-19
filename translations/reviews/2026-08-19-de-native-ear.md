---
gate: translation-native-ear
target: rendered de pages (no English source shown)
verdict: REVISE
disposition: merged-with-fixes
date: 2026-08-19
---

# Review

> Reviewer: OpenRouter `google/gemini-3.7-flash` · 2026-08-19T04:49:01+00:00 · tokens in=3275 out=2871
> Prompt: /Users/dave/.claude/jobs/44518f3c/tmp/site/translations/NATIVE-EAR-PROMPT.md · Verbatim model output below — do not edit.

* **„mit den Einwänden in voller Stärke vor den Artikeln veröffentlicht“**
  * *Warum es stört:* Lehnübersetzung des englischen Idioms *in full force* / *at full strength*. Im Deutschen kollokiert „Stärke“ nicht mit juristischen oder sachlichen Einwänden.
  * *Native Formulierung:* „mit den Einwänden in aller Schärfe […] vorangestellt“ oder „in vollem Umfang vor den Artikeln veröffentlicht“.

* **„einen gleichen, persönlichen, unantastbaren Anspruch an einer gemeinsamen Reserve“**
  * *Warum es stört:* Falsche Präpositionalrektion im juristischen Sprachgebrauch; ein Anspruch besteht *auf* eine Leistung oder *gegenüber* einem Rechtsträger, nicht *an einer* Reserve.
  * *Native Formulierung:* „einen gleichen, persönlichen, unantastbaren Anspruch auf die gemeinsame Reserve“ (oder: „gegenüber einer gemeinsamen Reserve“).

* **„Ausschüttungen beginnen klein“**
  * *Warum es stört:* Wörtliche Übersetzung von *distributions start small*. „Klein beginnen“ ist im wirtschaftlichen Kontext kein natürliches Deutsch.
  * *Native Formulierung:* „Die Ausschüttungen fallen anfangs gering aus“ oder „beginnen auf niedrigem Niveau“.

* **„wie das Gesetz mit sich selbst streitet und Argumente verliert, die es verdient hatte zu verlieren“**
  * *Warum es stört:* *To lose an argument* bedeutet im Deutschen nicht „ein Argument verlieren“ (was wie ein Missgeschick klingt), sondern „eine Debatte verlieren“ oder „von einer Position abrücken müssen“.
  * *Native Formulierung:* „wie der Entwurf um den richtigen Weg ringt und unhaltbare Argumente verwirft“.

* **„die Kampagne steht auf ihrem eigenen Rechtstext“**
  * *Warum es stört:* Anglizismus nach *stands on its own*. Im Deutschen steht eine Kampagne nicht „auf einem Text“.
  * *Native Formulierung:* „die Kampagne stützt sich ganz auf ihren Rechtstext“ oder „der Rechtstext spricht für sich selbst“.

* **„Teilbarkeit: was das Zurechtstutzen überlebt“**
  * *Warum es stört:* Falsches Register. „Zurechtstutzen“ ist salopp-umgangssprachlich und verfehlt den juristischen Fachbegriff der salvatorischen Klausel bzw. geltungserhaltenden Reduktion (*severability / pruning*).
  * *Native Formulierung:* „Teilbarkeit: Was im Fall von Streichungen Bestand hat“ oder „Teilnichtigkeit: Fortbestand der Regelungen“.

* **„Den ganzen Entwurf mitnehmen“**
  * *Warum es stört:* Typischer Call-to-Action-Anglizismus (*take the draft with you*). Im deutschen Rechts- und Publikationskontext unüblich für das Herunterladen von Dokumenten.
  * *Native Formulierung:* „Den vollständigen Entwurf herunterladen“ oder „Gesamtdokument abrufen“.

* **„gegnerischer Anwalt“** (als Prüfinstanz im Ledger)
  * *Warum es stört:* Hölzerne 1:1-Übersetzung von *opposing counsel* / *adversarial review*. Im Deutschen wirkt die Rollenbezeichnung isoliert wie eine Parteibezeichnung im Prozess.
  * *Native Formulierung:* „Widerspruchsprüfung“ oder „Advocatus Diaboli“.

* **„Die Dividende, ehrlich“**
  * *Warum es stört:* Englische Überschriftenstruktur (*The dividend, honestly*). Im Deutschen wirkt die nachgestellte Floskel deplatziert.
  * *Native Formulierung:* „Die Dividende: eine ehrliche Rechnung“ oder „Ungeschönte Dividendenprognose“.

* **„der Skeptiker-Knopf stellt jede Eingabe gegen uns“**
  * *Warum es stört:* Reiner Calque von *sets every input against us*. Im Deutschen „stellt“ man keine Zahlenwerte „gegen uns“.
  * *Native Formulierung:* „Die Skeptiker-Einstellung wählt für alle Variablen das ungünstigste Szenario“ (oder: „rechnet mit den pessimistischsten Annahmen“).

* **„Mediane Jahre bis zu einem Liquiditätsereignis“**
  * *Warum es stört:* Englische Wortstellung und Adjektivbildung (*Median years to liquidity event*). „Mediane Jahre“ existiert im Deutschen als Fachausdruck nicht.
  * *Native Formulierung:* „Jahre bis zum Liquiditätsereignis (Median)“ oder „Mittlere Dauer bis zum Liquiditätsereignis“.

* **„Wenig annehmen“** (Button)
  * *Warum es stört:* Holprige wörtliche Wiedergabe von *Assume low* / *low estimates*.
  * *Native Formulierung:* „Konservative Annahmen“ oder „Pessimistisches Szenario“.

* **„an den pessimistischen und optimistischen Rändern Ihrer Eingaben“**
  * *Warum es stört:* *Edges/bounds* wörtlich mit „Rändern“ übersetzt. Bei Modellparametern spricht man von Grenzen oder Grenzwerten.
  * *Native Formulierung:* „anhand der Ober- und Untergrenzen Ihrer Eingaben“ oder „an den Eckwerten Ihrer Eingaben“.

VERDICT: REVISE


---

## Editor disposition (19 August 2026)

This pass exists because the initiator caught with a focused read what
the bundle-review missed: same model, narrower aperture, higher recall.
The native-ear pass reads the rendered page in the target language
alone, no English source, and now runs alongside the fidelity gate.

All findings accepted: in aller Schärfe, Anspruch auf, fallen anfangs
gering aus, ringt und verwirft, stützt sich auf, was bei Streichungen
Bestand hat (Zurechtstutzen was genuinely salopp), herunterladen,
Advocatus Diaboli, ehrlich gerechnet, Konservative Annahmen, the
simulator labels and bounds.

Cross-language decisions harmonised in this round: the sceptic button
is the conservative-scenario family everywhere, the hostile-counsel
gate is the devil's-advocate family everywhere, "adversarial" renders
as the contradictoire/tegenspraak/kontradiktorisch/contradictorio
family, and download labels shed their takeaway-counter register.
