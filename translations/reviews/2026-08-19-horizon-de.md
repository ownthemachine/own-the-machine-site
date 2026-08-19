---
gate: translation
target: content/de/evidence.md (section 7) + simulator UI strings (forecast, generation, disclaimer)
source-commit: 11757cc
verdict: PUBLISH
disposition: merged-with-fixes
date: 2026-08-19
---

# The long horizon, de: fidelity gate on evidence section 7 and the new simulator strings

Evidence section 7 (Alaska both ways, the AI-value forecasts held out
of the premise, the fifty-year arithmetic) and the three new simulator
UI strings (forecast button, generation sentence, disclaimer),
translated under the fixed terminology canon and gated against the
English source. This gate run caught a real ambiguity in the English
source ('designated revenue'), which was fixed in the law repo at
commit 11757cc. Native verification remains the pending top tier;
status: gate-reviewed.

## Editor disposition (19 August 2026)

Three revision rounds. Round 1: broken opening syntax repaired,
Prinzip for Entwurf, Vermögensstamm for Grundkapital, Schaltfläche for
Taste, ausgewiesene for benannte scenario inputs. Round 2: the ihn
pronoun, politische Aushandlungen, vereinnahmen. Round 3: the
designated-revenue ambiguity resolved at the English source (covered
revenue at designated firms, law commit 11757cc) and rendered as
erfasster Umsatz benannter Unternehmen; verfügender Teil for the
operative-article calque; gender pairing completed; berichten for
festzustellen in the Article 14(3) register. Round 4: PUBLISH.

Reviewer: google/gemini-3.7-flash via review.sh; raw outputs in
translations/docreview-de-horizon.md at review time.
