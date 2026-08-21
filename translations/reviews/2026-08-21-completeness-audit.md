---
gate: translation-completeness
target: content/{nl,fr,de,es}/{objections,severability}.md and content/*/plain/
source-commit: 12bc1b5
reviewer: side-by-side audit against the English source, plus scripts/check-translations.mjs
verdict: repaired
disposition: merged-with-fixes
date: 2026-08-21
---

# The translations were not incomplete by accident, they were incomplete by method

The instruction was to make sure everything was translated. Carrying the
outstanding passages across took four gate rounds and is recorded in
2026-08-21-translation-debt.md. Then the question was asked the other way
round, which is the question that mattered: not "is the change translated"
but "is anything missing".

A fidelity review cannot answer that. It is shown the passages that exist
and compares them with their source. It has no way of noticing a passage
that is not in front of it. Every translation review this project has run
was therefore incapable of detecting the defect that had been accumulating
in all four languages the whole time.

## What was missing

**objections.md, all four languages.** The second mechanical rule in the
design consequence to objection 15, which is DC-40, the distribution
interval backstop, together with the sentence explaining that the threshold
is a ratio to the cost of making a payment and not a figure in an annex.
Three sentences from the source-taxation passage in objection 18, including
"hostile counsel had the headline ready, and was right to have it" and the
closing "a leak reported annually is a leak the campaign can be judged on;
a leak nobody measures only grows". The sentence in the perimeter paragraph
placing the rule in the succession logic of merger control. Two sentences
distinguishing leverage from extraction. The entire status-section paragraph
on objection 18, found earlier the same day.

**German additionally** had DC-34 missing from the body of objection 6,
present only in the table, and a corrupted duplicate fragment left at a
sentence join in objection 1.

**severability.md, all four languages.** The Tobacco Advertising (C-376/98)
citation and the clause about recital 1's divergence record, from Layer 2.
The whole body-creation-precedents passage from Layer 3: ENISA (C-217/04),
ESMA (C-270/12) and the European Cooperative Society (C-436/03), which is
the passage conceding that Layer 3 resembles the case requiring Article 352
more than the cases sustained under Article 114. The translations were
therefore less honest than the English about the project's weakest layer.

**evidence.md** was audited and found complete in all four languages.

**The plain-language layer.** Nine articles per language were rewritten,
because the English pages they were translated from had themselves been
describing a superseded law. The worst of them promised a payout every
year where Article 10(6) permits a gap of three.

## What now prevents it

scripts/check-translations.mjs, run by scripts/deploy-eu.sh before anything
is published. It compares each translation with its English source on
headings, Design Consequence rows, paragraph counts, case numbers,
Design Consequence references and percentage figures. The last three are
language-invariant, which is what makes them useful: a dropped sentence
usually takes an identifier with it.

It was tested against the defect rather than merely against the repair.
Run over the pre-repair versions from git, it reports DC-40 absent in all
four languages and DC-34 absent in German. It does not report the missing
merger-control sentence, which carries no identifier of any kind, and the
script says so in its own header. Passing it means no signal was lost. It
does not mean a translation is complete, and it does not replace reading
the two documents side by side before a release that matters.

## Editor disposition

All repairs accepted. The rule for this project going forward: when the
English gains a passage, the translation task is not "translate the diff",
because a diff that nobody looked at closely is exactly how these were
lost. Run the completeness check, and read the two documents side by side
before anything that people outside the project will read.
