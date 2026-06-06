# Workflow-engine & reference-host setup

How to run the OpenWOP hosts that produced this paper's evidence. Commands verified 2026-06-06. This closes §12 Step 3 ("document workflow-engine setup path").

## Repositories
- **Spec + conformance suite:** `openwop/openwop` — suite `@openwop/openwop-conformance`, fixtures under `conformance/`.
- **Reference hosts:** `openwop/openwop-examples` → `examples/hosts/` (in-memory, sqlite, python, postgres). *(These moved out of `openwop/openwop` into the examples repo; paths below are relative to that repo.)*
- **Reference workflow-engine application (the demo):** the `app-server` (`backend/typescript`) + React frontend; hosted at <https://app.openwop.dev/>. Run locally as a **durable host** (SQLite store, port 8080): `node_modules/.bin/tsx src/index.ts` (the `npm run dev` script uses a Node-22 `--env-file-if-exists` flag — invoke `tsx` directly on Node 20). This is the host used for the interrupt/resume + replay-debug capture ([`interrupt-replay.md`](interrupt-replay.md)); workflow creation is `POST /v1/host/sample/workflows` (`{workflowId, nodes:[{nodeId, typeId, config}]}`), runs via `POST /v1/runs`, interrupt resolution via `POST /v1/interrupts/{token}`.

## Reference hosts (used for the portability experiment)
All four load the same workflow fixtures from `conformance/fixtures/`; all default to port **3737**, API key **`openwop-inmem-dev-key`** (override with `OPENWOP_PORT`).

| Host | Path | Run command | Deps | Notes |
|---|---|---|---|---|
| In-memory (TS) | `examples/hosts/in-memory/` | `npm start` (`tsx src/server.ts`) | none (needs `tsx`, e.g. `npx -y tsx`) | fastest boot; no persistence |
| Python (stdlib) | `examples/hosts/python/` | `PYTHONPATH=src python3 -m openwop_host` | none (stdlib) | targets Python **3.11**; cross-language portability host |
| SQLite (TS) | `examples/hosts/sqlite/` | `npm install && npm start` | `better-sqlite3` (native build) | single-machine durability; advertises interrupt profiles |
| Postgres (TS) | `examples/hosts/postgres/` | `npm install && npm start` (needs a Postgres DSN) | `pg` + a running Postgres | production-profile host |

### Drive a run (any host)
```sh
A='Authorization: Bearer openwop-inmem-dev-key'
curl -s http://127.0.0.1:3737/.well-known/openwop                                  # HostCapabilityDocument
curl -s -X POST http://127.0.0.1:3737/v1/runs -H "$A" -H 'Content-Type: application/json' \
     -d '{"workflowId":"conformance-multi-node"}'                                   # -> {runId,...}
curl -s -H "$A" http://127.0.0.1:3737/v1/runs/<runId>                               # terminal snapshot
curl -s -H "$A" http://127.0.0.1:3737/v1/runs/<runId>/events/poll                   # event log
```
Shared executable fixtures include `conformance-noop`, `conformance-delay`, `conformance-multi-node` (core), and the `conformance-interrupt-*` set (durable hosts only).

## Run the conformance suite against a host
```sh
# from openwop repo root, host running in another shell:
OPENWOP_BASE_URL=http://127.0.0.1:3737 OPENWOP_API_KEY=openwop-inmem-dev-key npx vitest run
```

## Known limitations
- **In-memory / Python hosts** advertise `openwop-core` + stream profiles only — no persistence, no interrupt/replay; process restart drops state.
- **Interrupt / resume / replay** require a host advertising the interrupt profiles (SQLite or Postgres).
- **The hosted demo (`app.openwop.dev`)** gates run-creation behind its signed-in UI: `POST /v1/runs` and `POST /v1/workflows` return **404** on the anonymous public API. Reproducible run-lifecycle evidence is therefore captured against a local reference host (see [`observed-run.json`](observed-run.json), [`../portability/results.md`](../portability/results.md)), which is stronger than a one-off UI screenshot.
- The Python host was exercised here on CPython 3.9 with a transparent `from __future__ import annotations` shim (no behavior change); it targets 3.11.
