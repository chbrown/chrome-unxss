VERSION := $(shell jq -r '.version' < manifest.json)
EXT_ZIP := ../insecure-$(VERSION).zip

all: icons/128.png icons/48.png icons/32.png icons/19.png

$(EXT_ZIP): manifest.json
	zip -r $@ .

icons/128.png: icons/original.png
	convert icons/original.png -resize 128x128 $@.tmp
	pngcrush $@.tmp $@
	rm $@.tmp

icons/48.png: icons/original.png
	convert icons/original.png -resize 48x48 $@.tmp
	pngcrush $@.tmp $@
	rm $@.tmp

icons/32.png: icons/original.png
	convert icons/original.png -resize 32x32 $@.tmp
	pngcrush $@.tmp $@
	rm $@.tmp

icons/19.png: icons/original.png
	convert icons/original.png -resize 19x19 $@.tmp
	pngcrush $@.tmp $@
	rm $@.tmp
