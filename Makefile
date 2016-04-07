BUILDOUT_BIN ?= $(shell command -v buildout || echo 'bin/buildout')

WEBPACK := node_modules/.bin/webpack
WEBPACK_DEV_SERVER := node_modules/.bin/webpack-dev-server

SOURCES = $(wildcard src/*) $(wildcard theme/*) webpack.config.js
LIB = lib/plonetheme.barceloneta/.git

all: build

show:
	@echo $(SOURCES)

build: clean $(LIB) $(WEBPACK) $(SOURCES)
	$(WEBPACK)

watch: clean $(LIB) $(WEBPACK) $(SOURCES)
	TARGET=watch $(WEBPACK_DEV_SERVER)

clean:
	rm -rf resources

lib:
	git submodule update --init --recursive
	git submodule update --remote --

###

.PHONY: all show build watch clean lib

node_modules: package.json
	npm install
	touch node_modules

bootstrap-buildout.py:
	curl -k -O https://bootstrap.pypa.io/bootstrap-buildout.py

bin/buildout: bootstrap-buildout.py buildout.cfg
	python bootstrap-buildout.py -c buildout.cfg

bin/instance: $(BUILDOUT_BIN) buildout.cfg
	$(BUILDOUT_BIN) -N install instance

bin/test: $(BUILDOUT_BIN) buildout.cfg
	$(BUILDOUT_BIN) -N install test

$(LIB):
	git submodule update --init --recursive
	git submodule update --remote --

$(WEBPACK): node_modules
$(WEBPACK_DEV_SERVER): node_modules
