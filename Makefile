BUILDOUT_BIN ?= $(shell command -v buildout || echo 'bin/buildout')

WEBPACK := node_modules/.bin/webpack
WEBPACK_DEV_SERVER := node_modules/.bin/webpack-dev-server

SOURCES = $(wildcard src/*) $(wildcard theme/*) webpack.config.js

all: build

show:
	@echo $(SOURCES)

build: clean lib bin/instance $(WEBPACK) $(SOURCES)
	mkdir -p build/theme
	cp -R theme build/theme/webpack
	$(WEBPACK)

clean:
	rm -rf build

###

.PHONY: all show build lcean

node_modules: package.json
	npm install
	touch node_modules

lib: node_modules
	git submodule update --init --recursive
	touch lib

bootstrap-buildout.py:
	curl -k -O https://bootstrap.pypa.io/bootstrap-buildout.py

bin/buildout: bootstrap-buildout.py buildout.cfg
	python bootstrap-buildout.py -c buildout.cfg

bin/instance: $(BUILDOUT_BIN) buildout.cfg
	$(BUILDOUT_BIN) -N install instance

$(WEBPACK): node_modules
$(WEBPACK_DEV_SERVER): node_modules
