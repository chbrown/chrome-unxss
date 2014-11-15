## UnXSS

Evade Chrome's cross-site scripting (XSS) protection by modifying or deleting websites' security headers on the fly.

For example:

* If you want to load a website in an iframe, and that website uses `X-Frame-Options: SAMEORIGIN`, Chrome will refuse to show the website. Use the "Delete X-Frame-Options header" option to have Chrome ignore that restriction.
* If you want to call a foreign AJAX endpoint from a website that has `Content-Security-Policy: ...` set to disallow wildcard script-src, use the "Delete Content-Security-Policy header" to allow running any script on that page.
* If you want to call out to an API endpoint that doesn't specify itself as `CORS`-friendly, enable the "Add Access-Control-Allow-Origin: * header" and "Add Access-Control-Allow-Methods: * header" options.

Each restriction can be disabled or enabled individually; labeled checkboxes on the configuration page clearly indicate which restrictions are disabled.

The default is to leave all restrictions in place. When you want to allow one or more XSS vectors, click the dark "XSS ☠" icon in the toolbar, and check/uncheck the checkboxes as desired. The restrictions / relaxations take effect immediately, but you will need to refresh any pages that were loaded before disabling the restrictions.


### Installation

UnXSS can be found in the [Chrome web store](https://chrome.google.com/webstore/search/unxss).


## Notes

Chrome's developer tools' "Network" inspector shows the original, pre-interception, headers.


## Development

Debugging the `default_popup` page, `options.html`:

    chrome-extension://the_extensions_chrome_id/options.html

Or right-click on the icon in the toolbar and click "Inspect Popup".


## Publishing

[Chrome WebStore Dashboard](https://chrome.google.com/webstore/developer/dashboard)

**Icon.** The icon should be 128x128 and have transparent 16px margins on each side.
**Screenshots.** Can use up to five 1280x800 or 640x400 images.
**Tiles.** One each of 440x280, 920x680, 1400x560 images.


## License

Copyright ©2014 Christopher Brown. [MIT Licensed](http://opensource.org/licenses/MIT).
