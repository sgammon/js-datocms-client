'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = createPost;

var _generateFrontmatter = _interopRequireDefault(
  require('./generateFrontmatter'),
);

var _writeFile = _interopRequireDefault(require('./writeFile'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function createPost(file, format, _ref) {
  var frontmatter = _ref.frontmatter,
    _ref$content = _ref.content,
    content = _ref$content === void 0 ? '' : _ref$content;
  return (0, _writeFile['default'])(
    file,
    (0, _generateFrontmatter['default'])(format, frontmatter) + content,
  );
}
