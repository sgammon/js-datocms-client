'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = node;

var _url = _interopRequireDefault(require('url'));

var _fs = _interopRequireDefault(require('fs'));

var _nodeRemote = _interopRequireDefault(require('./nodeRemote'));

var _nodeLocal = _interopRequireDefault(require('./nodeLocal'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function node(client, source) {
  var options =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _url$parse = _url['default'].parse(source),
    host = _url$parse.host;

  if (host) {
    return (0, _nodeRemote['default'])(client, source, options);
  }

  _fs['default'].accessSync(source);

  return (0, _nodeLocal['default'])(client, source, options);
}
