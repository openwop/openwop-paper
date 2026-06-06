# Cover note

*For an arXiv preprint no cover letter is required; this note is for an optional workshop/venue submission or for accompanying the artifact.*

This submission is a **position paper with one reproducible result**. It argues that durable, observable, replayable, portable *workflow orchestration* is a distinct infrastructure layer for multi-agent AI systems — complementary to the agent-communication protocols (MCP, A2A) and to durable-execution runtimes (Temporal-class), neither of which standardizes the cross-host run-lifecycle contract. OpenWOP is analyzed as a candidate protocol through the lenses of standardization, interoperability, and portability.

**What is new beyond a position:** a reproducible cross-language portability experiment. The same workflow definition, executed against two independently-implemented reference hosts (TypeScript and Python), produces identical terminal state and identical canonical `RunEvent` type-sequences for the tested core workflows — and the method also surfaces a concrete divergence (two hosts reject an unadvertised node type at different points), demonstrating the harness can detect non-portability.

**Intellectual-honesty stance (stated in §1 and §10):** the author is the protocol steward; all reference hosts and the conformance leaderboard are steward-produced/self-reported; no independent third-party host exists yet. Claims are tagged by evidence tier, and the portability result is explicitly framed as cross-language consistency, not third-party validation.

**Artifact:** the manuscript is accompanied by an evidence artifact — the captured `HostCapabilityDocument`, a conformance snapshot, a real reference-host run-event log, and the raw portability captures + experiment design — plus host-setup instructions to reproduce the result.

**Author / contact:** David S. Tufts, MyndHyve Inc. — via <https://davidtufts.me> or LinkedIn.
