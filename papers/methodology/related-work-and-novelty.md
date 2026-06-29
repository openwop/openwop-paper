# Related Work & Novelty Verdict — Deep-Research Findings

Source: deep-research workflow (6 search angles, 25 sources fetched, 107 claims
extracted, 25 adversarially verified → 22 confirmed / 3 refuted). 2023–2026 scope.
Confidence varies per item; vendor/weak sources flagged. This file feeds the paper's
Related Work section and the honesty of its novelty claims.

---

## Headline takeaways (what this changes for the paper)

1. **There is a direct prior-art hit you MUST cite and distinguish: "Shift-Up."** It
   already reframes BDD + C4 + **ADRs** as "structural guardrails for GenAI-native
   development" and reports effort shifting toward design/validation — i.e. it anticipates
   *both* your inverted-SDLC frame *and* the ADR-as-agent-guardrail idea. Your defensible
   delta is the **two-tier local-ADR / external-RFC split** and the **cross-service
   versioned-contract** machinery, which it does not have.
2. **Your strongest genuine novelty is cross-service contract negotiation by agents.** The
   field's surveys define agent "coordination" as *intra-workflow* (within one dev process),
   **not** across independent services/repos via versioned wire contracts. That is the
   whitespace — lead with it.
3. **The ROI numbers are not survivable as stated.** The strongest *independent* study (METR
   RCT) found AI made experienced devs **19% slower** while they *believed* they were faster;
   a peer-reviewed 3-RCT Copilot study found **+26% task throughput**. Your "11.6:1 ROI /
   save-a-workday" matches **no** independent source → it is vendor-grade. This vindicates the
   Study E quarantine; if anything, tighten it further.
4. **Two terminology collisions to defuse up front:** (i) "**Agent Contract**" already means
   *resource-governance bounds* (token/time budgets, Contract Net lineage) — not versioned
   API contracts; (ii) "**AI factory**" (NVIDIA) means *infrastructure/control-plane*, and
   "**software factory**" (DoD Platform One) means a *DevSecOps pipeline* — neither is your
   methodology sense. Define your terms against these in the intro or a reviewer will.

---

## Related-work map (citable, grouped by theme)

### A. Agentic software engineering — the anchor literature
- **He, Treude, Lo — "LLM-Based Multi-Agent Systems for Software Engineering"** (ACM TOSEM
  2025; arXiv:2404.04834). *Peer-reviewed.* The canonical SDLC-phase taxonomy of LLM
  multi-agent systems; explicitly says the field is **not yet autonomous, scalable, or
  trustworthy**. → Your anchor Thread-1 citation and your "why governance is needed" hook.
- **Wang et al. — "AI Agentic Programming: A Survey"** (arXiv:2508.11126, 2025). Agent
  coordination = decompose/plan/multi-step **within one workflow**. ⚠ Verification *refuted*
  the claim it was accepted to ACM Computing Surveys — **cite as an arXiv preprint only.**
- **"Specification Complexity in Microservice-Based Applications"** (arXiv:2508.20119, 2025).
  Even GPT-o3-mini drops from ~94% test-pass at complexity-3 to ~24% at complexity-4. →
  Empirical evidence that autonomous *multi-service* building is unsolved — motivates your
  governance contribution.
- **"From Specification to Service: …API-First Development Using Multi-Agent Systems"**
  (arXiv:2510.19274, 2025). Multi-agent OpenAPI-spec + server-code generation with an
  error-feedback loop — but **single-service scope.** → Closest spec-driven-agentic prior
  art; your delta is *cross-service contract governance*.

### B. Contract / API governance — largely AI-free baselines
- **Costa Seco et al. — "Robust Contract Evolution in a Type-Safe Microservices
  Architecture"** (‹Programming› 2020; arXiv:2002.06185). *Peer-reviewed PL venue.* Type
  system + generated adapters; 69% of deployments provably safe. → The deterministic baseline
  your agent layer sits **atop**, not replaces.
- **"Compatibility-Driven Version Orchestrator"** (MDPI Digital 2025, doi
  10.3390/digital5030027). SemVer + contract testing + CI/CD in one algorithm, **no AI**.
- **Langoju — LLM-augmented consumer-driven contract testing** (IJISAE 2026). ⚠ Low-tier /
  APC-driven venue, **no precision/recall** reported. Cite only as *existence-of-direction*.
- **"…Formal Specifications from NL Contracts: Symboleo"** (arXiv:2411.15898, 2024). LLMs can
  translate NL → formal spec but remain **unreliable** (49% env-variable identification
  failures). → Supports "embedding standards as contract rules" as *aspirational*, not solved.

### C. The inverted SDLC / spec-driven AI development
- **Lipsanen, Mikkonen et al. — "Shift-Up: …SE Guardrails in AI-native Software
  Development"** (VibeX 2026 workshop; arXiv:2604.20436) + companion "Towards Shift-Up"
  (arXiv:2509.24485). **THE strongest prior-art hit.** Reframes BDD/C4/**ADRs** as guardrails;
  reports effort moving to design/validation. *Caveat: "Initial Findings," no quantitative
  metrics.* → Must cite; carve your delta (local/external split + wire contracts).
- **"A Survey of Vibe Coding with LLMs"** (Ge et al., arXiv:2510.12399, 2025). Formalizes
  *validate-by-outcome*. Supports the Create→Validate shift; single-developer scope.
- Industry: **Martin Fowler** (spec-driven dev), **Microsoft Developer Blog** (spec-driven
  AI-native engineering), **ThoughtWorks** (AI-first SE). *Blog-grade* — use as practitioner
  signal, not evidence.

### D. Agent infrastructure — capability discovery & service lifecycle (your novelty's neighbors)
- **"Internet of Agents" survey** (IEEE TCCN 2025; arXiv:2505.07176). Treats **capability
  notification & discovery** + consensus/conflict-resolution as core enablers. → The prior art
  that makes your honesty-by-construction only *partially* novel.
- **"Agentic Services Computing"** (arXiv:2509.24380, 2025). A governed agent-service
  lifecycle with an explicit **"Evolution"** phase. → The closest neighbor to your RFC process;
  adjacency only (governs agents-as-services, not an RFC comment-window process).
- **"Agent Contracts: A Formal Framework for Resource-Bounded Autonomous AI Systems"**
  (COINE/AAMAS 2026; arXiv:2601.08815). "Agent Contract" = **resource governance**, not API
  contracts. → The naming-collision citation.

### E. Productivity / ROI evidence (for the Economic-framing section)
- **METR RCT** (independent non-profit, 2025; arXiv:2507.09089). 16 experienced OSS devs, 246
  real tasks → **19% slower** with AI; perceived +20%. *The single most important
  independent counterweight.*
- **Cui, Demirer, Jaffe et al. — "Effects of Generative AI on High-Skilled Work"**
  (Management Science 2025; 3 RCTs, 4,867 devs). Copilot → **+26.08% (SE 10.3%)** completed
  tasks. *Peer-reviewed; measures task count, not value.*
- **DORA 2024**, **GitHub Copilot study** (github.blog) — *vendor/secondary*; cite as such.

---

## Novelty verdict table (candid)

Ratings reflect **absence of captured contradicting prior art** — weaker than proof of
novelty. Each row gives the strongest contradicting source.

| Claim | Verdict | Strongest contradicting source | The defensible delta to carve |
|---|---|---|---|
| **(a) Honesty-by-construction** (advertisement bound to live state + strict conformance fails dishonest claims) | **Partially anticipated → CONFIRMED-with-caveat (R2)** | Internet of Agents (capability discovery); **A2A spec** — AgentCard is *cacheable static metadata*, decoupled from live state, with only implicit "error on use," no conformance | Confirmed absent across MCP/A2A/ANP. **Caveat:** R2 did NOT deeply sweep service-mesh / OpenAPI-AsyncAPI conformance gating / capability-based security — residual prior-art risk there. **Soften wording to "not present in the agent-protocol literature" OR run a 3rd targeted sweep before claiming first.** |
| **(b) Per-service architect agents negotiating versioned contract changes over a bus** | **Largely novel → CONFIRMED (R2), strongest candidate** | A2A/MCP/ACP/ANP comparative survey (arXiv:2505.02279) + A2A & MCP primary specs | **R2 verdict: real, unfilled gap.** All four protocols only *discover* capabilities, *select* a protocol version/extension, or negotiate *modality* — none propose/negotiate/version CHANGES to a shared contract ("a new URI MUST be created for breaking changes" = authored out-of-band). ANP's Meta-Protocol Negotiator aligns protocols, not contract amendments. **Lead the paper here.** |
| **(c) An RFC process (Draft→Active→Accepted, risk-scaled windows) run BY agents at machine speed** | **Novel** (no prior art found) | Agentic Services Computing "Evolution" phase (adjacency only) | Adjacency governs agent lifecycles, not a contract-change comment-window process at agent speed. R2 corroborates: no protocol carries a contract-change process. |
| **(d) ADR-local vs RFC-external governance split for agent-driven change** | **Partially anticipated** | **Shift-Up** (ADRs as GenAI guardrails) | Shift-Up does ADR-as-guardrail but **not** the two-tier host-decision vs wire-spec split. Cite it explicitly; the split is yours. |
| **(e) Shared functions as "Contract Guardians" (org functions embed standards as contract validation rules)** | **Partially anticipated** on mechanism, **novel** on org framing | Type-safe contract evolution; IJISAE LLM impact-reasoning; Symboleo | Standards-as-validation-rule exists; *encoding cross-cutting org functions as guardian agents* enforcing them at change-time is the new framing. |

**Net:** (b) and (c) are your headline novelty; (a), (d), (e) are real but *incremental* and
must each cite and out-distance a specific prior work. Reframe the abstract so the lead
contribution is **cross-service, agent-negotiated, machine-speed contract evolution** — the
one thing the literature demonstrably does *not* yet have.

---

## What got refuted in verification (do NOT rely on these)
1. That the "AI Agentic Programming" survey was **accepted to ACM Computing Surveys** (0-3). It's an arXiv preprint.
2. That **Pact verifies only structural/syntactic conformance** leaving semantic drift entirely unaddressed (1-2) — overstated; don't build a strawman on it.
3. That spec-driven LLM generation is **reliable only for small specs** (1-2) — a paper caveat, not an established finding.

---

## Round 2 — targeted verdicts on the four open questions

Second deep-research pass (90 agents, 10 sources, 25/25 claims confirmed, 0 refuted). All
four resolved; three favor the paper, one (Q3) carries a residual caveat.

| Q | Question | Verdict | What it means for the paper |
|---|---|---|---|
| **Q1** | Does anyone own "AI software factory" as a *methodology* term? | **INCONCLUSIVE-favorable** | The methodology sense is **unclaimed**. McKinsey's "**agentic SDLC**" / "factories *of* agents" is adjacent (factories that *produce/govern agents*, a central-team capability), distinct from your multi-service-estate sense, NVIDIA's infra "AI factory," and the DoD DevSecOps "software factory." → **You can coin/define the term — but carefully** (define it; don't assert "nobody has ever used it," since this is an absence-of-evidence sweep). Cite McKinsey "agentic SDLC" as the nearest neighbor. |
| **Q2** | Do A2A/MCP already negotiate versioned *contract changes*? | **CONFIRMED — gap is real** | Across MCP/ACP/A2A/ANP, agents only **discover** capabilities, **select** a protocol version/extension, or negotiate **modality**. A2A's AgentCard = static boolean flags; `A2A-Version` = client/server compatibility selection; `A2A-Extensions` = opt-in to *existing* extensions; "**a new URI MUST be created for breaking changes**" = contract authored **out-of-band**. MCP = version selection + one-way `list_changed` notice. ANP's Meta-Protocol Negotiator aligns *protocols*, not contract amendments. → **C1 holds; this is your headline novelty.** |
| **Q3** | Is honesty-by-construction novel? | **CONFIRMED-with-caveat (2-1 vote)** | Not present in the agent-protocol literature: A2A AgentCard is *cacheable static metadata* (spec §8.6), validation is implicit "error on use," the survey covers no conformance enforcement. **Caveat:** adjacent domains (service-mesh / OpenAPI / AsyncAPI conformance gating, capability-based security, runtime interface verification) were **not deeply swept** — residual prior-art risk. → **Soften to "first in the agent-protocol setting" OR run a 3rd sweep** before claiming unqualified novelty. |
| **Q4** | Provenance of "11.6:1 ROI / save-a-workday / $86/hr"? | **CONFIRMED — unsourceable / vendor-lineage** | None appear in the GitHub 2023 economic paper (arXiv:2306.15033, vendor-authored; only ~30% acceptance + a $1.5T projection), GitHub's n=95 "55% faster" experiment, or the checked **Forrester TEIs (376% ROI ≈ 4.7:1, not 11.6:1)**. The figures bear a Forrester-TEI signature but the exact report was **not located**; the workday/week figure traces to GitHub survey/Octoverse messaging. Independent METR RCT = **−19%**. → **Do not present as independent. Locate the exact originating TEI and label it vendor-funded, or drop the figures.** |

**New citable sources from Round 2:**
- **A2A protocol specification** (a2a-protocol.org, v1.0 2026) — *primary*; the AgentCard / version-header / extensions evidence.
- **"A Survey of AI Agent Protocols" (MCP/ACP/A2A/ANP)** (arXiv:2505.02279, 2025) — *primary survey*; the cross-protocol "discovery/selection only" finding.
- **McKinsey, "Rewiring software delivery for the agentic era"** — *secondary/vendor*; the "agentic SDLC" / "agent factories" framing (Q1 nearest neighbor).
- **ACNBP — Agent Capability Negotiation & Binding Protocol** (arXiv:2506.13590) — *a research proposal*, noted: negotiates capability binding, still **not** versioned-contract-change negotiation (does not fill the gap; cite to show the gap is being noticed).
- ROI provenance: GitHub "Sea Change" paper (arXiv:2306.15033), GitHub Copilot study (github.blog), Forrester TEI landing pages — all **vendor**; METR (arXiv:2507.09089) the lone independent.

**Two residual follow-ups (optional, before final submission):**
1. A focused sweep of **service-mesh / OpenAPI / AsyncAPI conformance gating + capability-based security** to fully close the Q3 honesty-enforcement novelty (currently the weakest verdict).
2. Locate the **exact Forrester TEI (or other report)** behind 11.6:1 / $86/hr, or formally drop the figures.

---

## Targeted follow-up searches still worth running (the report's open questions)
1. **"AI software factory" as a *methodology* term** — McKinsey ("rewiring software delivery
   for the agentic era") is the closest mainstream articulation; do a dedicated sweep
   (McKinsey/GitLab/Accenture/ThoughtWorks) to either claim or cede the term.
2. **A2A / MCP agent-to-agent *contract negotiation*** — confirm the (b) gap with a targeted
   Google A2A + MCP sweep before asserting novelty in print.
3. **Honesty-enforcement prior art** — confirm nobody couples capability advertisement to
   live state with a fail-on-dishonest conformance mode, to firm up (a).
4. **Provenance of the 11.6:1 / workday-a-week figures** — locate and label the actual
   (vendor) source; do not present as independent.

---

## Source-quality ledger (flag these tiers in the paper)
- **Strong / peer-reviewed primary:** TOSEM survey (2404.04834); ‹Programming› type-safe
  evolution (2002.06185); Management Science Copilot RCT; METR RCT; IEEE TCCN Internet of Agents.
- **Emerging preprints / workshops (cite as emerging):** Shift-Up, vibe-coding survey,
  AI-agentic-programming survey, API-first multi-agent, Agentic Services Computing,
  microservice-complexity.
- **Weak / predatory-adjacent (cite cautiously or not at all):** IJISAE LLM-contract article.
- **Vendor / blog (label as such):** NVIDIA AI Factory, McKinsey, Microsoft/Fowler/ThoughtWorks
  blogs, GitHub Copilot study, DORA.
