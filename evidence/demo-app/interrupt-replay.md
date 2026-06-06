# Interrupt / resume + replay-debug capture (durable host)

**Captured:** 2026-06-06. **Host:** the OpenWOP reference workflow-engine application (`openwop-app`, run locally on its default SQLite store — a *durable* host advertising the interrupt profiles), port 8080. Raw capture: [`observed-interrupt-run.json`](observed-interrupt-run.json). Closes the interrupt/resume + replay/debug items of the manuscript's §12 (formerly "capture a demo run … interrupts/resume, replay/debug if available").

## What was driven
1. Created a workflow with a single `core.interrupt` node (`kind: external-event`, correlation `{orderId: "fixture-order-1", status: "completed"}`) via `POST /v1/host/sample/workflows`.
2. Started a run (`POST /v1/runs`) → it executed to the interrupt and **suspended** (`status: waiting-external`), persisting a signed callback token (the public event log strips the token; an authed endpoint lists it).
3. **Negative control:** `POST /v1/interrupts/{token}` with a *mismatched* correlation → **HTTP 422** (`validation_error`, correlation mismatch), no resume — confirming the external-event correlation check.
4. **Resume:** `POST /v1/interrupts/{token}` with the matching correlation → **200**, run resumed and ran to **`completed`**.
5. **Replay/debug surface:** `GET /v1/runs/{runId}/debug-bundle` → **200** with `{runId, workflowId, status, events, truncated, metrics}` — the host's replay/debug bundle.

## Captured event-type sequence (real)
```
run.started → node.started → node.suspended → node.interrupt.resolved → run.resumed → node.completed → run.completed → memory.written
```

## What this establishes (and doesn't)
- **Establishes:** the full HITL lifecycle — suspend, signed-token interrupt, correlation-validated external resume (incl. the 422 negative path), and completion — is real and observable on a durable host; plus the replay/debug bundle is retrievable. Together with the cross-host portability result and the core run-event log, this covers run creation, event updates, interrupt/resume, and replay/debug.
- **Does not establish:** deterministic *fork-from-checkpoint* replay (`POST /v1/runs/{id}:fork`) — that is the reference hosts' surface and is not exposed via this application's REST API; the debug-bundle is the replay/debug evidence here. Cross-host *durable* portability (the same interrupt workflow on a second durable host, e.g. Postgres) also remains future work — this is a single durable host.
