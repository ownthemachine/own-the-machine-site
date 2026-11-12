---
gate: translation-fidelity, native-ear
target: plain front in French (menu, home, Questions and answers, experts, get-involved), src/i18n/fr.mjs
verdict: fidelity PUBLISH (round 8, final text); native-ear REVISE (see disposition)
disposition: merged-with-fixes; remaining native-ear findings rejected and recorded below
date: 2026-11-12
---

# Plain front, French: translation gate

The text was drafted by `review.sh` (machine first, input: the English blocks plus the existing French dictionary for terminology), then gated with REVIEW-PROMPT.md (source and target) and NATIVE-EAR-PROMPT.md (target only, in reading order). Reviewer: `vertex/gemini-3.7-flash@eu`; from round 5 the native-ear pass was also run with `vertex/claude-opus-5@eu` (both EU, zero retention, not trained on). Eight rounds; each reviewed the text as it stood after the previous round's fixes.

The English wording is authoritative and was approved by the owner; the points that must not move (the ECI gloss, the money question second, "If the proposal were adopted", the tax answer ending on an open legal question with no mention of lawyers, "Who is behind this?" ending at "acting as a private citizen") were translated for meaning and not re-opened.

## Gate results

- Fidelity: R1 PUBLISH (2 polish findings, applied), R2 PUBLISH, R3 PUBLISH, R5 PUBLISH, R6 PUBLISH, R8 PUBLISH on the final text.
- Native ear: REVISE in every round, with a different list each time. The pass never saw the source or the existing dictionary, so it repeatedly asks to replace terms the site already uses, and its lists contradict across rounds (for example "possible", "éventuelle" and "projet d'initiative" were each flagged in turn). Findings that are language errors were applied; the rest are recorded as rejected below. This is the one gate that did not return PUBLISH and the owner or a human native reader should look at it before release.

## Editor disposition (12 November 2026)

| Round | Finding | Disposition |
|---|---|---|
| Draft | Same input cut as Dutch; re-run with the full input. Draft kept verbatim in translations/drafts/2026-11-12-plain-front-fr-r1.md. |  |
| Native ear, R1 to R6 | Applied: "chacun à sa manière"; "Détail:" had no space before the colon in the review bundle (real defect, fixed with `qa.sep`) and became "Pour en savoir plus :"; "une possible initiative" became "un projet d'initiative citoyenne européenne"; "Elle demande" became "Il demande" (antecedent); "Pas aujourd'hui" became "Pas pour l'instant"; "ne peut être ni vendu ni encaissé par anticipation" became "ni vendu ni racheté" (as in the existing French text); "pour être payé" became "pour recevoir les versements"; "Vous devriez vous inscrire" became "Il vous faudrait vous inscrire"; "leur propriété" became "ce qu'elles possèdent"; "valeur marchande" became "valeur de marché" (existing usage); "dont la production en dépend" became "dépend ... de ces services"; "Lisez, questionnez" became "Lisez, posez vos questions"; "Rien d'adopté" became "Rien n'a été adopté"; "prix minime" became "prix modique"; "sans que l'État ne dirige" lost the expletive ne; "aucune modification des traités" became "sans révision des traités"; "plus tard" became "ultérieurement". |  |
| Rejected (repeated every round) | "dans le format de la Commission" (existing French label of the registration text); "texte d'enregistrement" (existing term); "Preuves" and "revue" (existing labels: Preuves, revue complète); "capitalisation boursière" for market value (the source and Article 3 say market value, and private companies have none); "citoyen majeur" (existing French text says "citoyen adulte"); "incessible" (the existing French text says "vendu, nanti ou racheté"); "suffisamment équitable" replaced by proportionality language (the English says "fair enough", a lay question; naming a legal test would be a new claim); "Comment puis-je aider" was changed to "contribuer" only to converge; "ouvre la page d'accueil" (mirrors the English hint). |  |
| Menu label | "Participer" was both the new section label and the existing footer label of the join page. The section is now "S'impliquer". |  |

Typography: Dutch follows the existing dictionary ("3 %", decimal comma, "je"). French follows the existing dictionary: ordinary spaces before : ; ? and the typographic apostrophe.

Link targets in `qa.items[].links` are page anchors generated from each language's own headings (the Dutch and French objection pages have Dutch and French ids); `scripts/check-plain-front.mjs` checks each one against the built page.

## Final text reviewed (round 8)

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


# TARGET (fr)

{
  "plainMenu": {
    "home": "Accueil",
    "qa": "Questions et réponses",
    "experts": "Pour les juristes et experts",
    "involved": "S’impliquer",
    "about": "À propos",
    "faqPointer": "Les réponses courtes d’abord :",
    "faqLabel": "FAQ détaillée",
    "notTranslated": "Pas encore traduit ; ouvre la page d’accueil en %LANG%",
    "langNames": {
      "de": "allemand",
      "es": "espagnol"
    }
  },
  "plainHome": {
    "title": "Own the Machine",
    "subtitle": "Une part des gains de l’automatisation, pour chaque citoyen adulte de l’UE.",
    "p1": "Les machines effectuent une part croissante du travail. Les entreprises ont besoin de moins de personnes pour produire autant, et les profits reviennent à un petit nombre de très grandes entreprises et à leurs actionnaires. La plupart des gens possèdent peu ou pas d’actions et n’en profitent donc pas.",
    "p2": "Les pays commencent à réagir, chacun à sa manière. Même les entreprises d’IA avancent leurs propres idées. Mais il n’existe aucune approche européenne commune, et une mosaïque de règles nationales ne fonctionnera pas pour les entreprises qui exercent leurs activités dans toute l’Europe.",
    "p3": "Own the Machine est un projet d’initiative citoyenne européenne, un moyen pour un million de citoyens d’au moins sept États membres de demander à la Commission européenne de proposer une loi. Il demande à la Commission d’étudier la question et de proposer une réponse commune, afin que chaque citoyen adulte de l’UE puisse détenir une petite part de ce que produit l’automatisation. Il est conçu pour fonctionner sans nouvel impôt et sans que l’État dirige les entreprises ; la validité juridique de ce mécanisme reste l’une des questions ouvertes.",
    "basis": "Base juridique : article 114 du TFUE, complété par l’article 352 pour les aspects que le premier ne couvre pas ; sans révision des traités.",
    "basisLink": "La proposition, dans le format de la Commission",
    "ctaQa": "Questions et réponses",
    "ctaExperts": "Pour les juristes et experts",
    "smallprint": "Initiative non enregistrée. Rien n’a été adopté. Personne ne l’a encore soutenue. Les questions juridiques sont à l’examen.",
    "description": "Une part des gains de l’automatisation, pour chaque citoyen adulte de l’UE. Un projet d’initiative citoyenne européenne ; non enregistré, rien n’a été adopté.",
    "sealLabel": "Le sceau d’Own the Machine"
  },
  "qa": {
    "title": "Questions et réponses",
    "description": "Des réponses courtes aux questions les plus fréquentes sur Own the Machine, chacune avec un lien vers le détail.",
    "detail": "Pour en savoir plus",
    "sep": " :",
    "and": "et",
    "items": [
      {
        "q": "De quoi s’agit-il, en une phrase ?",
        "a": "Une proposition pour que chaque citoyen adulte de l’UE détienne une petite part des gains de la production hautement automatisée.",
        "links": [
          [
            "/law/registration",
            "le texte d’enregistrement"
          ]
        ]
      },
      {
        "q": "Vais-je recevoir de l’argent ? Combien, et quand ?",
        "a": "Pas pour l’instant : rien n’existe encore. Si la proposition était adoptée, chaque citoyen adulte de l’UE recevrait une part égale de ce que distribue le fonds. Les montants dépendent de ce que le fonds rapporte, après avoir mis de côté de quoi préserver son capital ; ils pourraient être faibles, et les versements espacés, au début. Il vous faudrait vous inscrire auprès d’un organisme national pour recevoir les versements. Le droit aux versements futurs est personnel, viager, et ne peut être ni vendu ni racheté ; l’argent déjà versé sur votre compte vous appartient et est transmis à vos héritiers. Il ne s’agit pas d’un revenu de base.",
        "links": [
          [
            "/simulator",
            "le simulateur, avec ses limites"
          ]
        ]
      },
      {
        "q": "Est-ce un impôt ?",
        "a": "Le mécanisme est conçu pour ne pas en être un. Dans l’option principale, les entreprises accordent au fonds (que le projet nomme la Réserve) le droit de souscrire de nouvelles actions ultérieurement (lors d’une cession ou d’une introduction en bourse, après une distribution importante aux actionnaires ou après sept ans), à une faible valeur nominale ; les entreprises ne versent jamais d’argent et rien ne va dans un budget public. Les actionnaires actuels conservent une part légèrement réduite. Savoir si le droit de l’UE le qualifierait tout de même d’impôt est une question juridique ouverte.",
        "links": [
          [
            "/law/objections#2-c39est-un-impt-et-l39union-ne-peut-pas-le-lever-ainsi",
            "objections"
          ],
          [
            "/law/explanatory-memorandum#21-legal-basis",
            "base juridique"
          ]
        ]
      },
      {
        "q": "Les entreprises perdraient-elles ce qu’elles possèdent ?",
        "a": "C’est la question la plus difficile. Dans l’option principale, le droit ne naît que lorsqu’une entreprise est désignée, mais lorsqu’il est exercé, il porte sur une fraction fixe de 3 % de l’ensemble de l’entreprise, y compris la valeur préexistante. Le fonds paie un prix modique pour les actions et ne dispose d’aucun droit de vote. Il revient aux juristes d’apprécier si cela est suffisamment équitable au regard du droit de propriété dans l’UE.",
        "links": [
          [
            "/law/objections#1-c39est-une-expropriation",
            "objections"
          ]
        ]
      },
      {
        "q": "Pourquoi l’UE et non mon propre pays ?",
        "a": "Les entreprises concernées exercent leurs activités dans toute l’Europe. Si chaque pays établit ses propres règles, les entreprises sont confrontées à une mosaïque de réglementations et les citoyens de pays différents sont traités différemment. Une approche commune permet d’éviter cela.",
        "links": [
          [
            "/law/explanatory-memorandum#23-subsidiarity",
            "pourquoi le marché unique"
          ]
        ]
      },
      {
        "q": "Quelles entreprises seraient concernées ?",
        "a": "Dans l’option principale, essentiellement de très grandes entreprises fournissant des services cognitifs automatisés, ou des biens et services dont la production dépend fortement de ces services, dans au moins trois États membres (le projet prend pour point de départ 7,5 milliards d’euros de chiffre d’affaires annuel dans l’UE ou 75 milliards d’euros de valeur de marché, avec une valeur de marché représentant au moins 80 fois leurs dépenses de personnel, pendant deux années consécutives) dont la production dépend beaucoup moins de l’emploi de personnel, et seulement après un contrôle par la Commission. La Commission pourrait également désigner une entreprise n’atteignant pas ces seuils, mais uniquement à l’issue d’une enquête de marché. Il est peu probable que les petites et moyennes entreprises soient concernées.",
        "links": [
          [
            "/law/article-3",
            "critères de désignation"
          ]
        ]
      },
      {
        "q": "Qui est à l’origine de ce projet ?",
        "a": "David Vanheeswijck, ingénieur belge et auteur de <em>The Horse Is Here to Stay</em>, agissant en tant que simple citoyen.",
        "links": [
          [
            "/about",
            "à propos"
          ]
        ]
      },
      {
        "q": "Comment puis-je contribuer ?",
        "a": "Lisez, posez vos questions et dites-nous ce qui n’est pas clair. Les organisations peuvent contribuer à définir les options.",
        "links": [
          [
            "/get-involved",
            "s’impliquer"
          ]
        ]
      }
    ]
  },
  "experts": {
    "title": "Pour les juristes et experts",
    "description": "Le dossier complet : texte d’enregistrement, projet de règlement, exposé des motifs, objections, preuves et registre de la revue.",
    "proposalHead": "La proposition",
    "regulationHead": "Le projet de règlement",
    "memorandumHead": "Exposé des motifs et objections",
    "evidenceHead": "Preuves et revue",
    "moreHead": "En savoir plus",
    "allOfIt": "Le projet de règlement, dans son intégralité",
    "overview": "L’ancienne page d’accueil (vue d’ensemble complète)",
    "startHead": "Commencer ici",
    "allArticles": "Tous les articles et annexes"
  },
  "involved": {
    "title": "S’impliquer",
    "description": "Les moyens d’agir : nous rejoindre, modalités de signature et façons de contribuer.",
    "lead": "Ce que vous pouvez faire dès maintenant",
    "signLabel": "Comment se déroulerait la signature"
  }
}


## Final fidelity verdict (round 8, verbatim)

> Bundle SHA-256: `3ea6957a6844d27f5aadabe4a8f2b6c78e2c8540442664f9cfd8a168abcf9cdc`
> Prompt SHA-256: `9d89a5c37daf4ca29ec53132dd31aabe4b90373476a906c182c63471120b86fe`

### Review Summary

The translation into French (`fr`) is of exceptionally high quality:
- **Fidelity & Register:** Accurately reflects the sober, adult civic register of the English source. EU legal terms of art are correctly rendered according to EU French conventions (*exposé des motifs*, *projet de règlement*, *TFUE*, *Réserve*, *enquête de marché*).
- **Consistency:** Core terms and phrases are consistent across navigation, home page, QA, and expert sections.
- **Naturalness:** Idiomatic and authentic French phrasing without calques (e.g., rendering *"lasts for your lifetime"* as *viager*, *"the draft starts from"* as *le projet prend pour point de départ*).
- **Mechanics:** Decimal comma convention respected (`7,5 milliards d’euros`), space before percentage sign preserved (`3 %`), French typography rules (non-breaking spaces before colons/semicolons) respected, `%LANG%` placeholder and `<em>` HTML tags properly preserved, and no unapproved em-dashes introduced.

No defects found.

VERDICT: PUBLISH

## Last native-ear output (round 8, verbatim, REVISE)

> Bundle SHA-256: `699b757374c50b940e214b40a716236b61fb910c873e27b91a6d0d632d1ea9b4`
> Prompt SHA-256: `67fd86112c8d58025a194b3d9b1e17f035ca9faa03d114702358f21516d49aee`

### Findings

* **« citoyen adulte de l’UE »**
  * *Why it grates:* Calque of *adult citizen*. In French legal and civic parlance, civil capacity is designated by majority, not adulthood.
  * *Native phrasing:* « citoyen européen majeur » ou « citoyen majeur de l’UE ».

* **« une mosaïque de règles nationales »**
  * *Why it grates:* Literal translation of *a patchwork of national rules*. In institutional French, *mosaïque* has a positive or descriptive connotation (diversity, cultural richness), not a dysfunctional one.
  * *Native phrasing:* « un morcellement réglementaire » ou « un enchevêtrement de règles nationales ».

* **« Il demande à la Commission »**
  * *Why it grates:* In EU terminology, an initiative does not “demand” (*demander*); it formally invites or calls upon the Commission (*inviter* / *demander à* with proper institutional tone). Moreover, an ICE is feminine (*une initiative*).
  * *Native phrasing:* « Elle invite la Commission à… »

* **« l’une des questions ouvertes » / « une question juridique ouverte »**
  * *Why it grates:* Severe false friend. In French, a *question ouverte* is an open-ended question (as opposed to *question fermée*, multiple choice). *Open question* meaning an unresolved issue is a direct anglicism.
  * *Native phrasing:* « une question juridique en suspens » ou « un point de droit non tranché ».

* **« dans le format de la Commission »**
  * *Why it grates:* Calque of *in the Commission's format*.
  * *Native phrasing:* « au format officiel de la Commission » ou « selon le modèle requis par la Commission ».

* **« après avoir mis de côté de quoi préserver son capital »**
  * *Why it grates:* Excessively colloquial register for a financial and institutional proposal (*mettre de côté de quoi…*).
  * *Native phrasing:* « après constitution des réserves nécessaires au maintien de son capital » ou « déduction faite des sommes requises pour préserver son capital ».

* **« ils pourraient être faibles, et les versements espacés, au début. »**
  * *Why it grates:* The rhythm and punctuation mirror English comma splicing, resulting in a disjointed French cadence.
  * *Native phrasing:* « dans un premier temps, les montants pourraient être modestes et les versements espacés. »

* **« est transmis à vos héritiers »**
  * *Why it grates:* Passive calque. In succession law, assets are transmitted by operation of law, using pronominal or active constructions.
  * *Native phrasing:* « revient à vos héritiers » ou « est transmis à votre succession ».

* **« à une faible valeur nominale »**
  * *Why it grates:* Clunky corporate finance phrasing (*at a low nominal value*).
  * *Native phrasing:* « à leur valeur nominale » ou « à un prix d’émission modique ».

* **« si cela est suffisamment équitable au regard du droit de propriété »**
  * *Why it grates:* Calque of *sufficiently fair under property law*. In EU law, property rights under Article 17 of the Charter are evaluated through conformity, legality, and proportionality (*proportionné* / *conforme*), not vague “equitableness” (*équitable*).
  * *Native phrasing:* « si ce mécanisme est conforme au droit de propriété garanti par le droit de l’UE » ou « s’il respecte le droit de propriété ».

* **« dont la production dépend beaucoup moins de l’emploi de personnel »** (dans la section *Quelles entreprises seraient concernées ?*)
  * *Why it grates:* Syntactic collapse caused by stacking subordinate clauses and parentheses from an English nested sentence; the relative pronoun *dont* is separated from its antecedent by two lines of text.
  * *Native phrasing:* Restructure the sentence completely, for instance: « […] de très grandes entreprises dont la production repose peu sur le travail humain et qui fournissent des services cognitifs automatisés […] ».

* **« Preuves et revue » / « registre de la revue »**
  * *Why it grates:* *Revue* used here is a raw calque of *review* (peer review / review log). In French, *revue* alone means a magazine/journal or a military inspection.
  * *Native phrasing:* « Données et relectures » / « Journal des révisions » (ou « Historique des relectures »).

---

VERDICT: REVISE
