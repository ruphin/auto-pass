.PHONY: dev
dev:
	docker run -it --rm -v $$PWD:/app -p 5000:5000 ruphin/webdev npm run dev

.PHONY: shell
shell:
	docker run -it --rm -v $$PWD:/app ruphin/webdev bash

.PHONY: build
build:
	docker run -it --rm -v $$PWD:/app ruphin/webdev npm run build
