# Conformance snapshot — `openwop.dev/conformance/`

**Captured:** 2026-06-06 (UTC). **Source:** <https://openwop.dev/conformance/> (leaderboard last updated 2026-06-02). **Suite:** `@openwop/openwop-conformance@1.18.1` (default mode; the published suite has since advanced to `1.20.0`, whose additions are capability-gated scenarios that soft-skip on these hosts — applicable pass-rates unchanged).

> **Self-reported status — read this first.** Every row below is *self-published by the project steward*. The leaderboard's own framing is "a claim plus evidence": the claim is the advertised profile; the evidence is the conformance result published with the host. As of this capture there is **no independent third-party host or non-steward maintainer** (the project's `ROADMAP.md` migration tripwire is unfired; `KNOWN-LIMITS.md` states this). The paper must treat this as *self-reported conformance evidence*, not third-party validation. (See `../../review/paper-evaluation.md` §CRITICAL-2.)

## Hosts (claim + advertised profiles)

| Host | Use case | Path | Compatibility profile claim | Scale | Production | Evidence |
|---|---|---|---|---|---|---|
| **In-memory** (reference) | Local dev / fastest boot / no persistence | `examples/hosts/in-memory/` | `openwop-core` · `openwop-stream-sse` · `openwop-stream-poll` | `minimal` | Not claimed | `examples/hosts/in-memory/conformance.md` |
| **SQLite** (reference) | Single-machine durability / restart-safe | `examples/hosts/sqlite/` | `openwop-core` + 2 stream + `openwop-audit-log-integrity` + 4 interrupt profiles + `openwop-auth-api-key-rotation` + `openwop-discovery-auth-scoped` (10) | `minimal` | Not claimed | `examples/hosts/sqlite/conformance.md` |
| **Python in-memory** (reference) | Cross-language portability (Python 3.11 stdlib-only) | `examples/hosts/python/` | `openwop-core` · `openwop-stream-sse` · `openwop-stream-poll` | `minimal` | Not claimed | `examples/hosts/python/conformance.md` |
| **Postgres** (reference) | Multi-process durability + first `production-profile` host | `examples/hosts/postgres/` | 14 profiles incl. `openwop-production`, `openwop-auth-{oauth2-client-credentials,oidc-user-bearer,mtls,api-key-rotation}` (auth conditional on env) | `minimal` | Claimed (2026-05-11) | `examples/hosts/postgres/conformance-full.md` |

## Conformance pass rates (suite 1.18.1, default mode)

| Host | Passed | Failed | Skipped | Total | Pass rate |
|---|---:|---:|---:|---:|---:|
| Postgres reference | 2068 | 0 | 93 | 2161 | **95.7%** (0 deterministic failures) |
| SQLite reference | 2056 | 0 | 105 | 2161 | **95.1%** (0 deterministic failures) |
| In-memory reference | 2010 | 46 | 105 | 2161 | **93.0%** |
| Python reference | 2008 | 2 | 151 | 2161 | **92.9%** |
| Workflow-engine reference (in-process) | 1400 | 20 | 107 | 1527 | **91.7%** |

Failures are honest non-claims for surfaces a host does not advertise (e.g. the in-memory host's 46 "failures" are interrupts / multi-agent dispatch / stream buffering it deliberately does not implement), not regressions.

## Composition-partners interop (the A2A/MCP boundary, exercised)

| Partner | Reference impl | Result |
|---|---|---|
| **MCP** | `@modelcontextprotocol/sdk@1.29.0` (all three transports) | ✅ pass |
| **A2A** | `@a2a-js/sdk@0.3.13` reference peer (echo skill, JSON-RPC) | ✅ 1/1 pass (`a2a-task-roundtrip.test.ts`) |

## What this snapshot supports (and doesn't), for the paper

- **Supports (§6, §8 Conformance rung):** a live, versioned conformance harness exists; four reference hosts in three languages advertise profiles and produce four-bucket scenario evidence; the `ConformanceProfile` kernel construct is operational; the A2A/MCP composition boundary is exercised against real peer SDKs.
- **Does not support:** universal/ecosystem-wide conformance, third-party (non-steward) validation, or production-deployment maturity. All hosts are reference/steward hosts.
