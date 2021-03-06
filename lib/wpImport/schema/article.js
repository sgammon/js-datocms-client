'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = article;

var _text = _interopRequireDefault(require('./fields/text'));

var _string = _interopRequireDefault(require('./fields/string'));

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

function article(_x, _x2, _x3, _x4) {
  return _article.apply(this, arguments);
}

function _article() {
  _article = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(
      dato,
      authorId,
      categoryId,
      tagId,
    ) {
      var itemType, _i, _arr, apiKey, _i2, _arr2, _apiKey;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return dato.itemTypes.create({
                apiKey: 'article',
                draftModeActive: true,
                name: 'Article',
              });

            case 2:
              itemType = _context.sent;
              (_i = 0), (_arr = ['title', 'slug']);

            case 4:
              if (!(_i < _arr.length)) {
                _context.next = 11;
                break;
              }

              apiKey = _arr[_i];
              _context.next = 8;
              return (0, _string['default'])(itemType, dato, apiKey);

            case 8:
              _i++;
              _context.next = 4;
              break;

            case 11:
              (_i2 = 0), (_arr2 = ['excerpt', 'content']);

            case 12:
              if (!(_i2 < _arr2.length)) {
                _context.next = 19;
                break;
              }

              _apiKey = _arr2[_i2];
              _context.next = 16;
              return (0, _text['default'])(itemType, dato, _apiKey);

            case 16:
              _i2++;
              _context.next = 12;
              break;

            case 19:
              _context.next = 21;
              return dato.fields.create(itemType.id, {
                apiKey: 'featured_media',
                fieldType: 'file',
                label: 'Main image',
                validators: {},
              });

            case 21:
              _context.next = 23;
              return dato.fields.create(itemType.id, {
                apiKey: 'author',
                fieldType: 'link',
                label: 'Author',
                validators: {
                  itemItemType: {
                    itemTypes: [authorId],
                  },
                },
              });

            case 23:
              _context.next = 25;
              return dato.fields.create(itemType.id, {
                apiKey: 'categories',
                fieldType: 'links',
                label: 'Categories',
                validators: {
                  itemsItemType: {
                    itemTypes: [categoryId],
                  },
                },
              });

            case 25:
              _context.next = 27;
              return dato.fields.create(itemType.id, {
                apiKey: 'tags',
                fieldType: 'links',
                label: 'Tags',
                validators: {
                  itemsItemType: {
                    itemTypes: [tagId],
                  },
                },
              });

            case 27:
              _context.next = 29;
              return dato.fields.create(itemType.id, {
                apiKey: 'date',
                fieldType: 'date',
                label: 'Date',
                validators: {
                  required: {},
                },
              });

            case 29:
              return _context.abrupt('return', itemType.id);

            case 30:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    }),
  );
  return _article.apply(this, arguments);
}
