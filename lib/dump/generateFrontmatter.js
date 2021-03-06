'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = generateFrontmatter;

var _serializeData = _interopRequireDefault(require('./serializeData'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function generateFrontmatter(format, data) {
  if (data) {
    switch (format) {
      case 'yaml':
      case 'yml':
        return '---\n'.concat(
          (0, _serializeData['default'])(format, data),
          '\n---\n\n',
        );

      case 'toml':
        return '+++\n'.concat(
          (0, _serializeData['default'])(format, data),
          '\n+++\n\n',
        );

      case 'json':
        return ''.concat((0, _serializeData['default'])(format, data), '\n\n');

      case 'md':
        return '';

      default:
        throw new Error('Unsupported format: '.concat(format));
    }
  } else {
    return '';
  }
}
