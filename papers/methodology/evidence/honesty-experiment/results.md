# Study B — Results (captured live run)

Run via `run-honesty-experiment.sh` against the in-memory reference host
(`openwop-examples/examples/hosts/in-memory`) + the black-box conformance suite
(`openwop/conformance`), scenario `workflow-chain-host-expansion.test.ts`. **No host code
was modified** — the three honesty postures are driven entirely by where the host's
`OPENWOP_PACK_REGISTRY_DIR` points, because the host re-evaluates `existsSync(dir)` on every
`.well-known/openwop` request (advertisement bound to live state).

| # | Condition | registry dir | advertises `workflowChainPacks` | mode | result |
|---|---|---|---|---|---|
| **C1** | honest + implemented | backed (has packs) | `{"supported":true}` | strict | **6 / 6 PASS** |
| **C2a** | honest minimal | missing | `absent` | default | 6 / 6 pass (honest skip) |
| **C2b** | claims coverage, advertises nothing | missing | `absent` | strict | **6 / 6 FAIL** |
| **C3** | **DISHONEST** — advertise, cannot deliver | empty (exists, no packs) | `{"supported":true}` | strict | **3 / 6 FAIL** |

`strict` = `OPENWOP_REQUIRE_BEHAVIOR=true`.

## What each row demonstrates

- **C1** — when the host both advertises and actually implements the capability, strict
  conformance passes *non-vacuously* (the behavioral leg ran: ~18 ms vs ~6 ms for a vacuous
  skip). Baseline.
- **C2a** — a minimal host that advertises nothing stays green in default mode: the gated
  scenario skips. Honest minimalism is permitted.
- **C2b** — but that same minimal host **cannot claim full strict coverage**: under
  `OPENWOP_REQUIRE_BEHAVIOR=true`, advertising nothing turns the gated legs into hard
  failures. (A host that legitimately doesn't implement the capability declares
  `OPENWOP_OPTED_OUT_*` to skip honestly; silence is not coverage.)
- **C3 — the falsifiable core.** The host advertises `workflowChainPacks: {supported:true}`
  (because the registry dir exists) but has no packs to expand. Under strict mode the
  behavioral leg runs (it is advertised) and **fails** — the expansion call returns
  `pack_not_found` where the suite expects a real expansion. **A host cannot advertise a
  capability it does not deliver without failing its own conformance suite.**

The C1↔C3 contrast is the demonstration of *honesty by construction*: advertise + implement
→ pass; advertise without implement → fail. The C2a↔C2b contrast shows the complementary
guarantee: strict mode forbids claiming coverage you don't advertise.

## Honesty / scope notes (for the paper)

- This is a **demonstration on one host + one capability**, chosen because that host's
  advertisement is genuinely bound to live state (`existsSync` per request). It is evidence
  of the *mechanism*, not of estate-wide coverage. Study C shows the same loop operating at
  estate scale (retractions, opt-outs) across two hosts.
- Per Round-3 research, the *fail-on-dishonest-claim gate* is anticipated by prior art
  (Ramollari/Dranidis/Simons; PactFlow BDCT). The contribution demonstrated here is the
  **live-runtime-state binding** (advertise-only-when-currently-reachable, re-evaluated
  per request) in an autonomous multi-agent estate — not the existence of a deploy gate.
- Numbers are point-in-time against the suite/host at the run SHAs; re-run the harness to
  reproduce.
