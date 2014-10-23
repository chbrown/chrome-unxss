VERSION = $(shell jq -r '.version' < extension/manifest.json)
EXT_ZIP = ../insecure-$(VERSION).zip

all: icons/128.png icons/48.png icons/32.png icons/19.png

$(EXT_ZIP): manifest.json
	zip -r $@ .

icons/128.png: icons/original.png
	convert icons/icon.png -resize 128x128 $@

icons/48.png: icons/original.png
	convert icons/original.png -resize 48x48 $@

icons/32.png: icons/original.png
	convert icons/original.png -resize 32x32 $@

icons/19.png: icons/original.png
	convert icons/original.png -resize 19x19 $@
