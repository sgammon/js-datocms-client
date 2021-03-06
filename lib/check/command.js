'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = _default;

var _requireToken = _interopRequireDefault(require('../dump/requireToken'));

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

function _default() {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
      var token;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              token = process.env.DATO_API_TOKEN;

              if (!token) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return', undefined);

            case 3:
              return _context.abrupt('return', (0, _requireToken['default'])());

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    }),
  );
  return _ref.apply(this, arguments);
}
