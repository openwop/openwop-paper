---
name: verify-contract
description: "Automated conformance check of an implementation against every contract it touches — the step that makes 'validate' mean contract conformance rather than output inspection (paper §6/§8). Run after each build-loop phase and before merge."
argument-hint: "[feature, capability, or endpoint to verify]"
---

# Verify contract

The question this skill answers is never "does the output look right?" — it is
**"does this implementation still satisfy every contract it touches?"**

## Step 1 — enumerate the touched contracts

From the diff and its ADR, list: schemas changed or consumed, capabilities
advertised, events emitted, endpoints added, and the RFC (if any) the change
rides. If the ADR's `## Wire/RFC` declaration disagrees with this list, STOP and
report the mismatch — the gate declaration is wrong, and that is the bug.

## Step 2 — run the suite, strict

Run the conformance suite with strict/behavioral mode on:

    [COMMAND — e.g. REQUIRE_BEHAVIOR=true npm run conformance -- --filter <capability>]

Strict mode is the honesty gate: a capability that is advertised but not honored
must FAIL, not skip. A skipped scenario for an advertised capability is itself a
finding.

## Step 3 — check the advertisement

Fetch the live discovery/advertisement surface ([e.g. `/.well-known/<protocol>`])
and confirm: every capability the change claims is present; nothing is advertised
that the implementation cannot reach in live state; nothing ratified-but-required
is missing.

## Step 4 — report

Report pass/fail per contract, verbatim failure output, and — on any failure —
whether the fix is in the implementation or the advertisement. Never "fix" a
failure by weakening a scenario or widening a schema without a ratified change.
