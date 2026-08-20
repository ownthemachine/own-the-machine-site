---
gate: native-ear
target: banner.pageMachine (the honesty banner above every machine-translated page), five languages
source-commit: a331620
verdict: PUBLISH (nl, de) · REVISE closed by editor disposition (fr, es)
disposition: merged-with-fixes
date: 2026-08-20
---

# The machine-translation banner: five languages, and a rendering bug

Reported by David: the Dutch banner read "vertaald en beoordeeld door de
open pijplijn van het project; een moedertaallezer heeft haar nog niet
geverifieerd". A pijplijn in Dutch carries oil, and moedertaallezer is
not a word. The same calque of "pipeline" and of "native reader" had
been taken literally in French (chaîne, lecteur natif) and Spanish
(cadena).

The report also exposed a rendering defect in every language: the
component appended a bare GitHub link after a finished sentence, so the
banner ended "Open een issue.GitHub." The link now sits inside the
sentence through a %GITHUB% placeholder that LangBanner interpolates,
which is why the strings changed shape as well as wording.

## Editor disposition (20 August 2026)

Five rounds of the native-ear gate. Dutch and German reached PUBLISH:
via het openbare reviewproces / maar nog niet nagelezen door een
moedertaalspreker, and im Rahmen des offenen Prüfprozesses / ein
muttersprachliches Lektorat steht noch aus.

French and Spanish were closed by disposition after the gate began
cycling rather than converging. Spanish round 3 rejected "revisión
abierta" as a calque and prescribed "revisión pública"; round 5
prescribed "revisión abierta" and rejected "pública". Round 2 rejected
"detectado" as sounding like diagnostic software; round 3 prescribed
it. French round 3 rejected "relecture collaborative" as bureaucratic
and literal; round 5 prescribed it. Round 3 prescribed "locuteur
natif"; round 4 called it clinical; round 5 prescribed it again.

Where a reviewer contradicts itself, its later verdict carries no more
authority than its earlier one, so the editor settled both on the
merits, taking in each language the formulation that each round either
proposed or left alone, and preferring the reading that avoids root
repetition. One reviewer proposal was rejected outright: Spanish was
urged into the informal tú on the ground that GitHub-linked projects
use it. Every other Spanish string on this site addresses the reader as
usted, and a banner that switches register mid-site reads worse than a
formal one.

Native verification by a speaker of each language remains the pending
top tier; this banner is precisely what invites it.

Reviewer: google/gemini-3.7-flash via review.sh with NATIVE-EAR-PROMPT;
raw outputs in translations/docreview-{lang}-machinebanner.md at review
time.
