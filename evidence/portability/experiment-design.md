# Cross-host portability experiment — design

**Purpose.** Convert the manuscript's §7.3 portability claim from a hypothesis into a falsifiable, reproducible result. Portability is the paper's "most important and most demanding" claim; this is the one experiment a reviewer of a protocol-portability paper will actually weigh, so the paper should be built around it.

**Operational definition.** *OpenWOP is portable for a workflow W* iff executing the **same** `WorkflowDefinition` W against two compliant hosts yields, after normalizing host-local non-determinism: (1) the same terminal `RunState`; (2) the same canonical ordered sequence of `RunEvent` **types**, each schema-valid against `run-event.schema.json`; (3) equivalent `Artifact` outputs; and (4) — for durable hosts — a replay/fork that re-reads the recorded checkpoint identically.

## Hosts (use what already exists)

The four reference hosts already advertise on the live leaderboard. Two cells:

| Cell | Host A | Host B | What it isolates | Common profile floor |
|---|---|---|---|---|
| **A — cross-language core portability** *(primary)* | `in-memory` (TypeScript) | `python` (Python 3.11, stdlib-only) | The **strongest** signal: a different language + independent implementation of the same wire contract. | `openwop-core` · `openwop-stream-sse` · `openwop-stream-poll` |
| **B — interrupt + replay portability** | `sqlite` (durable) | `postgres` (durable, production-profile) | HITL checkpoint + replay/fork semantics across durable hosts. | core + 4 interrupt profiles + audit-log-integrity |

W must live in the **intersection** of each cell's advertised profiles. Cell A therefore uses core nodes only (in-memory/python do not advertise interrupt profiles); Cell B uses an interrupt-bearing W (sqlite/postgres advertise the interrupt profiles).

## Workflows under test

- **W_core (Cell A):** a small multi-node `WorkflowDefinition` exercising the kernel constructs the paper names — node execution (`RunEvent`/`EventLog`), variable/channel writes, and an `Artifact` emission — and terminating `completed`. Committed at `evidence/portability/workflows/w-core.json` (to be authored against `workflow-definition.schema.json`).
- **W_hitl (Cell B):** W_core + an `interrupt` node (HITL checkpoint) and a matching `resumePayload`, then an `Artifact`, then `completed`. Forked under `mode:"replay"` to test determinism.

## Procedure (reproducible)

For each host H in a cell:
1. **Provision + start** H from `examples/hosts/<H>/` (published install/run commands; record exact versions + the host's `/.well-known/openwop` `HostCapabilityDocument`).
2. **Create** the run: `POST /v1/runs` with W (or register W then run); record `runId`.
3. **Capture** the full `EventLog` (stream via SSE or poll), the terminal `RunState`, and all `Artifact`s.
4. **Validate** every event against `run-event.schema.json` (Ajv 2020).
5. **(Cell B)** drive `interrupt` → `resume`; then `POST /v1/runs/{runId}:fork {mode:"replay"}` and capture the replayed log.
6. Persist raw captures under `evidence/portability/captures/<cell>/<H>/`.

The existing conformance harness (`@openwop/openwop-conformance`) already drives hosts and validates events; the deterministic-replay scenario (`replayDeterminism.test.ts`) is the **oracle** for step 5. Prefer driving the capture through the harness so it is re-runnable, not hand-collected.

## Normalization protocol (what may differ vs what must match)

| Field class | Treatment |
|---|---|
| `runId`, `eventId`, `timestamp`, `traceId/spanId` | **Normalized away** (host-local non-determinism; replaced with positional placeholders before diff). |
| Vendor-extension fields (`x-*`, `vendor.*`) | **Ignored** (out of the core contract). |
| Ordering of *concurrent* events | Compared as a partial order (causation-respecting), not strict line order. |
| **`RunEvent` `type` sequence** | **MUST match** (canonical lifecycle: `run.created` → node lifecycle → terminal). |
| **Terminal `RunState`** | **MUST match** (`completed` with equal terminal variables/channels). |
| **`Artifact` content** | **MUST be equivalent** (byte-equal, or semantically equal under a declared canonicalization). |
| **(Cell B) replayed pin** | **MUST equal** the originally recorded value (no re-resolution). |

## Success / falsification

- **Supported** for cell C iff both hosts pass all four "MUST match" classes for W.
- **Falsified** iff either host: reaches a different terminal state, emits a structurally different canonical event-type sequence for the same W, produces non-equivalent artifacts, or (Cell B) a replay re-resolves rather than re-reads the pin. A falsification is a *finding*, not a failure — report exactly where the contract did not carry.

## Reporting (what goes in the paper)

A single table: cell × host × {terminal-state ✓/✗, event-type-sequence ✓/✗ (n events), artifact-equiv ✓/✗, replay-fidelity ✓/✗}, plus the normalized diff for any divergence. This is the paper's lone empirical result and should anchor §7.3 and the §9 "OpenWOP improves portability" row (currently "hypothesis").

## Threats specific to this experiment (state them in the paper)

1. **Shared-codebase confound.** `in-memory`, `sqlite`, `postgres` are all **TypeScript reference hosts sharing the same SDK/engine code** — passing Cell B across them is *consistency*, not independence. **Cell A (TS in-memory vs Python stdlib) is the only genuine cross-implementation evidence** and should be the headline; the others are supporting.
2. **Steward independence.** All four hosts are authored by the protocol steward. Cross-host equivalence here demonstrates the *spec is implementable consistently by its own author*, not that an independent third party can implement it. The truly decisive experiment — a **non-steward host** passing the core profile — remains future work (tracked by the project's own migration tripwire). Say this plainly.
3. **W coverage.** A single small W under-samples the contract; portability of W_core/W_hitl does not imply portability of arbitrary workflows. Scope the claim to the constructs W exercises.
