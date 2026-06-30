# Study B — Honesty-by-Construction Experiment

The paper's **reproducible centerpiece** (claim **C3**). Tier: **Demonstrated**.

Shows, against a live reference host and the black-box conformance suite, that **a host
cannot advertise a capability it does not actually deliver without failing its own
conformance suite** under strict mode — and, conversely, that a host which advertises
nothing cannot claim full strict coverage. This is "Validate as continuous contract
conformance" made falsifiable.

## Design

The capability under test is the in-memory host's `workflowChainPacks`. Its advertisement
is **bound to live state**: the host re-evaluates `existsSync(OPENWOP_PACK_REGISTRY_DIR)` on
every `.well-known/openwop` request and includes `workflowChainPacks` only when the probe
passes. We drive three honesty postures purely by where that dir points — **no host code is
modified**:

| Posture | `OPENWOP_PACK_REGISTRY_DIR` | Advertises? | Can deliver? |
|---|---|---|---|
| honest + implemented | a dir containing packs | yes | yes |
| honest minimal | a missing dir | no | no |
| **dishonest** | an **empty** dir (exists, no packs) | **yes** | **no** |

Then we run the gated behavioral scenario in default vs strict
(`OPENWOP_REQUIRE_BEHAVIOR=true`) mode. See `results.md` for the captured table.

## Reproducing

Prerequisites: the in-memory host and the conformance suite checked out as siblings with
their `node_modules` installed.

```sh
OPENWOP_DEV_ROOT=/path/to/dev ./run-honesty-experiment.sh
```

Overridable env: `HOST_DIR`, `CONF_DIR`, `PORT`. The script starts the host in each posture,
curls its advertisement, runs `workflow-chain-host-expansion.test.ts`, and prints the
result table. It cleans up the host process and the temp registry dir on exit.

## Why this host / capability

It was chosen because the host's advertisement is *genuinely* recomputed from live execution
state per request (the comment in `src/server.ts`: *"re-evaluated on every
`/.well-known/openwop` request … so the advertisement tracks reality"*). That makes it a
faithful, minimal instance of the honesty-by-construction mechanism the paper describes —
not a contrived test double.

## Caveats (carried into the paper)

- One host, one capability — evidence of the **mechanism**, not estate-wide coverage
  (Study C covers the estate scale, including real retractions and opt-outs).
- The fail-on-dishonest *gate* has prior art (Ramollari/Dranidis/Simons; PactFlow BDCT). The
  demonstrated increment is the **continuous live-state binding** in a multi-agent estate.
