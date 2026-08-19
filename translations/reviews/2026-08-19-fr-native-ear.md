---
gate: translation-native-ear
target: rendered fr pages (no English source shown)
verdict: REVISE
disposition: merged-with-fixes
date: 2026-08-19
---

# Review

> Reviewer: OpenRouter `google/gemini-3.7-flash` · 2026-08-19T04:49:00+00:00 · tokens in=3255 out=2874
> Prompt: [path removed] · Verbatim model output below — do not edit.

* **« Voici la loi qui le fait : »**
  * *Pourquoi cela heurte :* Calque brut de l'anglais (*« Here is the law that does it »*). Tournure enfantine et syntaxiquement pauvre dans un contexte juridique.
  * *Formulation naturelle :* « Voici le projet de loi qui le met en œuvre : » ou « Voici le texte qui concrétise ce principe : »

* **« se composent sur une génération » / « et que les rendements se composent »**
  * *Pourquoi cela heurte :* Faux-ami grossier dérivé de l'anglais *to compound* (intérêts composés). En français, *se composer* signifie « être constitué de ».
  * *Formulation naturelle :* « font des petits par capitalisation sur une génération » ou « s'accumulent selon le principe des intérêts composés » / « et que les rendements font jouer la capitalisation ».

* **« revues adverses » / « menées de manière adverse » / « avocat hostile »**
  * *Pourquoi cela heurte :* Calques lexicaux directs de *adversarial reviews* et *hostile counsel*. En français, on parle de procédure ou d'approche *contradictoire*, ou de rôle d'« avocat du diable ». *Adverse* et *hostile* sonnent comme un contresens militaire ou contentieux.
  * *Formulation naturelle :* « examens contradictoires », « menées sur un mode contradictoire », « lecture critique / contradicteur indépendant ».

* **« qui perd les arguments qu’elle méritait de perdre »**
  * *Pourquoi cela heurte :* Traduction mot à mot de *loses the arguments it deserved to lose*. En français, on « s'incline devant des contre-arguments » ou « abandonne des positions indéfendables ».
  * *Formulation naturelle :* « qui cède là où elle devait s'incliner » ou « qui abandonne les arguments réfutés ».

* **« Intérêt déclaré : »**
  * *Pourquoi cela heurte :* Calque formel de *Declared interest* / *Conflict of interest*.
  * *Formulation naturelle :* « Déclaration d'intérêts : » ou « Transparence : ».

* **« Le projet de travail »**
  * *Pourquoi cela heurte :* Calque littéral de *working draft*.
  * *Formulation naturelle :* « Le document de travail » ou « La version de travail ».

* **« Divisibilité : ce qui survit à l’élagage »**
  * *Pourquoi cela heurte :* *Élagage* est une image horticole impropre pour désigner la nullité partielle / la disjonction d'articles de loi invalidés (*severability / pruning*).
  * *Formulation naturelle :* « Divisibilité : dispositions maintenues en cas de censure partielle ».

* **« Emportez le projet complet »**
  * *Pourquoi cela heurte :* Calque de *Take the full draft with you* ; registre de vente à emporter (restauration/commerce), inapproprié pour le téléchargement d'un texte normatif.
  * *Formulation naturelle :* « Télécharger l'intégralité du projet ».

* **« ceux qui ont frappé juste »**
  * *Pourquoi cela heurte :* Traduction littérale de *struck home / hit the mark*.
  * *Formulation naturelle :* « ceux qui ont fait mouche » ou « les plus pertinents ».

* **« Années médianes jusqu’à un événement de liquidité »**
  * *Pourquoi cela heurte :* Calque syntaxique pénible de *Median years to a liquidity event*.
  * *Formulation naturelle :* « Délai médian avant événement de liquidité (en années) ».

* **« avec un collier de 125 % »**
  * *Pourquoi cela heurte :* Traduction littérale de l'anglais financier *collar*. En finance francophone, on utilise « tunnel » (tunnel de cours/volatilité) ou « encadrement ».
  * *Formulation naturelle :* « avec un tunnel de 125 % » ou « encadrée dans une marge de 125 % ».

* **« La bande fait tourner la même arithmétique »**
  * *Pourquoi cela heurte :* Anglicisme syntaxique (*runs the same arithmetic*).
  * *Formulation naturelle :* « L'intervalle applique le même calcul » ou « La plage de projection repose sur la même formule ».

* **« en source ouverte »**
  * *Pourquoi cela heurte :* Calque fautif de *open source*.
  * *Formulation naturelle :* « en accès libre », « en code ouvert » ou « open source » (invariable).

* **« conséquences de conception »**
  * *Pourquoi cela heurte :* Calque de *design consequences / implications*.
  * *Formulation naturelle :* « incidences rédactionnelles » ou « contraintes de structure ».

* **« Quand une objection est concédée »**
  * *Pourquoi cela heurte :* Calque de *When an objection is conceded*. En français, on concède un point ou un avantage, mais une objection est *retenue* ou *admise*.
  * *Formulation naturelle :* « Lorsqu'une objection est retenue ».

VERDICT: REVISE


---

## Editor disposition (19 August 2026)

This pass exists because the initiator caught with a focused read what
the bundle-review missed: same model, narrower aperture, higher recall.
The native-ear pass reads the rendered page in the target language
alone, no English source, and now runs alongside the fidelity gate.

All fifteen findings triaged; fourteen accepted (se capitalisent, the
contradictoire family, Avocat du diable, fait mouche, tunnel de 125 %,
Déclaration d'intérêts, Télécharger l'intégralité, admise, open source
invariable). One rejected with reasons: "élagage" stays, because
élaguer un texte is idiomatic French for trimming a text and the
English source deliberately uses the same plain metaphor; the
suggested "censure partielle" would legalise a strategy document.
"S'incline là où elle devait s'incliner" keeps the self-critical voice
the reviewer's "abandonne les arguments réfutés" would flatten.

Cross-language decisions harmonised in this round: the sceptic button
is the conservative-scenario family everywhere, the hostile-counsel
gate is the devil's-advocate family everywhere, "adversarial" renders
as the contradictoire/tegenspraak/kontradiktorisch/contradictorio
family, and download labels shed their takeaway-counter register.
