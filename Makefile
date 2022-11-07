proto: 
	rm -rf ./src/gen
	cd ./buf; buf mod update
	buf generate