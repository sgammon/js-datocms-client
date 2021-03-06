'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = _default;

var _clui = require('clui');

function _default(size, text) {
  var currentValue = 0;
  var currentText = text;
  var progress = new _clui.Progress(30);

  this.tick = function() {
    currentValue += 1;
    var progressText = progress.update(currentValue / size);
    return ''.concat(currentText.padEnd(70, ' ')).concat(progressText);
  };

  this.changeText = function(newText) {
    currentText = newText;
    var progressText = progress.update(currentValue / size);
    return ''.concat(currentText.padEnd(70, ' ')).concat(progressText);
  };
}
