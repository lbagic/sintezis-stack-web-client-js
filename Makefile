deps:
	brew install bufbuild/buf/buf

proto: 
	rm -rf ./src/gen
	# cd ./buf; buf mod update
	buf generate buf.build/sintezis/reti:development-21616134a3f94ec8e0be47dac0f739ef621b64af