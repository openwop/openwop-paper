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

## Headline result (snapshot `openwop@d7a635b6 · openwop-app@bfcddc7d`)

- **RFC corpus (n=110):** 107 Accepted / 2 Active / 1 Draft; 104 record a lifecycle
  transition; 40 explicitly note a waived/bootstrap comment window.
- **ADR corpus (n=164):** 144 implemented (88%), 11 Accepted, 6 Superseded, 2 Proposed,
  1 Withdrawn; **64 (39%) carry a formal correction note** — quantifies the
  "correct, don't rewrite history" discipline.
- **Contract gate (the headline, heuristic):** of 159 classifiable ADRs, **127 (80%)
  required no new wire RFC** (85 host-extension + 42 rides-accepted) vs **32 (20%)
  wire-touching** — the empirical evidence for the gate's selectivity (C1/C2).
- **Conformance:** v1.37.0, 370 scenarios, 82 fixtures.

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

- The **contract-gate class** and **RFC comment-window treatment** are mined from prose
  via the regexes in the script. They are *observed estimates*, not ground truth. The
  per-item CSVs exist precisely so a **manual coding pass** can correct them; the
  `unclassified` bucket (5 ADRs) is the honest ceiling on the gate metric.
- The gate classifier is **precedence-ordered** (new-rfc → rides-accepted →
  host-extension); an ADR that both rides an accepted RFC and mentions a new one is
  counted as `new-rfc`, which biases the wire-touching share *upward* (conservative for
  the "80% needed no new RFC" claim).
- Conformance counts are **point-in-time**. Growth-over-time (scenarios per accepted RFC)
  needs git-history mining — a planned follow-up.
