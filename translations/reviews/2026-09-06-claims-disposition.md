# Translation claim-correction review record

Prepared by the coding assistant under the initiator's instruction to correct claims and use the existing pipeline. English is authoritative. None of these translations has received a native-reader human verification in this session.

The package covers brief, FAQ, join, sign, press, about, contribute and registration in Dutch, French, German and Spanish, plus home/simulator and related dictionary labels. The translated registration title is supplied by the page component. The `<!-- drafting-notes -->` marker lets the renderer omit internal drafting commentary without dropping any of the five form sections. English character-count annotations describe the English filing text, not translated counts.

## Rounds and dispositions

- Initial and second drafts were prepared through the configured Requesty Gemini route. They are preserved under `translations/drafts/`; a drafting output ending REVISE is deliberately not an independent review pass.
- Fable rounds 1 and 2 returned REVISE for all four languages. Terminology, conditional mood, trigger descriptions and naturalness were corrected. Dutch round 2 inadvertently reviewed primarily the dictionaries; later prompts explicitly require all eight pages.
- Gemini then supplied exact-substring corrections against the latest complete English and target texts. Two proposed Spanish patches did not match: one was a no-op with incorrect capitalisation; the other proposed wording already present. Both were declined, rather than applied approximately.
- Fable round 3 returned REVISE for all four languages. Its blocking and required findings were corrected manually to avoid regeneration of otherwise correct text. Fixes include the Dutch age/franchise distinction, full retention-exception scope, duplicated Dutch/German verbs, French review-gate calques and payment-frequency rule, worldwide labour compensation, German cash redemption and Spanish agreement.
- Supporting dictionary labels were aligned with their destination pages. The release label checker now imports actual dictionaries instead of parsing JavaScript with a formatting-dependent regular expression.
- Fable rounds 4 and 5 reviewed complete source/target pairs. Dutch round 5 returned PUBLISH; French, German and Spanish round 5 returned REVISE with small required corrections. All required findings were corrected: regulation terminology and should/must in French; threshold antecedent, signing-age phrasing, non-listed-company terminology and declared-interest wording in German; current/in-force, editor disposition, reviews by models and other false friends in Spanish.
- A later legal-layer round added the rebuttable threshold and below-threshold investigation routes to registration, specified covered turnover and Union-budget fines, unified the English long-stop term, and clarified retention permission per invocation. These changes were carried into all four languages.
- Round 6 used the configured default reviewer, vertex/gemini-3.7-flash@eu (EU, zero retention, no training), to independently verify the completed changes against full English/target pairs under the same review criteria. All four returned PUBLISH. This is not a claim that Fable issued a final PUBLISH for French, German or Spanish; its REVISE records and the fixes they prompted remain preserved. The default reviewer drafted earlier versions; the final manual corrections addressed Fable's independent findings. Final human/native verification remains outstanding.

## Deliberately declined suggestions

- Withholding taxes refer to tax withholding. A prior suggestion to reinterpret them as retained capital was declined. The English now explicitly says taxes; translations preserve that distinction from the Reserve's retention rules.
- Organiser eligibility must not acquire an actual voting-franchise requirement. The source specifies citizenship, residence and age. A contrary polishing suggestion was declined and the Dutch franchise error was removed.
- The German private-company wording must not narrow the source to avoidance of an IPO alone; successive reviewers suggested opposite phrasings. The broader wording was retained.
- Optional stylistic changes which would merely exchange fluent synonyms or alter unrelated context were not all adopted. German brief title remains aligned with its navigation label; new French/Dutch/Spanish one-page titles have corresponding navigation labels.

All review verdicts are preserved under `translations/reviews/`; immutable round 3 through round 6 full inputs are archived as compressed Markdown under `translations/bundles/`. The review runner snapshots the input and prompt before sending them; later file edits do not change recorded request identity.

## Release state

All four final translation checks returned PUBLISH. Translations are machine-reviewed, not native-verified. Source commits and SHA-256 hashes identify their exact English source. The full site build and release checks pass; no deployment has occurred.
