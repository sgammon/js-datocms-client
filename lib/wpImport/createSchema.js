'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = createSchema;

var _author = _interopRequireDefault(require('./schema/author'));

var _category = _interopRequireDefault(require('./schema/category'));

var _tag = _interopRequireDefault(require('./schema/tag'));

var _article = _interopRequireDefault(require('./schema/article'));

var _page = _interopRequireDefault(require('./schema/page'));

var _progress = require('./utils/progress');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

function createSchema(_x) {
  return _createSchema.apply(this, arguments);
}

function _createSchema() {
  _createSchema = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(dato) {
      var tick, authorId, categoryId, tagId, pageId, articleId;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              tick = (0, _progress.progress)('Creating DatoCMS models', 4);
              _context.next = 3;
              return tick('Author model', (0, _author['default'])(dato));

            case 3:
              authorId = _context.sent;
              _context.next = 6;
              return tick('Category model', (0, _category['default'])(dato));

            case 6:
              categoryId = _context.sent;
              _context.next = 9;
              return tick('Tag model', (0, _tag['default'])(dato));

            case 9:
              tagId = _context.sent;
              _context.next = 12;
              return tick(
                'Page model',
                (0, _page['default'])(dato, authorId, categoryId, tagId),
              );

            case 12:
              pageId = _context.sent;
              _context.next = 15;
              return tick(
                'Article model',
                (0, _article['default'])(dato, authorId, categoryId, tagId),
              );

            case 15:
              articleId = _context.sent;
              return _context.abrupt('return', {
                authorId: authorId,
                categoryId: categoryId,
                tagId: tagId,
                articleId: articleId,
                pageId: pageId,
              });

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    }),
  );
  return _createSchema.apply(this, arguments);
}
