# OpenWOP — Scholarly Paper

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.20576239.svg)](https://doi.org/10.5281/zenodo.20576239)

Project root for the paper **"OpenWOP: A Vendor-Neutral Protocol for Durable, Portable Agentic Workflow Orchestration."**
Author: David S. Tufts (MyndHyve Inc.), OpenWOP project steward.

> **Published 2026-06-07 on Zenodo** — DOI [10.5281/zenodo.20576239](https://doi.org/10.5281/zenodo.20576239), licensed CC BY 4.0. An arXiv version is pending author endorsement (cs.SE). The **compile-clean source is built** — [`arxiv/main.tex`](arxiv/main.tex) → [`arxiv/main.pdf`](arxiv/main.pdf) (12 pp, 0 errors / 0 warnings, native-TikZ figures, 40 verified references). All evidence is captured; the related-work section and references are integrated. Remaining work is venue-specific formatting and the optional Cell B experiment (see [`review/finalization-plan.md`](review/finalization-plan.md)).

## How to cite
Tufts, David S. (2026). *OpenWOP: A Vendor-Neutral Protocol for Durable, Portable Agentic Workflow Orchestration.* Zenodo. https://doi.org/10.5281/zenodo.20576239

```bibtex
@misc{tufts2026openwop,
  author    = {Tufts, David S.},
  title     = {{OpenWOP: A Vendor-Neutral Protocol for Durable, Portable Agentic Workflow Orchestration}},
  year      = {2026},
  publisher = {Zenodo},
  doi       = {10.5281/zenodo.20576239},
  url       = {https://doi.org/10.5281/zenodo.20576239}
}
```

## Start here
- **Read the paper:** [`arxiv/main.pdf`](arxiv/main.pdf) (rendered) — build instructions + compile status in [`arxiv/README.md`](arxiv/README.md).
- **Edit the paper:** [`arxiv/main.tex`](arxiv/main.tex) (the authoritative source; self-contained, no external image files) or the Word version [`OpenWOP_Scholarly_Paper_Manuscript_integrated.docx`](OpenWOP_Scholarly_Paper_Manuscript_integrated.docx).

## Layout
| Path | What |
|---|---|
| [`arxiv/`](arxiv/) | **The submission draft** — `main.tex`, compiled `main.pdf`, build `README.md`. |
| [`OpenWOP_..._integrated.docx`](OpenWOP_Scholarly_Paper_Manuscript_integrated.docx) | Current manuscript in Word (all content integrated). |
| [`references.md`](references.md) | Annotated 40-entry bibliography with verification provenance (source of truth for citations). |
| [`related-work-draft.md`](related-work-draft.md) | Related Work section, markdown master (mirrors the `.tex`/`.docx`). |
| [`evidence/`](evidence/) | Captured evidence (see below). |
| [`figures/`](figures/) | Figure design source (`fig1–3 .svg`); the arXiv draft renders them as native TikZ. |
| [`review/`](review/) | [`finalization-plan.md`](review/finalization-plan.md) (living plan + execution log), [`paper-evaluation.md`](review/paper-evaluation.md) (deep review), [`review-guide.md`](review/review-guide.md) (external-reviewer packet), [`external-review-request.md`](review/external-review-request.md). |

## Evidence (all real, captured 2026-06-06)
- **Cross-host portability — result.** [`evidence/portability/results.md`](evidence/portability/results.md): **3/3 core workflows portable** across the TypeScript and Python reference hosts (identical terminal state + `RunEvent` type-sequence) + a capability-rejection divergence finding. Design: [`evidence/portability/experiment-design.md`](evidence/portability/experiment-design.md); raw captures: [`evidence/portability/captures/`](evidence/portability/captures/). *Caveat: steward-authored hosts — cross-language consistency, not third-party independence.*
- **Capability discovery.** Real `HostCapabilityDocument` + live API probe — [`evidence/demo-app/host-capability-document.json`](evidence/demo-app/host-capability-document.json), [`evidence/demo-app/live-host-probe.md`](evidence/demo-app/live-host-probe.md).
- **Run lifecycle.** Real 8-event reference-host log — [`evidence/demo-app/observed-run.json`](evidence/demo-app/observed-run.json) / [`observed-events.json`](evidence/demo-app/observed-events.json). Reproduce via [`evidence/demo-app/host-setup.md`](evidence/demo-app/host-setup.md).
- **Conformance.** Leaderboard snapshot — [`evidence/conformance/conformance-snapshot.md`](evidence/conformance/conformance-snapshot.md) (*steward self-reported; no independent host yet*).

## Status of the manuscript's §12
The paper's former "Immediate Next Steps" are executed and folded into the manuscript as **§12 "Reproducibility and Artifact Status."** Done: conformance snapshot, host-setup doc, artifact README, normalized references, cross-host portability result, and the venue package (PDF + DOCX + artifact ZIP + [`arxiv/cover-note.md`](arxiv/cover-note.md) + [`arxiv/arxiv-submission.md`](arxiv/arxiv-submission.md)). Interrupt/resume + replay-debug is also captured on a durable host ([`evidence/demo-app/interrupt-replay.md`](evidence/demo-app/interrupt-replay.md)). Open: **external-review feedback** (packet ready — [`review/review-guide.md`](review/review-guide.md) — awaiting reviewers).

## Remaining before submission
Tracked in [`review/finalization-plan.md`](review/finalization-plan.md): (1) gather external-review feedback (packet ready); (2) optional cross-host *durable* portability comparison (a second durable host, e.g. Postgres) + deterministic fork-replay; (3) venue-specific citation formatting (none needed for arXiv); (4) an optional 8-page workshop compression if targeting a workshop with a page limit; (5) a literature refresh near the deadline.

## License
The paper and artifact contents are licensed **CC BY 4.0** (see [`LICENSE`](LICENSE)). © 2026 David S. Tufts / MyndHyve Inc. You may share and adapt with attribution.
