# arXiv submission metadata

Fill these into the arXiv submission form when uploading `main.tex` (+ no other files — the figures are native TikZ).

- **Title:** OpenWOP as a Vendor-Neutral Workflow Orchestration Protocol — Submission Draft: Evidence-Integrated Workshop Manuscript
- **Authors:** David S. Tufts (MyndHyve Inc.)
- **Primary category:** `cs.SE` (Software Engineering)
- **Cross-list:** `cs.DC` (Distributed, Parallel, and Cluster Computing), `cs.AI` (Artificial Intelligence)
- **License:** CC BY 4.0 (recommended for an open-protocol paper) — or arXiv's default non-exclusive license if you prefer.
- **Comments field:** `12 pages, 3 figures, 6 tables. Position paper with one reproducible cross-language portability result; evidence artifact (captured runs, conformance snapshot, portability captures) described in the paper.`
- **ACM classification (optional):** D.2.11 (Software Architectures), D.2.12 (Interoperability), C.2.4 (Distributed Systems).
- **Report number / DOI:** none.

## Abstract (paste verbatim)
Multi-agent AI systems increasingly require durable, observable, interruptible, replayable, and portable workflow execution across heterogeneous hosts. This paper argues that a vendor-neutral open workflow orchestration protocol is a necessary infrastructure layer for such systems. OpenWOP is examined as a candidate protocol because it standardizes the workflow run as the primary unit of orchestration, together with host capability discovery, run events, interrupts, artifacts, replay, observability, and conformance behavior. The paper is organized around three analytic dimensions: standardization, interoperability, and portability. It distinguishes OpenWOP from adjacent protocols: A2A supports inter-agent collaboration, while MCP supports tool, resource, prompt, and context integration. These protocols may compose in a full agentic architecture, but the paper's argument concerns the distinct need for open workflow orchestration. Implementation and conformance evidence strengthen the claim: the OpenWOP project includes a reference workflow-engine application and a public conformance leaderboard that records compatible hosts, advertised profiles, and scenario results. We further report a reproducible cross-language portability result: the same workflow definition executed across an independent TypeScript host and a Python host yields identical terminal state and event-log structure for core workflows. We treat these as evidence of implementability and internal consistency, not as proof of broad adoption or productivity gains. The contribution is a protocol-level argument and validation agenda for evaluating whether OpenWOP can reduce orchestration-layer fragmentation and support portable intelligent software workflows.

## Build for upload
`main.tex` is self-contained (native-TikZ figures, manual bibliography). Upload `main.tex` alone, or run `pdflatex main.tex` twice and upload the source. Verified: compiles clean (Tectonic), 12 pp, 0 errors / 0 warnings.
