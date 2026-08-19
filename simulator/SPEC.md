# simulator/SPEC.md

What the dividend simulator is, what it may claim, and what it must
refuse to claim. The simulator is the site's most shareable surface and
therefore its most dangerous one: DC-14 (no promise of substantial early
payments) binds every pixel of it.

## Purpose

Let a visitor answer one question honestly: "if this Regulation existed,
what would it plausibly mean for me and my children, over time?" The
answer is a curve, never a number. The simulator exists to make the
generational compounding tangible and the early years honestly small.

## Constraints (non-negotiable)

1. **Client-side only.** No request leaves the page. No analytics event
   fires on input. The computation is a pure function in the bundle.
2. **DC-14 rendering rule.** The primary output is the compounding curve
   over 30 years. A first-year figure may appear only inside the curve,
   never as a headline, never as the default share-card number. If a
   single number must lead, it is the year-20 range.
3. **Ranges, not points.** Every output renders as a band (p25 to p75 of
   the input uncertainty), with the central estimate a line inside it.
4. **Every parameter carries its uncertainty note** (see table), shown on
   focus, not hidden behind an icon.
5. **No personalisation theatre.** No age, income or postcode inputs;
   the entitlement is equal by design (Article 10), so the simulator has
   nothing personal to ask.

## Inputs

| Parameter | Default | Range | Uncertainty note (verbatim on the control) |
|---|---|---|---|
| Single Market automated revenue reaching designation thresholds | EUR 150 bn/yr by year 5 | 50 to 400 bn | "Nobody knows this number. It depends on how fast hyper-automated firms cross the Article 3 thresholds. The default assumes a handful of designations in the first years; the range spans scepticism to boom." |
| Effective warrant capture | 3 % of designated value at first liquidity event | fixed | "Fixed by Article 5(2). What varies is when liquidity events happen, not the percentage." |
| Liquidity-event lag | 7 years median | 3 to 15 | "Warrants crystallise only when a designated firm lists or is sold (Article 5). Private firms can stay private a long time; the instrument waits." |
| Portfolio real return | 4 %/yr | 2 to 6 | "The Norway fund's long-run real return is the reference. Annex II retains enough to preserve real capital before anything is distributed." |
| Growth of covered activity after the first wave | 5 %/yr | 0 to 12 | "New firms keep crossing the Article 3 thresholds and covered firms keep growing; zero would mean no firm ever qualifies again." |
| Eligible adults | 350 m | fixed (Eurostat) | "Union citizens aged 18 or over, Article 10. Sourced, not assumed." |

## Model (pure function, unit-tested)

Year by year: designated value crystallises as a continuing flow (the
first wave over ten years from the median lag, later cohorts growing at
the chosen rate) -> 3 % of each crystallisation into the Reserve ->
portfolio compounds at real return -> Annex II retention as amended
19 August 2026 (real-capital preservation, three-year smoothing collar
floored at 2 % of capital, realised-income ceiling) -> distributable
amount / eligible adults.

History note: the first version of this model implemented the original
Annex II collar exactly and thereby exposed its crumb-trap (a collar
measured only against a near-zero trailing average suppressed
distributions for over a decade). That finding amended the law; the
ledger records it. The simulator is not decoration; it is part of the
review machinery.

The Annex II arithmetic is implemented exactly as drafted, not
approximated: the smoothing and the collar are what keep early numbers
honest, and the simulator demonstrating that IS the argument.

## Outputs

1. **The curve**: per-citizen distribution per year, band + central
   line, 30-year horizon, EUR at constant prices. Hover shows the year's
   range. The first years visibly hug zero; the design does not
   apologise for that, it annotates it: "the Reserve preserves capital
   before it distributes, by law".
2. **The pool**: Reserve capital over time, same treatment.
3. **The stake beside the payout (DC-31)**: wherever a per-citizen
   payout figure appears, the per-citizen stake in the Reserve appears
   beside it; the sentence carries both, and no surface may show the
   flow without the stock.
4. **The sentence**: a generated plain sentence, locale-aware (EN/NL/FR),
   of the form "Under these assumptions, a citizen receives roughly
   EUR X to Y per year by 2045, rising as the Reserve compounds." Never
   a year-1 sentence.

## Share card

One rendered card (client-side canvas, campaign livery, 1200x630):
the curve, the assumption set in small print, the sentence, the domain.
The card always contains the assumptions that produced it; a screenshot
of the card is self-auditing. No card without assumptions.

## Sceptic mode

A visible toggle "assume little": sets every input to its pessimistic
bound. The site treats the sceptic as a first-class persona; the
simulator must survive their settings and still be worth sharing. If
the pessimistic curve is embarrassing, that is information the campaign
publishes, not hides.

## Out of scope

No revenue projections for named companies. No comparison with welfare
or tax systems. No national breakdowns (the entitlement is equal across
the Union). No blockchain anything.
