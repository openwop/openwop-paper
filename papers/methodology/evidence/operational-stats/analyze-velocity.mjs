#!/usr/bin/env node
// Study D — operational velocity of contract evolution.
// Deterministic, dependency-free. Mines the RFC `Updated` fields for the dates of lifecycle
// transitions and computes how fast a contract change goes from first-recorded to Accepted
// across the estate (the "machine-speed" metric), plus throughput signals from the CHANGELOG.
// Heuristic (prose-mined dates); per-RFC data emitted to CSV for audit.
//
// Usage: node analyze-velocity.mjs [--out DIR]
// Env: OPENWOP_RFCS (default <devroot>/openwop/RFCS), OPENWOP_CHANGELOG, OPENWOP_ADOPTION

import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEV_ROOT = process.env.OPENWOP_DEV_ROOT || resolve(__dirname, '../../../../..');
const RFCS = process.env.OPENWOP_RFCS || join(DEV_ROOT, 'openwop', 'RFCS');
const CHANGELOG = process.env.OPENWOP_CHANGELOG || join(DEV_ROOT, 'openwop', 'CHANGELOG.md');
const ADOPTION = process.env.OPENWOP_ADOPTION || join(DEV_ROOT, 'openwop', 'docs', 'openwop-adoption');
const outIdx = process.argv.indexOf('--out');
const OUT = outIdx > -1 ? process.argv[outIdx + 1] : join(__dirname, 'out-velocity');

const dayNum = (iso) => { const [y, m, d] = iso.split('-').map(Number); return Date.UTC(y, m - 1, d) / 86400000; };
const median = (xs) => { if (!xs.length) return null; const s = [...xs].sort((a, b) => a - b); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const csvCell = (v) => { const s = String(v ?? ''); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
const gitSha = (d) => { try { return execSync('git rev-parse --short HEAD', { cwd: d, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch { return 'unknown'; } };

// Extract the **Updated** table-cell text from an RFC.
function updatedCell(text) {
  const line = text.split('\n').find((l) => /\*\*Updated\*\*\s*\|/.test(l));
  if (!line) return '';
  return line.replace(/^.*\*\*Updated\*\*\s*\|/, '').replace(/\|\s*$/, '');
}

const files = readdirSync(RFCS)
  .filter((f) => /^\d{4}-.*\.md$/.test(f))
  .filter((f) => !/\.(gaps|risks)\.md$/.test(f) && !/^0000-template/.test(f));

const rows = files.map((f) => {
  const text = readFileSync(join(RFCS, f), 'utf8');
  const num = f.slice(0, 4);
  const statusM = text.match(/\|\s*\*\*Status\*\*\s*\|\s*`([^`]+)`/);
  const status = statusM ? statusM[1].trim() : 'Unknown';
  const cell = updatedCell(text);
  const dates = [...new Set((cell.match(/20\d\d-\d\d-\d\d/g) || []))].sort();
  const span = dates.length >= 2 ? dayNum(dates[dates.length - 1]) - dayNum(dates[0]) : (dates.length === 1 ? 0 : null);
  // transitions present (→ or ->)
  const arrow = cell.replace(/->/g, '→');
  const hasDraftAccepted = /Draft\s*→\s*Accepted/.test(arrow);
  const hasFullChain = /Draft\s*→\s*Active/.test(arrow) && /Active\s*→\s*Accepted/.test(arrow);
  return { num, status, firstDate: dates[0] || '', lastDate: dates[dates.length - 1] || '', span, dateCount: dates.length, directDraftToAccepted: hasDraftAccepted, fullChain: hasFullChain };
}).sort((a, b) => a.num.localeCompare(b.num));

// Velocity over Accepted RFCs with a measurable span.
const accepted = rows.filter((r) => r.status === 'Accepted');
const measurable = accepted.filter((r) => r.span !== null);
const spans = measurable.map((r) => r.span);
const sameDay = measurable.filter((r) => r.span === 0).length;
const within1 = measurable.filter((r) => r.span <= 1).length;
const within7 = measurable.filter((r) => r.span <= 7).length;
const within30 = measurable.filter((r) => r.span <= 30).length;

// Program window over all dated RFCs.
const allDates = rows.flatMap((r) => [r.firstDate, r.lastDate]).filter(Boolean).sort();
const programDays = allDates.length ? dayNum(allDates[allDates.length - 1]) - dayNum(allDates[0]) : null;

// Throughput signals from the CHANGELOG (observed, not derived).
let cohortLines = [];
if (existsSync(CHANGELOG)) {
  const cl = readFileSync(CHANGELOG, 'utf8');
  cohortLines = (cl.match(/[^\n.]*\b\d+ RFCs?[^\n.]*\b(?:Draft|graduat|Accepted)[^\n.]*/gi) || [])
    .map((s) => s.trim().replace(/\s+/g, ' ')).slice(0, 12);
}
const adoptionDocs = existsSync(ADOPTION) ? readdirSync(ADOPTION).filter((f) => f.endsWith('.md')).length : 0;

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'velocity.csv'),
  [['num', 'status', 'firstDate', 'lastDate', 'spanDays', 'dateCount', 'directDraftToAccepted', 'fullChain'],
    ...rows.map((r) => [r.num, r.status, r.firstDate, r.lastDate, r.span ?? '', r.dateCount, r.directDraftToAccepted, r.fullChain])]
    .map((r) => r.map(csvCell).join(',')).join('\n') + '\n');

const pct = (n, d) => (d ? ((100 * n) / d).toFixed(1) + '%' : '—');
const snap = `openwop@${gitSha(join(RFCS, '..'))}`;
const md = `# Study D — Operational Velocity (auto-generated)

> Generated by \`analyze-velocity.mjs\`. **Corpus snapshot:** ${snap}. Deterministic; re-run to reproduce.
> Velocity is mined from the dates recorded in each RFC's \`Updated\` table cell — an *observed
> estimate* (the recorded-activity window), emitted per-RFC in \`velocity.csv\` for audit. Where the
> cell records only a single date, span = 0 (a same-day-recorded graduation).

## 1. Program window
- Accepted RFCs with a measurable date span: **${measurable.length}** of ${accepted.length} Accepted (${rows.length} total).
- First recorded RFC date: **${allDates[0] || '—'}** → last: **${allDates[allDates.length - 1] || '—'}** (~**${programDays ?? '—'} days**).

## 2. Authored → Accepted velocity (the machine-speed metric)
Over the ${measurable.length} Accepted RFCs with a measurable span:

| Statistic | Value |
|---|---|
| Median span (days) | **${median(spans)}** |
| Mean span (days) | ${(spans.reduce((a, b) => a + b, 0) / (spans.length || 1)).toFixed(1)} |
| Max span (days) | ${Math.max(...spans, 0)} |
| **Same-day (span = 0)** | **${sameDay}** (${pct(sameDay, measurable.length)}) |
| Within 1 day | ${within1} (${pct(within1, measurable.length)}) |
| Within 7 days | ${within7} (${pct(within7, measurable.length)}) |
| Within 30 days | ${within30} (${pct(within30, measurable.length)}) |

- RFCs whose \`Updated\` records a direct \`Draft → Accepted\` transition: **${rows.filter((r) => r.directDraftToAccepted).length}**.
- RFCs recording the full \`Draft → Active → Accepted\` chain: **${rows.filter((r) => r.fullChain).length}**.

> **Reading:** a large same-day / within-1-day share is the machine-speed signal — a contract
> change authored, its wire surface landed, a second host advertising + passing conformance, and the
> status flipped, often inside a single day. (Span is a *recorded-activity* window, so same-day means
> the corpus records no multi-day gap, not that zero human time elapsed.)

## 3. Throughput signals (Observed, from the CHANGELOG)
${cohortLines.length ? cohortLines.map((l) => `- ${l}`).join('\n') : '- (none matched)'}

- Adoption/handoff docs under \`docs/openwop-adoption/\`: **${adoptionDocs}**.

---
*Per-RFC data: \`velocity.csv\`.*
`;
writeFileSync(join(OUT, 'study-d-summary.md'), md);

console.log(`Accepted: ${accepted.length} | measurable spans: ${measurable.length}`);
console.log(`Program window: ${allDates[0]}..${allDates[allDates.length - 1]} (~${programDays}d)`);
console.log(`Span median=${median(spans)} mean=${(spans.reduce((a, b) => a + b, 0) / (spans.length || 1)).toFixed(1)} max=${Math.max(...spans, 0)}`);
console.log(`Same-day=${sameDay} within1=${within1} within7=${within7} within30=${within30}`);
console.log(`Direct Draft→Accepted=${rows.filter((r) => r.directDraftToAccepted).length} fullChain=${rows.filter((r) => r.fullChain).length}`);
console.log(`Cohort lines=${cohortLines.length} adoptionDocs=${adoptionDocs}`);
console.log(`Wrote ${OUT}/{velocity.csv, study-d-summary.md}`);
