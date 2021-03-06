'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = jsonSchemaType;

var _findInfoForProperty = _interopRequireDefault(
  require('./findInfoForProperty'),
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function jsonSchemaType(schema) {
  var typeProperty = (0, _findInfoForProperty['default'])('type', schema);

  if (!typeProperty) {
    return null;
  }

  return typeProperty.pattern.replace(new RegExp(/(^\^|\$$)/, 'g'), '');
}
