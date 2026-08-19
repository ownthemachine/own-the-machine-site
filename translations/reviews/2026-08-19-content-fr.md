---
gate: translation
target: content/fr/ (objections, severability, evidence, about, contribute)
verdict: REVISE
disposition: merged-with-fixes
date: 2026-08-19
---

# Long-form content, fr: fidelity gate + native-ear gate

Machine draft by a translation agent under the fixed terminology canon,
then the fidelity gate against the English source (two bundles), fixes
applied under the standing editorial policy, then the native-ear gate on
the rendered pages, and its fixes. Native verification remains the
pending top tier; status: gate-reviewed.

## Editor disposition (19 August 2026)

Fidelity: 12 applied, 1 rejected (entreprise designee is locked terminology), droit-individuel and drafted-against patterns propagated to 6 further occurrences.
Native-ear round: applied per the locked-precedent policy (warrant stays,
the trimming metaphor stays, campaign voice protected); details in the
fix-agent reports archived with the session.

## Fidelity reviews (verbatim)


### Bundle: objections

# Review

> Reviewer: OpenRouter `google/gemini-3.7-flash` · 2026-08-19T09:50:38+00:00 · tokens in=16987 out=8019
> Prompt: translations/REVIEW-PROMPT.md · Verbatim model output below — do not edit.

### 1. `E.12 / The answer`
- **Severity**: SHOULD-FIX
- **Target text**: `la structure, la considération et l'appartenance que l'emploi fournit par surcroît ne sont pas dans le don de la réserve.`
- **Problem**: Idiom calque. *"In someone's gift"* cannot be rendered literally as *"dans le don de"*, which is ungrammatical and meaningless in French.
- **Proposed correction**: `la structure, la considération et l'appartenance que l'emploi fournit par surcroît ne sont pas au pouvoir de la réserve.` (or `...ne relèvent pas de ce que la réserve peut offrir.`)

---

### 2. `C.8 / The answer`
- **Severity**: SHOULD-FIX
- **Target text**: `Deuxièmement, le chiffre de diffusion coupe dans les deux sens :`
- **Problem**: Idiom calque. *"Cuts both ways"* translated literally as *"coupe dans les deux sens"*. A native French writer would say *"est à double tranchant"* or *"joue dans les deux sens"*.
- **Proposed correction**: `Deuxièmement, le chiffre de diffusion est à double tranchant :` (or `...joue dans les deux sens :`)

---

### 3. `A.1, B.4, B.5, B.6, D.10 / Terminology ("covered undertakings / firms / class")`
- **Severity**: SHOULD-FIX
- **Target text**: 
  - A.1: `l'entreprise désignée reçoit la sécurité juridique...`
  - B.4: `les entreprises désignées ajustent leurs prix...`
  - B.5: `Les entreprises désignées partiront, ou ne viendront jamais`
  - B.6: `La catégorie désignée est dominée par des entreprises non cotées.`
  - D.10: `L'obligation court directement des entreprises désignées vers la réserve :`
- **Problem**: Systematic mistranslation of *covered* as *désignée*. In EU law, *covered undertakings* are *entreprises assujetties* (or *entreprises visées / relevant du champ d'application*). Translating *covered* as *désignée* creates direct confusion with formal administrative designation (*designation* under the DMA, as referenced in section B.5: *"gatekeepers absorbed designation"* / *"les contrôleurs d'accès ont absorbé la désignation"*).
- **Proposed correction**: Use `entreprises assujetties` (or `entreprises visées`) for *covered undertakings/firms*, and `Le champ des entreprises assujetties` for *the covered class*.

---

### 4. `The constraints table / DC-30`
- **Severity**: SHOULD-FIX
- **Target text**: `Les éléments essentiels (déclencheur, propriété de la réserve, droit personnel, ingérence) dans les articles, jamais délégués`
- **Problem**: *Entitlement* translated as *droit personnel*. In civil law, a *droit personnel* is a specific technical category (a claim against a debtor vs a real right /*droit réel*). Here, *entitlement* refers to the citizen's statutory right/claim to their share (*droit individuel* / *droit à attribution*), consistent with DC-22 (*droits individuels*).
- **Proposed correction**: `Les éléments essentiels (déclencheur, propriété de la réserve, droit individuel, ingérence) dans les articles, jamais délégués`

---

### 5. `E.13 / The answer`
- **Severity**: POLISH
- **Target text**: `Le slogan est la réponse en quelques mots : le capital pour tous, et le dividende suit.`
- **Problem**: Softened fidelity. *"In six words"* is reduced to *"en quelques mots"*, losing the crisp rhetorical precision of the source.
- **Proposed correction**: `Le slogan est la réponse en six mots : capital pour tous, le dividende suit.` (or `Le slogan est la réponse en six mots : le capital pour tous, le dividende suit.`)

---

### 6. `A.1 / The objection`
- **Severity**: POLISH
- **Target text**: `constitue une prise de propriété.`
- **Problem**: Calque of *"takes property"*. In French constitutional/property law register, the standard phrasing is *porte atteinte au droit de propriété* or *constitue une privation de propriété* (which naturally links with *privation de propriété* in the next sentence).
- **Proposed correction**: `constitue une privation de propriété.` (or `porte atteinte au droit de propriété.`)

---

VERDICT: REVISE


### Bundle: rest

# Review

> Reviewer: OpenRouter `google/gemini-3.7-flash` · 2026-08-19T09:50:14+00:00 · tokens in=13372 out=4038
> Prompt: translations/REVIEW-PROMPT.md · Verbatim model output below — do not edit.

### severability

#### `Layer 3 / paragraph 2`
- **Severity**: SHOULD-FIX
- **Target text**: `et son exigence d'unanimité est intégrée dans le prix.`
- **Problem**: Calque of the financial/English idiom *"is priced in"*. In French prose, this reads as an unedited literal translation.
- **Correction**: `et son exigence d'unanimité est pleinement intégrée au calcul.` (or `est prise en compte dès le départ.`)

---

### evidence

#### `Section 3 / bullet 1`
- **Severity**: SHOULD-FIX
- **Target text**: `Quiconque fonde une loi sur une part salariale en effondrement perd l'argument en Europe, donc cette loi ne le fait pas.`
- **Problem**: Calque of *"loses the argument"*. *"Perdre l'argument"* is not natural French.
- **Correction**: `Quiconque fonde une loi sur un effondrement de la part salariale perd d'avance le débat en Europe, et cette loi s'en garde donc bien.`

#### `Section 3 / paragraph 2`
- **Severity**: SHOULD-FIX
- **Target text**: `la Commission doit rapporter que la prémisse n'est pas étayée et proposer une modification ou une abrogation.`
- **Problem**: Calque of *"must report that"*. In French administrative/institutional contexts, *"rapporter que"* means to recount or snitch; reporting in a formal review is *"conclure dans son rapport que"* or *"indiquer dans un rapport que"*.
- **Correction**: `la Commission doit conclure dans son rapport que la prémisse n'est pas étayée et proposer une modification ou une abrogation.`

#### `Section 4 / bullet 1`
- **Severity**: SHOULD-FIX
- **Target text**: `et l'article 12 de ce règlement est rédigé contre ses verbes énumérés.`
- **Problem**: Calque of *"drafted against its enumerated verbs"*. *"Rédigé contre"* is unnatural.
- **Correction**: `et l'article 12 de ce règlement est rédigé pour parer précisément à chacun des verbes qu'elle énumère.`

#### `Section 6 / bullet 1`
- **Severity**: POLISH
- **Target text**: `Trois mesures défendables de la part salariale diffèrent de jusqu'à 19 points.`
- **Problem**: Clunky syntax (*"diffèrent de jusqu'à"*).
- **Correction**: `Trois mesures défendables de la part salariale présentent des écarts pouvant atteindre 19 points.`

---

### about

#### `Section "Vos données"`
- **Severity**: POLISH
- **Target text**: `Il n'y a pas de bandeau de consentement parce qu'il n'y a rien à consentir.`
- **Problem**: *"Rien à consentir"* is awkward in French.
- **Correction**: `Il n'y a pas de bandeau de consentement parce qu'il n'y a aucun consentement à recueillir.`

---

### contribute

#### `Intro paragraph`
- **Severity**: SHOULD-FIX
- **Target text**: `Le projet s'améliore comme s'améliore l'open source : en public, par pull request, contre des critères énoncés.`
- **Problem**: *"Contre des critères"* is a calque of *"against stated criteria"*. In French, testing or evaluating against criteria uses *"au regard de"* or *"selon"*.
- **Correction**: `Le projet s'améliore comme progresse l'open source : en public, par pull request, au regard de critères explicites.`

---

VERDICT: REVISE


## Native-ear review (verbatim)

# Review

> Reviewer: OpenRouter `google/gemini-3.7-flash` · 2026-08-19T09:56:52+00:00 · tokens in=13116 out=3122
> Prompt: translations/NATIVE-EAR-PROMPT.md · Verbatim model output below — do not edit.

### Findings

* **« gains de productivité automatisés »** (`/fr/law`)
  * *Why it grates:* Calque direct de l’anglais *automated productivity gains*. En français, un gain de productivité n'est pas « automatisé » ; il est issu de l'automatisation.
  * *Native phrasing:* « gains de productivité issus de l’automatisation » ou « gains de productivité liés à l’automatisation ».

* **« Ce qu'elle voit juste »** (`/fr/law/objections`)
  * *Why it grates:* Calque mot à mot de la formule anglaise *What it gets right*. Construction syntaxique bancale et inexistante en français juridique ou éditorial.
  * *Native phrasing:* « La part de vérité de l’objection » ou « Le point sur lequel l’objection porte juste ».

* **« Vous construisez le prochain pot de miel, et l'Europe pille les pots de miel »** (`/fr/law/objections`)
  * *Why it grates:* Traduction littérale de la métaphore anglaise *honeypot* (« pot de miel »), qui n’a aucun sens en français dans ce contexte budgétaire/financier.
  * *Native phrasing:* « Vous créez la prochaine manne financière, et l’Europe finit toujours par siphonner les réserves. »

* **« C'est le revenu universel avec des étapes en plus »** (`/fr/law/objections`)
  * *Why it grates:* Traduction littérale du mème/idiome anglais *...with extra steps*. Ce n'est pas une expression française naturelle dans une analyse de politique publique.
  * *Native phrasing:* « C’est le revenu universel sous une forme complexifiée » ou « C’est un revenu universel qui ne dit pas son nom ».

* **« un revenu sans travail règle le loyer, pas le mardi après-midi »** (`/fr/law/objections`)
  * *Why it grates:* Calque idiomatique direct de l'anglais (*pays the rent, not the Tuesday afternoon*). L'image sonne totalement artificielle en français.
  * *Native phrasing:* « un revenu sans travail paie le loyer, mais ne donne aucun sens au quotidien ».

* **« Le warrant est dormant jusqu'à un événement de liquidité [...] ne verse rien et ne vote rien »** (`/fr/law/objections`)
  * *Why it grates:* Anglicismes financiers et syntaxiques lourds (*dormant warrant*, *votes nothing*). En droit des sociétés français, un titre ne « vote » pas (il ne confère pas de droit de vote) et n'est pas « dormant » (il est en sommeil ou différé).
  * *Native phrasing:* « Le bon de souscription reste en sommeil jusqu’à un événement de liquidité [...] n’ouvre droit à aucun dividende et ne confère aucun droit de vote ».

* **« la retraite par capitalisation suédoise compose à 5,35 % »** (`/fr/law/objections`)
  * *Why it grates:* Anglicisme financier calqué sur *to compound at X%*. Le verbe « composer » n’est pas intransitif en finance française pour exprimer un taux de rendement composé.
  * *Native phrasing:* « le régime suédois affiche un rendement composé de 5,35 % par an ».

* **« l'anxiété de compétitivité est le vent politique contraire le plus fort »** (`/fr/law/objections`)
  * *Why it grates:* Traduction mot à mot de *competitiveness anxiety* et *political headwind*.
  * *Native phrasing:* « l’inquiétude quant à la compétitivité constitue le principal vent contraire sur le plan politique ».

* **« un chiffre rond assumé »** (`/fr/simulator`)
  * *Why it grates:* Faux-ami/calque de l'anglais *assumed round number* (au sens de valeur posée par hypothèse). En français, « assumé » signifie revendiqué sans honte, pas « retenu par convention de calcul ».
  * *Native phrasing:* « un chiffre rond retenu par hypothèse » ou « une convention simplificatrice ».

* **« Divisibilité : ce qui survit à l’élagage »** (`/fr/law`)
  * *Why it grates:* Calque métaphorique maladroit de la clause de divisibilité juridique (*severability / pruning*). « Élagage » relève de l'arboriculture et n'a aucune valeur juridique ici.
  * *Native phrasing:* « Divisibilité : maintien des dispositions en cas de censure partielle ».

* **« avec des issues en attente » / « Ouvrez une issue »** (`/fr/contribute`, `/fr/about`)
  * *Why it grates:* Faux-ami direct de l’anglais *issue* (au sens GitHub de ticket/problème). En français, une « issue » est une porte de sortie ou un dénouement.
  * *Native phrasing:* « avec des tickets ouverts » / « Ouvrez un ticket ».

---

VERDICT: REVISE
