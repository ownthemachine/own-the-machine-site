---
gate: translation-fidelity
target: content/{nl,fr,de,es}/objections.md
source-commit: c06c2e8
reviewer: openrouter google/gemini-3.7-flash
verdict: PUBLISH
disposition: accepted-with-exceptions
date: 2026-08-21
---

# Translation debt: three passages of legal argument

Three passages had been added to the English memorandum without being carried
into the four translations, and one Design Consequence row was missing:

1. objection 1 — the James and Others v UK and Article 345 TFEU authorities,
   both raised because a hostile reader will raise them first;
2. objection 1 — the statement of what the BRRD analogy is and is not borrowed
   for, distinguishing crisis reasoning (Kotnik, Ledra, Dowling) from an
   instrument that operates on healthy going concerns;
3. objection 6 — the rejection of an arbitral tier above the valuation, and
   why Article 6(2) makes valuation arithmetic on a price rather than an
   opinion about it;
4. the DC-34 row.

Four gate rounds. Round 1 caught a blocking defect of my own making: the
inserted BRRD paragraph ran into the sentence following it, doubling the
connective in all four languages and dropping the subject in German
("Deshalb deshalb"). Rounds 2 and 3 were register and terminology. Round 4
was a gender-agreement error I introduced by changing the opening noun without
changing what agreed with it, caught independently by the French and German
reviewers.

## Editor dispositions

* **German `Rechtsgrundlage` for "authorities" — not adopted.** That is the
  term of art for the legal-basis question under Article 114 and would read as
  a claim about competence rather than about case law. `Präzedenzfälle` is
  used, with the agreements corrected to match.
* **A round-3 report of the passages as missing in fr/de/es was an artefact of
  the gate harness**, whose anchors still held the superseded opening phrases.
  No translation defect; anchors updated.
* All remaining findings were applied.

Verdicts: nl PUBLISH (round 3), fr PUBLISH, es PUBLISH (round 5), de PUBLISH
(round 6).
