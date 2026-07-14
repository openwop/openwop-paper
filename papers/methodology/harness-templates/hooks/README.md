# Hooks as obligations

The paper's rule (§9): **a mandatory gate is a hook, not a reminder.** Guidance in
a context file can be ignored under context pressure; a hook is executed by the
harness itself and cannot be skipped by the model. Encode every non-negotiable
standard — a Contract Guardian's clause (§5) — as a blocking hook.

`settings.json.example` shows the shape for Claude Code (`.claude/settings.json`);
adapt the concept to whatever your agent harness executes deterministically.

Rules of thumb:

- **Block, don't warn, for invariants.** Exit code 2 (blocking) for anything whose
  violation would be a dishonest wire claim or a contract break; plain warnings
  drown.
- **Guard the contract surfaces.** The highest-value hooks watch writes to schema
  directories, capability advertisements, and conformance scenarios — the places
  where a local edit becomes an external claim.
- **Keep hooks fast and deterministic** — a hook that flakes teaches agents (and
  humans) to route around the gate.
- **Version hooks with the code.** A hook is part of the estate's contract set;
  changes to it get the same review as a schema change.
