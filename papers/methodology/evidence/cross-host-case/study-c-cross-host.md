# Study C — Cross-Host Contract Evolution (the worked example)

The paper's concrete instantiation of **agent-driven contract evolution across a
multi-service estate** (claims **C1, C2**). Tier: **Demonstrated-trace** (a real change
traced end to end across two hosts) + **Observed** (the cohort-scale corpus record).

This study uses our two real apps — **openwop-app** (the open reference host) and
**MyndHyve** (the steward's product host) — as the example. It is the most important
external-validity material in the paper, *and* the place the paper must be most careful
about what it does and does not claim.

---

## 1. The estate: two hosts, one wire contract

| Host | What it is | Deployment / discovery | Evidence tier |
|---|---|---|---|
| **openwop-app `workflow-engine`** | Open (MIT) reference host; re-implements the wire contract neutrally | `https://app.openwop.dev/api/.well-known/openwop` | Tier 1 — steward reference host |
| **MyndHyve `workflow-runtime`** | Closed-source product host (React + Firebase Cloud Functions; "Canvas Orchestrator"); separate codebase, separate production deployment | `https://api.myndhyve.ai/.well-known/openwop` | **Tier 2 — steward-affiliated sibling host** |
| *(none yet)* | Independent-organization host | — | Tier 3 — does not exist |

These are **genuinely distinct codebases and production environments** (different stacks:
Cloud Run TypeScript workflow-engine vs Firebase Functions), both advertising the same
OpenWOP wire contract at their `.well-known/openwop` discovery docs. That is real
cross-codebase, cross-deployment portability — but **not independent change control**:
both are operated by the same steward (MyndHyve Inc.). The honesty framing below is
load-bearing.

---

## 2. The bidirectional process between the two apps

The two apps are coupled in **opposite directions**, which together form the estate's
development loop:

**(a) Contract adoption — spec → openwop-app → MyndHyve (the dual-witness bar).**
A wire change is authored as an RFC in the spec corpus, its full surface (schemas, events,
conformance scenarios, `/v1/host/sample/*` test seams) lands at `Draft`, the reference host
implements it, and it graduates `Draft → Active → Accepted` **only when a second host
advertises and passes the capability-gated conformance scenarios non-vacuously**
(`OPENWOP_REQUIRE_BEHAVIOR=true`). MyndHyve is that second host. The handoff is a literal
artifact — `openwop/plans/myndhyve-rfc-adoption-handoff.md` and the whole
`openwop/docs/openwop-adoption/` directory — exchanged between **separate per-repo agent
sessions** over the **crosstalk** message bus. So the cross-host contract evolution is
**agent-executed and steward-supervised**: agent sessions implement, advertise, and run
conformance on each host and report evidence; the steward is the single change-control
authority that flips the RFC status.

**(b) Product port — MyndHyve → openwop-app.** openwop-app's feature roadmap is populated
by **porting the MyndHyve product catalog** as ADRs, using MyndHyve as a *baseline
reference, never a copy* (`openwop-app/FEATURES.md` §"porting MyndHyve"; the `feature`
skill automates "gather the MyndHyve baseline + existing ADR/FEATURES state"). This is the
local feature lifecycle (Study A) feeding the contract gate.

```
   spec corpus (openwop)            openwop-app (Tier 1)            MyndHyve (Tier 2)
   ────────────────────            ───────────────────            ─────────────────
   author RFC ──Draft──▶ wire surface lands ──▶ implement + advertise + conformance
                                                        │
                              handoff doc + crosstalk ──┼──▶ adopt + advertise +
                                                        │     conformance NON-VACUOUS
                              steward flips status ◀────┴──── dual-witness evidence
                                   Active → Accepted
```

---

## 3. The worked example: RFC 0050 (SAML / SCIM enterprise identity)

A single contract change traced end to end across the estate.

| Date | Transition | What happened |
|---|---|---|
| 2026-05-24 | **Created (`Draft`)** | Auth-profile entries `openwop-auth-saml` / `openwop-auth-scim` (optional `-ldap`), extending RFC 0010, mapping onto RFC 0048 principals / RFC 0049 roles. Motivated by a real product need: *"MyndHyve's enterprise prospects expect SSO via SAML and user provisioning via SCIM."* |
| 2026-06-01 | **`Draft → Active`** | Full wire surface on `main` (profile prose, reserved ids in `capabilities.schema.json`, two conformance scenarios, two host-sample seams). Comment window waived (single-maintainer lazy consensus). |
| 2026-06-01 | **`Active → Accepted`** | Graduated on **MyndHyve**: it advertises `auth.profiles: ["openwop-auth-saml","openwop-auth-scim"]` at the discovery root and passes the gated `auth-saml-profile` + `auth-scim-profile` legs **19/19 non-vacuously** (`OPENWOP_REQUIRE_BEHAVIOR=true`, suite 1.18.1; the count rose 13→19 once the IdP URL engaged the behavioral legs) on rev `workflow-runtime-00453-hot`. The steward then drove all 7 §A SAML variants live (`valid`→200; `alg-none`/unsigned/bad-signature/expired/not-yet-valid/**signature-wrapping**→401 each — the XSW defense firing live) + the SCIM create/deactivate fail-closed path. |

The earlier history matters too: RFC 0050 was **deliberately parked** for a period —
CHANGELOG 1.1.4: *"RFC 0050 (SAML/SCIM) + 0054 stay `Draft` per documented MyndHyve
opt-outs"* — and only graduated once MyndHyve flagged SAML/SCIM as a real enterprise need
and wired it. The contract did not advance on speculation; it advanced when a second host
actually implemented it.

---

## 4. The process at scale (Observed)

RFC 0050 is one of dozens. The corpus records cross-host graduation as a routine,
high-throughput process:

- **Cohort graduation:** CHANGELOG 1.1.4 (2026-05-26) — *"MyndHyve protocol-extension cohort
  live in production (8 RFCs Draft → Accepted in one day)"* — RFCs 0045–0053 graduated on
  MyndHyve rev `00211-69w`, **28 PASS / 0 FAIL**.
- **Program graduation:** the entire agent-platform program (RFC 0085 et al.) graduated
  `Active → Accepted` on MyndHyve, certifying it a *full* agent platform (the one profile
  no open reference host yet claims — honest).
- **Recent dual-witness pairs (both hosts non-vacuous):** RFC 0095 (connection packs),
  0096–0098, 0099 (external-event triggers), 0100 (durable A2A), 0102 (A2UI — byte-identical
  schema), 0103 (localized content), 0104 (approver routing), 0105/0106 (speech/voice).

**Honest non-adoptions are recorded too** — and they are evidence the gate is real, not a
rubber stamp:
- RFC 0058 wall-clock arm: MyndHyve *"initially advertised `maxNodeExecutions` in error,
  honestly retracted"* (`docs/openwop-adoption/rfc-0058-round-3-retraction.md`).
- Documented opt-outs for RFC 0035/0036/0050/0054 (`round-3-closure-2026-05-26.md`).
- A registry fail-loud rejection: *"an RFC 0003 §C fail-loud host (MyndHyve) correctly
  rejected"* malformed packs.

This is exactly the honesty-by-construction loop (Study B) observed at estate scale: a host
advertises only what it implements, conformance strict-mode proves it, and a dishonest
advertisement is retracted rather than left standing.

---

## 5. The honesty framing (do not get this wrong)

The corpus uses two labels for MyndHyve, and the paper must use the corrected one:

- Pre-2026-06-11 RFC `Updated` fields and CHANGELOG entries (including RFC 0050) call
  MyndHyve a **"non-steward host."**
- `GOVERNANCE.md` §"Acceptance evidence tiers" (2026-06-11) **retconned that as inaccurate**
  and forbids it going forward: *"the corpus MUST NOT describe tier-2 evidence as
  'non-steward' or 'independent': a sibling host under the same maintainer org is neither.
  The honest label is 'steward-affiliated sibling host.'"* It deliberately does **not**
  rewrite the historical wording (the reasoning trail is preserved).

**What the paper claims:** the estate is **single-steward** but a **genuine two-host,
two-codebase, two-deployment estate** with a formalized dual-witness conformance bar —
**Tier-2** evidence of cross-host implementability by the steward's own org. **What the
paper does NOT claim:** independent third-party (Tier-3) adoption. No Tier-3 host exists;
ROADMAP keeps *"Second independent host implementation (non-steward maintainer)"* as an
explicit unfired gate, and a Tier-3 host + independent external review is named as the
decisive next evidence. This is the Validation Agenda, stated plainly.

> **Net for the threats section:** the two-host estate materially strengthens the
> portability and cross-host-governance evidence over a single host, but it is *not*
> independent validation and must never be presented as such. The dual-witness records are
> steward-supervised; the agents executed the adoption and conformance.

---

*Sources: `openwop/INTEROP-MATRIX.md`, `openwop/GOVERNANCE.md` §"Acceptance evidence tiers",
`openwop/RFCS/0050-*.md`, `openwop/CHANGELOG.md` (1.1.4/1.1.7), `openwop/docs/openwop-adoption/`,
`openwop/plans/myndhyve-rfc-adoption-handoff.md`, `openwop-app/FEATURES.md`. All steward-produced /
self-reported (see §5).*
