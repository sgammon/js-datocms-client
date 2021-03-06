'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = addToDataFile;

var _writeFile = _interopRequireDefault(require('./writeFile'));

var _readFile = _interopRequireDefault(require('./readFile'));

var _serializeData = _interopRequireDefault(require('./serializeData'));

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

function addToDataFile(_x, _x2, _x3) {
  return _addToDataFile.apply(this, arguments);
}

function _addToDataFile() {
  _addToDataFile = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(file, format, data) {
      var oldContent, contentToAdd, newContent;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return (0, _readFile['default'])(file);

            case 2:
              _context.t0 = _context.sent;

              if (_context.t0) {
                _context.next = 5;
                break;
              }

              _context.t0 = '';

            case 5:
              oldContent = _context.t0;
              contentToAdd = (0, _serializeData['default'])(format, data);
              newContent = oldContent.replace(
                /\n*(#\s*datocms:start[\s\S]*#\s*datocms:end|$)/,
                '\n\n# datocms:start\n'.concat(contentToAdd, '\n# datocms:end'),
              );
              return _context.abrupt(
                'return',
                (0, _writeFile['default'])(file, newContent),
              );

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    }),
  );
  return _addToDataFile.apply(this, arguments);
}
