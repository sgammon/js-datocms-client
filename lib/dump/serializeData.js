'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = serializeData;

var _jsYaml = _interopRequireDefault(require('js-yaml'));

var _toml = _interopRequireDefault(require('@iarna/toml'));

var _traverse = _interopRequireDefault(require('traverse'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function serializeData(format, data) {
  /* eslint-disable array-callback-return */
  var safeData = (0, _traverse['default'])(data).map(function transform(value) {
    if (typeof value === 'undefined') {
      this.update(null);
    }
  });
  /* eslint-enable array-callback-return */

  switch (format) {
    case 'yaml':
    case 'yml':
      return _jsYaml['default']
        .safeDump(safeData, {
          lineWidth: -1,
        })
        .trim();

    case 'toml':
      return _toml['default'].stringify(safeData).trim();

    case 'json':
      return JSON.stringify(safeData, null, 2).trim();

    default:
      throw new Error('Unsupported format: '.concat(format));
  }
}
