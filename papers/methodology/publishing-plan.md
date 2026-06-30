# Publishing a Paper on the Methodology — Deep-Dive Plan

**Subject:** an academic paper about the *development process* — an AI software factory
in which autonomous agents build features governed by per-service versioned wire
contracts, RFC processes, conformance/discovery, and embedded architect agents that
negotiate change over a coordination bus.

**Grounding:** this plan reuses the scaffolding of the existing OpenWOP protocol paper at
`/Users/david/dev/openwop-paper` (LaTeX `article` class, manual `thebibliography`, inline
TikZ, `evidence/` corpus, gitignored `review/` workflow, CC BY 4.0, Zenodo DOI
`10.5281/zenodo.20576239`, arXiv `cs.SE` pending endorsement).

---

## 0. The one thing that determines success

The protocol paper had an easy evidentiary spine: a **protocol** either is portable or
isn't, and you proved it with a 3/3 cross-language replay experiment. A **methodology**
paper does not have that luxury. Its central claim — "this process is a good way to build
software with agents" — is a claim about *efficacy*, which is the hardest kind of claim to
evidence and the one reviewers attack first.

Compounding it: you are the **sole steward**, the methodology has **one reference estate**,
and much of the corpus was **produced by the very agents the paper studies**. To an SE
program committee that reads as advocacy / a vendor white paper unless it is engineered
not to.

> **The whole plan below is organized around converting "we believe this works" into
> "here is the corpus, here are the measurements, here is what we can and cannot yet
> claim."** Get that right and the rest is logistics.

You already have the right instinct in-house: the protocol paper's §9 Validation Agenda,
§10 Claims-and-Evidence Discipline, §11 Threats to Validity, and Positionality disclosure
are exactly the machinery this paper needs — turned up to maximum.

---

## 1. The contribution — what is actually new

> **Updated after the deep-research pass** ([[related-work-and-novelty]]). The canonical,
> reordered claims now live in `papers/methodology/abstract-and-claims.md`. Two changes the
> research forced: (1) **lead with cross-service, agent-negotiated, machine-speed contract
> evolution** (the genuine whitespace — surveys show agent coordination is *intra-workflow*),
> NOT with honesty-by-construction (most reproducible, but only *partially* novel: capability
> discovery is established prior art). (2) Three citations are now **mandatory** — *Shift-Up*
> (arXiv:2604.20436, already reframes ADRs/BDD/C4 as GenAI guardrails — anticipates the
> inverted-SDLC + ADR-guardrail framing), the *He/Treude/Lo* TOSEM survey (arXiv:2404.04834),
> and the *METR* RCT (arXiv:2507.09089). Also disambiguate two naming collisions in the
> intro: "Agent Contract" (= resource bounds, not API contracts) and "AI factory" (NVIDIA =
> infrastructure; DoD = DevSecOps pipeline).

**Organizing frame — the Inverted SDLC.** The paper's thesis becomes much stronger framed
as a *shift in where engineering effort lives*. Traditionally ~80% of effort goes to
Operate and ~10–15% to Create. When agents compress Create *and* Operate, the binding work
moves to the front — **Plan and Validate** — and **service contracts are what make that
shift tangible and enforceable**: they turn "Validate" from outcome-testing into
*continuous contract conformance*, and they let teams front-load the hardest questions
(external change via RFCs, local structure via ADRs) so the wrong approach is ruled out
*before any code is generated*. This is a crisp, citable, reviewer-legible motivation that
subsumes the three-failure-modes problem statement.

Be precise about the claim so reviewers can't say "this is just microservices + RFCs +
LLMs." The defensible novelty is the **combination engineered for machine-speed change**:

1. **Honesty-by-construction.** Capability advertisement is derived from live host state and
   bound to a conformance suite whose strict mode fails any advertised-but-unimplemented
   claim. A system *cannot* lie about what it supports. This is the strongest, most
   reproducible contribution — it is mechanically demonstrable.
2. **The contract gate as a forcing function.** A three-way classification
   (host-extension / rides-accepted-contract / touches-the-wire) wired to a failing test,
   applied *at planning time by an agent*, that keeps an agent-driven estate from
   fragmenting its own integration surface. Its sharper form: **the contract as a
   "friction partner"** — agreeable models are forced, by a strict machine-readable schema,
   to confront ambiguity and make explicit structural decisions they would otherwise paper
   over.
3. **Agent-mediated contract evolution.** Embedded per-service architect agents that
   negotiate contract changes with each other over a coordination bus, with a governed RFC
   lifecycle (Draft → Active(wire-locked) → Accepted) and risk-scaled comment windows.
4. **A reproducible governance corpus.** ~108 RFCs with explicit status + comment-window
   metadata, ~169 ADRs, a versioned conformance suite, an interop matrix, and discovery
   documents — released as an analyzable artifact. The corpus itself is a contribution.
5. **An organizational + harness model, not just an architecture.** Two further claims that
   distinguish this from a pure-tech paper: (a) a **team/operating model** — small
   mission-focused "Builder Teams" inside an *Architect Mesh*, with shared functions
   (Security, DevOps, Legal, Architecture) acting as *Contract Guardians* that embed their
   standards **as validation rules inside the contracts** rather than as review
   bottlenecks; and (b) the **Agentic Harness** — a version-controlled system in which
   context documents become machine-readable contracts, skills are contract-consumers, and
   hooks are non-negotiable contractual obligations. The harness is the reusable, transferable
   artifact a reader could adopt.

**Framing sentence for the abstract:** *"We report on a governance architecture, an
operating model, and an agentic harness for evolving a multi-service software estate at
machine speed — an 'inverted' SDLC in which effort moves to Plan and Validate, autonomous
agents propose, negotiate, and adopt wire-contract changes via RFCs, and a process makes
capability claims mechanically honest."*

**One-line positioning vs. the obvious priors:**
- vs. microservices/API governance → adds *agent-operated* change + honesty enforcement.
- vs. RFC/IETF process → adds *machine-readable conformance gating* + per-service embedded agents.
- vs. LLM-agent SE papers (AutoGen, MetaGPT, agentic SWE) → those generate code inside one
  repo; this governs *cross-service contract change* across an estate.
- vs. DevOps/team-topologies & platform-engineering → adds *contracts-as-guardrails* (shared
  functions embed standards into the contract, not into a review queue) + agent operators.

---

## 1.5 Canonical input — "The Builder Team Software Factory" → paper mapping

The Builder Team material is now canonical conceptual input. Map each piece to a paper home
so nothing is lost and nothing lands in the wrong rigor tier:

| Builder-Team concept | Paper home | Evidence tier |
|---|---|---|
| **Inverted SDLC** (80/10 → front-loaded Plan/Validate) | Intro / motivation frame | *Argued* (with corpus support from Study A) |
| **Builder Team structure** (Product Owner / UX Designer / AI Engineer) | §Methodology — operating model | *Observed* (describe the actual teams) |
| **Architect Mesh + Contract Guardians** (shared functions embed standards as contract rules) | §Methodology — governance | *Argued* + examples |
| **Discovery (6 parts)**: deep research → multi-persona PRD (Spec/Schema/Security/Conformance/Compatibility lenses) → contract-as-friction → dependency-aware roadmap → ADR/RFC split → architect ratification | §Methodology — the process; the multi-persona lenses tie directly to your existing 5-architect PRD pass | *Observed* (process) |
| **Build Loop** (`/architect → /goal → /verify-contract → /ux-review → merge-behind-toggle`, per ADR + ratified RFC, in dependency order) | §Methodology — the build loop; reproduce the loop pseudocode as a figure/listing | *Observed* + Study C trace |
| **Agentic Harness** (context-as-contracts, skills-as-consumers, hooks-as-obligations, memory) | §Agentic Harness (own section) — the transferable artifact | *Argued* + released templates |
| **ROI / productivity** (11.6:1; $86/hr; 1-in-3 save a workday/week) | §Economic framing — **quarantined, descriptive, non-causal** | *Observed/argued* — **NEVER demonstrated** (see Study E) |

Two reconciliations worth noting: the PRD's five expert lenses (**Spec, Schema, Security,
Conformance, Compatibility**) are exactly the existing five-architect PRD pass — present
them as the same mechanism. And "validate = contract conformance" is precisely the
honesty-by-construction loop (contribution #1) viewed from the SDLC angle — unify them so
the paper has one spine, not two.

---

## 2. Genre & venue — pick the lane before writing a word

The genre decision dictates the evidence bar, length, and tone. Four realistic lanes:

| Lane | Venue examples | Evidence bar | Length | Fit |
|---|---|---|---|---|
| **Preprint** | arXiv `cs.SE` (+`cs.AI`,`cs.DC`) + Zenodo DOI | Self-set | 12 pp | **Immediate, certain** — mirrors prior paper |
| **Experience report** | ICSE SEIP, FSE Industry, "Software Engineering in Practice" | Honest lessons + some evidence; controlled study NOT required | 8–10 pp | **Strong** — this is literally an experience report |
| **Vision / new-ideas** | ICSE NIER, Onward! Essays, a workshop (LLM4Code, agentic-SE, API evolution) | Provocative + plausible; low data bar | 4–6 pp | Good if you want peer-reviewed venue fast |
| **Empirical study** | ESEM, EMSE / TSE journal | Real empirical method, multiple subjects | 12+ pp | **Premature** — one estate, one steward |

**Recommended path (sequential, each step independently valuable):**

1. **Now:** finish a full-length manuscript and ship it as an **arXiv + Zenodo preprint**
   (you have the endorsement question already open from the protocol paper; resolve it
   once and it covers both). Gets a citable DOI, no gatekeeper, establishes priority.
2. **Next:** compress/retarget to an **experience-report** submission (ICSE SEIP or FSE
   Industry are the natural homes for "we ran this in production, here's what happened").
   These tracks *reward* honest industrial reflection and explicitly don't demand a
   controlled experiment — which neutralizes your biggest weakness.
3. **Optional parallel:** a 4–6 pp **workshop** version (an LLM-agents-for-SE or
   API-evolution workshop) to get early peer feedback and a presentation slot while the
   SEIP submission is in review.

Do **not** target ESEM/TSE first — a single self-run estate will be desk-rejected on
external validity. Get there later, after independent adoption exists.

---

## 3. The evidence plan — the part that makes it a paper, not a pitch

Mine the existing corpus into measured results. Each study below is achievable now from
artifacts you already have, and each maps to a contribution in §1.

### Study A — Corpus retrospective (quantify the methodology in action)
Mine the RFC + ADR + conformance history programmatically and report distributions:
- RFC lifecycle: counts by status; **time from Draft→Active→Accepted**; how often the
  7/30/90-day windows applied; waiver usage.
- ADR corpus: ~169 records; how many features shipped with an ADR before code (the
  discipline's adherence rate); correction-note frequency (decisions overturned in flight).
- Conformance: suite version history; scenario growth per accepted RFC; strict-mode
  pass/fail events.
- **Headline metric candidates:** "N features over T months, of which X% resolved at the
  contract gate without any wire change (buckets 1–2), Y% rode an accepted contract, Z%
  required a new RFC" — this directly evidences contribution #2 (the gate's selectivity).

### Study B — Honesty-enforcement demonstration (reproducible, like the portability expt)
A controlled mini-experiment mirroring the protocol paper's §8.3: configure a host to
advertise a capability it does not implement, run the conformance suite in strict mode,
show it fails; then implement it and show it passes. Capture the runs into `evidence/`.
This is your **strongest, most defensible result** — it's mechanical, reproducible, and
falsifiable. It evidences contribution #1.

### Study C — Agent-mediated rollout case study (one change, traced end to end)
Pick one real wire change. Trace it through: contract-gate classification → bus `task`
message → owner agent drafts RFC → comment window → Active/Accepted → consumer
implements + advertises + passes conformance → other consumers adopt/opt-out. Include
**redacted coordination-bus transcripts** and the actual RFC/ADR/conformance artifacts as
evidence. This evidences contributions #3 and #4 and gives the paper a concrete narrative.

### Study D — Cost/throughput framing (descriptive)
If extractable from the corpus: human-touch points per change, wall-clock from request to
estate-wide adoption, number of changes an agent handled with zero human intervention.
Frame honestly as descriptive, not comparative (you have no control group). These are the
*measured* operational facts that the §Economic framing then interprets.

### Study E — The economics (the ROI claims) — handle as a quarantined, glass-box model
The Builder-Team material brings hard numbers — **11.6:1 ROI, $86/hr blended rate, "1 in 3
developers save a full workday/week."** These are the paper's most attention-grabbing and
most attackable content. Treat them as a **transparent model, not a result**, in a
clearly-labeled *Economic framing (descriptive, non-causal)* subsection:

- **State the value-recovery formula in full**, with every input and assumption. A reviewer
  must be able to recompute 11.6:1 from your inputs. A black-box ROI is an automatic
  credibility hit; a glass-box one they can audit is defensible even if they disagree with it.
- **Report the denominator.** How many pilots? How many developers? Over what period? "Pilots
  showed" with no *n* reads as marketing. If *n* is small, say so and downgrade the claim.
- **Separate measured from modeled.** The workday/week figure (if survey- or telemetry-based)
  is closer to measured; 11.6:1 is almost certainly a *model output* built on the
  blended-rate and value-recovered assumptions. Label each explicitly.
- **Name the confounds yourself, first:** selection bias (pilots chosen to succeed), no
  control group (no counterfactual of the same work done the old way), Hawthorne effects,
  the blended-rate abstraction, and the definitional question of what "value recovered"
  counts. Put these in Threats to Validity *and* inline next to the number.
- **Tier it as *observed/argued*, never *demonstrated*.** Causal language ("the methodology
  caused an 11.6× return") is unsupportable without a control; use "associated with" /
  "under these assumptions" / "we model."
- **Quarantine it.** Keep ROI in its own subsection so that if a reviewer rejects the
  economics, the rigor of Studies A/B/C (which don't depend on it) is untouched. Do not let
  a modeled ROI headline the abstract; lead the abstract with honesty-by-construction.

Done this way, the economics become a *strength* for the SEIP/Industry audience (who want
business impact) without becoming the thread an empirical-minded reviewer pulls to unravel
the paper. The "treat AI spend as cost-of-goods, not tool expense" leadership framing is a
good *discussion* point — present it as an argued implication, not a finding.

**Evidence discipline (copy from the protocol paper):** every claim tagged as
*demonstrated* (A, B artifacts; C trace), *observed* (descriptive corpus + operational
stats, Study D), or *argued* (design rationale, the Inverted-SDLC frame, the economic
model, deferred to a Validation Agenda). Reviewers forgive "we haven't proven X yet" far
more readily than an overclaim they can puncture — and the ROI numbers are the most
puncturable thing in the paper.

---

## 4. Authorship, ethics, and positionality (do not skip — it's also your subject)

This paper is unusual: **the methodology under study was substantially executed by AI
agents, and the manuscript itself is AI-assisted.** That is simultaneously an ethics
obligation and a data point. Handle it explicitly:

- **AI cannot be a named author** (ACM/IEEE/ICMJE/arXiv policy). Disclose AI use in a
  dedicated statement — and lean in: the paper is *about* agents doing the work, so the
  disclosure doubles as evidence. State which parts of the corpus and manuscript were
  agent-produced and how they were human-reviewed.
- **Positionality / COI:** reuse the protocol paper's disclosure ("author is the project
  steward"), strengthened: single steward + sole adopter + tool vendor. Name the bias
  risks (selection, Hawthorne, self-evaluation) in Threats to Validity yourself, before a
  reviewer does.
- **Reproducibility as the antidote:** release the analyzed corpus (RFCs, ADRs, conformance
  history, redacted bus transcripts, analysis scripts) under CC BY + a Zenodo artifact DOI.
  "Here is everything; replicate my numbers" is the single most credibility-restoring move
  available to a solo author.
- **Privacy/security:** scrub the bus transcripts and evidence captures for secrets,
  internal hostnames, tenant identifiers (your estate has tenant-isolation data) before
  release.

---

## 5. Proposed paper structure (mapped to reusable scaffolding)

Mirror the protocol paper's spine; swap the protocol-kernel sections for methodology +
evidence. ~10–12 pp full version.

1. **Introduction — the Inverted SDLC.** Effort moves to Plan/Validate when agents compress
   Create/Operate; contracts make the shift enforceable. Positionality disclosure up front.
2. **Problem: coordinating change in an agent-built estate** — the three failure modes,
   framed as what breaks when Validate isn't continuous contract conformance.
3. **Contribution** — the five claims (§1), each tagged with its evidence tier.
4. **Related work** — anchored by the deep-research map ([[related-work-and-novelty]]):
   agentic-SE surveys (He/Treude/Lo TOSEM 2404.04834 — *coordination is intra-workflow*);
   spec-driven/agentic generation (API-first multi-agent 2510.19274 — *single-service*);
   contract/API governance (type-safe evolution 2002.06185; Compatibility-Driven Version
   Orchestrator); the inverted-SDLC frame (**Shift-Up 2604.20436** — *must cite + carve
   delta*; vibe-coding survey 2510.12399); agent infrastructure (Internet of Agents
   2505.07176; Agentic Services Computing 2509.24380); team topologies / platform
   engineering. *Reuse `references.md`; add the ~12 refs above. Flag source tiers (peer-
   reviewed vs. arXiv-preprint vs. predatory-adjacent vs. vendor) per the quality ledger.*
5. **The operating model** — Builder Teams (Product Owner / UX Designer / AI Engineer)
   inside the Architect Mesh; shared functions as **Contract Guardians** that embed
   standards as contract validation rules. *(New, from Builder-Team input.)*
6. **The process** — Discovery (deep research → multi-persona PRD lenses → contract-as-
   friction → dependency-aware roadmap → ADR/RFC split → architect ratification) and the
   **Build Loop** (`/architect → /goal → /verify-contract → /ux-review → merge-behind-toggle`,
   per ADR + ratified RFC, in dependency order). Include the loop as a numbered listing.
7. **The architecture** — local feature lifecycle → the contract gate (the "friction
   partner") → contract governance → the architect mesh + bus.
8. **Honesty-by-construction** — Validate *as* continuous contract conformance; the
   discovery↔conformance↔strict-mode loop (Study B home).
9. **The Agentic Harness** — context-as-contracts, skills-as-consumers, hooks-as-
   obligations, memory. The transferable artifact; ship templates with the corpus release.
10. **Evidence: corpus retrospective** — Study A tables/figures.
11. **Evidence: an agent-mediated change** — Study C narrative + artifacts; Study D operational stats.
12. **Economic framing (descriptive, non-causal)** — Study E: the glass-box ROI model,
    *n*, measured-vs-modeled, confounds inline. Quarantined subsection.
13. **Claims and evidence discipline** — the demonstrated/observed/argued ladder.
14. **Limitations and threats to validity** — solo steward, one estate, AI-authored corpus,
    ROI confounds, selection bias.
15. **Validation agenda** — what independent adoption would test; pre-registered hypotheses.
16. **Reproducibility and artifact availability** — the released corpus + harness templates + DOI.
17. **Conclusion** + bibliography.

**Figures (4–6, all TikZ, reuse `\paperfig` fallback):**
- F1: the **Inverted SDLC** (effort shift Operate→Plan/Validate) — a strong opening visual.
- F2: the five primitives / layered architecture.
- F3: the **Builder Team + Architect Mesh + Contract Guardians** org diagram.
- F4: the contract gate (three buckets → test outcomes), as the "friction partner."
- F5: the agent-mediated change sequence (the table you just built, redrawn as a swimlane
  in TikZ — *not* ASCII; you already learned that lesson).
- F6 (optional): the honesty loop (discovery ↔ live state ↔ conformance strict mode).
- Plus a **listing** (not a figure) for the Build Loop pseudocode.

**Tables:** reuse the house three-column `p{0.307\textwidth}` style for the claim/evidence
matrix and the corpus-retrospective stats.

---

## 6. Repository & tooling steps

The repo is single-paper (everything assumes `arxiv/main.tex`). **Don't overwrite the
protocol paper.** Add a sibling and share assets.

1. **New paper directory** — `papers/methodology/main.tex` (or `arxiv-methodology/`).
   Restructuring to `papers/<name>/` is cleaner long-term; if you want minimal churn, a
   sibling `arxiv-methodology/` matches the current `arxiv/` convention.
2. **Reuse the preamble** — copy `arxiv/main.tex:1-25` verbatim (article 11pt, geometry,
   TikZ `arrows.meta,positioning`, hyperref hidelinks, enumitem, the `\paperfig` macro).
3. **Share figures & bib** — point at the shared `figures/` dir; seed the new
   `thebibliography` from `references.md`, adding the contract-evolution + agent-SE refs.
   *Decision:* stay with manual `\bibitem[N]` for arXiv (zero-dependency), or switch to a
   `.bib` + `\bibliographystyle` **only if** you later target ACM/IEEE (acmart/IEEEtran).
4. **Build** — same manual flow: `pdflatex main.tex && pdflatex main.tex` (or Tectonic /
   Overleaf). Commit `main.pdf` per repo convention; keep intermediates gitignored.
5. **Optional quality-of-life (new, not present today):** add a `Makefile` /
   `latexmk -pdf` and a tiny GitHub Action that builds the PDF on push — worth it now that
   the repo hosts two papers. Low effort, prevents "PDF drifted from source."
6. **Evidence corpus** — create `evidence/methodology/` mirroring the existing layout:
   `corpus-analysis/` (scripts + extracted CSVs for Study A), `honesty-experiment/`
   (Study B captures, design.md + results.md), `rollout-case/` (Study C redacted
   transcripts + artifacts). This is what makes §12 real.
7. **Analysis scripts** — small, committed, deterministic scripts that regenerate Study A's
   numbers from the RFC/ADR/conformance repos, so a reviewer can re-run them.

---

## 7. Process & timeline

Reuse the protocol paper's lifecycle (the gitignored `review/` workflow:
`finalization-plan.md` living log, `paper-evaluation.md`, `review-guide.md` reviewer
packet, `external-review-request.md`). Phases:

| Phase | Work | Output |
|---|---|---|
| **P0 — Scope** | Lock genre (experience report), claims, and which studies (A,B,C) | 1-page abstract + claims list |
| **P1 — Evidence** | Run Studies A/B/C; capture into `evidence/methodology/` | Tables, the honesty experiment, the case study, analysis scripts |
| **P2 — Draft** | Write the manuscript against the §5 outline; draw TikZ figures | `main.tex` v1 + PDF |
| **P3 — Internal review** | Self-review with the claims-discipline ladder; tag every claim's tier | `paper-evaluation.md` |
| **P4 — External review** | Send the reviewer packet to 2–3 independent SE/ distributed-systems readers | Review responses + revisions |
| **P5 — Preprint** | Finalize; release arXiv (`cs.SE`/`cs.AI`/`cs.DC`) + Zenodo DOI + artifact DOI | Citable preprint |
| **P6 — Venue** | Retarget/compress to ICSE SEIP or FSE Industry; submit | Conference submission |

**Critical-path dependency:** P1 gates everything. The manuscript is fast to write once
the evidence exists; resist drafting prose before the numbers are in, or you'll write
advocacy and have to rewrite it as research.

**arXiv endorsement:** you already flagged `cs.SE` endorsement pending on the protocol
paper. Resolve it once (find an endorser, or cross-list under a category where you're
already endorsed) — it unblocks both papers.

---

## 8. Risks & mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Read as a vendor white paper / advocacy | **High** | Genre = experience report; evidence ladder; threats section written by you first; release the corpus |
| External validity: one estate, one steward | **High** | Don't claim generality; frame as a single rich case; pre-register what independent adoption would test (Validation Agenda) |
| "AI wrote the corpus *and* the paper" credibility hit | Medium | Explicit AI-use disclosure; human-review trail; make it a studied phenomenon, not a hidden one |
| Novelty challenged ("just microservices + RFCs + LLMs") | Medium | **Lead with cross-service agent-negotiated contract evolution** (the real whitespace per the research); honesty-by-construction is the reproducible *demo*, not the novelty lead; sharp related-work deltas |
| **Uncited prior art (esp. Shift-Up) found by a reviewer** | **High** | Cite Shift-Up / TOSEM survey / METR up front and carve each delta explicitly; a reviewer who finds these uncited will discount the paper |
| **Terminology collision** ("Agent Contract" = resource bounds; "AI factory" = NVIDIA infra; "software factory" = DoD DevSecOps) | Medium | Disambiguate all three in the first two pages — define our "versioned service contract" and "AI software factory (methodology)" against them |
| Corpus reveals secrets/tenant data on release | Medium | Scrub + review before any artifact publication |
| Self-evaluation bias in metrics | Medium | Descriptive not comparative; release scripts for replication; no causal/efficacy claims without a control |
| **ROI numbers read as marketing / get punctured** (11.6:1, $86/hr, workday/week) | **High** | Glass-box the value-recovery formula; report *n*; separate measured from modeled; name confounds inline; quarantine in its own subsection; tier observed/argued not demonstrated; keep ROI out of the abstract headline (Study E) |
| Org-model claims (Builder Teams / Guardians) seen as unsupported assertion | Medium | Present as *observed* description of the actual teams, not a controlled comparison; cite team-topologies / platform-eng priors as the lineage |
| Scope creep into a full empirical study | Low–Med | Hold the line at experience-report scope; defer comparative claims to future work |

---

## 9. Concrete next-step checklist

**Decisions needed from you (these set everything downstream):**
- [ ] Confirm **genre = experience report**, preprint-first, SEIP/Industry as the venue target.
- [ ] Confirm we may **release a scrubbed governance corpus** (RFCs/ADRs/conformance/redacted bus transcripts) as a Zenodo artifact — or set the redaction boundary if not.
- [ ] Confirm **single-author** (you) with an AI-use disclosure, or add co-authors.
- [x] **Study C change picked + written:** RFC 0050 (SAML/SCIM), traced across the **openwop-app +
      MyndHyve** two-host estate (the dual-witness bar). See `evidence/cross-host-case/`. The estate
      framing is now "single-steward, two-host (Tier-2)" — not "single-estate".
- [ ] Provide the **ROI model inputs** for Study E: how many pilots (*n*), how many developers, over what window, the full value-recovery formula behind 11.6:1, and whether the workday/week figure is survey- or telemetry-derived. Without these, the economics stay qualitative.
- [ ] Confirm we can **release the Agentic Harness templates** (skill/hook/context-contract scaffolding) alongside the corpus — this is the transferable artifact reviewers will value most.

**Then, in order:**
1. Stand up `papers/methodology/` (or `arxiv-methodology/`) reusing the preamble + figures + bib.
2. Write the analysis scripts and run **Study A** (corpus retrospective) → CSVs + tables.
3. Run **Study B** (honesty experiment) → captured runs in `evidence/methodology/`.
4. Assemble **Study C** (rollout case) → redacted transcripts + artifacts.
5. Draft `main.tex` against the §5 outline; draw the 3–4 TikZ figures.
6. Self-review with the claims-discipline ladder; write Threats + Validation Agenda.
7. External-review packet → 2–3 independent readers.
8. Release arXiv + Zenodo (paper DOI + artifact DOI); resolve `cs.SE` endorsement.
9. Compress to SEIP/Industry length; submit.

---

## 10. My recommendation in one paragraph

Write it as an **honest experience report**, not a methodology pitch. Its credibility will
live or die on three things you can do now: (1) the **honesty-by-construction experiment**
(Study B) as the reproducible centerpiece, (2) a **released, analyzable governance corpus**
with scripts that let anyone re-derive your numbers, and (3) a **threats-to-validity
section so candid** that a reviewer has nothing left to add. Ship it as an arXiv+Zenodo
preprint first (fast, certain, citable, mirrors the protocol paper), then retarget to
ICSE SEIP or FSE Industry, whose review culture rewards exactly this kind of rigorous
industrial reflection and forgives the one thing you cannot fix yet — that it's a single
estate run by its steward.
