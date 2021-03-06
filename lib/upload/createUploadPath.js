'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = createUploadPath;
var rawUploadFile = process.browser
  ? require('./adapters/browser')['default']
  : require('./adapters/node')['default'];

function createUploadPath(client, source, options) {
  var _rawUploadFile = rawUploadFile(client, source, options),
    promise = _rawUploadFile.promise,
    cancel = _rawUploadFile.cancel; // For backwards compatibility reasons we set cancel on the promise

  promise.cancel = cancel;
  return promise;
}
