---
gate: translation
target: content/nl/ (objections, severability, evidence, about, contribute)
verdict: REVISE
disposition: merged-with-fixes
date: 2026-08-19
---

# Long-form content, nl: fidelity gate + native-ear gate

Machine draft by a translation agent under the fixed terminology canon,
then the fidelity gate against the English source (two bundles), fixes
applied under the standing editorial policy, then the native-ear gate on
the rendered pages, and its fixes. Native verification remains the
pending top tier; status: gate-reviewed.

## Editor disposition (19 August 2026)

Fidelity: 7 applied, 1 rejected (te vergeven hebben is idiomatic), 3 pattern propagations including a calque the reviewer itself retained.
Native-ear round: applied per the locked-precedent policy (warrant stays,
the trimming metaphor stays, campaign voice protected); details in the
fix-agent reports archived with the session.

## Fidelity reviews (verbatim)


### Bundle: objections

# Review

> Reviewer: OpenRouter `google/gemini-3.7-flash` · 2026-08-19T09:50:14+00:00 · tokens in=17215 out=3770
> Prompt: [path removed] · Verbatim model output below — do not edit.

### Findings

#### 1. Section 2 & Status — Legal term of art / EU Regulation citation
- **Key path:** Section 2, paragraph 4 (`Herijking op grond van het redactieonderzoek...`) and Status paragraph
- **Severity:** SHOULD-FIX
- **Target text:** `De toets is of de vraag "zichtbaar buiten" de bevoegdheden van de Commissie valt (Verordening (EU) 2019/788, artikel 6, lid 3, onder c))` and `(de zichtbaar-buiten-toets, ...)`
- **Problem:** The official Dutch text of Regulation (EU) 2019/788, Article 6(3)(c) uses the term of art **"kennelijk buiten"** for the English *"manifestly outside"* (standard EU administrative and judicial terminology). Translating it as *"zichtbaar buiten"* misses the established legal threshold.
- **Proposed correction:** Replace `"zichtbaar buiten"` with `"kennelijk buiten"` in Section 2 and change `de zichtbaar-buiten-toets` to `de "kennelijk buiten"-toets` in the Status section.

---

#### 2. Section 2 — Anglicism / calque ("the ask")
- **Key path:** Section 2, paragraphs 2 & 3
- **Severity:** SHOULD-FIX
- **Target text:** 
  - `Dit is het bezwaar dat de volledige vraag het meest waarschijnlijk doodt bij toetsingspoort 1.`
  - `En de vraag moet gelaagd zijn, zodat, ...`
- **Problem:** *"De vraag"* is a literal calque of the political/advocacy colloquialism *"the ask"*. In Dutch, *"de vraag"* means "the question" or market demand, not a proposed initiative or petition. In this context (an ECI / regulatory submission), the natural and precise term is *"het verzoek"* or *"het voorstel"*.
- **Proposed correction:**
  - `Dit is het bezwaar dat het volledige voorstel het meest waarschijnlijk doodt bij toetsingspoort 1.`
  - `En het verzoek moet gelaagd zijn, zodat, ...`

---

#### 3. Section 6 — Naturalness / idiom calque ("is not us")
- **Key path:** Section 6, paragraph 4
- **Severity:** POLISH
- **Target text:** `...en dat wie iets anders belooft, niet wij zijn.`
- **Problem:** Word-for-word translation of *"and that anyone promising otherwise is not us"*. Unidiomatic phrasing in Dutch civic/analytical prose.
- **Proposed correction:** `...en dat wie iets anders belooft, dat in elk geval niet namens ons doet.` (or: `...en dat wij het niet zijn die iets anders beloven.`)

---

#### 4. Section 12 — Idiom / register ("not in the reserve's gift")
- **Key path:** Section 12, paragraph 1
- **Severity:** POLISH
- **Target text:** `...heeft de reserve niet te vergeven.`
- **Problem:** *"Niet te vergeven hebben"* translates *"not in the reserve's gift"*, but in modern Dutch *"vergeven"* in this sense is slightly awkward and risks being misread as "to forgive".
- **Proposed correction:** `...is niet iets wat de reserve kan bieden.` or `...ligt niet in de macht van de reserve om te schenken.`

---

VERDICT: REVISE


### Bundle: rest

# Review

> Reviewer: OpenRouter `google/gemini-3.7-flash` · 2026-08-19T09:50:13+00:00 · tokens in=13474 out=3643
> Prompt: [path removed] · Verbatim model output below — do not edit.

### Findings

#### 1. `contribute` -> Ways in / Draft
- **Severity**: SHOULD-FIX
- **Target text**: `Verbeter een artikel tegen de conventies van de Joint Practical Guide; de linter en de toetsingspoorten staan u op te wachten.`
- **Problem**: Calque of the English preposition "against" (*improve an article against the JPG conventions*). In Dutch, "tegen de conventies" means "contrary to / in violation of the conventions", reversing the intended meaning.
- **Proposed correction**: `Verbeter een artikel aan de hand van de conventies van de Joint Practical Guide; de linter en de toetsingspoorten staan u op te wachten.`

---

#### 2. `severability` -> Lead paragraph
- **Severity**: SHOULD-FIX
- **Target text**: `...en de toetsingspoort voor laaggetrouwheid beoordeelt de artikelen ertegen.`
- **Problem**: Calque of "reviews the articles against it". "Ertegen beoordelen" is unidiomatic Dutch.
- **Proposed correction**: `...en de toetsingspoort voor laaggetrouwheid toetst de artikelen daaraan.`

---

#### 3. `evidence` -> Section 3 & Section 5
- **Severity**: POLISH
- **Target text**: `De arbeidsparticipatie in de EU27 staat op een record van 76,3 %;` / `...verlaagt de arbeidsparticipatie met 0,16 tot 0,20 punt.`
- **Problem**: "Employment rate" is rendered as "arbeidsparticipatie" (activity/participation rate, which includes the unemployed). In official EU Dutch terminology and Eurostat series, "employment rate" is *werkgelegenheidsgraad*.
- **Proposed correction**: `De werkgelegenheidsgraad in de EU27 staat op een record van 76,3 %;` / `...verlaagt de werkgelegenheidsgraad met 0,16 tot 0,20 punt.`

---

#### 4. `severability` -> Decomposition rules (point 5)
- **Severity**: POLISH
- **Target text**: `...zodat gedeeltelijke registratie, als de Commissie daarop staat, de bijlage snoeit en niet de vraag.`
- **Problem**: "Als de Commissie daarop staat" is an anglicism calquing "if the Commission insists on it". In formal Dutch civic/institutional prose, *daaraan vasthoudt* or *daarop aandringt* is standard.
- **Proposed correction**: `...zodat gedeeltelijke registratie, als de Commissie daaraan vasthoudt, de bijlage snoeit en niet de vraag.`

---

VERDICT: REVISE


## Native-ear review (verbatim)

# Review

> Reviewer: OpenRouter `google/gemini-3.7-flash` · 2026-08-19T09:56:49+00:00 · tokens in=13510 out=2989
> Prompt: [path removed] · Verbatim model output below — do not edit.

Here is the native-ear editorial review of the Dutch text.

---

### Page: `/nl`
* **"openbaar geschreven"**
  * *Why it grates:* Unnatural calque of "written in public". In Dutch public administration / law, texts are drafted transparently or publicly.
  * *Native phrasing:* *in alle openbaarheid opgesteld* or *publiekelijk opgesteld*.
* **"met de bezwaren in hun sterkste vorm gepubliceerd vóór de artikelen"**
  * *Why it grates:* Clunky syntactic transfer (*published before the articles*). 
  * *Native phrasing:* *waarbij de zwaarste bezwaren nog vóór de artikelen worden behandeld*.
* **"warrant" / "stemrechtloze warrant"**
  * *Why it grates:* While *warrant* exists in Dutch financial terminology, EU and Dutch company law consistently use *aandelenoptie*, *inschrijvingsrecht* or *aandelenwarrant*. When introduced cold without context, it sounds like an unassimilated English loanword.
  * *Native phrasing:* *stemrechtloos inschrijvingsrecht* or *stemrechtloze aandelenwarrant*.
* **"pas uitgeoefend op het moment dat de eigenaren zelf verzilveren"**
  * *Why it grates:* "Verzilveren" used transitively/reflexively without an object is an awkward anglicism for "when the owners cash out / liquidate".
  * *Native phrasing:* *pas uitgeoefend op het moment dat de eigenaren zelf hun belang verzilveren* (or *cashen / te gelde maken*).
* **"Uitkeringen beginnen klein en groeien over een generatie aan."**
  * *Why it grates:* "Over een generatie" as a temporal duration is a direct English calque ("over a generation"). In Dutch, *over* indicates a point in time in the future (e.g. *over dertig jaar*), not duration spanning a generation.
  * *Native phrasing:* *groeien in de loop van één generatie aan* or *groeien over een periode van een generatie aan*.
* **"en argumenten verliest die ze verdiende te verliezen."**
  * *Why it grates:* *De wet* is grammatically masculine/feminine in NL/BE, but assigning moral merit with "verdiende te verliezen" (*deserved to lose*) applied to an abstract legislative process is an unidiomatic translation of English rhetoric.
  * *Native phrasing:* *en argumenten laat vallen die geen stand hielden*.
* **"de campagne steunt op haar eigen wettekst"**
  * *Why it grates:* Calque of "stands on its own". In Dutch, a text or proposal stands on its own feet or speaks for itself.
  * *Native phrasing:* *staat op zichzelf* or *rust louter op de eigen wettekst*.

---

### Page: `/nl/law`
* **"De Engelse tekst is het ontwerp."**
  * *Why it grates:* Literal translation of "The English text is the draft / authoritative version". Stilted and unclear.
  * *Native phrasing:* *De Engelse tekst geldt als basistekst / werkontwerp.*
* **"Deelbaarheid: wat het snoeien overleeft"**
  * *Why it grates:* Overly literal translation of "Severability: what survives pruning". "Snoeien" sounds agricultural/horticultural rather than legal.
  * *Native phrasing:* *Splitsbaarheid: wat overeind blijft na schrapping*.

---

### Page: `/nl/law/ledger`
* **"toetsingspoorten"**
  * *Why it grates:* Clunky literal calque of software engineering jargon "review gates / quality gates". In formal Dutch governance/legal design: *toetsingsfasen*, *kwaliteitspoorten*, or *controlepunten*.
  * *Native phrasing:* *toetsingsfasen* or *controlepoorten*.
* **"naleving van ontwerpbeperkingen"**
  * *Why it grates:* Calque of "design constraints". In policy/legal drafting: *ontwerprandvoorwaarden*.
  * *Native phrasing:* *naleving van de ontwerprandvoorwaarden*.
* **"klare-taallaag en de juridische laag"**
  * *Why it grates:* Synthetic compounding that mirrors English "plain-language layer".
  * *Native phrasing:* *tussen de begrijpelijke toelichting en de juridische wettekst*.
* **"Reviews gebeuren op tegenspraak"**
  * *Why it grates:* *Review* is an unnecessary anglicism in this formal register; *beoordelingen vinden plaats op tegenspraak*.
  * *Native phrasing:* *Beoordelingen vinden plaats op basis van tegenspraak*.
* **"geen twee wijzigingen dragen hetzelfde merk"**
  * *Why it grates:* Literal calque of "no two edits bear the same mark".
  * *Native phrasing:* *geen twee wijzigingen hebben hetzelfde kenmerk / dezelfde hash*.

---

### Page: `/nl/simulator`
* **"De simulator · marges, geen beloften"**
  * *Why it grates:* "Marges" used for uncertainty bands/ranges is an anglicism (margins/intervals).
  * *Native phrasing:* *Bandbreedtes, geen beloften* or *Onzekerheidsmarges, geen garanties*.
* **"de sceptische knop zet elke invoerwaarde in ons nadeel."**
  * *Why it grates:* Literal rendering of "the skeptical button sets every input to our disadvantage". Grates in Dutch technical UX.
  * *Native phrasing:* *met de knop 'conservatief' worden alle parameters op de meest ongunstige waarde gezet.*
* **"Mediane looptijd tot een liquiditeitsgebeurtenis" / "liquiditeitsgebeurtenis"**
  * *Why it grates:* "Liquiditeitsgebeurtenis" is a direct loan translation of "liquidity event". In Dutch corporate finance and legal parlance, this is an *exit*, *verzilveringsmoment* or *liquiditeitsmoment*.
  * *Native phrasing:* *Mediane looptijd tot exit* or *tot liquiditeitsmoment*.
* **"het instrument wacht."**
  * *Why it grates:* Over-dramatized English personification ("the instrument waits").
  * *Native phrasing:* *het mechanisme blijft van kracht* or *het instrument treedt pas dan in werking*.
* **"Herstel" (as a button/action next to scenario)**
  * *Why it grates:* Standard Dutch software localization for resetting inputs is *Standaardwaarden* or *Opnieuw instellen*, not *Herstel* (which means recovery/repair).
  * *Native phrasing:* *Opnieuw instellen* or *Herstellen naar standaard*.
* **"een driejarig glijdend gemiddelde met een bandbreedte van 125 %"**
  * *Why it grates:* *Glijdend gemiddelde* is a calque of "rolling/sliding average". The standard Dutch mathematical/statistical term is *voortschrijdend gemiddelde*.
  * *Native phrasing:* *driejarig voortschrijdend gemiddelde*.

---

### Page: `/nl/law/objections`
* **"Deze pagina is de geloofwaardigheidsstrategie van de campagne, niet haar biecht"**
  * *Why it grates:* Direct translation of "credibility strategy" and "confession". Sounds artificial in Dutch civic prose.
  * *Native phrasing:* *Deze pagina dient om de geloofwaardigheid van het voorstel te borgen, niet om schuld te bekennen*.
* **"Een dividend koopt status noch zingeving"**
  * *Why it grates:* Unnatural literal translation of "A dividend buys neither status nor meaning". In Dutch, money/dividends do not "buy" (*kopen*) abstract concepts like meaning or belonging without sounding like translated English.
  * *Native phrasing:* *Een dividend brengt noch aanzien noch zingeving*.
* **"als het instrument dit document niet overleeft, herstellen wij het instrument, niet het proza."**
  * *Why it grates:* "Herstellen" used for "fix / amend legislation" is an awkward calque. In Dutch drafting: *passen we het instrument aan*.
  * *Native phrasing:* *passen we het voorstel aan, niet het proza.*
* **"Drie structurele keuzes, geen ervan vrijblijvend."**
  * *Why it grates:* Direct calque of "none of them optional/discretionary".
  * *Native phrasing:* *Drie principiële keuzes, die alle drie dwingend zijn.*
* **"een gekwantificeerde waarborg dat niemand slechter af is"**
  * *Why it grates:* Calque of the "no creditor worse off" principle rendered stiffly.
  * *Native phrasing:* *het beginsel dat niemand slechter mag worden behandeld / de 'no creditor worse off'-waarborg*.
* **"registreerbaarheid"**
  * *Why it grates:* Clunky neologism in EU administrative law. In Dutch EU procedures regarding European Citizens' Initiatives (ECI/EBI), the term is *ontvankelijkheid voor registratie* or *de mogelijkheid tot registratie*.
  * *Native phrasing:* *de vatbaarheid voor registratie* or *de ontvankelijkheid*.
* **"waardoor de verplichting zou kunnen ineenzakken tot een vergoeding"**
  * *Why it grates:* "Ineenzakken" (collapse/slump) is physically descriptive and wrong for a legal reclassification (*recharacterization*).
  * *Native phrasing:* *waardoor de verplichting geherkwalificeerd kan worden als heffing / retributie*.
* **"afwentelingsantwoord"**
  * *Why it grates:* Awkward ad-hoc compound (*pass-through answer*).
  * *Native phrasing:* *het antwoord op het afwentelingsvraagstuk*.
* **"personeelsregels naar wezen boven vorm"**
  * *Why it grates:* Direct calque of English accounting jargon "substance over form".
  * *Native phrasing:* *waarbij de economische realiteit prevaleert boven de juridische vorm*.
* **"Een reserve met warrants op private microreuzen houdt papier zonder marktprijs"**
  * *Why it grates:* "Private microreuzen" (*private micro-giants*) is unassimilated Silicon Valley jargon translated literally. "Houdt papier" is a literal loan of "holds paper".
  * *Native phrasing:* *Een reserve met opties op niet-beursgenoteerde technologiereuzen bezit activa zonder marktprijs*.
* **"de op-tijd-toets"**
  * *Why it grates:* German-style hyphenated calque of an English catchphrase ("the on-time test").
  * *Native phrasing:* *de tijdigheidstoets*.
* **"Honingpot / Europa plundert honingpotten"**
  * *Why it grates:* "Honeypot" in Dutch denotes an IT security trap or espionage bait (honey trap). Using it for a capital fund (*capital pool / cash cow / reserve*) makes no sense in Dutch political/fiscal rhetoric.
  * *Native phrasing:* *U bouwt de volgende goudpot / melkkoe, en overheden plunderen reserves*.
* **"niet de dinsdagmiddag"**
  * *Why it grates:* Direct translation of an English rhetorical trope ("doesn't solve Tuesday afternoon"). Grates heavily in Dutch.
  * *Native phrasing:* *lost de leegte van alledag niet op* or *geeft geen invulling aan het dagelijks leven*.

---

### Page: `/nl/contribute` & `/nl/about`
* **"De wet als open broncode"**
  * *Why it grates:* "Open broncode" is unnatural; Dutch uses either *open source* (established loanword) or *open bron*.
  * *Native phrasing:* *Wetgeving als open source* or *Open source wetgeving*.
* **"Talen promoveren van machinevertaald naar door mensen geverifieerd"**
  * *Why it grates:* Calque of "Languages promote from machine-translated to human-verified". "Promoveren" in Dutch is strictly academic or sports-related (promotion vs relegation); it cannot be used transitively or reflexively for translation status levels.
  * *Native phrasing:* *Vertalingen gaan pas over van machinevertaling naar menselijke verificatie na controle...*
* **"Een drempel gevonden?"**
  * *Why it grates:* In digital accessibility (WCAG), "accessibility barrier" is translated as *toegankelijkheidsknelpunt* or *toegankelijkheidsprobleem*. "Drempel" sounds like a literal physical doorstep.
  * *Native phrasing:* *Toegankelijkheidsprobleem gevonden?*

---

VERDICT: REVISE
