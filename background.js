/*jslint browser: true */ /* globals chrome */

var responseListener = function(details) {
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

  Complete documentation:
    https://developer.chrome.com/extensions/webRequest#event-onHeadersReceived
  */

  if (details.type == 'main_frame') {
    // console.log('details.responseHeaders', details.responseHeaders);
    // for (var i = 0, header; (header = details.responseHeaders[i]); i++) {}

    // localStorage values are always strings
    if (localStorage.csp == 'true') {
      // console.log('cleaning: %s, %d headers', details.url, details.responseHeaders.length);
      // var original_n_headers = details.responseHeaders.length;
      details.responseHeaders = details.responseHeaders.filter(function(header) {
        return header.name != 'Content-Security-Policy';
      });
      // console.log('removed %d headers from %s', original_n_headers - details.responseHeaders.length, details.url);
    }
    if (localStorage.origin == 'true') {
      // hopefully re-setting the header will overwrite the previous one, if any?
      details.responseHeaders.push({name: 'Access-Control-Allow-Origin', value: '*'});
    }
    if (localStorage.methods == 'true') {
      details.responseHeaders.push({name: 'Access-Control-Allow-Methods', value: '*'});
      // console.log('added Access-Control-Allow-Methods: * header to %s', details.url);
    }
  }

  return {responseHeaders: details.responseHeaders};
};

chrome.webRequest.onHeadersReceived.addListener(responseListener, {
  urls: ['*://*/*']
}, [
  'blocking',
  'responseHeaders'
]);
