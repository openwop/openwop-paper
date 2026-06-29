# Build the methodology paper. Mirrors the protocol paper's manual flow.
#   make            -> main.pdf via pdflatex x2
#   make tectonic   -> main.pdf via Tectonic (single pass, self-contained)
#   make clean      -> remove LaTeX intermediates (keeps main.pdf)
#   make distclean  -> also remove main.pdf
MAIN := main

.PHONY: all tectonic clean distclean
all: $(MAIN).pdf

$(MAIN).pdf: $(MAIN).tex
	pdflatex -interaction=nonstopmode -halt-on-error $(MAIN).tex
	pdflatex -interaction=nonstopmode -halt-on-error $(MAIN).tex

tectonic: $(MAIN).tex
	tectonic $(MAIN).tex

clean:
	rm -f $(MAIN).aux $(MAIN).log $(MAIN).out $(MAIN).toc

distclean: clean
	rm -f $(MAIN).pdf
