BUILDOUT_BIN ?= $(shell command -v buildout || echo 'bin/buildout')

WEBPACK := node_modules/.bin/webpack
WEBPACK_DEV_SERVER := node_modules/.bin/webpack-dev-server

SOURCES = $(wildcard src/*) $(wildcard theme/*) webpack.config.js

all: build

show:
	@echo $(SOURCES)

build: clean lib $(WEBPACK) $(SOURCES)
	$(WEBPACK)

watch: clean lib $(WEBPACK) $(SOURCES)
	PORT=8090 TARGET=watch $(WEBPACK_DEV_SERVER)

clean:
	rm -rf resources

###

.PHONY: all show build watch clean

node_modules: package.json
	npm install
	touch node_modules

lib: .gitmodules
	git submodule update --init --depth 1 --recursive
	git submodule update --remote --depth 1 --
	touch lib

bootstrap-buildout.py:
	curl -k -O https://bootstrap.pypa.io/bootstrap-buildout.py

bin/buildout: bootstrap-buildout.py buildout.cfg
	python bootstrap-buildout.py -c buildout.cfg

bin/instance: $(BUILDOUT_BIN) buildout.cfg
	$(BUILDOUT_BIN) -N install instance

bin/test: $(BUILDOUT_BIN) buildout.cfg
	$(BUILDOUT_BIN) -N install test

$(WEBPACK): node_modules
$(WEBPACK_DEV_SERVER): node_modules
