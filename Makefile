deps:
	brew install bufbuild/buf/buf

proto: 
	rm -rf ./src/gen
	cd ./buf; buf mod update
	buf generate