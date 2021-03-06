'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _ora = _interopRequireDefault(require('ora'));

var _progress = _interopRequireDefault(require('./progress'));

var _createModels = require('./createModels');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it =
    (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator'];
  if (!it) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === 'number')
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F,
      };
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it['return'] != null) it['return']();
      } finally {
        if (didErr) throw err;
      }
    },
  };
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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
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

var _default = /*#__PURE__*/ (function() {
  var _ref2 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(_ref) {
      var datoClient,
        contentTypes,
        spinner,
        itemTypes,
        contKeys,
        imported,
        progress,
        _iterator,
        _step,
        itemType;

      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                (datoClient = _ref.datoClient),
                  (contentTypes = _ref.contentfulData.contentTypes);
                spinner = (0, _ora['default'])(
                  'Fetching existing models',
                ).start();
                _context.prev = 2;
                _context.next = 5;
                return datoClient.itemTypes.all();

              case 5:
                itemTypes = _context.sent;
                contKeys = contentTypes.map(function(c) {
                  return (0, _createModels.toItemTypeApiKey)(c.sys.id);
                });
                imported = itemTypes.filter(function(iT) {
                  return contKeys.includes(iT.apiKey);
                });
                spinner.succeed();

                if (!(imported.length === 0)) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt('return');

              case 11:
                spinner = (0, _ora['default'])('').start();
                progress = new _progress['default'](
                  imported.length,
                  'Destroying existing models',
                );
                spinner.text = progress.tick();
                _iterator = _createForOfIteratorHelper(imported);
                _context.prev = 15;

                _iterator.s();

              case 17:
                if ((_step = _iterator.n()).done) {
                  _context.next = 24;
                  break;
                }

                itemType = _step.value;
                spinner.text = progress.tick();
                _context.next = 22;
                return datoClient.itemTypes.destroy(itemType.id);

              case 22:
                _context.next = 17;
                break;

              case 24:
                _context.next = 29;
                break;

              case 26:
                _context.prev = 26;
                _context.t0 = _context['catch'](15);

                _iterator.e(_context.t0);

              case 29:
                _context.prev = 29;

                _iterator.f();

                return _context.finish(29);

              case 32:
                spinner.succeed();
                _context.next = 39;
                break;

              case 35:
                _context.prev = 35;
                _context.t1 = _context['catch'](2);
                spinner.fail();
                throw _context.t1;

              case 39:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [
          [2, 35],
          [15, 26, 29, 32],
        ],
      );
    }),
  );

  return function(_x) {
    return _ref2.apply(this, arguments);
  };
})();

exports['default'] = _default;
