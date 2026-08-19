---
gate: translation-native-ear
target: rendered nl pages (no English source shown)
verdict: REVISE
disposition: merged-with-fixes
date: 2026-08-19
---

# Review

> Reviewer: OpenRouter `google/gemini-3.7-flash` · 2026-08-19T04:49:05+00:00 · tokens in=3397 out=3746
> Prompt: /Users/dave/.claude/jobs/44518f3c/tmp/site/translations/NATIVE-EAR-PROMPT.md · Verbatim model output below — do not edit.

### Findings

* **`arbeid op schaal`**
  * *Issue:* Direct loan translation of the English business idiom "labour at scale". Unnatural in Dutch civic/economic discourse.
  * *Native phrasing:* `grootschalige arbeid` or `arbeid op grote schaal`.

* **`pas opgeëist op het moment dat de eigenaren zelf verzilveren`**
  * *Issue:* Financial/legal misnomer. Warrants are *exercised* (`uitgeoefend` or `gelicht`), not "claimed" (`opgeëist`). Furthermore, "warrants verzilveren" used intransitively later in the text is ungrammatical.
  * *Native phrasing:* `pas uitgeoefend op het moment dat de eigenaren zelf verzilveren` (and for the warrants: `naarmate warrants worden uitgeoefend/verzilverd`).

* **`houdt een [...] aanspraak in een gemeenschappelijke Reserve`**
  * *Issue:* Incorrect prepositional collocation. In Dutch legal terminology, one holds an entitlement *to* (`aanspraak op`), not *in* (`in`).
  * *Native phrasing:* `heeft een [...] aanspraak op een gemeenschappelijke Reserve`.

* **`Geen middelentoets`**
  * *Issue:* Raw calque of the English welfare term "means test". Standard Dutch social security terminology uses *draagkrachttoets*, *vermogenstoets*, or *inkomens- en vermogenstoets*.
  * *Native phrasing:* `Geen inkomenstoets, geen vermogenstoets` or `Geen draagkrachttoets`.

* **`vijandig gereviewd` / `vijandige toetsingspoorten` / `vijandig uitgevoerd`**
  * *Issue:* Direct translation of "adversarially reviewed / adversarial gates". In Dutch, *vijandig* exclusively connotes military or personal malice/hostility. For rigorous scrutiny and adversarial procedures, standard administrative/legal Dutch uses *tegensprekelijk*, *onafhankelijk getoetst*, or *onderworpen aan tegenspraak*.
  * *Native phrasing:* `onderworpen aan strenge tegenspraak` / `onafhankelijke toetsingsfasen` / `met tegenspraak uitgevoerd`.

* **`Gemeld belang:`**
  * *Issue:* Calque of "Declared interest:" / "Disclosure:".
  * *Native phrasing:* `Belangenverklaring:` or `Openbaarmaking van belangen:`.

* **`burgerdeelname in geautomatiseerde productiviteitswinsten`**
  * *Issue:* Incorrect preposition. One participates *in* (`deelname aan`), not *inside* (`in`).
  * *Native phrasing:* `burgerparticipatie in` or `deelname van burgers aan geautomatiseerde productiviteitswinsten`.

* **`Neem het hele ontwerp mee`**
  * *Issue:* Overly literal translation of "Take the whole draft with you".
  * *Native phrasing:* `Download het volledige ontwerp` or `Het volledige ontwerp in één bestand`.

* **`wordt samengevoegd` / `samenvoegcriterium`**
  * *Issue:* Direct calque of Git's "merged" / "merge criterion" applied raw to legislative text, producing baffling legal jargon.
  * *Native phrasing:* `wordt opgenomen / verwerkt` and `opnamecriterium` (or keep explicit Git terminology in technical notes).

* **`advocaat van de tegenpartij`**
  * *Issue:* Literal calque of "opposing counsel" / "devil's advocate" in a review context. In Dutch, opposing counsel is an actual litigant party; in a critical stress-test method, this is a counter-advocate or devil's advocate.
  * *Native phrasing:* `advocaat van de duivel` or `tegenpleiter`.

* **`ook de oordelen die pijn deden`**
  * *Issue:* Emotionalized English colloquial idiom ("even the ones that hurt") out of place in sober civic text.
  * *Native phrasing:* `ook de kritische/afwijzende oordelen`.

* **`Het dividend, eerlijk`**
  * *Issue:* Calque of the English rhetorical device "The dividend, honest".
  * *Native phrasing:* `Eerlijk over het dividend` or `Het reële dividend`.

* **`Elke invoer hieronder draagt haar onzekerheid`**
  * *Issue:* Literal translation of "Each input below carries its uncertainty".
  * *Native phrasing:* `Aan elke invoerwaarde kleeft een mate van onzekerheid` or `Elke invoervariabele kent een onzekerheidsmarge`.

* **`de scepticusknop zet elke invoer tegen ons in`**
  * *Issue:* Calque of "the skeptic toggle sets every input against us".
  * *Native phrasing:* `de sceptische stand kiest bij elke invoerwaarde het meest behoudende scenario`.

* **`Mediane jaren tot een liquiditeitsgebeurtenis` / `mediane gebeurtenisvertraging`**
  * *Issue:* Unidiomatic calques ("Median years to a liquidity event" / "median event lag").
  * *Native phrasing:* `Mediane looptijd tot liquiditeit/beursgang` and `de mediane doorlooptijd tot verzilvering`.

* **`Ga uit van weinig`**
  * *Issue:* Literal translation of "Assume low / Assume little".
  * *Native phrasing:* `Behoudend scenario` or `Pessimistisch uitgangspunt`.

* **`De band draait dezelfde rekensom op de pessimistische en optimistische uiteinden van je invoer.`**
  * *Issue:* English syntax and idiom calque ("runs the same calculation on the... ends of your input").
  * *Native phrasing:* `De bandbreedte toont dezelfde berekening voor zowel de meest pessimistische als de meest optimistische uitersten van uw invoer.`

* **`De wet is een repository`**
  * *Issue:* Untranslated programming jargon presented without integration into Dutch grammatical context.
  * *Native phrasing:* `De wettekst als openbare repository` or `De wet als open broncode`.

---

VERDICT: REVISE


---

## Editor disposition (19 August 2026)

This pass exists because the initiator caught with a focused read what
the bundle-review missed: same model, narrower aperture, higher recall.
The native-ear pass reads the rendered page in the target language
alone, no English source, and now runs alongside the fidelity gate.

All seventeen findings triaged; fifteen accepted outright (uitgeoefend,
aanspraak op, deelname aan, inkomens- of vermogenstoets,
Belangenverklaring, the tegenspraak family for adversarial, opgenomen
for merged, Advocaat van de duivel, Behoudend scenario, the simulator
labels). Two accepted with modification to keep the campaign's voice:
"die hard aankwamen" instead of the reviewer's flattening
"kritische/afwijzende oordelen", and "Eerlijk over het dividend" for
the title.

Cross-language decisions harmonised in this round: the sceptic button
is the conservative-scenario family everywhere, the hostile-counsel
gate is the devil's-advocate family everywhere, "adversarial" renders
as the contradictoire/tegenspraak/kontradiktorisch/contradictorio
family, and download labels shed their takeaway-counter register.
