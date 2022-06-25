build:
	ng build --delete-output-path
.PHONY: build

watch:
	ng build --delete-output-path --watch --configuration development
.PHONY: watch


