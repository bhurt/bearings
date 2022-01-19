
.DEFAULT_GOAL := all

TSFILES :=	src/main.ts \
			src/Report.ts

JSFILES :=	$(TSFILES:src/%.ts=work/%.js)

.PHONY: test
test:
	echo "TSFILES=" $(TSFILES)
	echo "JSFILES=" $(JSFILES)

TS=npx tsc

GCC_VER=closure-compiler-v20220104.jar

.PHONY: all
all: out work out/index.html out/all.js out/main.css out/require.js

out:
	mkdir out

work:
	mkdir work

out/index.html: src/index.html out
	cp $< $@

out/all.js: work/all.js work out googcc/$(GCC_VER)
	java -jar googcc/$(GCC_VER) --js $< --js_output_file $@

work/all.js: work $(TSFILES) src/tsconfig.json
	$(TS) -p src/tsconfig.json

out/main.css: src/main.scss
	sass $< $@

out/require.js: src/require.js
	cp $< $@

.PHONY: clean
clean:
	rm -rf work out

