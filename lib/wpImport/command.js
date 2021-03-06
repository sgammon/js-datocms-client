'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = command;

var _wpapi = _interopRequireDefault(require('wpapi'));

var _SiteClient = _interopRequireDefault(require('../site/SiteClient'));

var _destroyExistingData = _interopRequireDefault(
  require('./destroyExistingData'),
);

var _createSchema = _interopRequireDefault(require('./createSchema'));

var _media = _interopRequireDefault(require('./import/media'));

var _authors = _interopRequireDefault(require('./import/authors'));

var _categories = _interopRequireDefault(require('./import/categories'));

var _tags = _interopRequireDefault(require('./import/tags'));

var _articles = _interopRequireDefault(require('./import/articles'));

var _pages = _interopRequireDefault(require('./import/pages'));

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

function command(_x, _x2, _x3, _x4, _x5, _x6) {
  return _command.apply(this, arguments);
}

function _command() {
  _command = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(
      token,
      environment,
      wpUrl,
      wpUser,
      wpPassword,
      cmaBaseUrl,
    ) {
      var dato, wp, schema, media, categories, tags, authors;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              dato = new _SiteClient['default'](
                token,
                {
                  environment: environment,
                },
                cmaBaseUrl,
              );
              _context.next = 3;
              return _wpapi['default'].discover(wpUrl);

            case 3:
              wp = _context.sent;
              _context.next = 6;
              return wp.auth({
                username: wpUser,
                password: wpPassword,
              });

            case 6:
              _context.next = 8;
              return (0, _destroyExistingData['default'])(dato, wp);

            case 8:
              _context.next = 10;
              return (0, _createSchema['default'])(dato, wp);

            case 10:
              schema = _context.sent;
              _context.next = 13;
              return (0, _media['default'])(dato, wp);

            case 13:
              media = _context.sent;
              _context.next = 16;
              return (0, _categories['default'])(dato, wp, schema.categoryId);

            case 16:
              categories = _context.sent;
              _context.next = 19;
              return (0, _tags['default'])(dato, wp, schema.tagId);

            case 19:
              tags = _context.sent;
              _context.next = 22;
              return (0, _authors['default'])(dato, wp, schema.authorId);

            case 22:
              authors = _context.sent;
              _context.next = 25;
              return (0, _articles['default'])(
                dato,
                wp,
                schema,
                media,
                categories,
                tags,
                authors,
              );

            case 25:
              _context.next = 27;
              return (0, _pages['default'])(dato, wp, schema, media, authors);

            case 27:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    }),
  );
  return _command.apply(this, arguments);
}
