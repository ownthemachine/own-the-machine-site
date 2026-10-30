# Dividend simulator: current specification

The public simulator illustrates the generational ownership objective: a
capital stake builds over decades and may support distributions from
available income. It does not promise an annual increase or replace wages.

## Actual model

`src/scripts/simulator.ts` contains a client-side, fifty-year scenario
function. It values assumed newly covered activity at fourteen times
covered revenue, applies 3%, and introduces continuing cohorts after the
chosen aggregate delay. Zero cohort growth still permits new cohorts; it
is not a closed-pool scenario. Returns are assumed positive and are treated
as available income subject to a 125% trailing-average collar with a 2%
capital floor. Actual costs, losses, cash yield versus unrealised gains,
payment frequency and separate inflation retention are not simulated.

The band changes inputs to chosen lower and higher scenarios. It is not a
calibrated probability distribution or a measured p25/p75 interval. The
2027 starting year is illustrative. Delay includes implementation and
designation; it is not permission to postpone an individual statutory
warrant. The repair candidate makes that claim arise at effective
designation and preserves its clock through bound transfers. Extraction
and seven-year crystallisation occur at the relevant financial year-end.

## Presentation rules

Always show per-citizen capital beside any payout figure. Describe output
as a scenario conditional on assumptions. Never describe this function as
an exact implementation of Annex II. Keep calculation client-side without
collecting identity, income or location. Do not interpret a zero cash
payment as proof that automation created no valuable capital.

## Auditable reference proposal

The companion `own-the-machine-tools/reference/reserve.py` separates cash,
asset appreciation, costs, subscription debt, protected capital and deferred
allocations. Its tests and illustrative ledger accompany the law's
`proposals/2026-09-07-generational-repairs/` package. It is a proposed
accounting policy, not current Annex II and not a forecast. It deliberately
recognises losses immediately. Integration requires an editor decision,
a reviewed legislative amendment and the DC-45/46 sizing assessment.

The public curve is not silently replaced with that proposal. Its existing
limitations remain disclosed while the proposal is evaluated.
