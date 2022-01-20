
.DEFAULT_GOAL := all

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

out/all.js: work/all.1.js work out googcc/$(GCC_VER)
	java -jar googcc/$(GCC_VER) -O ADVANCED --js $< --js_output_file $@

work/all.1.js: src/main.ts work
	$(TS) --outfile $@ $<

out/main.css: src/main.scss
	sass $< $@

.PHONY: clean
clean:
	rm -rf work out

