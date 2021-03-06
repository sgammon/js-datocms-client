'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = dump;

var _path = require('path');

var _denodeify = _interopRequireDefault(require('denodeify'));

var _rimraf = _interopRequireDefault(require('rimraf'));

var _ora = _interopRequireDefault(require('ora'));

var _createPost2 = _interopRequireDefault(require('./createPost'));

var _createDataFile2 = _interopRequireDefault(require('./createDataFile'));

var _addToDataFile2 = _interopRequireDefault(require('./addToDataFile'));

var _i18n = _interopRequireDefault(require('../utils/i18n'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) ||
        arr['@@iterator'];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

var rimraf = (0, _denodeify['default'])(_rimraf['default']);
var createDirectory;

function collectOperations(base, config) {
  var operations = [];
  var dsl = {
    directory: function directory(dir, subConfig) {
      operations.push(
        createDirectory((0, _path.resolve)(base, dir), subConfig),
      );
    },
    createDataFile: function createDataFile(file, format, data) {
      operations.push(function() {
        return Promise.resolve(data).then(function(dr) {
          return _createDataFile2['default'].bind(
            null,
            (0, _path.resolve)(base, file),
            format,
            dr,
          )();
        });
      });
    },
    createPost: function createPost(file, format, data) {
      operations.push(function() {
        return Promise.resolve(data).then(function(dr) {
          return _createPost2['default'].bind(
            null,
            (0, _path.resolve)(base, file),
            format,
            dr,
          )();
        });
      });
    },
    addToDataFile: function addToDataFile(file, format, data) {
      operations.push(function() {
        return Promise.resolve(data).then(function(dr) {
          return _addToDataFile2['default'].bind(
            null,
            (0, _path.resolve)(base, file),
            format,
            dr,
          )();
        });
      });
    },
  };
  config(dsl, _i18n['default']);
  return operations;
}

createDirectory = function createDirectory(dir, config) {
  var operations = collectOperations(dir, config);
  return function() {
    return rimraf((0, _path.resolve)(dir, '*'))
      .then(function() {
        return Promise.all(
          operations.map(function(o) {
            return o();
          }),
        );
      })
      .then(function(descriptions) {
        var _ref;

        var description = 'Created '.concat(
          (0, _path.relative)(process.cwd(), dir),
        );
        return (_ref = []).concat.apply(
          _ref,
          [description].concat(_toConsumableArray(descriptions)),
        );
      });
  };
};

function start(path, config) {
  var operations = collectOperations(path, config);
  return function() {
    return Promise.all(
      operations.map(function(o) {
        return o();
      }),
    ).then(function(descriptions) {
      var _ref2;

      return (_ref2 = []).concat.apply(_ref2, _toConsumableArray(descriptions));
    });
  };
}

function dump(_x, _x2) {
  return _dump.apply(this, arguments);
}

function _dump() {
  _dump = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(
      configFile,
      itemsRepo,
    ) {
      var quiet,
        destinationPath,
        config,
        _i18n$availableLocale,
        startOperation,
        spinner,
        operations,
        _args = arguments;

      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                quiet =
                  _args.length > 2 && _args[2] !== undefined ? _args[2] : false;
                destinationPath =
                  _args.length > 3 && _args[3] !== undefined
                    ? _args[3]
                    : process.cwd();

                /* eslint-disable global-require, import/no-dynamic-require */
                delete require.cache[configFile];
                config = require(configFile);
                /* eslint-enable global-require, import/no-dynamic-require */

                _i18n['default'].availableLocales = itemsRepo.site.locales;
                _i18n$availableLocale = _slicedToArray(
                  _i18n['default'].availableLocales,
                  1,
                );
                _i18n['default'].locale = _i18n$availableLocale[0];
                startOperation = start(
                  destinationPath,
                  config.bind(config, itemsRepo),
                );
                spinner = (0, _ora['default'])('Writing content').start();
                _context.prev = 9;
                _context.next = 12;
                return startOperation();

              case 12:
                operations = _context.sent;
                spinner.succeed();

                if (!quiet) {
                  process.stdout.write('\n');
                  operations.forEach(function(operation) {
                    return process.stdout.write('* '.concat(operation, '\n'));
                  });
                  process.stdout.write('\n');
                }

                _context.next = 21;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context['catch'](9);
                spinner.fail();
                throw _context.t0;

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [[9, 17]],
      );
    }),
  );
  return _dump.apply(this, arguments);
}
