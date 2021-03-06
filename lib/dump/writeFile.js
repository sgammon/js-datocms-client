'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = writeFile;

var _fs = _interopRequireDefault(require('fs'));

var _path = _interopRequireDefault(require('path'));

var _mkdirp = _interopRequireDefault(require('mkdirp'));

var _denodeify = _interopRequireDefault(require('denodeify'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var fsWriteFile = (0, _denodeify['default'])(_fs['default'].writeFile);
var mkdirp = (0, _denodeify['default'])(_mkdirp['default']);

function writeFile(filePath, content) {
  return mkdirp(_path['default'].dirname(filePath))
    .then(function() {
      return fsWriteFile(filePath, content);
    })
    .then(function() {
      return 'Written '.concat(
        _path['default'].relative(process.cwd(), filePath),
      );
    });
}
