#!/usr/bin/env node
// Study A — corpus retrospective for the methodology paper.
// Deterministic, dependency-free. Parses the governance corpus and emits CSVs + a
// markdown summary. Every classification rule is stated inline so a reviewer can audit
// or re-derive every number. Heuristic fields are labelled HEURISTIC and emitted
// per-item for a manual validation pass.
//
// Usage:
//   node analyze-corpus.mjs [--out DIR]
// Env overrides (defaults assume the three repos are siblings under one dev root):
//   OPENWOP_RFCS         (default <devroot>/openwop/RFCS)
//   OPENWOP_ADRS         (default <devroot>/openwop-app/docs/adr)
//   OPENWOP_CONFORMANCE  (default <devroot>/openwop/conformance)
//   OPENWOP_DEV_ROOT     (default: resolved 5 levels above this script, i.e. /Users/<you>/dev)

import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const gitSha = (repoDir) => {
  try { return execSync('git rev-parse --short HEAD', { cwd: repoDir, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); }
  catch { return 'unknown'; }
};
const disp = (p) => p.replace(process.env.HOME || '~', '~');

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEV_ROOT = process.env.OPENWOP_DEV_ROOT || resolve(__dirname, '../../../../..');
const RFCS = process.env.OPENWOP_RFCS || join(DEV_ROOT, 'openwop', 'RFCS');
const ADRS = process.env.OPENWOP_ADRS || join(DEV_ROOT, 'openwop-app', 'docs', 'adr');
const CONF = process.env.OPENWOP_CONFORMANCE || join(DEV_ROOT, 'openwop', 'conformance');
const outIdx = process.argv.indexOf('--out');
const OUT = outIdx > -1 ? process.argv[outIdx + 1] : join(__dirname, 'out');

const csvCell = (v) => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const toCsv = (rows) => rows.map((r) => r.map(csvCell).join(',')).join('\n') + '\n';
const tally = (arr) => arr.reduce((m, k) => ((m[k] = (m[k] || 0) + 1), m), {});
const pct = (n, d) => (d ? ((100 * n) / d).toFixed(1) + '%' : '—');

// ---------------------------------------------------------------- RFCs
function parseRfcs() {
  const files = readdirSync(RFCS)
    .filter((f) => /^\d{4}-.*\.md$/.test(f))
    .filter((f) => !/\.(gaps|risks)\.md$/.test(f) && !/^0000-template/.test(f));
  return files.map((f) => {
    const text = readFileSync(join(RFCS, f), 'utf8');
    const num = f.slice(0, 4);
    const slug = f.slice(5, -3);
    const statusM = text.match(/\|\s*\*\*Status\*\*\s*\|\s*`([^`]+)`/);
    let status = statusM ? statusM[1].trim() : 'Unknown';
    const supM = text.match(/\|\s*\*\*Superseded by\*\*\s*\|\s*([^\n|]*)\|/);
    const supersededBy = supM ? supM[1].replace(/[`*\s—-]+/g, '') : '';
    if (supersededBy) status = 'Superseded';
    // Updated row carries the lifecycle prose. Grab it (may be long, single line).
    const updM = text.match(/\|\s*\*\*Updated\*\*\s*\|([^\n]*)\|/);
    const upd = updM ? updM[1] : '';
    // HEURISTIC: comment-window treatment from the Updated prose.
    let window = 'unstated';
    if (/waiv|bootstrap|lazy consensus|single-maintainer steward|zero external reviewers/i.test(upd)) window = 'waived/bootstrap';
    else if (/\b(7-day|30-day|90-day|comment window)\b/i.test(upd)) window = 'window-cited';
    const transitions = (upd.match(/\b(Draft|Active|Accepted|Proposed)\b\s*(?:→|->)\s*\b(Draft|Active|Accepted)\b/gi) || []).length;
    return { num, slug, status, superseded: supersededBy ? 'yes' : '', window, transitions };
  }).sort((a, b) => a.num.localeCompare(b.num));
}

// ---------------------------------------------------------------- ADRs
const ADR_STATUS_ORDER = ['superseded', 'withdrawn', 'implemented', 'accepted', 'proposed'];
function bucketAdrStatus(line) {
  const l = line.toLowerCase();
  for (const k of ADR_STATUS_ORDER) if (l.includes(k)) return k[0].toUpperCase() + k.slice(1);
  return 'Other';
}
// HEURISTIC contract-gate classifier. Precedence is deliberate and stated.
function gateClass(text) {
  const t = text.toLowerCase();
  if (/blocked on a? new[^.]*\brfc\b|new openwop rfc|\brfc-gated\b|needs?[^.]*\bnew\b[^.]*\brfc\b/.test(t)) return 'new-rfc';
  if (/rides[^.]*\brfc\s*\d+|already-accepted rfc|implements[^.]*\brfc\s*\d+|rides accepted rfc/.test(t)) return 'rides-accepted';
  if (/host-ext|\/v1\/host\/openwop-app|no new rfc|non-normative/.test(t)) return 'host-extension';
  return 'unclassified';
}
function parseAdrs() {
  const files = readdirSync(ADRS).filter((f) => /^\d{4}-.*\.md$/.test(f));
  return files.map((f) => {
    const text = readFileSync(join(ADRS, f), 'utf8');
    const num = f.slice(0, 4);
    const slug = f.slice(5, -3);
    // Status line: first line in the first 40 lines that starts (after an optional list
    // marker and optional **) with "Status". The list-marker allowance catches `- **Status:**`.
    const head = text.split('\n').slice(0, 40);
    const STATUS_RE = /^\s*[-*]?\s*\*{0,2}status\*{0,2}\s*[:|]/i;
    let statusLine = head.find((l) => STATUS_RE.test(l)) || '';
    // Fallback: some ADRs adopt the RFC-style `| **Status** | value |` table row.
    if (!statusLine) {
      const tbl = text.match(/\|\s*\*\*Status\*\*\s*\|\s*([^\n|]+)\|/);
      if (tbl) statusLine = ': ' + tbl[1];
    }
    const status = statusLine ? bucketAdrStatus(statusLine.replace(STATUS_RE, '')) : 'Missing';
    // A FORMAL correction note (the "correct, don't rewrite history" discipline): a dated
    // correction, an explicit "correction note", or a Correction heading — not any mention.
    const hasCorrection = /correction note|§\s*correction|^#{1,5}.*correction|correction\s+\d{4}-\d{2}/im.test(text) ? 'yes' : '';
    const rfcRefs = [...new Set((text.match(/\bRFC\s*0?\d{2,4}\b/gi) || []).map((s) => s.replace(/\s+/g, ' ').toUpperCase()))].length;
    return { num, slug, status, gate: gateClass(text), correction: hasCorrection, rfcRefs };
  }).sort((a, b) => a.num.localeCompare(b.num));
}

// ---------------------------------------------------------------- Conformance
function parseConformance() {
  const pkg = JSON.parse(readFileSync(join(CONF, 'package.json'), 'utf8'));
  const scen = existsSync(join(CONF, 'src', 'scenarios'))
    ? readdirSync(join(CONF, 'src', 'scenarios')).filter((f) => f.endsWith('.ts') || f.endsWith('.test.ts')).length
    : null;
  const fix = existsSync(join(CONF, 'fixtures'))
    ? readdirSync(join(CONF, 'fixtures')).filter((f) => f.endsWith('.json')).length
    : null;
  return { version: pkg.version, scenarios: scen, fixtures: fix };
}

// ---------------------------------------------------------------- main
const rfcs = parseRfcs();
const adrs = parseAdrs();
const conf = parseConformance();

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'rfcs.csv'), toCsv([['num', 'slug', 'status', 'superseded', 'window', 'transitions'], ...rfcs.map((r) => [r.num, r.slug, r.status, r.superseded, r.window, r.transitions])]));
writeFileSync(join(OUT, 'adrs.csv'), toCsv([['num', 'slug', 'status', 'gate', 'correction', 'rfcRefs'], ...adrs.map((r) => [r.num, r.slug, r.status, r.gate, r.correction, r.rfcRefs])]));

const rfcStatus = tally(rfcs.map((r) => r.status));
const rfcWindow = tally(rfcs.map((r) => r.window));
const adrStatus = tally(adrs.map((a) => a.status));
const adrGate = tally(adrs.map((a) => a.gate));
const corrections = adrs.filter((a) => a.correction).length;
const gateDecided = adrs.length - (adrGate.unclassified || 0);

const mdRow = (o) => Object.entries(o).sort((a, b) => b[1] - a[1]).map(([k, v]) => `| ${k} | ${v} | ${pct(v, Object.values(o).reduce((s, n) => s + n, 0))} |`).join('\n');

const snap = `openwop@${gitSha(join(RFCS, '..'))} · openwop-app@${gitSha(join(ADRS, '..', '..'))}`;
const md = `# Study A — Corpus Retrospective (auto-generated)

> Generated by \`analyze-corpus.mjs\`. Deterministic; re-run to reproduce.
> **Corpus snapshot:** ${snap}
> Sources: RFCs \`${disp(RFCS)}\`, ADRs \`${disp(ADRS)}\`, conformance \`${disp(CONF)}\`.
> **HEURISTIC** fields (RFC comment-window treatment, ADR contract-gate class) are mined
> from prose and emitted per-item in the CSVs for a manual validation pass — treat as
> *observed estimates*, not ground truth.

## 1. RFC corpus (n = ${rfcs.length})

### Status distribution
| Status | Count | Share |
|---|---|---|
${mdRow(rfcStatus)}

### Comment-window treatment (HEURISTIC, from the \`Updated\` row)
| Treatment | Count | Share |
|---|---|---|
${mdRow(rfcWindow)}

- RFCs whose \`Updated\` prose records at least one lifecycle transition (Draft→Active / Active→Accepted): **${rfcs.filter((r) => r.transitions > 0).length}** of ${rfcs.length}.

## 2. ADR corpus (n = ${adrs.length})

### Status distribution
| Status | Count | Share |
|---|---|---|
${mdRow(adrStatus)}

- ADRs carrying a **correction note** (a decision revisited/overturned in flight): **${corrections}** (${pct(corrections, adrs.length)}).
- ADRs with no parseable \`Status:\` line: **${adrStatus.Missing || 0}**.

### Contract-gate classification (HEURISTIC — SUPERSEDED, see \`gate-audit.md\`)
> ⚠ **This broad whole-text heuristic OVER-COUNTS \`new-rfc\` ~8× (it matches "new RFC"
> inside "NO new RFC"). The validated figure is in \`gate-audit.md\`: audited, the gate is
> 97.5% no-new-wire-RFC (only 4 ADRs are wire-touching), not the ~80% below.** The table
> below is retained only to show the heuristic the audit corrected.

Of the ${adrs.length} ADRs, the transparent classifier (rules in \`analyze-corpus.mjs\`)
assigns each to one bucket; **${adrGate.unclassified || 0}** could not be classified from
text and need manual coding.

| Bucket | Count | Share of all ADRs | Share of classified |
|---|---|---|---|
${Object.entries(adrGate).sort((a, b) => b[1] - a[1]).map(([k, v]) => `| ${k} | ${v} | ${pct(v, adrs.length)} | ${k === 'unclassified' ? '—' : pct(v, gateDecided)} |`).join('\n')}

> **Reading:** among ADRs the classifier could decide, the share marked *host-extension*
> or *rides-accepted* (i.e. **did not require a new wire RFC**) vs *new-rfc* (wire-touching)
> is the empirical evidence for the contract gate's selectivity (C1/C2). The unclassified
> remainder is the honest ceiling on this estimate until the manual pass.

## 3. Conformance suite (point-in-time)
| Metric | Value |
|---|---|
| Published version | ${conf.version} |
| Scenario files | ${conf.scenarios} |
| Fixtures | ${conf.fixtures} |

> Growth-over-time (scenarios added per accepted RFC) requires git-history mining — a
> follow-up to this point-in-time snapshot.

---
*CSVs: \`rfcs.csv\`, \`adrs.csv\` (per-item, auditable).*
`;

writeFileSync(join(OUT, 'study-a-summary.md'), md);

// Console digest
console.log(`RFCs: ${rfcs.length} | status:`, rfcStatus);
console.log(`  window:`, rfcWindow, `| with-transition:`, rfcs.filter((r) => r.transitions > 0).length);
console.log(`ADRs: ${adrs.length} | status:`, adrStatus);
console.log(`  gate:`, adrGate, `| corrections:`, corrections);
console.log(`Conformance:`, conf);
console.log(`\nWrote: ${OUT}/{rfcs.csv, adrs.csv, study-a-summary.md}`);
