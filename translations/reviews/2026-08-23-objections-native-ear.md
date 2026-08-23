---
gate: native-ear (all 21 objections, four languages), translation-fidelity (objections 1 to 4)
target: content/{nl,fr,de,es}/objections.md
date: 2026-08-23
rounds: native-ear 1 across five chunks; fidelity 2 on the amended sections
verdict: REVISE throughout; after fixes, zero BLOCKING remaining in nl, fr, es
disposition: stage one merged; objections 5 to 21 gathered and recorded, not yet applied
---

# Editor disposition (23 August 2026)

The objections memorandum had never had a native-ear pass. At roughly 76 000
characters per language it was too large for one bundle, which is why it was
skipped in every earlier sweep. Split into five chunks by objection group, it
ran: twenty reviews, four languages, all twenty-one objections.

## What came back

261 findings. The triage that matters is not their number but their spread:
250 are local phrasings that occur once, and 11 recur across the corpus. That
is a good result about the terminology and a large one about the prose. The
translations are consistent; they read as translations.

## The policy applied, and why it is narrower than the findings

Fixes were applied where the target text is **wrong**, and withheld where it
is merely **not native**. Wrong means a false friend that misleads a lawyer, a
collocation that does not exist, a construction that is ungrammatical, or a
metaphor that makes a legal file sound unserious. Not-native means accurate
prose that reads as translated.

The reason for the line is that every edit to text which has already passed a
fidelity gate can move the meaning, and this pass proved that risk is real
rather than theoretical, twice, in the same session. Applying 250 style
preferences to legal argument in four languages would have been a large
unforced exposure.

## Stage one, objections 1 to 4, applied and verified

The legal core: expropriation, the tax characterisation, competence, and the
pass-through objection. Twenty-nine fixes.

Representative of what "wrong" meant here: Dutch rendered legal *authority*
as **gezag**, which is power rather than precedent, three times; Spanish used
**autoridades jurisprudenciales**, the same false friend; Dutch diluted
*shareholders* rather than their holding; French said a hostile reading has
**amples munitions**; Spanish had **si alguna lo es**, which is not an idiom
in Spanish; German had an obligation *carrying* a consideration, which is not
a German collocation.

## What the fidelity re-run caught, including two of mine

Re-running fidelity on the amended sections was not a formality. It found
that changing Spanish *autoridades* (feminine) to *precedentes* (masculine)
had left every dependent word agreeing with a noun that was no longer there:
*las invocará*, *cada una*, *unívoca*, *enunciada*. Two BLOCKING findings,
both mine, both the identical error to the French and German agreement bug of
21 August. The lesson had not stuck; the gate is the only reason it did not
ship.

It also surfaced defects that predate this pass and are worse than anything
the native-ear round found:

- French rendered *statutory events* as **événements statutaires**, and in
  French *statutaire* means the company's own articles of association. The
  text therefore said crystallisation is triggered by events the company
  defines for itself, which reverses DC-3. Both occurrences, prose and
  constraints-table row, were corrected together.
- Dutch justified Booker Aquaculture on a **volksgezondheid** emergency; the
  case was animal health and the source says public emergency.
- German had *gewöhnliche Aktien* for ordinary shares, where the term of art
  is Stammaktien, and *an der Marge* for "at the margin", which is the
  trading-desk sense rather than the economic one.

## Recorded, not applied

**Covered undertaking against designated.** German, French and Spanish all
render *covered undertaking* with the word for *designated*. The source
distinguishes them: designation is the act, covered is the resulting status.
Against that, in this instrument an undertaking becomes covered precisely by
being designated under Article 3(4), so the conflation loses a distinction
that has no consequence here. It is corpus-wide, it would touch every
translated file, and it is a terminology decision rather than a defect fix.
Recorded for a decision.

**Liquidity event and crystallisation.** Flagged in three languages as
finance-English calques. They are defined terms used consistently across the
plain layer, the brief, severability and objections. Changing them in one
document forks the corpus, which is the defect this session spent the morning
removing.

**Objections 5 to 21.** Roughly 200 local findings, gathered and preserved in
translations/docreview-*-obj{b,c,d,e}-ne.md. Not applied. They should be done
in the same staged way, chunk by chunk with a fidelity re-run after each,
because that loop is what caught the two agreement bugs above.
