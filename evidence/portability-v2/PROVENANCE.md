# Portability at protocol v2 — provenance

This directory is a **copy** (not a link) of the v2 cross-language portability measurement, taken so the paper's evidence does not depend on another repository staying put. It is the paper's **current** portability evidence. The v1 measurement in [`../portability/`](../portability/) is kept as the earlier result.

| | |
|---|---|
| Source repository | `github.com/openwop/openwop-examples` |
| Source commit | `fc85d4f20b47e37bd3be562811a24f9f02c78b23` (`main`, 2026-11-25, "feat(hosts): sqlite on v2; remove the in-memory and python v1 hosts (#194)") |
| Run date | 2026-11-25 |
| Copied | 2026-11-25 |
| Protocol | v2 (`OpenWOP-Version: 2`, unversioned paths) |
| Hosts | `examples/hosts/v2-reference` 2.0.0-rc.1 (TypeScript, reads `@openwop/spec-artifacts@2.49.6`) and `examples/hosts/python` 2.0.0 (CPython 3.11.4, stdlib only, rows checked against `@openwop/spec-artifacts@2.49.14`) |
| Event schema | `schemas/v2/run-event.schema.json` from `@openwop/spec-artifacts@2.49.6`, Ajv 2020 |
| Conformance suite (host records) | `@openwop/openwop-conformance@2.49.14 --target-major 2` |

## Files

| Here | Source path at that commit | SHA-256 |
|---|---|---|
| `portability-v2.md` | `docs/portability-v2.md` | `4432287144b57b98385837e66bbb8518d2278ac25e91594c39a844f7db888781` |
| `captures/captures.json` | `docs/portability-v2/captures.json` | `79535afafeabee6ee11952350f2b2f330b4a3063cc18fe1360550b95ff2c8d38` |
| `captures/comparison.json` | `docs/portability-v2/comparison.json` | `54420616151a2275a990f9f6fcfd4c6689ccd750abf0386770d01e06595ee96c` |
| `harness/portability-v2.mjs` | `scripts/portability-v2.mjs` | `375617bca14e0012196337a4d40932f19917a2ac1067446a814dbb9a316e0a0c` |
| `conformance/python-host-conformance.md` | `examples/hosts/python/conformance.md` | `745f8e49c09d49c0e39c231ffb2bb37306b014a5ad504034291c53742242ad6c` |
| `conformance/sqlite-host-conformance.md` | `examples/hosts/sqlite/conformance.md` | `15575fe08431c5c020b7ab5ded888d2c9fa28bebfb6b567a1b8cd9b7593f4647` |

The files are byte-identical to the source, so relative links inside `portability-v2.md` and the conformance records resolve in `openwop-examples`, not here. To re-run, check out the commit above and run the command in `portability-v2.md` §Setup from that repository's root.

## Result in one line

The same conformance workflow definitions, run on the two hosts above, give identical terminal state and identical ordered `RunEvent` type sequence for the three core workflows of the v1 experiment (`conformance-noop`, `conformance-delay`, `conformance-multi-node`) and for `conformance-failure`, `conformance-approval` (resolved `accept`) and a `mode: "replay"` fork of the approval run; every event on both hosts validates against the v2 run-event schema. Both refuse `conformance-identity` with `404 not_found`.

## Conformance of the hosts (self-reported, steward-run)

- Python host: 944 of 945 tests pass at major 2 (suite 2.49.14); 460 requirements executed-pass, 2 executed-fail, 774 inapplicable.
- SQLite host: 943 of 945 (one failure since fixed by a filtered rerun, not a full rerun).
- The failure both share is `v2-effect-seam-manifest` (a host advertising `replay` publishes an empty effect-seam list).
- No v2 conformance record for the TypeScript `v2-reference` host (Host A of the portability run) is copied here.

## Caveats (read before citing)

1. **Not independence.** Both hosts are steward-authored. The Python host was written from the SQLite host's behaviour and the v2 spec (its README, line 79 at the commit above, says so), so it is not an independent reading of the spec. This is cross-language consistency of one author's implementations. Note that the same README (line 7) still calls the pair "two independent implementations"; this paper does not adopt that wording.
2. **The identity divergence is not resolved, just not reached.** The v1 run found the two hosts refusing `conformance-identity` at different points (creation vs execution). At v2 neither host loads that fixture, so both answer `404 not_found` for an unregistered workflow. The v2 spec does fix creation-time rejection (`422 capability_required`) for a *capability-gated reserved* node type on a host that does not advertise the capability (`spec/v2/core/runs.md` line 73, §Refusals, `openwop/openwop` `main` at `693fd9d1f`, 2026-11-25). It does not, as far as checked, state when to reject an arbitrary unadvertised node type.
3. **Coverage.** Six small fixtures. Payloads are compared only for `run.completed` outputs and the replayed `resumeValue`. The Python host serves the core floor only (7 families). Nothing outside the floor is measured, and no artifact-bearing workflow is run.
4. **Contract-version skew.** Host A reads spec-artifacts 2.49.6. The Python host's rows are checked against 2.49.14, and the schema used for validation is the 2.49.6 copy.
