'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = createDataFile;

var _serializeData = _interopRequireDefault(require('./serializeData'));

var _writeFile = _interopRequireDefault(require('./writeFile'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function createDataFile(file, format, data) {
  return (0, _writeFile['default'])(
    file,
    (0, _serializeData['default'])(format, data),
  );
}
