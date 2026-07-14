# Memory conventions

The fourth harness element (§9): **project state survives session resets, kept
aligned with the current decision records and active RFCs.** Without it, every
session re-derives the estate's state — expensively and divergently.

## The shape

One index file plus one file per durable fact:

    memory/
      MEMORY.md          # index: one line per memory, loaded every session
      <slug>.md          # one fact per file, with frontmatter

Each memory file:

```markdown
---
name: <short-kebab-slug>
description: <one line — used to decide relevance at recall time>
type: project | feedback | reference
---

<the fact. For process feedback, add why it exists and how to apply it.>
```

## The alignment rule (what makes this a contract, not a scratchpad)

A memory that names an ADR, RFC, capability, or file **must be checked against the
current corpus before it is acted on** — decision records supersede memories.
When a session ends having changed the estate's state (an ADR accepted, an RFC
ratified, a toggle flipped), it updates or deletes the affected memories in the
same session. Stale memory is worse than no memory: it re-injects overturned
decisions with the authority of context.

## What belongs in memory

- Active cross-session work state (what phase a program is in, what is blocked on
  what) — the things git history records too slowly to reconstruct cheaply.
- Standing steward guidance ("never advertise X until Y", "these two hosts share
  change control").
- Pointers to external state (dashboards, deployed revisions, open windows).

## What does not

- Anything the corpus already records (ADR contents, RFC statuses, code
  structure) — link to it instead of copying it.
- Session-local reasoning or transient TODO lists.
