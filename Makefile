
.DEFAULT_GOAL := all

# List of report implementations.  Order should be independent.
REPORTS=    TodayIs.ts \
            Greeting.ts

# Order of these files is important.
BASE_FILES= Types.ts

ALL_FILES= $(BASE_FILES) $(REPORTS:%=report/%) Main.ts

TSFILES= $(ALL_FILES:%=src/%)

TS=npx tsc

GCC_VER=closure-compiler-v20220104.jar

.PHONY: all
all: out work out/index.html out/all.js out/main.css

out:
	mkdir out

work:
	mkdir work

out/index.html: src/index.html out
	cp $< $@

out/all.js: work/all.2.js work out googcc/$(GCC_VER)
	java -jar googcc/$(GCC_VER) -O ADVANCED --js $< --js_output_file $@

work/all.2.js: work/all.1.ts work
	$(TS) --outfile $@ $<

work/all.1.ts: $(TSFILES) work
	cat $(TSFILES) > $@

out/main.css: src/main.scss
	sass $< $@

.PHONY: clean
clean:
	rm -rf work out

