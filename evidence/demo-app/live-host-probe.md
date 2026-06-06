# Live host probe — `app.openwop.dev`

**Captured:** 2026-06-06 (UTC). **Method:** anonymous HTTPS against the public demo API at `https://app.openwop.dev/api`, cookie jar held across calls (a cookieless request gets a throwaway `anon:<sid>` tenant; the jar pins one anon tenant for the session). Reproducible with `curl -c jar -b jar`.

This file is **implementability evidence**: the protocol's discovery, readiness, capability-advertisement, and durable-seed surfaces are live and behave as the spec describes. It is **not** adoption or production-maturity evidence.

| Probe | Request | Result |
|---|---|---|
| Capability discovery | `GET /api/.well-known/openwop` | **200** — full `HostCapabilityDocument` captured verbatim at [`host-capability-document.json`](./host-capability-document.json) (980 lines). `protocolVersion: 1.1`, `implementation: openwop-workflow-engine-sample 0.1.0`, advertised envelopes, schema versions, limits, and per-capability blocks (workspace, kanban, …). |
| Readiness | `GET /api/readiness` | **200** |
| Durable seed round-trip | `POST /api/v1/host/sample/demo/seed` | **200** — `{"seeded": true, "agents": 5, "domains": ["user-agents","roster","boards","cards","schedules","org-chart"]}`. The host accepted the request and materialized durable state across six domains. |
| Agent inventory | `GET /api/v1/agents` | **200** — 5 seeded agents with pack provenance, e.g. `core.openwop.agent-examples.chat` (pack `core.openwop.agent-examples@1.1.x`), each carrying `persona`, `label`, `modelClass`, and a capability description (e.g. the chat agent exercises per-run conversation-channel memory per RFC 0005). |
| Run surface | `GET /api/v1/runs` | **200** — `{"runs": []}`. The run-oriented REST surface is live (empty for a fresh anon tenant). |

## What this probe does and does not establish

- **Establishes:** the `HostCapabilityDocument` kernel construct is real and machine-readable on a live host; the host advertises a concrete profile/limit/envelope surface a client can reason about *before* execution (the paper's §7.2 interoperability claim, made concrete); durable state seeding works.
- **Does not establish here:** a full **observed run lifecycle** (create → events → interrupt/resume → replay/fork → terminal state). On the public demo, run creation is driven through the application UI — `POST /api/v1/workflows` and `POST /api/v1/runs` return **404** on the anonymous API surface (creation is gated behind the signed-in app flow). The **reproducible** run-lifecycle + event-log evidence is therefore captured against a **reference host** under the deterministic harness specified in [`../portability/experiment-design.md`](../portability/experiment-design.md), which is stronger evidence than a one-off UI screenshot: it is runnable, schema-validated, and replayable.
