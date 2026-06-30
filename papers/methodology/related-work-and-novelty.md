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
  real tasks → **19% slower** with AI; forecast +24%, *still believed +20% after being slowed.*
  *The single most important independent counterweight — and the proof self-reported ROI is unreliable.*
- **Cui, Demirer, Jaffe, Musolff, Peng & Salz — "The Effects of Generative AI on High-Skilled
  Work: Evidence from Three Field Experiments"** (*Management Science*, INFORMS, 2026; DOI
  10.1287/mnsc.2025.00535; 3 RCTs, 4,867 devs). Copilot → **+26.08% completed tasks**.
  *Peer-reviewed; measures task count, not value.* **Cite the INFORMS DOI — NOT the earlier
  pubpub preprint (1,974 devs).**
- **R3 — the three vendor figures are UNATTRIBUTABLE → drop them.** "11.6:1 ROI" cannot be
  sourced (the Forrester TEIs report **433% / 376% ROI** and study **GitHub Enterprise Cloud +
  Advanced Security, NOT Copilot**); "$86/hr blended rate" and "1 in 3 devs save a workday/week"
  are not locatable in any named report. *Use METR + Cui et al. as the citable bracket instead.*

---

## Novelty verdict table (candid)

Ratings reflect **absence of captured contradicting prior art** — weaker than proof of
novelty. Each row gives the strongest contradicting source.

| Claim | Verdict | Strongest contradicting source | The defensible delta to carve |
|---|---|---|---|
| **(a) Honesty-by-construction** (advertisement bound to live state + strict conformance fails dishonest claims) | **PARTIALLY ANTICIPATED (R3 — settled; do NOT claim "first")** | **Ramollari, Dranidis & Simons** — X-machine broker admits only services whose *live implementation* matches their advertised model; **PactFlow BDCT** — `can-i-deploy` blocks deploy on provider self-verification failure | **R3 verdict: the fail-on-dishonest *gate* has clear SOA/CDC prior art** (also CDC "fail-on-missing-functionality," Hallé et al. runtime verification). Cite Ramollari + PactFlow. **Residual novelty = binding advertisement to _continuous live runtime reachability_ (advertise-only-when-currently-reachable, per-request) inside an _autonomous multi-agent contract-evolution estate_** — no surveyed source does this. C3 is the *reproducible demo*, not a novelty headline. |
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

**Both residual follow-ups were RESOLVED in Round 3 (below).**

---

## Round 3 — the last two questions, settled

Third deep-research pass (100 agents, two targets). Both parked decisions now resolved.

### Target A — honesty-by-construction prior art (outside the agent-protocol corpus)

**Verdict: PARTIALLY ANTICIPATED. Do not claim "first" for the mechanism.** The
fail-on-dishonest-claim *gate* is established in the SOA / contract-testing literature:

- **Ramollari, Dranidis & Simons, "Reliable Web Service Publication and Discovery through
  Model-Based Testing and Verification"** (Sheffield) — *the strongest contradicting source.*
  A broker derives a complete **X-machine** test set from the provider's *advertised* behavioural
  model, runs it against the **live implementation**, and admits **only passing services** to the
  registry. An explicit publication-time *fail-on-non-conforming-claim* gate, motivated precisely
  by "WSDL/UDDI cannot guarantee advertised == implemented."
- **PactFlow Bi-Directional Contract Testing** — `can-i-deploy` **blocks deployment** when a
  provider's self-verification against its advertised OpenAPI fails (self-verification is optional,
  so the binding is conditional).
- Also: **Pact / Spring Cloud Contract** provider verification fails on "missing functionality";
  **Hallé et al.** runtime verification detects doc-vs-implementation divergence (reactive, call-time);
  **capability-based security** binds a token to backed authority (adjacent, not the gate).

**The residual, defensible novelty** (cite the above, then carve this): binding advertisement to
**continuous live runtime reachability** — advertise-only-when-currently-reachable, assembled from
live host state *per request* (not a one-time registry/deploy check) — **inside an autonomous,
multi-agent, wire-contract-evolution estate.** No surveyed source binds advertisement to live
execution state, and none does so in a multi-agent governance setting. → **Reframe C3 as the
*reproducible demonstration* of a live-state-bound honesty gate, explicitly extending Ramollari et
al. / PactFlow BDCT; it is not a standalone novelty claim.**

### Target B — provenance of the ROI figures

**Verdict: all three UNATTRIBUTABLE → drop them (or label as explicitly unverifiable).**

- **"11.6:1 ROI"** — cannot be sourced. The Forrester TEIs report **433% ROI** ($136.8M NPV) and an
  earlier **376%**, and study **GitHub Enterprise Cloud + Advanced Security, not Copilot**. Neither
  equals 11.6:1.
- **"$86/hr blended rate"** and **"1 in 3 developers save a full workday/week"** — not locatable in
  any named report (Forrester TEI, Octoverse, GitHub surveys, McKinsey, GitClear, DORA, Atlassian).
  *Absence of evidence, not positive refutation — a dedicated GitHub-survey/ROI-calculator hunt could
  still surface a vendor lineage.*
- **Replace with the citable bracket:** METR RCT (−19%, n=16) and **Cui, Demirer, Jaffe, Musolff,
  Peng & Salz, *Management Science* 2026, DOI 10.1287/mnsc.2025.00535** (3 RCTs, 4,867 devs, +26.08%
  tasks). Cite the **INFORMS DOI**, not the pubpub preprint.

**New citable sources from Round 3:**
- **Ramollari, Dranidis & Simons**, "Reliable Web Service Publication and Discovery through Model-Based
  Testing and Verification" (Univ. Sheffield) — *primary, peer-reviewed*; the honesty-gate prior art.
- **PactFlow Bi-Directional Contract Testing** docs — *secondary/product*; the deploy-blocking gate.
- **Cui et al., *Management Science* 2026**, DOI 10.1287/mnsc.2025.00535 — the corrected citation for +26.08%.

**One residual open question (rating-relevant, not blocking):** does any *post-2010* work extend the
Sheffield X-machine publication gate to *continuous runtime re-certification*? If so it would narrow the
live-state delta further. Low priority — current framing already concedes the gate and claims only the
live-state + multi-agent combination.

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
