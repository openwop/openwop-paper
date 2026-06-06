# Cross-host portability experiment — results (Cell A)

**Run date:** 2026-06-06. **Design:** [`experiment-design.md`](./experiment-design.md). **Raw captures:** [`captures/cell-a/`](./captures/cell-a/). **This is the paper's headline empirical result.**

## Setup

| | Host A | Host B |
|---|---|---|
| Implementation | `@openwop/openwop-host-in-memory` (TypeScript, `tsx`) | `openwop-host-in-memory-python` (Python, stdlib-only) |
| Source | `examples/hosts/in-memory/` | `examples/hosts/python/` |
| Port | 3737 | 3738 |
| Advertised | `protocolVersion 1.0`, `openwop-core` + stream profiles | same |
| Fixtures | 82 (from repo `conformance/fixtures/`) | 82 (same dir) |

Both hosts loaded the **same** workflow definitions from the same `conformance/fixtures/` directory; each workflow was created via `POST /v1/runs {"workflowId": …}`, polled to terminal state via `GET /v1/runs/{id}`, and its event log read via `GET /v1/runs/{id}/events/poll`. Cell A is the **cross-language** cell — a TypeScript and an independent Python implementation of the same wire contract.

## Result

| Workflow | Terminal state (TS / PY) | Event-type sequence | # events (TS/PY) | Portable |
|---|---|---|---|---|
| `conformance-noop` | completed / completed | identical | 4 / 4 | ✅ |
| `conformance-delay` | completed / completed | identical | 4 / 4 | ✅ |
| `conformance-multi-node` | completed / completed | identical | 8 / 8 | ✅ |
| `conformance-identity` | failed / *rejected (422)* | divergent failure mechanics | — | ⚠ finding |

**3 / 3 executable happy-path workflows are portable** under the experiment's operational definition: identical terminal state **and** identical canonical `RunEvent` type-sequence across two independent-language implementations, after normalizing host-local non-determinism.

The richest case, `conformance-multi-node`, produced the byte-identical canonical sequence on both hosts:

```
run.started → node.started → node.completed → node.started → node.completed → node.started → node.completed → run.completed
```

## Normalization applied (what differed vs what matched)

The **raw** events differ in exactly the host-local fields the protocol does not fix, and match on everything it does:

| Field | TypeScript host | Python host | Treatment |
|---|---|---|---|
| `eventId` | `<runId>-<n>` (positional) | random UUID | normalized away |
| `timestamp` | wall clock | wall clock | normalized away |
| `sequence` | present (int) | absent | host-local representation |
| `payload` (empty) | `null` | `{}` | host-local representation |
| **`type` sequence** | — | — | **MUST match → matched** |
| **terminal `status`** | — | — | **MUST match → matched** |

That the two implementations differ in ID scheme and empty-payload representation while emitting an **identical ordered event-type sequence and identical terminal state** is precisely the portability signal: the *contract* carried across languages even though the *implementations* did not share these incidental choices.

## The divergence (a real finding, not a failure)

`conformance-identity` references the `core.identity` node type, which **neither** host advertises (`capabilities.identity` is not set). Both hosts correctly decline to execute it — **the outcome is portable** (neither produces a successful run) — but the **failure mechanics diverge**:

- **Python:** fail-fast at creation — `HTTP 422 capability_required` ("references `core.identity`, but this host does not advertise `capabilities.identity: true`").
- **TypeScript:** accepts the run, then fails the node — terminal `failed`, sequence `run.started → node.started → node.failed → run.failed`.

This is the most valuable line in the experiment for the paper: it shows the harness **can** detect non-portability, and it identifies a concrete spec-tightening opportunity — the spec does not yet fix *when* a host must reject a workflow that references an unadvertised node type (at creation vs at execution). Report it as an open finding, not as a flaw.

## Threats / caveats (state these in the paper)

1. **Not independence.** Both hosts were authored by the protocol steward. Cell A demonstrates the spec is implementable **consistently across two languages by its own author** — strong cross-language evidence, but *not* third-party validation. A non-steward host passing the core profile remains the decisive future experiment (project tripwire unfired).
2. **Python runtime.** The Python host targets 3.11; it was run here on CPython **3.9.6**. Verified faithful: the host uses no runtime 3.10+ constructs (no `match`/`case`, no runtime PEP-604 unions); the only adjustment was adding `from __future__ import annotations` (PEP 563) to the one module (`__init__.py`) lacking it — a transparent shim that defers annotation evaluation and does not change runtime behavior. Captured event sequences are therefore representative.
3. **Coverage.** Three small core workflows under-sample the contract. Portability of noop/delay/multi-node does not imply portability of interrupt, replay, multi-agent, or artifact-bearing workflows. Cell B (sqlite vs postgres, interrupt + replay) and richer workflows remain to be run.
4. **Schema validation.** Event-type sequence + terminal-state equivalence were checked; full per-event validation against `run-event.schema.json` (Ajv) is the next hardening step.

## Cell B status (interrupt + replay across durable hosts)

**Partially executed — the interrupt/resume lifecycle is now captured on a durable host.** The full HITL lifecycle (suspend → signed-token, correlation-validated external resume → `run.completed`, incl. the HTTP 422 mismatch path) plus the replay/debug bundle were captured 2026-06-06 against the reference workflow-engine application on its durable SQLite store — see [`../demo-app/interrupt-replay.md`](../demo-app/interrupt-replay.md) and [`../demo-app/observed-interrupt-run.json`](../demo-app/observed-interrupt-run.json).

**Still open:** the *cross-host durable comparison* (the same interrupt workflow on a **second** durable host, e.g. `postgres`, diffed for portability) and deterministic *fork-from-checkpoint* replay. The Postgres pairing needs a running PostgreSQL instance (none available at capture time); the procedure is in [`experiment-design.md`](./experiment-design.md) §Cell B. The reference hosts now live at `openwop/openwop-examples` (`examples/hosts/`).

