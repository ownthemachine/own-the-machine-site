---
gate: translation-fidelity, native-ear
target: plain front in Dutch (menu, home, Questions and answers, experts, get-involved), src/i18n/nl.mjs
verdict: fidelity PUBLISH (round 10, final text); native-ear REVISE (see disposition)
disposition: merged-with-fixes; remaining native-ear findings rejected and recorded below
date: 2026-11-12
---

# Plain front, Dutch: translation gate

The text was drafted by `review.sh` (machine first, input: the English blocks plus the existing Dutch dictionary for terminology), then gated with REVIEW-PROMPT.md (source and target) and NATIVE-EAR-PROMPT.md (target only, in reading order). Reviewer: `vertex/gemini-3.7-flash@eu`; from round 5 the native-ear pass was also run with `vertex/claude-opus-5@eu` (both EU, zero retention, not trained on). Eight rounds; each reviewed the text as it stood after the previous round's fixes.

The English wording is authoritative and was approved by the owner; the points that must not move (the ECI gloss, the money question second, "If the proposal were adopted", the tax answer ending on an open legal question with no mention of lawyers, "Who is behind this?" ending at "acting as a private citizen") were translated for meaning and not re-opened.

## Gate results

- Fidelity: R1 REVISE (3 findings, 2 applied), R2 REVISE (3, all rejected or moot: extra `langNames` key, a hyphen that does not apply to an adjective, and anchor ids that the reviewer was not shown the build for; the notes block added to the bundle from R3), R3 PUBLISH, R5 PUBLISH, R6 PUBLISH, R7 PUBLISH, R8 PUBLISH, R9 PUBLISH on the final text.
- Native ear: REVISE in every round, with a different list each time. The pass never saw the source or the existing dictionary, so it repeatedly asks to replace terms the site already uses, and its lists contradict across rounds (for example "possible", "éventuelle" and "projet d'initiative" were each flagged in turn). Findings that are language errors were applied; the rest are recorded as rejected below. This is the one gate that did not return PUBLISH and the owner or a human native reader should look at it before release.

## Editor disposition (12 November 2026)

| Round | Finding | Disposition |
|---|---|---|
| Draft | The first machine draft left out `involved.lead` and `involved.signLabel` (input cut one line short); re-run with the full input. Draft kept verbatim in translations/drafts/2026-11-12-plain-front-nl-r1.md. |  |
| Native ear, R1 to R6 | Applied: ungrammatical first answer ("Een voorstel dat ... zou moeten bezitten" became "Een voorstel om ervoor te zorgen dat ... bezit"); "Vandaag niet" became "Nu nog niet"; "duurt je hele leven" became "geldt levenslang"; "ontworpen dat het dat niet is" became "opgezet dat het geen belasting is"; "nieuwe aandelen te nemen" became "in te schrijven op nieuwe aandelen"; "verzilverd" became "afgekocht" (as in the existing Dutch text); "behouden een fractie minder" became "het aandeel ... wordt iets kleiner"; "behandelen" became "aanmerken" and then "naar EU-recht ... wordt aangemerkt"; "privéburger" became "op persoonlijke titel"; "het in dienst hebben van mensen" became "menselijke arbeid"; "lanceren eigen ideeën" became "komen met eigen ideeën"; "Bewijs en review" became "Bewijs en toetsing"; "onderdelen die het niet dekt" became "die daar niet onder vallen"; "de staat" became "de overheid"; "wetsvoorstel in te dienen" kept for the ECI gloss; language names made adjectives ("de Duitse startpagina"). |  |
| Rejected (repeated every round) | "format van de Commissie" (the existing Dutch dictionary uses it for the registration text everywhere); "hoofdoptie" (the project's own term, three uses in the existing Dutch content, and the English record rejected the same finding); "Bewijs" (existing label of the evidence page); "meerderjarig" for "volwassen" (existing Dutch text says "volwassen" for adult citizens); "verwatering" and "aandeelhouders" for "owners" (the source says owners; shareholders appear separately); "nominale waarde" findings that contradict each other between rounds; "Wie zit hierachter?" (translates the owner-approved question); the sentence-structure complaint about the designation answer (it mirrors the owner-approved English sentence; a restructure would be a change of wording, not of language). |  |
| Menu label | "Meedoen" was both the new section label and the existing footer label of the join page. The section is now "Meehelpen" ("Betrokken raken" was tried and withdrawn after the native-ear read: it suggests being implicated). |  |

Typography: Dutch follows the existing dictionary ("3 %", decimal comma, "je"). French follows the existing dictionary: ordinary spaces before : ; ? and the typographic apostrophe.

Link targets in `qa.items[].links` are page anchors generated from each language's own headings (the Dutch and French objection pages have Dutch and French ids); `scripts/check-plain-front.mjs` checks each one against the built page.

## Final text reviewed (round 9)

Round 9 is the fidelity pass on the final text, after the menu label changed from "Betrokken raken" to "Meehelpen" (the round 8 native-ear pass below still shows the earlier label).

# SOURCE (English, authoritative)

{
  "plainMenu": {
    "home": "Home",
    "qa": "Questions and answers",
    "experts": "For lawyers and experts",
    "involved": "Get involved",
    "about": "About",
    "faqPointer": "Short answers first:",
    "faqLabel": "Detailed FAQ",
    "notTranslated": "Not yet translated; opens the %LANG% home page"
  },
  "plainHome": {
    "title": "Own the Machine",
    "subtitle": "A share in the gains of automation, for every adult EU citizen.",
    "p1": "Machines are doing more of the work. Companies need fewer people to make the same things, and the profits go to a small number of very large companies and their shareholders. Most people own few or no shares, so they miss out.",
    "p2": "Countries are starting to respond, each in their own way. Even AI companies are floating their own ideas. But there is no common European approach, and a patchwork of national rules will not work for companies that operate across Europe.",
    "p3": "Own the Machine is a possible European Citizens’ Initiative, a way for one million citizens from at least seven Member States to ask the European Commission to propose a law. It asks the Commission to look at this and propose a common answer, so that every adult EU citizen can own a small share of what automation produces. It is designed to work without a new tax and without the state running companies; whether that holds in law is one of the open questions.",
    "basis": "Legal basis: Article 114 TFEU, with Article 352 for the parts it does not reach; no Treaty change.",
    "basisLink": "The proposal in the Commission’s format",
    "ctaQa": "Questions and answers",
    "ctaExperts": "For lawyers and experts",
    "smallprint": "Not registered. Nothing adopted. Nobody has endorsed it yet. The legal questions are being looked at.",
    "description": "A share in the gains of automation, for every adult EU citizen. A possible European Citizens’ Initiative; not registered, nothing adopted.",
    "sealLabel": "The seal of Own the Machine"
  },
  "qa": {
    "title": "Questions and answers",
    "description": "Short answers to the questions people ask first about Own the Machine, each with a link to the detail.",
    "detail": "Detail",
    "and": "and",
    "items": [
      {
        "q": "What is this, in one sentence?",
        "a": "A proposal that every adult EU citizen should own a small share of the gains of highly automated production.",
        "links": [
          [
            "/law/registration",
            "the registration text"
          ]
        ]
      },
      {
        "q": "Do I get money? How much, and when?",
        "a": "Not today: nothing exists yet. If the proposal were adopted, every adult EU citizen would get an equal share of what the fund pays out. Amounts depend on what it earns, after the fund has kept back enough to protect its capital, and could be small and infrequent at first. You would have to register with a national body to be paid. The right to future payouts is personal, lasts for your lifetime and cannot be sold or cashed in; money already paid into your account is yours and passes to your heirs. It is not a basic income.",
        "links": [
          [
            "/simulator",
            "the simulator, with its limits"
          ]
        ]
      },
      {
        "q": "Is this a tax?",
        "a": "It is designed not to be. In the main option, companies give the fund (the draft calls it the Reserve) the right to take new shares later (on a sale or listing, after a large payout to owners or after seven years), at a small face-value price; the companies never pay money, and nothing goes into a government budget. The existing owners keep a slightly smaller slice. Whether EU law would still treat it as a tax is an open legal question.",
        "links": [
          [
            "/law/objections#2-this-is-a-tax-and-the-eu-may-not-levy-it-this-way",
            "objections"
          ],
          [
            "/law/explanatory-memorandum#21-legal-basis",
            "legal basis"
          ]
        ]
      },
      {
        "q": "Would companies lose their property?",
        "a": "That is the hardest question. In the main option, the right starts only when a company is designated, but when used it covers a fixed 3 % of the whole company, including value that already exists. The fund pays a small price for the shares and has no vote. Whether that is fair enough under EU property rights is for lawyers to judge.",
        "links": [
          [
            "/law/objections#1-this-is-expropriation",
            "objections"
          ]
        ]
      },
      {
        "q": "Why the EU and not my own country?",
        "a": "The companies involved operate across Europe. If every country makes its own rules, companies face a patchwork and citizens in different countries are treated differently. A common approach avoids that.",
        "links": [
          [
            "/law/explanatory-memorandum#23-subsidiarity",
            "why the single market"
          ]
        ]
      },
      {
        "q": "Which companies would be covered?",
        "a": "In the main option, mainly very large companies that provide automated cognitive services, or goods and services whose production depends heavily on them, in at least three Member States (the draft starts from 7.5 billion euro of yearly EU turnover or 75 billion euro of market value, with a market value at least 80 times what they spend on their workforce, for two years running) whose output depends far less on employing people, and only after a check by the Commission. The Commission could also designate a company below those thresholds, but only after a market investigation. Small and medium businesses are unlikely to be covered.",
        "links": [
          [
            "/law/article-3",
            "designation criteria"
          ]
        ]
      },
      {
        "q": "Who is behind this?",
        "a": "David Vanheeswijck, a Belgian engineer and author of <em>The Horse Is Here to Stay</em>, acting as a private citizen.",
        "links": [
          [
            "/about",
            "about"
          ]
        ]
      },
      {
        "q": "How can I help?",
        "a": "Read, question and tell us what is unclear. Organisations can help shape the options.",
        "links": [
          [
            "/get-involved",
            "get involved"
          ]
        ]
      }
    ]
  },
  "experts": {
    "title": "For lawyers and experts",
    "description": "The full file: registration text, draft regulation, memorandum, objections, evidence and the review record.",
    "proposalHead": "The proposal",
    "regulationHead": "The draft regulation",
    "memorandumHead": "Memorandum and objections",
    "evidenceHead": "Evidence and review",
    "moreHead": "More",
    "allOfIt": "The draft regulation, in full",
    "overview": "The previous home page (full overview)",
    "startHead": "Start here",
    "allArticles": "All articles and annexes"
  },
  "involved": {
    "title": "Get involved",
    "description": "Ways to take part: join, how signing would work and how to contribute.",
    "lead": "What you can do now",
    "signLabel": "How signing would work"
  }
}

# TARGET (nl)

{
  "plainMenu": {
    "home": "Home",
    "qa": "Vragen en antwoorden",
    "experts": "Voor juristen en experts",
    "involved": "Meehelpen",
    "about": "Over ons",
    "faqPointer": "Eerst de korte antwoorden:",
    "faqLabel": "Veelgestelde vragen (uitgebreid)",
    "notTranslated": "Nog niet vertaald; opent de %LANG% startpagina",
    "langNames": {
      "de": "Duitse",
      "es": "Spaanse"
    }
  },
  "plainHome": {
    "title": "Own the Machine",
    "subtitle": "Een aandeel in de opbrengst van automatisering, voor elke volwassen EU-burger.",
    "p1": "Machines nemen steeds meer werk over. Bedrijven hebben minder mensen nodig om hetzelfde te maken, en de winst gaat naar een klein aantal zeer grote ondernemingen en hun aandeelhouders. De meeste mensen bezitten weinig of geen aandelen, en profiteren daar dus niet van.",
    "p2": "Landen beginnen te reageren, ieder op zijn eigen manier. Zelfs AI-bedrijven komen met eigen ideeën. Maar er is geen gezamenlijke Europese aanpak, en een lappendeken van nationale regels werkt niet voor bedrijven die in heel Europa actief zijn.",
    "p3": "Own the Machine is een mogelijk Europees burgerinitiatief: een manier waarop één miljoen burgers uit ten minste zeven lidstaten de Europese Commissie kunnen vragen een wetsvoorstel in te dienen. Met het initiatief wordt de Commissie gevraagd zich hierover te buigen en een gezamenlijk antwoord voor te stellen, zodat elke volwassen EU-burger een klein aandeel kan bezitten in wat automatisering oplevert. Het is zo opgezet dat het werkt zonder nieuwe belasting en zonder dat de overheid bedrijven leidt; of dat juridisch standhoudt, is een van de open vragen.",
    "basis": "Rechtsgrondslag: artikel 114 VWEU, met artikel 352 voor de onderdelen die daar niet onder vallen; geen verdragswijziging.",
    "basisLink": "Het voorstel in het format van de Commissie",
    "ctaQa": "Vragen en antwoorden",
    "ctaExperts": "Voor juristen en experts",
    "smallprint": "Niet geregistreerd. Er is niets aangenomen. Nog door niemand onderschreven. De juridische vragen worden onderzocht.",
    "description": "Een aandeel in de opbrengst van automatisering, voor elke volwassen EU-burger. Een mogelijk Europees burgerinitiatief; niet geregistreerd, niets aangenomen.",
    "sealLabel": "Het zegel van Own the Machine"
  },
  "qa": {
    "title": "Vragen en antwoorden",
    "description": "Korte antwoorden op de eerste vragen die mensen over Own the Machine stellen, elk met een link naar de details.",
    "detail": "Details",
    "and": "en",
    "items": [
      {
        "q": "Wat is dit, in één zin?",
        "a": "Een voorstel om ervoor te zorgen dat elke volwassen EU-burger een klein aandeel bezit in de opbrengst van sterk geautomatiseerde productie.",
        "links": [
          [
            "/law/registration",
            "de registratietekst"
          ]
        ]
      },
      {
        "q": "Krijg ik geld? Hoeveel, en wanneer?",
        "a": "Nu nog niet: er bestaat nog niets. Als het voorstel zou worden aangenomen, zou elke volwassen EU-burger een gelijk deel krijgen van wat het fonds uitkeert. De bedragen hangen af van wat het fonds oplevert, nadat het voldoende heeft gereserveerd om zijn kapitaal in stand te houden, en kunnen in het begin klein en onregelmatig zijn. Je zou je moeten registreren bij een nationale instantie om de uitbetaling te ontvangen. De aanspraak op toekomstige uitkeringen is persoonlijk, geldt levenslang en kan niet worden verkocht of afgekocht; geld dat al op je rekening is gestort, is van jou en gaat over op je erfgenamen. Het is geen basisinkomen.",
        "links": [
          [
            "/simulator",
            "de simulator, met zijn beperkingen"
          ]
        ]
      },
      {
        "q": "Is dit een belasting?",
        "a": "Het is zo opgezet dat het geen belasting is. In de hoofdoptie geven bedrijven het fonds (in het ontwerp de Reserve genoemd) het recht om later in te schrijven op nieuwe aandelen (bij een verkoop of beursgang, na een grote uitkering aan eigenaren of na zeven jaar), tegen een lage prijs ter hoogte van de nominale waarde; de bedrijven dragen nooit geld af, en er gaat niets naar een overheidsbegroting. Het aandeel van de bestaande eigenaren wordt iets kleiner. Of dit naar EU-recht toch als een belasting wordt aangemerkt, is een open juridische vraag.",
        "links": [
          [
            "/law/objections#2-dit-is-een-belasting-en-zo-mag-de-eu-die-niet-heffen",
            "bezwaren"
          ],
          [
            "/law/explanatory-memorandum#21-legal-basis",
            "rechtsgrondslag"
          ]
        ]
      },
      {
        "q": "Zouden bedrijven hun eigendom verliezen?",
        "a": "Dat is de moeilijkste vraag. In de hoofdoptie ontstaat het recht pas wanneer een onderneming wordt aangewezen, maar bij uitoefening betreft het een vaste 3 % van het gehele bedrijf, inclusief reeds bestaande waarde. Het fonds betaalt een lage prijs voor de aandelen en heeft geen stemrecht. Of dat billijk genoeg is in het licht van het eigendomsrecht in de EU, moeten juristen beoordelen.",
        "links": [
          [
            "/law/objections#1-dit-is-onteigening",
            "bezwaren"
          ]
        ]
      },
      {
        "q": "Waarom de EU en niet mijn eigen land?",
        "a": "De betrokken bedrijven zijn in heel Europa actief. Als elk land zijn eigen regels maakt, krijgen bedrijven te maken met een lappendeken en worden burgers in verschillende landen verschillend behandeld. Een gezamenlijke aanpak voorkomt dat.",
        "links": [
          [
            "/law/explanatory-memorandum#23-subsidiarity",
            "waarom de interne markt"
          ]
        ]
      },
      {
        "q": "Welke bedrijven zouden hieronder vallen?",
        "a": "In de hoofdoptie hoofdzakelijk zeer grote ondernemingen die geautomatiseerde cognitieve diensten leveren, of goederen en diensten waarvan de productie daar sterk van afhangt, in ten minste drie lidstaten (het ontwerp gaat uit van een jaaromzet van 7,5 miljard euro in de EU of een marktwaarde van 75 miljard euro, met een marktwaarde van minstens 80 keer hun personeelskosten, gedurende twee opeenvolgende jaren) waarvan de productie veel minder afhangt van menselijke arbeid, en alleen na toetsing door de Commissie. De Commissie zou ook een bedrijf onder die drempels kunnen aanwijzen, maar alleen na een marktonderzoek. Kleine en middelgrote ondernemingen vallen er waarschijnlijk niet onder.",
        "links": [
          [
            "/law/article-3",
            "aanwijzingscriteria"
          ]
        ]
      },
      {
        "q": "Wie zit hierachter?",
        "a": "David Vanheeswijck, een Belgische ingenieur en auteur van <em>The Horse Is Here to Stay</em>, op persoonlijke titel.",
        "links": [
          [
            "/about",
            "over ons"
          ]
        ]
      },
      {
        "q": "Hoe kan ik helpen?",
        "a": "Lees de teksten, stel vragen en laat ons weten wat onduidelijk is. Organisaties kunnen helpen de opties vorm te geven.",
        "links": [
          [
            "/get-involved",
            "meehelpen"
          ]
        ]
      }
    ]
  },
  "experts": {
    "title": "Voor juristen en experts",
    "description": "Het volledige dossier: registratietekst, ontwerpverordening, toelichting, bezwaren, bewijs en het toetsingsregister.",
    "proposalHead": "Het voorstel",
    "regulationHead": "De ontwerpverordening",
    "memorandumHead": "Toelichting en bezwaren",
    "evidenceHead": "Bewijs en toetsing",
    "moreHead": "Meer",
    "allOfIt": "De ontwerpverordening, integraal",
    "overview": "De vorige startpagina (volledig overzicht)",
    "startHead": "Begin hier",
    "allArticles": "Alle artikelen en bijlagen"
  },
  "involved": {
    "title": "Meehelpen",
    "description": "Manieren om deel te nemen: meedoen, hoe het ondertekenen zou verlopen en hoe je kunt bijdragen.",
    "lead": "Wat je nu kunt doen",
    "signLabel": "Hoe het ondertekenen zou verlopen"
  }
}

## Final fidelity verdict (round 9, verbatim)

> Bundle SHA-256: `c55970cae296cf161ee908ea682e3d54a69d24eb2542580c4d9082458ea1fe5e`
> Prompt SHA-256: `9d89a5c37daf4ca29ec53132dd31aabe4b90373476a906c182c63471120b86fe`

No defects found. The translation is accurate, maintains the sober civic and EU legal register, uses proper Dutch terminology (such as *VWEU*, *ontwerpverordening*, *rechtsgrondslag*, and *aanspraak*), correctly adapts punctuation and decimal conventions, and reads completely naturally.

VERDICT: PUBLISH

## Last native-ear output (round 8, verbatim, REVISE)

> Bundle SHA-256: `5bcbdcb8a1e9d87939492275f5e7ed1551950337f6effee215ed9b7145f7dbad`
> Prompt SHA-256: `67fd86112c8d58025a194b3d9b1e17f035ca9faa03d114702358f21516d49aee`

**"Het voorstel in het format van de Commissie"**
*Why it grates:* "Format" is corporate jargon/anglicism here. Official EU terminology refers to standard templates, forms, or models.
*Native phrasing:* "Het voorstel volgens het model van de Commissie" or "Het voorstel in het standaardstramien van de Commissie".

**"Details: de registratietekst"** (en soortgelijke herhalingen)
*Why it grates:* Direct translation of web-UI label "Details: [link]". In natural Dutch editorial/civic copy, this is either a running clause or uses standard link introductory phrasing.
*Native phrasing:* "Lees meer: de registratietekst" or "Meer informatie: de registratietekst".

**"...en kunnen in het begin klein en onregelmatig zijn."**
*Why it grates:* Collocation error. Monetary amounts (*bedragen*) in Dutch are *laag* or *beperkt*, not *klein* (which applies to physical size).
*Native phrasing:* "...en kunnen in het begin laag en onregelmatig zijn."

**"In de hoofdoptie"** (meerdere keren)
*Why it grates:* Calque of "In the main option". Dutch policy documents speak of a scenario, variant, or basic proposal.
*Native phrasing:* "In het basisvoorstel" or "In de hoofdvariant".

**"...tegen een lage prijs ter hoogte van de nominale waarde"**
*Why it grates:* Tautological and unidiomatic financial phrasing. Nominal value *is* the price.
*Native phrasing:* "...tegen de nominale waarde".

**"...betreft het een vaste 3 % van het gehele bedrijf"**
*Why it grates:* Calque of "it concerns a fixed 3% of the entire company". In Dutch, you hold a percentage *in* a company, and "vaste 3 %" without a noun is an unidiomatic loan construction.
*Native phrasing:* "...gaat het om een vast belang van 3% in de gehele onderneming".

**"In de hoofdoptie hoofdzakelijk zeer grote ondernemingen die geautomatiseerde cognitieve diensten leveren [...] waarvan de productie veel minder afhangt van menselijke arbeid, en alleen na toetsing door de Commissie."**
*Why it grates:* Syntactisch ontspoorde zin door een letterlijke vertaling van een Engels zinsdeel. De kern ontbreekt (geen persoonsvorm), waardoor het een opeenstapeling van bijzinnen wordt met een dubbele betrekkelijke bijzin (*die... waarvan...*).
*Native phrasing:* "Het basisvoorstel richt zich hoofdzakelijk op zeer grote ondernemingen die geautomatiseerde cognitieve diensten leveren (of producten die daar sterk van afhangen). Aanwijzing gebeurt pas na toetsing door de Commissie."

**"Betrokken raken"** (kop en menu-item)
*Why it grates:* Literal translation of "Getting involved". In Dutch, "betrokken raken" is passive and usually carries a negative connotation (e.g. *betrokken raken bij een ongeval/schandaal*). Civic calls to action use active forms.
*Native phrasing:* "Meedoen" or "Doe mee".

**"Bewijs en het toetsingsregister" / "Toelichting, bezwaren, bewijs..."**
*Why it grates:* "Bewijs" is an unedited translation of the policy term "Evidence". In Dutch policy and legislative contexts, supporting documentation and analytical grounding are called *onderbouwing* or *feitelijke onderbouwing*, not *bewijs* (which sounds like criminal evidence).
*Native phrasing:* "Onderbouwing en toetsingsregister".

---
VERDICT: REVISE

## Round 10: orchestrator's native read (12 November 2026)

| Finding | Disposition |
|---|---|
| "In de hoofdoptie" is new on the site and reads as a calque | Applied: "In de belangrijkste optie" in all three answers (tax, property, which companies). This reverses the earlier rejection that cited existing use of "hoofdoptie"; that claim was wrong for the live site. |
| "Met het initiatief wordt de Commissie gevraagd" | Applied: "Het initiatief vraagt de Commissie zich hierover te buigen en een gezamenlijk antwoord voor te stellen". |
| "format van de Commissie", "Over ons", "Bewijs" | Kept: established site terms. |

Fidelity gate, round 10, on the full blocks including the changed sentences:

> Bundle SHA-256: `3967cff36c708221a0005f696de7c4eff2ca6ed1c2f2945ce9a910535594846a`
> Prompt SHA-256: `9d89a5c37daf4ca29ec53132dd31aabe4b90373476a906c182c63471120b86fe`

The translation into Dutch (`nl`) has been reviewed against all criteria:

- **Fidelity & Register:** Precise, sober civic register matching standard EU Dutch terminology (e.g., *Rechtsgrondslag*, *artikel 114 VWEU*, *ontwerpverordening*, *aanspraak*, *aanwijzing*, *Reserve*).
- **Consistency & Naturalness:** Phrasing is natural, idiomatic Dutch without anglicisms or calques.
- **Mechanics:** Decimal comma notation (7,5 miljard euro), percent spacing, and inline HTML tags (`<em>`) are correctly preserved; no unwanted em-dashes.

No blocking issues or defects found.

VERDICT: PUBLISH
