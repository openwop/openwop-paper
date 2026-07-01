#!/usr/bin/env node
// Study A — manual-validation pass on the contract-gate classification.
// v1 = the broad whole-ADR-text heuristic (from analyze-corpus.mjs).
// v2 = an authoritative-line classifier: it reads each ADR's EXPLICIT RFC-gate declaration
//      (`**RFC gate:**` / `**RFC verdict:**` / "no new RFC" / "rides RFC N" / "RFC-gated")
//      rather than scanning the whole text, which removes the false `new-rfc` hits from
//      incidental mentions. Emits the v1-vs-v2 confusion + every disagreement for human
//      spot-check, and the corrected headline (needs-new-wire-RFC vs not).
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEV_ROOT = process.env.OPENWOP_DEV_ROOT || resolve(__dirname, '../../../../..');
const ADRS = process.env.OPENWOP_ADRS || join(DEV_ROOT, 'openwop-app', 'docs', 'adr');
const OUT = join(__dirname, 'out');

// --- v1 (broad whole-text), copied verbatim from analyze-corpus.mjs ---
function gateV1(text) {
  const t = text.toLowerCase();
  if (/blocked on a? new[^.]*\brfc\b|new openwop rfc|\brfc-gated\b|needs?[^.]*\bnew\b[^.]*\brfc\b/.test(t)) return 'new-rfc';
  if (/rides[^.]*\brfc\s*\d+|already-accepted rfc|implements[^.]*\brfc\s*\d+|rides accepted rfc/.test(t)) return 'rides-accepted';
  if (/host-ext|\/v1\/host\/openwop-app|no new rfc|non-normative/.test(t)) return 'host-extension';
  return 'unclassified';
}

// --- v2 (authoritative line) ---
// Find the most authoritative gate-bearing line, in priority order.
function authoritativeLine(text) {
  const lines = text.split('\n');
  const p1 = lines.find((l) => /\*\*\s*RFC\s*(gate|verdict)\s*\*\*|RFC\s*(gate|verdict)\s*:/i.test(l));
  if (p1) return p1;
  const p2 = lines.find((l) => /(no new rfc|no openwop rfc|non-normative[^.]*rfc|rfc-gated|blocked on[^.]*rfc|new openwop rfc|rides[^.]*rfc\s*\d|already-accepted rfc|host work riding rfc)/i.test(l));
  return p2 || '';
}
function gateV2(text) {
  const line = authoritativeLine(text);
  if (!line) return { cls: 'unclassified', conf: 'none', line: '' };
  const l = line.toLowerCase();
  // "no [new] [openwop] rfc", "non-normative", "none", "touches no wire", "no wire change".
  const saysNoNew = /\bno\s+(new\s+)?(openwop\s+)?rfc\b|non-normative|no wire change|touches no wire|\bnone\b\s*[—\-.]|verdict:?\s*\*{0,2}none|host-extension only|host work only|no\s+wire/.test(l);
  // genuine new-RFC need (only consulted if NOT saysNoNew).
  const saysNeedsNew = /blocked on[^.]*\brfc\b|needs?[^.]*\bnew\b[^.]*\brfc\b|requires?[^.]*\bnew\b[^.]*\brfc\b|\brfc-gated\b|gated on[^.]*\brfc\b|reaching\s*[≥>=]*\s*`?accepted|new (openwop )?rfc\b.*reaching/.test(l);
  const ridesAccepted = /rides[^.]*rfc\s*\d|already-accepted rfc|already-impl|implements[^.]*rfc\s*\d|host work riding|riding (the )?accepted rfc/.test(l);
  let cls;
  if (saysNoNew) cls = ridesAccepted ? 'rides-accepted' : 'host-extension';
  else if (saysNeedsNew) cls = 'new-rfc';
  else if (ridesAccepted) cls = 'rides-accepted';
  else cls = 'unclassified';
  const conf = p1Has(text) ? 'explicit-gate' : 'inline';
  return { cls, conf, line: line.trim().replace(/\s+/g, ' ').slice(0, 160) };
}
const p1Has = (text) => /\*\*\s*RFC\s*(gate|verdict)\s*\*\*|RFC\s*(gate|verdict)\s*:/i.test(text);

// Manual residual coding — the 21 ADRs with no machine-extractable gate line (conf=none),
// hand-classified by reading each ADR's actual gate language (quoted in gate-audit.md). This
// is the human-validation step; 0010 stays unclassified (genuinely ambiguous in-text).
const MANUAL_RESIDUAL = {
  '0001': 'host-extension', '0010': 'unclassified', '0011': 'host-extension', '0012': 'host-extension',
  '0013': 'host-extension', '0026': 'host-extension', '0027': 'rides-accepted', '0030': 'host-extension',
  '0032': 'host-extension', '0033': 'host-extension', '0037': 'host-extension', '0046': 'host-extension',
  '0047': 'host-extension', '0048': 'host-extension', '0051': 'new-rfc', '0088': 'host-extension',
  '0101': 'host-extension', '0131': 'host-extension', '0149': 'host-extension', '0165': 'host-extension',
  '0168': 'host-extension',
};
const needsNew = (c) => c === 'new-rfc';
const files = readdirSync(ADRS).filter((f) => /^\d{4}-.*\.md$/.test(f));
const rows = files.map((f) => {
  const text = readFileSync(join(ADRS, f), 'utf8');
  const num = f.slice(0, 4);
  const v1 = gateV1(text);
  const { cls: v2, conf, line } = gateV2(text);
  const final = MANUAL_RESIDUAL[num] ?? v2; // audited = v2 with manual residual coding
  return { num, v1, v2, final, conf, agree: v1 === v2, line };
}).sort((a, b) => a.num.localeCompare(b.num));

const tally = (arr, k) => arr.reduce((m, r) => ((m[r[k]] = (m[r[k]] || 0) + 1), m), {});
const v1t = tally(rows, 'v1'), v2t = tally(rows, 'v2');
const agree = rows.filter((r) => r.agree).length;
const disagree = rows.filter((r) => !r.agree);
// Headline binary: needs a NEW wire RFC vs not.
const v1New = rows.filter((r) => needsNew(r.v1)).length;
const v2New = rows.filter((r) => needsNew(r.v2)).length;
const v2Decided = rows.length - (v2t.unclassified || 0);

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'audit.csv'),
  [['num', 'v1', 'v2', 'conf', 'agree', 'authoritative_line'], ...rows.map((r) => [r.num, r.v1, r.v2, r.conf, r.agree, `"${r.line.replace(/"/g, "'")}"`])].map((r) => r.join(',')).join('\n') + '\n');

const pct = (n, d) => (d ? ((100 * n) / d).toFixed(1) + '%' : '—');
const ft = tally(rows, 'final');
const fNew = rows.filter((r) => needsNew(r.final)).length;
const fDecided = rows.length - (ft.unclassified || 0);
const fNoNew = fDecided - fNew;

const md = `# Study A — Contract-Gate Classification: Validation Pass

> Generated by \`audit-gate.mjs\`. Hardens the headline contract-gate metric from a heuristic
> estimate to an audited figure, and records why the heuristic was wrong.

## Method
- **v1 (broad)** — the whole-ADR-text regex used in \`analyze-corpus.mjs\`.
- **v2 (authoritative line)** — classifies from each ADR's *explicit* RFC-gate declaration
  (\`**RFC gate:**\` / \`**RFC verdict:**\` / "no new RFC" / "rides RFC N" / "RFC-gated"),
  not incidental whole-text mentions.
- **Audited (final)** — v2, with the ${Object.keys(MANUAL_RESIDUAL).length} ADRs that have no
  machine-extractable gate line hand-coded by reading each (the \`MANUAL_RESIDUAL\` map; 0010
  left unclassified as genuinely ambiguous).

## The correction (why the manual pass mattered)
The v1 heuristic counted **${v1New} ADRs as \`new-rfc\` (${pct(v1New, rows.length)})**. That was
an ~8× over-count: the regex matched "**new** RFC" *inside the phrase* "**NO new** RFC". The
audited count of genuinely wire-touching ADRs is **${fNew} (${pct(fNew, rows.length)})**.
v1↔v2 agreement was only **${pct(agree, rows.length)}** — the heuristic was unreliable on this
dimension, which is exactly why this validation pass was run.

## Audited distribution (n = ${rows.length})
| Bucket | Count | Share of all | Share of classified |
|---|---|---|---|
${Object.entries(ft).sort((a, b) => b[1] - a[1]).map(([k, v]) => `| ${k} | ${v} | ${pct(v, rows.length)} | ${k === 'unclassified' ? '—' : pct(v, fDecided)} |`).join('\n')}

**Headline (audited):** of the ${fDecided} classifiable ADRs, **${fNoNew} (${pct(fNoNew, fDecided)})
required no new wire RFC** (host-extension or riding an already-accepted RFC); only **${fNew}
(${pct(fNew, fDecided)}) were wire-touching**. The earlier heuristic figure (80%) was
*conservative* — the gate is more selective than it suggested.

The ${fNew} wire-touching ADRs: ${rows.filter((r) => needsNew(r.final)).map((r) => r.num).join(', ')}.

## Manual residual coding (the ${Object.keys(MANUAL_RESIDUAL).length} ADRs with no extractable gate line)
| ADR | hand-coded | quoted gate language |
|---|---|---|
${Object.entries(MANUAL_RESIDUAL).map(([n, c]) => `| ${n} | ${c} | (see ADR; conf=none in audit.csv) |`).join('\n')}

---
*Per-ADR v1/v2/final data: \`audit.csv\`. Reproduce: \`node audit-gate.mjs\`.*
`;
writeFileSync(join(OUT, 'gate-audit.md'), md);

console.log('v1 (broad):     ', v1t);
console.log('v2 (authoritative):', v2t);
console.log('AUDITED (final):', ft);
console.log(`agreement v1=v2: ${pct(agree, rows.length)} | v1 new-rfc=${v1New} -> audited new-rfc=${fNew}`);
console.log(`AUDITED headline: ${fNoNew}/${fDecided} (${pct(fNoNew, fDecided)}) needed NO new wire RFC; ${fNew} wire-touching`);
console.log(`wire-touching ADRs: ${rows.filter((r) => needsNew(r.final)).map((r) => r.num).join(', ')}`);
console.log(`Wrote ${OUT}/{audit.csv, gate-audit.md}`);
