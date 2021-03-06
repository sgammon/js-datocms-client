'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _generateClient = _interopRequireDefault(
  require('../utils/generateClient'),
);

var _cache = _interopRequireDefault(require('./cache'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _default = (0, _generateClient['default'])(
  'account-api',
  _cache['default'],
);

exports['default'] = _default;
