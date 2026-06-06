# References (resolved bibliography)

Replaces the `[CIT: …]` placeholders in [`related-work-draft.md`](./related-work-draft.md) and supplements the manuscript's existing 5 steward sources. **All 25 entries are verified (✓)** — primary sources carry stable URLs a reviewer can check directly; the five academic citations ([9] DBOS, [23] rr, [25] Katz–Shapiro) and the standards ([12] BPMN, [13] WS-BPEL, [14] XPDL, [18] A2A) were confirmed against their authoritative sources on 2026-06-06. Format to the target venue's citation style before submission.

## Steward / primary OpenWOP sources (label as self-authored)
- **[1]** OpenWOP v1 specification corpus. https://openwop.dev/spec/v1/ — *steward-authored primary source.*
- **[2]** OpenWOP conformance leaderboard. https://openwop.dev/conformance/ — *self-reported.*
- **[3]** OpenWOP — "A2A vs MCP vs OpenWOP" comparison. https://openwop.dev/comparisons/ — *steward-authored.*
- **[4]** OpenWOP workflow-engine reference application. https://github.com/openwop/openwop/tree/main/apps/workflow-engine.
- **[5]** Hosted OpenWOP reference UI. https://app.openwop.dev/.

## Durable-execution runtimes
- **[6]** Temporal — documentation. https://docs.temporal.io/.
- **[7]** Cadence (Uber). https://cadenceworkflow.io/.
- **[8]** Restate. https://restate.dev/.
- **[9]** ✓ A. Skiadopoulos, Q. Li, P. Kraft, K. Kaffes, et al. "DBOS: a DBMS-oriented operating system." *Proc. VLDB Endowment* 15(1):21–30, 2021. https://www.vldb.org/pvldb/vol15/p21-skiadopoulos.pdf.
- **[10]** AWS Step Functions — documentation. https://docs.aws.amazon.com/step-functions/.
- **[11]** Azure Durable Functions — documentation. https://learn.microsoft.com/azure/azure-functions/durable/.

## Prior vendor-neutral workflow standards (the §spine: portability lesson)
- **[12]** OMG, Business Process Model and Notation (BPMN) v2.0, formal/2011-01-03. https://www.omg.org/spec/BPMN/2.0/.
- **[13]** OASIS, Web Services Business Process Execution Language (WS-BPEL) v2.0, 2007. https://docs.oasis-open.org/wsbpel/2.0/.
- **[14]** ✓ Workflow Management Coalition. XML Process Definition Language (XPDL) 2.2. WfMC, 2012 (adds BPMN 2.0 modeling extensions). https://wfmc.org/.
- **[15]** CNCF Serverless Workflow specification. https://serverlessworkflow.io/.
- **[16]** Argo Workflows. https://argo-workflows.readthedocs.io/.

## Agent protocols & frameworks
- **[17]** Model Context Protocol (MCP) specification. https://modelcontextprotocol.io/.
- **[18]** ✓ Agent2Agent (A2A) Protocol Specification. Linux Foundation project (contributed by Google, 2025). https://a2a-protocol.org/latest/specification/ — repo https://github.com/a2aproject/A2A. Reference peer SDK used in this artifact: `@a2a-js/sdk`.
- **[19]** LangGraph. https://langchain-ai.github.io/langgraph/.
- **[20]** Microsoft AutoGen. https://microsoft.github.io/autogen/.
- **[21]** CrewAI. https://docs.crewai.com/.

## Event sourcing, replay, observability
- **[22]** M. Fowler, "Event Sourcing," 2005. https://martinfowler.com/eaaDev/EventSourcing.html.
- **[23]** ✓ R. O'Callahan, C. Jones, N. Froyd, K. Huey, A. Noll, N. Partush. "Engineering Record and Replay for Deployability" (rr). USENIX ATC 2017. https://www.usenix.org/conference/atc17/technical-sessions/presentation/ocallahan.
- **[24]** OpenTelemetry specification. https://opentelemetry.io/docs/specs/.

## Standardization as a mechanism (analogy, not proof)
- **[25]** ✓ M. L. Katz, C. Shapiro. "Network Externalities, Competition, and Compatibility." *American Economic Review* 75(3):424–440, 1985. (Canonical network-effects/standardization reference; pair with primary-standard analogies — TCP RFC 793, ISO/IEC 9075 SQL, HTTP RFC 9110 — as motivating examples.)
- **[40]** ✓ C. Shapiro, H. R. Varian. *Information Rules: A Strategic Guide to the Network Economy.* Harvard Business School Press, 1999. (More recent, accessible treatment of standards, compatibility, lock-in, and network effects — pairs with [25] for the "standardization as a market mechanism" argument; closes backlog item #5.)

## Recent AI-agent / workflow-orchestration literature (2023–2026)
*Added 2026-06-06 after a dedicated search pass — the field this paper sits in. All verified against arXiv/proceedings.*
- **[26]** ✓ O. Khattab, A. Singhvi, et al. "DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines." arXiv:2310.03714, 2023 (ICLR 2024). https://arxiv.org/abs/2310.03714. — *compound-AI / declarative LM pipelines.*
- **[27]** ✓ S. Fan et al. "WorkflowLLM: Enhancing Workflow Orchestration Capability of Large Language Models." arXiv:2411.05451, 2024. https://arxiv.org/abs/2411.05451. — *frames the shift Robotic Process Automation → Agentic Process Automation; workflow orchestration as an LLM capability.*
- **[28]** ✓ J. Zhang et al. "AFlow: Automating Agentic Workflow Generation." arXiv:2410.10762, ICLR 2025. https://arxiv.org/abs/2410.10762. — *automated workflow-graph search.*
- **[29]** ✓ "A Survey on LLM-based Multi-Agent Systems: Recent Advances and New Frontiers in Application." arXiv:2412.17481, 2024. https://arxiv.org/abs/2412.17481.
- **[30]** ✓ "Multi-Agent Collaboration Mechanisms: A Survey of LLMs." arXiv:2501.06322, 2025. https://arxiv.org/abs/2501.06322.
- **[31]** ✓ "A Survey of AI Agent Protocols." arXiv:2504.16736, 2025. https://arxiv.org/abs/2504.16736.
- **[32]** ✓ A. Ehtesham et al. "A Survey of Agent Interoperability Protocols: MCP, ACP, A2A, and ANP." arXiv:2505.02279, 2025. https://arxiv.org/abs/2505.02279. — *directly maps the agent-protocol landscape OpenWOP's §5 distinguishes from.*
- **[33]** ✓ "Rethinking the Reliability of Multi-agent Systems: A Perspective from Byzantine Fault Tolerance." arXiv:2511.10400, 2025. https://arxiv.org/abs/2511.10400. — *agent reliability/fault-tolerance motivation for durable execution.*
- **[34]** ✓ L. Yue et al. "From Static Templates to Dynamic Runtime Graphs: A Survey of Workflow Optimization for LLM Agents." arXiv:2603.22386, 2026. https://arxiv.org/abs/2603.22386. — *most current survey of the LLM-agent workflow space.*

### Backlog round 2 — replay/determinism + evaluation (added 2026-06-06, verified)
- **[35]** ✓ E. Feng et al. "Get Experience from Practice: LLM Agents with Record & Replay." arXiv:2505.17716, 2025. https://arxiv.org/abs/2505.17716. — *record & replay for LLM agents; directly parallels OpenWOP's EventLog/replay obligation (log only non-deterministic events).*
- **[36]** ✓ L. Qiu et al. "Blueprint First, Model Second: A Framework for Deterministic LLM Workflow." arXiv:2508.02721, 2025. https://arxiv.org/abs/2508.02721. — *deterministic LLM workflows.*
- **[37]** ✓ "Understanding and Mitigating Numerical Sources of Nondeterminism in LLM Inference." arXiv:2506.09501, 2025. https://arxiv.org/abs/2506.09501. — *why even temperature-0 runs drift; motivates pinning non-determinism for replay.*
- **[38]** ✓ "A Survey on Evaluation of LLM-based Agents." arXiv:2503.16416, 2025. https://arxiv.org/abs/2503.16416. — *the fragmented agent-evaluation landscape (motivates conformance-as-contract).*
- **[39]** ✓ P. Zhu et al. "A Unified Framework for the Evaluation of LLM Agentic Capabilities." arXiv:2605.27898, 2026. https://arxiv.org/abs/2605.27898. — *shows scaffold/framework choice shifts outcomes — external corroboration that agent behavior is not portable across frameworks (the exact problem OpenWOP targets).*

## `[CIT]` → reference mapping (for `related-work-draft.md`)
| Placeholder in draft | Resolves to |
|---|---|
| Temporal docs; Restate; DBOS | [6], [8], [9] (+ [7], [10], [11]) |
| BPMN 2.0; CNCF Serverless Workflow; Argo | [12], [15], [16] (+ [13], [14]) |
| MCP spec | [17] |
| A2A spec | [18] |
| LangGraph/AutoGen/CrewAI | [19], [20], [21] |
| Fowler — Event Sourcing; deterministic replay | [22], [23] |
| OpenTelemetry | [24] |
| standardization-economics; OTel adoption | [25], [24] |

**Status:** all entries verified 2026-06-06; previously-flagged [9], [14], [18], [23], [25] are now confirmed with full metadata. Remaining task is purely formatting to the venue's citation style.
