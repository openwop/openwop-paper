# Study A — Corpus Retrospective

Deterministic, dependency-free analysis of the governance corpus (RFCs + ADRs +
conformance suite) that backs claims **C1, C2, C4, C6** in
[[../../abstract-and-claims]]. Tier: **Observed**.

## What it does

`analyze-corpus.mjs` parses three sources and emits per-item CSVs plus a markdown
summary. **Every classification rule is in the script** so a reviewer can audit or
re-derive each number; heuristic fields are labelled and emitted per-item for a manual
validation pass.

| Source | What is extracted |
|---|---|
| `openwop/RFCS/*.md` | RFC number, status, superseded flag, comment-window treatment (heuristic), lifecycle-transition presence |
| `openwop-app/docs/adr/*.md` | ADR number, status bucket, contract-gate class (heuristic), correction-note flag, RFC-reference count |
| `openwop/conformance` | published suite version, scenario count, fixture count |

## Headline result (snapshot `openwop@3852e30c · openwop-app@eb53aeb0`)

- **RFC corpus (n=120):** 112 Accepted / 7 Active / 1 Draft; 111 record a lifecycle
  transition; 40 explicitly note a waived/bootstrap comment window.
- **ADR corpus (n=166):** 146 implemented (88%), 11 Accepted, 6 Superseded, 2 Proposed,
  1 Withdrawn; **65 (39%) carry a formal correction note** — quantifies the
  "correct, don't rewrite history" discipline.
- **Contract gate (the headline — AUDITED, see `out/gate-audit.md`):** of 161 classifiable
  ADRs, **157 (97.5%) required no new wire RFC** (122 host-extension + 35 rides-accepted) vs
  only **4 (2.5%) wire-touching** — the empirical evidence for the gate's selectivity (C1/C2).
  *(The first-pass whole-text heuristic reported ~80% because it over-counted the
  wire-touching bucket ~8×, matching "new RFC" inside "NO new RFC"; the validation pass
  classifies from each ADR's explicit RFC-gate declaration and hand-codes the residual.)*
- **Conformance:** v1.46.0, 380 scenarios, 84 fixtures.

See `out/study-a-summary.md` for the full tables; `out/*.csv` for the per-item data.

## Reproducing

```sh
node analyze-corpus.mjs --out ./out
```

By default it resolves the three repos as siblings under one dev root (5 levels above
the script). Override with env vars if your layout differs:

```sh
OPENWOP_RFCS=/path/to/openwop/RFCS \
OPENWOP_ADRS=/path/to/openwop-app/docs/adr \
OPENWOP_CONFORMANCE=/path/to/openwop/conformance \
node analyze-corpus.mjs --out ./out
```

The committed `out/` is a **snapshot** at the corpus SHAs above; re-running against a
later corpus will move the numbers (the script stamps the live SHAs into the summary).

## Honesty caveats (carry these into the paper)

- The **contract-gate class** was validated: the first-pass whole-text heuristic
  (`analyze-corpus.mjs`) is *superseded* by `audit-gate.mjs` / `out/gate-audit.md`, which
  classifies from each ADR's explicit RFC-gate declaration and hand-codes the residual.
  **Use the audited figure (97.5% no-new-wire-RFC), not the heuristic's ~80%.** The audit
  records the v1↔v2 confusion, the ~8× `new-rfc` over-count, and the manual residual coding.
- The **RFC comment-window treatment** is still a prose heuristic (not yet audited) — treat
  it as an observed estimate.
- Conformance counts are **point-in-time**. Growth-over-time (scenarios per accepted RFC)
  needs git-history mining — a planned follow-up.
