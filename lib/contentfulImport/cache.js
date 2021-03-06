'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.cached = exports.removeFromFile = exports.writeToFile = exports.initializeCache = exports.destroyTempFile = exports.promptForAction = void 0;

var _readline = _interopRequireDefault(require('readline'));

var _fs = _interopRequireDefault(require('fs'));

var _ora = _interopRequireDefault(require('ora'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key),
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
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

var path = './contentfulImport.json';

var promptForAction = function promptForAction(message, rightAnswer, action) {
  return new Promise(function(resolve) {
    var rl = _readline['default'].createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(message, function(answer) {
      if (answer === rightAnswer) {
        action();
      }

      rl.close();
      resolve(answer);
    });
  });
};

exports.promptForAction = promptForAction;

var destroyTempFile = function destroyTempFile() {
  return _fs['default'].unlink(path, function(err) {
    if (err) {
      console.log('failed to delete temp file: '.concat(err));
    }
  });
};

exports.destroyTempFile = destroyTempFile;

var initializeCache = /*#__PURE__*/ (function() {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
      var spinner, message;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              if (!_fs['default'].existsSync(path)) {
                _context.next = 5;
                break;
              }

              message =
                'We found a recovery file from your previous import attempt, you can use this file to continue importing from where you left. If you made any changes to your Contentful project we suggest to select no and start from scratch. Do you wish to use this file? [Y/n]';
              spinner = (0, _ora['default'])(
                'Using recovery file in '.concat(path),
              );
              _context.next = 5;
              return promptForAction(message, 'n', destroyTempFile);

            case 5:
              if (!_fs['default'].existsSync(path)) {
                _fs['default'].appendFile(
                  path,
                  JSON.stringify({}),
                  function onFileAppened(err) {
                    if (err) throw err;
                  },
                );

                spinner = (0, _ora['default'])(
                  'Created recovery file in '.concat(path),
                );
              }

              return _context.abrupt(
                'return',
                Promise.resolve(spinner.succeed()),
              );

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    }),
  );

  return function initializeCache() {
    return _ref.apply(this, arguments);
  };
})();

exports.initializeCache = initializeCache;

var readFile = function readFile() {
  var rawdata = _fs['default'].readFileSync(path);

  return JSON.parse(rawdata);
};

var writeToFile = function writeToFile(json) {
  var data = readFile();

  _fs['default'].writeFileSync(
    path,
    JSON.stringify(_objectSpread(_objectSpread({}, data), json)),
    function(err) {
      if (err) throw err;
    },
  );
};

exports.writeToFile = writeToFile;

var removeFromFile = function removeFromFile(key) {
  var data = readFile();
  delete data[key];

  _fs['default'].writeFileSync(path, JSON.stringify(data), function(err) {
    if (err) throw err;
  });
};

exports.removeFromFile = removeFromFile;

var cached = function cached(key) {
  return readFile()[key];
};

exports.cached = cached;
