# compile a string with @buf dependencies with @latest suffix
BUF_PACKAGES_LATEST := $(shell cat package.json | grep @buf | cut -d'"' -f2)

.DEFAULT_GOAL := all

.PHONY: \
	proto \

## Install latest buf dependencies
proto:
	npm remove $(BUF_PACKAGES_LATEST)
	npm install $(BUF_PACKAGES_LATEST)

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
