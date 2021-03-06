'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = wait;

function wait(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
}
