'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = tag;

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

function tag(_x) {
  return _tag.apply(this, arguments);
}

function _tag() {
  _tag = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(dato) {
      var itemType, _i, _arr, apiKey;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return dato.itemTypes.create({
                apiKey: 'tag',
                name: 'Tag',
              });

            case 2:
              itemType = _context.sent;
              (_i = 0), (_arr = ['name', 'slug']);

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
              return _context.abrupt('return', itemType.id);

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    }),
  );
  return _tag.apply(this, arguments);
}
