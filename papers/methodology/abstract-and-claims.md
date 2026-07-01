# P0 — Abstract & Claims List

**Title (set 2026-06-30):** *Contracts at Machine Speed: Agent-Negotiated Wire-Contract
Evolution Across a Multi-Service Estate*

*Rationale:* leads with the verified-novel contribution (agent-negotiated versioned
contract change, cross-service) rather than the borrowed "inverted SDLC" frame or the
non-novel honesty mechanism; deliberately avoids "software factory" / "AI factory" in the
title (the Terminology paragraph disambiguates those from the NVIDIA / DoD senses).

*(Alternates considered: "Honest by Construction: Agent-Negotiated Contract Evolution at
Machine Speed"; "Governing Software Change at Machine Speed: An Experience Report on
Agent-Negotiated Service Contracts"; "Agent-Negotiated Contract Evolution Across a
Multi-Service Estate".)*

Status: Draft for review — this file pins the framing before any manuscript prose.
Genre: experience report (preprint-first → ICSE SEIP / FSE Industry).

---

## Abstract (draft, ~200 words)

> Autonomous AI agents now perform much of the work in a software life cycle, but the
> literature on agentic software engineering treats agent coordination as a problem *within
> a single development workflow*. The unsolved problem is coordination *across* independent
> services: when an agent building one feature needs another service to change its
> interface. We report on a methodology in which **autonomous agents propose, negotiate, and
> adopt versioned wire-contract changes across a multi-service estate** — to our knowledge
> the first end-to-end account of agent-driven contract evolution at machine speed. Each
> shared service publishes a versioned contract; embedded per-service architect agents
> negotiate changes over a coordination bus through a governed RFC process (Draft → Active →
> Accepted, with risk-scaled review windows); and every change is verified by a conformance
> suite. A second mechanism makes the verification trustworthy — **honesty by construction**:
> a service advertises a capability only when it is reachable in live state, and a strict
> conformance mode mechanically fails any advertised-but-unimplemented claim. The work sits
> within an **inverted SDLC** in which agent compression of Create and Operate moves the
> binding effort to Plan and Validate, and an operating model of mission-focused **Builder
> Teams** whose shared functions act as Contract Guardians by embedding standards into the
> contracts themselves. We present a retrospective over a governance corpus of 120 RFCs and
> 166 architecture decision records, demonstrate the honesty-enforcement mechanism
> reproducibly, and trace contract changes graduating across two distinct hosts on a
> dual-witness conformance bar, releasing the corpus and harness templates as an artifact.
> As a single-steward experience report — the two hosts share change control — we make no
> independent-validation, causal, or efficacy claim, and we present economics only as a
> transparent, non-causal model.

---

## Contribution claims (each with its evidence tier)

Evidence tiers: **D** = demonstrated (reproducible artifact/experiment) · **O** = observed
(descriptive corpus/operational data) · **A** = argued (design rationale, deferred to the
Validation Agenda). Novelty column reflects the [[related-work-and-novelty]] deep-research
pass — **N** novel · **P** partially anticipated (cite + carve delta) · **B** builds-on
established work. **Order is deliberate: lead with the genuinely-novel claims (C1–C2), not
honesty-by-construction** — which is the most *reproducible* claim but only *partially*
novel.

| # | Claim | Tier | Novelty | Evidence / prior-art delta |
|---|---|---|---|---|
| C1 | **Agent-negotiated contract evolution**: embedded per-service architect agents propose and negotiate *versioned wire-contract* changes over a coordination bus, under a governed RFC lifecycle (Draft→Active→Accepted) with risk-scaled windows | **D-trace** + O | **N** | **Study C (`evidence/cross-host-case/`): real cross-host trace** — RFC 0050 graduates `Accepted` when MyndHyve (a second host) advertises + passes conformance 19/19 non-vacuously; the dual-witness bar. *R2-CONFIRMED gap: across MCP/A2A/ACP/ANP agents only discover capabilities or select a version — none negotiate contract changes. Strongest novelty.* |
| C2 | **An RFC process run BY agents at machine speed** — a human-style change process (comment windows, status lifecycle) executed by agents across the estate | **O** + A | **N** | Study A lifecycle stats. *Closest adjacency: Agentic Services Computing "Evolution" phase (governs agent lifecycles, not a contract-change process).* |
| C3 | **Honesty by construction**: advertisement bound to live state + strict conformance makes a dishonest capability claim mechanically impossible | **D** ✓ | **P** (settled R3) | **Study B DEMONSTRATED LIVE** (`evidence/honesty-experiment/`): advertise+implement → 6/6 pass; advertise-without-deliver → 3/6 fail under strict mode. *Gate has prior art (Ramollari/Dranidis/Simons; PactFlow BDCT); our delta = continuous live-runtime-state binding in a multi-agent estate. Reproducible demo, not a "first" claim.* |
| C4 | **The contract gate** classifies change into host-extension / rides-accepted / touches-the-wire at planning time; the strict schema is a "friction partner" that forces explicit decisions | **O** + A | **P** | **Study A, AUDITED (`gate-audit.md`): 157/161 (97.5%) of ADRs needed no new wire RFC; only 4 wire-touching** (the first-pass heuristic's 80% was an under-count). *Delta vs. Shift-Up's guardrails: the three-way machine-speed classification wired to a failing test.* |
| C5 | **ADR-local vs RFC-external governance split** applied to agent-driven change | **O** + A | **P** | *Cite Shift-Up (ADRs as GenAI guardrails); delta = the two-tier host-decision vs wire-spec split, which Shift-Up does not have.* |
| C6 | **A reproducible governance corpus** (120 RFCs, 166 ADRs, conformance v1.46.0 / 380 scenarios, interop matrix, discovery docs) released as an analyzable artifact | **D** | **N** | Released artifact + analysis scripts (Study A, `evidence/corpus-analysis/`). *The corpus itself is a contribution.* |
| C7 | **Operating model**: Builder Teams in an Architect Mesh with shared functions as Contract Guardians (standards as contract rules, not review queues) | **O** + A | **P** | Description of actual teams. *Delta = org-functions-as-guardian-agents; mechanism (standards-as-rules) has prior art.* |
| C8 | **The Agentic Harness** (context-as-contracts, skills-as-consumers, hooks-as-obligations, memory) as a transferable artifact | **A** + D | **P** | Released harness templates. *Cite Shift-Up / AGENTS.md-style context conventions as lineage.* |
| C9 | **Inverted SDLC**: effort shifts to Plan/Validate; the methodology makes the shift non-catastrophic | **A** + O | **B** | *Cite Shift-Up + vibe-coding survey explicitly — this frame is established prior art; our contribution is the cross-service governance that operationalizes it.* |
| C10 | **Economic framing**: a transparent, non-causal model of where the methodology recovers value | **A** | **B** | Study E. **R3: DROP the "11.6:1 / $86-hr / workday-a-week" figures — all three are UNATTRIBUTABLE** (Forrester TEIs report 433%/376% and study Enterprise Cloud + Advanced Security, not Copilot). Bracket any model strictly with the citable independents: METR (−19%) and Cui et al., *Management Science* 2026, DOI 10.1287/mnsc.2025.00535 (+26.08%). |

**Non-claims (state explicitly to pre-empt reviewers):** we do **not** claim a controlled
efficacy result, generalization beyond one estate, or a causal ROI. These are deferred to
the Validation Agenda pending independent adoption.

### Required prior-art positioning (from the deep-research pass)

Three citations are now **mandatory** — a reviewer who finds them and sees them uncited will
discount the paper:

- **Shift-Up** (Lipsanen, Mikkonen et al., VibeX 2026; arXiv:2604.20436) — already reframes
  BDD/C4/**ADRs** as GenAI guardrails and reports the Plan/Validate effort shift. Cite for
  C5, C8, C9; carve the delta each time (it has no local/external split, no wire contracts).
- **He, Treude, Lo** (ACM TOSEM 2025; arXiv:2404.04834) — the anchor agentic-SE survey; cite
  to establish that coordination in the field is intra-workflow (which is what makes C1 novel).
- **METR RCT** (arXiv:2507.09089) and the **Management Science Copilot 3-RCT** — cite both in
  the economic/threats sections so C10 is bracketed by the independent evidence, not floating.

### Terminology disambiguation (do this in the intro)

The deep-research pass surfaced two live naming collisions. Defuse both in the first two
pages or reviewers will:

- **"Agent Contract"** already means *resource-governance bounds* (token/time/budget; Contract
  Net lineage; arXiv:2601.08815). State that our "contract" = a **versioned service/API wire
  contract**, not resource bounds.
- **"AI factory" / "software factory"** — NVIDIA's "AI factory" = AI *infrastructure*; the DoD
  Platform One "software factory" = a *DevSecOps pipeline*. State that our "AI software
  factory" = a *methodology* for agents building features across a multi-service estate.
  **R2 finding: the methodology sense is unclaimed** — so you may *coin and define* it, but
  carefully (it's an absence-of-evidence sweep — define the term, don't assert "no one has
  used it"). Cite McKinsey's "**agentic SDLC**" / "agent factories" as the nearest neighbor
  (those are factories that *produce/govern agents*, not your multi-service-estate sense).

---

## The one-paragraph "so what"

Traditional governance (API review boards, standards bodies, change-advisory boards) was
built for human-speed change and becomes a bottleneck the moment agents propose changes
faster than humans can review them. This work's wager is that the way to govern at machine
speed is to **move the human judgment into the contract** — encode standards as conformance
rules, make advertisement honest by construction, and let agents negotiate within those
rails — so that review becomes continuous and automatic rather than a queue. The paper is
the first end-to-end report of running that wager across a real multi-service estate.

---

## Open framing decisions (for the author)

- [ ] Pick the working title from the candidates above.
- [ ] Confirm C10 (economics) stays a *subsection*, never the abstract headline (current
      draft keeps ROI out of the abstract entirely — moved to a single closing clause).
- [ ] Decide whether the harness templates (C8) ship with the v1 preprint or a follow-up.
- [x] **Study A ran — counts pinned:** 120 RFCs, 166 ADRs, conformance v1.46.0 (380 scenarios).
      Contract-gate headline: **80% of classifiable ADRs needed no new wire RFC.** Remaining: a
      manual validation pass over the heuristic gate classification + conformance growth via git history.
- [x] Round-2 resolved: **C1 (agent-negotiated contract evolution) is the confirmed lead
      novelty** (A2A/MCP/ANP don't negotiate contract changes); the paper **may coin "AI
      software factory" as a methodology term** (unclaimed; cite McKinsey "agentic SDLC").
- [x] **C3 decision — RESOLVED (R3):** the fail-on-dishonest gate has prior art (Ramollari et al.;
      PactFlow BDCT). C3 is reframed as the *reproducible demo* of a **live-state-bound** honesty gate
      in a **multi-agent estate** — cite both priors; do NOT claim "first."
- [x] **ROI decision (C10) — RESOLVED (R3):** the 11.6:1 / $86-hr / workday-a-week figures are
      **unattributable → dropped.** Economic framing now brackets strictly with METR (−19%) and
      Cui et al., *Management Science* 2026 (DOI 10.1287/mnsc.2025.00535, +26.08%).