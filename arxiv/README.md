# arXiv venue draft — build instructions

This folder is the **arXiv submission draft** of the manuscript, generated from `../OpenWOP_A_Vendor_Neutral_Protocol_for_Durable_Portable_Agentic_Workflow_Orchestration.docx` (the integrated content: all EDITs, Related Work, 40 references, 6 tables, 3 figures). arXiv has no mandated template or page limit and is **not** anonymized, so this is a clean self-contained `article`-class LaTeX source.

## Files
- `main.tex` — the full, **self-contained** paper. All 3 figures are **native TikZ** (drawn in-document), the bibliography is a manual `thebibliography`, no `.bib` and **no external image files** needed.
- `main.pdf` — the compiled paper (12 pp).
- [`arxiv-submission.md`](arxiv-submission.md) — arXiv form metadata (title, categories `cs.SE`/`cs.DC`/`cs.AI`, license, abstract to paste).
- [`cover-note.md`](cover-note.md) — optional cover note for a workshop/venue submission.

## Compile status — VERIFIED ✓
Built locally with **Tectonic 0.16.9** (the same XeTeX/package stack Overleaf uses): **`main.pdf`, 12 pages, 0 errors, 0 warnings** (0 overfull, 0 underfull, 0 undefined references). The compiled `main.pdf` is included in this folder. *(I couldn't drive the Overleaf web app — it needs an authenticated browser session — so I compiled with Tectonic, which catches the same errors.)* The earlier underfull-`\hbox` warnings came from justified `p{}` table columns (not the bibliography); fixed by making the table columns `>{\raggedright\arraybackslash}p{...}` (plus a `\raggedright` in `thebibliography`).

## Build (1 step)
```sh
pdflatex main.tex && pdflatex main.tex
```
Or just drop `main.tex` into **Overleaf** / upload it to **arXiv** (compiles with `pdflatex`, no other files). Two passes are belt-and-suspenders; a single pass also works (the `[N]` labels are explicit `\bibitem[N]`, not cross-refs).

> **Figures.** Now native TikZ — the PDF compiles end-to-end with **no SVG→PDF step**. They were authored but **not compile-tested in this environment** (no local LaTeX), so do one Overleaf pass to confirm. *Fallback:* if any TikZ figure errors on your TeX, the `\paperfig` macro is still defined and the SVG design drafts remain in `../figures/` — replace that figure's `tikzpicture` with `\paperfig{figures/figN.pdf}{...}` and convert the SVG (`rsvg-convert`/Inkscape/`cairosvg`).

## Before you submit (the human-only bits)
- **`\author{}` is final:** David S. Tufts, **MyndHyve Inc.** (with an "OpenWOP project steward" disclosure line pointing to §1 Positionality), Grand Rapids MI, `davidtufts.me` + LinkedIn. (No plaintext email — omitted to avoid scraping/spam; contact via the website or LinkedIn. Deliberately not the day-job employer.)
- **LaTeX proofread — done; compile is warning-free.** Tables verified clean (proper rules, no double-escapes, no stray unicode, ragged-right columns → no underfull boxes); zero math-mode; 0 errors / 0 warnings on the Tectonic compile.
- **Citation style** — numeric `[N]` labels (fine for arXiv). If you later target a venue with a mandated style (ACM/IEEE), switch to a `.bib` + that venue's `\bibliographystyle`.
- **Figures** — native TikZ; restyle by editing the `tikzpicture` blocks directly in `main.tex` (the SVGs in `../figures/` remain as the design reference / fallback).

## Provenance
Bibliography = 40 entries (`../references.md`), all verified 2026-06-06. Evidence (portability result, conformance snapshot, captured run log, HostCapabilityDocument) lives in `../evidence/`. Section numbers in headings are literal (`\section*`) to match the manuscript; switch to auto-numbered `\section` if you prefer.
