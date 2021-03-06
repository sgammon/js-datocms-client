'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = decode;

function decode(url) {
  return decodeURIComponent(url) === url ? encodeURI(url) : url;
}
