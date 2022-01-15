
.DEFAULT_GOAL := all

TS=npx tsc

TSOPTS=-strict

GCC_VER=closure-compiler-v20220104.jar

.PHONY: all
all: out work out/index.html out/main.js out/main.css

out:
	mkdir out

work:
	mkdir work

out/index.html: src/index.html out
	cp $< $@

out/main.js: work/main.js work out googcc/$(GCC_VER)
	java -jar googcc/$(GCC_VER) --js $< --js_output_file $@

work/main.js: src/main.ts work
	$(TS) $(TSOPTS) --outfile $@ $<

out/main.css: src/main.scss
	sass $< $@

.PHONY: clean
clean:
	rm -rf work out

