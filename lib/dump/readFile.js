'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = readFile;

var _fs = _interopRequireDefault(require('fs'));

var _denodeify = _interopRequireDefault(require('denodeify'));

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

var fsReadFile = (0, _denodeify['default'])(_fs['default'].readFile);
var fsAccess = (0, _denodeify['default'])(_fs['default'].access);

function readFile(_x) {
  return _readFile.apply(this, arguments);
}

function _readFile() {
  _readFile = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(filePath) {
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return fsAccess(filePath);

              case 3:
                _context.next = 8;
                break;

              case 5:
                _context.prev = 5;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', null);

              case 8:
                return _context.abrupt('return', fsReadFile(filePath, 'utf-8'));

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [[0, 5]],
      );
    }),
  );
  return _readFile.apply(this, arguments);
}
