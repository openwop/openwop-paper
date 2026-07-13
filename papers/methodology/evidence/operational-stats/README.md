# Study D — Operational Velocity

Descriptive operational throughput of the contract-evolution process (supports claims
**C2, C9**). Tier: **Observed**. Mines the dates recorded in each RFC's `Updated` field to
measure how fast a contract change goes from first-recorded to `Accepted` across the estate.

## Headline result (snapshot `openwop@aca1ef59`, 2026-07-13)

- The entire **131-RFC program ran in ~67 days** (2026-05-01 → 2026-07-07).
- **Median authored→Accepted span = 0 days** (mean 1.6, max 46) over 127 Accepted RFCs.
  (The max is RFC 0043, authored 2026-05-22 and graduated 2026-07-07 after a long
  parked period — the registry / extension-policy RFC.)
- **69/127 (54%) graduated same-day**; 75% within 1 day; 94% within 7 days.

See `out-velocity/study-d-summary.md` for the full table and `velocity.csv` for per-RFC data.

## Reproducing

```sh
node analyze-velocity.mjs --out ./out-velocity
```

Env overrides: `OPENWOP_RFCS`, `OPENWOP_CHANGELOG`, `OPENWOP_ADOPTION` (defaults assume the
repos are siblings under one dev root). The script stamps the corpus SHA into the summary.

## The honest frame (load-bearing — carry this into the paper)

This velocity is the machine-speed signal the paper is about, but it must be read with two
conditions stated plainly, or it overclaims:

1. **It is enabled by single-maintainer governance with waived comment windows.** Study A
   found 55 RFCs explicitly note a *waived/bootstrap* comment window. The RFC process defines
   7/30/90-day windows scaled to risk (Section 8); under a sole steward those windows are
   waived by lazy consensus, so the governance brake the windows are designed to impose is
   **not currently binding**. The agents make implementation + conformance + advertisement
   near-instant; with a multi-reviewer estate the windows would dominate the wall-clock. So
   the result is *"the methodology removes the implementation/integration bottleneck,"* **not**
   *"governed review takes zero time."*
2. **Span is a recorded-activity window, not human-effort time.** A same-day span means the
   `Updated` field records no multi-day gap between transitions — not that zero human time
   elapsed. It is a lower bound on speed, an upper bound on recorded latency; it is **not** a
   measure of human-hours saved (the paper makes no such claim — see the economic framing).

Read together with Study A's window data, the honest claim is: *under single-steward
governance, an agent-operated estate graduates wire-contract changes at a median of zero
recorded days, with the risk-scaled comment windows as the designed brake for the
multi-reviewer case that has not yet been exercised.*

## Throughput signals (Observed, from the CHANGELOG)

The CHANGELOG records cohort graduations directly — e.g. *"8 RFCs Draft → Accepted in one
day,"* a *"19 RFC graduations"* cycle, a *"5-RFC autonomous-agent-runtime cohort."* These are
quoted in the summary as corroborating observed throughput.
