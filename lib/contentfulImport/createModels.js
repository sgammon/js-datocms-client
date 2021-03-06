'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = exports.toItemTypeApiKey = void 0;

var _ora = _interopRequireDefault(require('ora'));

var _humps = require('humps');

var _progress = _interopRequireDefault(require('./progress'));

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

var toItemTypeApiKey = function toItemTypeApiKey(value) {
  return ''.concat(
    (0, _humps.decamelize)(value)
      .replace(/\d+/g, '')
      .replace(/-/g, '_'),
    '_model',
  );
};

exports.toItemTypeApiKey = toItemTypeApiKey;

var _default = /*#__PURE__*/ (function() {
  var _ref2 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(_ref) {
      var datoClient,
        contentfulData,
        spinner,
        contentTypes,
        progress,
        mapping,
        _iterator,
        _step,
        contentType,
        contKey,
        itemTypeApiKey,
        itemTypeAttributes,
        itemType;

      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                (datoClient = _ref.datoClient),
                  (contentfulData = _ref.contentfulData);
                spinner = (0, _ora['default'])().start();
                _context.prev = 2;
                contentTypes = contentfulData.contentTypes;
                progress = new _progress['default'](
                  contentTypes.length,
                  'Creating models',
                );
                spinner.text = progress.tick();
                mapping = {};
                _iterator = _createForOfIteratorHelper(contentTypes);
                _context.prev = 8;

                _iterator.s();

              case 10:
                if ((_step = _iterator.n()).done) {
                  _context.next = 22;
                  break;
                }

                contentType = _step.value;
                contKey = contentType.sys.id;
                itemTypeApiKey = toItemTypeApiKey(contKey);
                itemTypeAttributes = {
                  apiKey: itemTypeApiKey,
                  name: contentType.name,
                  modularBlock: false,
                  orderingDirection: null,
                  singleton: false,
                  sortable: false,
                  tree: false,
                  orderingField: null,
                  draftModeActive: true,
                };
                _context.next = 17;
                return datoClient.itemTypes.create(itemTypeAttributes);

              case 17:
                itemType = _context.sent;
                spinner.text = progress.tick();
                mapping = _objectSpread(
                  _objectSpread({}, mapping),
                  {},
                  _defineProperty({}, contentType.sys.id, itemType),
                );

              case 20:
                _context.next = 10;
                break;

              case 22:
                _context.next = 27;
                break;

              case 24:
                _context.prev = 24;
                _context.t0 = _context['catch'](8);

                _iterator.e(_context.t0);

              case 27:
                _context.prev = 27;

                _iterator.f();

                return _context.finish(27);

              case 30:
                spinner.succeed();
                return _context.abrupt('return', mapping);

              case 34:
                _context.prev = 34;
                _context.t1 = _context['catch'](2);
                spinner.fail();
                throw _context.t1;

              case 38:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [
          [2, 34],
          [8, 24, 27, 30],
        ],
      );
    }),
  );

  return function(_x) {
    return _ref2.apply(this, arguments);
  };
})();

exports['default'] = _default;
