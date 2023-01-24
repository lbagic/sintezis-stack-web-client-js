BIN := /usr/local/bin

REV := $(shell git rev-parse HEAD)
CHANGES := $(shell test -n "$$(git status --porcelain)" && echo '+CHANGES' || true)

PROTO_LOCATION := $(shell find modules -iname "proto" -exec echo "-I="{} \;)

COMMIT=$(shell git rev-parse --short HEAD)
BRANCH=$(shell git rev-parse --abbrev-ref HEAD)

# figure out current platform
UNAME := $(shell uname | tr A-Z a-z )

CGO_CFLAGS=-I/usr/local/include
CGO_LDFLAGS=-L/usr/local/lib

ROOT_DIR:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

VERSION := 1.8.0
BINARY_NAME := buf

# Set up path to use our vendored go bin, so that we can use our proto compiler tools
# export PATH :="$(PATH):$(go env GOPATH)/bin"

# count processors
NPROCS:=1
OS:=$(shell uname -s)
ifeq ($(OS),Linux)
	NPROCS:=$(shell grep -c ^processor /proc/cpuinfo)
endif
ifeq ($(OS),Darwin) # Assume Mac OS X
	NPROCS:=$(shell sysctl -n hw.ncpu)
endif

.DEFAULT_GOAL := all

.PHONY: \
	buf \
	proto \

## Compile all proto files with buf
proto:
	rm -rf ./src/gen
	buf generate buf.build/sintezis/reti

## Install buf binary
buf:
	curl -sSL "https://github.com/bufbuild/buf/releases/download/v${VERSION}/${BINARY_NAME}-$(shell uname -s)-$(shell uname -m)" -o "${BIN}/${BINARY_NAME}"
	chmod +x $(BIN)/$(BINARY_NAME)

## Install buf via brew
buf-brew:
	brew install bufbuild/buf/buf

# Fancy help message
# Source: https://gist.github.com/prwhite/8168133
# COLOR
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)
TARGET_MAX_CHAR_NUM=20

## Show help
help:
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk '/^[a-zA-Z\-\0-9]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")-1); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "  ${YELLOW}%-$(TARGET_MAX_CHAR_NUM)s${RESET} ${GREEN}%s${RESET}\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)
