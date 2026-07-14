# Agentic-Harness Templates

The transferable scaffolding described in **Section 9 (The Agentic Harness)** of
*Contracts at Machine Speed* (DOI: 10.5281/zenodo.21343112). These templates are
generalized from the harness actually used to operate the estate under study
(product-specific content removed); they are shapes to adapt, not a framework to
install.

Section 9 names four elements. Each maps to a template here:

| Element | Template | The principle |
|---|---|---|
| **Context as contracts** | `context/CLAUDE.md.template` | The documents agents rely on are written as machine-readable rules, versioned in the repo, loaded per task — not an undifferentiated prompt. |
| **Context as contracts** (decision records) | `context/adr-template.md` | Every decision record carries an *explicit, machine-extractable* contract-gate declaration (`## Wire/RFC`) — the input to the Study A gate audit. |
| **Skills as contract-consumers** | `skills/architect.skill.md`, `skills/verify-contract.skill.md` | Reusable agent skills interact with local code and external services strictly through published boundaries. |
| **Hooks as obligations** | `hooks/README.md`, `hooks/settings.json.example` | Blocking checks are encoded as non-negotiable clauses the harness executes — a mandatory gate is a hook, not a reminder. |
| **Memory** | `memory/README.md` | Project state survives session resets, kept aligned with current decision records and active RFCs. |

## How to adopt

1. Copy `context/CLAUDE.md.template` to your repo root as `CLAUDE.md` (or your
   tool's equivalent context file) and fill in the bracketed sections. Keep it a
   *contract* — rules an agent can violate detectably — not prose background.
2. Adopt `context/adr-template.md` for decision records. The `## Wire/RFC` section
   is load-bearing: it is what makes the contract gate auditable by script rather
   than by re-reading every record (see `../evidence/corpus-analysis/audit-gate.mjs`).
3. Copy the two skill templates into your agent tool's skill directory (for
   Claude Code: `.claude/skills/<name>/SKILL.md`) and specialize the bracketed
   project knowledge.
4. Wire at least one *blocking* hook (see `hooks/`) for your most important
   invariant. The methodology's claim is that standards embedded as enforced
   clauses outlive standards stated as guidance.
5. Keep everything version-controlled. The harness is part of the estate: changes
   to skills, hooks, and context files go through the same review as code.

## Provenance and license

Generalized by the steward (with agent assistance, human-reviewed) from the
operating harness of the two-host estate analyzed in the paper. Released under the
repository's license (CC BY 4.0). Conventions echo emerging context-file practice
(`AGENTS.md` / `CLAUDE.md`) and the guardrail framing of Shift-Up (arXiv:2604.20436).
