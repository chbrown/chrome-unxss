/*jslint browser: true */ /* globals chrome */

/** removeMatchingHeaders(headers: Header[], pattern: RegExp): void

Remove the first item from `headers` with a .name property matching `pattern`.
Modifies the Array in-place. Returns after the first match.
*/
function removeMatchingHeaders(headers, regex) {
  for (var i = 0, header; (header = headers[i]); i++) {
    if (header.name.match(regex)) {
      headers.splice(i, 1);
      log('Removing header "' + header.name + '":"' + header.value + '"');
      return;
    }
  }
}

function log(message) {
  if (localStorage.log == 'true') {
    console.log(message);
  }
}

/**
Example / typical details:
  .statusLine: 'HTTP/1.1 200 OK'
  .method: 'GET'
  .url: 'http://google.com/'
  .frameId: 0                     // 0 for the main_frame, 1+ for subframes
  .parentFrameId: -1              // != 1 for subframes
  .type: One of:
    'main_frame',
    'sub_frame',
    'stylesheet',
    'script',
    'image',
    'object',
    'xmlhttprequest',
    'other'                      // not exactly sure; pre-flight header check?
  .tabId: 543                    // or -1 if the request is not related to a tab
  .requestId: "98233"
  .timeStamp: 1414070119031.556  // milliseconds with decimal nanoseconds
  .responseHeaders: Array of { name: <Header>, value: <Value> } objects, e.g.:
    [
      { name: "Server", value: "nginx" },
      { name: "Date", value: "Thu, 23 Oct 2014 12:34:56 GMT" },
      { name: "Content-Type", value: "text/html" }
    ]

In some versions of Chrome, simply adding a new header combines its value with
the existing header. To avoid conflicts and improper header values, we always
remove matching headers before setting a new value.

Complete documentation:
  https://developer.chrome.com/extensions/webRequest#event-onHeadersReceived
*/
function responseListener(details) {
  // localStorage values are always strings
  var strip_csp = localStorage.csp == 'true';
  var allow_origin_star = localStorage.origin == 'true';
  var allow_methods_star = localStorage.methods == 'true';
  var strip_frame_options = localStorage.frame_options == 'true';

  var active = strip_csp || allow_origin_star || allow_methods_star || strip_frame_options;
  // var active = active && (details.type == 'main_frame');
  if (active) {
    log('Removing headers where applicable');
    if (strip_csp) {
      removeMatchingHeaders(details.responseHeaders, /content-security-policy/i);
    }
    if (allow_origin_star) {
      removeMatchingHeaders(details.responseHeaders, /access-control-allow-origin/i);
      details.responseHeaders.push({name: 'Access-Control-Allow-Origin', value: '*'});
    }
    if (allow_methods_star) {
      removeMatchingHeaders(details.responseHeaders, /access-control-allow-methods/i);
      details.responseHeaders.push({name: 'Access-Control-Allow-Methods', value: '*'});
    }
    if (strip_frame_options) {
      removeMatchingHeaders(details.responseHeaders, /x-frame-options/i);
    }
  }

  return {responseHeaders: details.responseHeaders};
}

chrome.webRequest.onHeadersReceived.addListener(responseListener, {
  urls: ['*://*/*']
}, [
  'blocking',
  'responseHeaders'
]);
