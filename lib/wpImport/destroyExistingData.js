'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = destroyExistingData;

var _progress = require('./utils/progress');

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

function destroyExistingData(_x) {
  return _destroyExistingData.apply(this, arguments);
}

function _destroyExistingData() {
  _destroyExistingData = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(dato) {
      var itemTypes, itemTypesToDestroy, tick, _iterator, _step, itemType;

      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return (0, _progress.spin)(
                  'Fetching existing data',
                  dato.itemTypes.all(),
                );

              case 2:
                itemTypes = _context.sent;
                itemTypesToDestroy = itemTypes.filter(function(it) {
                  return (
                    ['author', 'category', 'tag', 'article', 'page'].includes(
                      it.apiKey,
                    ) ||
                    ['Author', 'Category', 'Tag', 'Article', 'Page'].includes(
                      it.name,
                    )
                  );
                });
                tick = (0, _progress.progress)(
                  'Destroying existing authors, categories, tags, articles, pages',
                  itemTypesToDestroy.length,
                );
                _iterator = _createForOfIteratorHelper(itemTypesToDestroy);
                _context.prev = 6;

                _iterator.s();

              case 8:
                if ((_step = _iterator.n()).done) {
                  _context.next = 14;
                  break;
                }

                itemType = _step.value;
                _context.next = 12;
                return tick(itemType.id, dato.itemTypes.destroy(itemType.id));

              case 12:
                _context.next = 8;
                break;

              case 14:
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context['catch'](6);

                _iterator.e(_context.t0);

              case 19:
                _context.prev = 19;

                _iterator.f();

                return _context.finish(19);

              case 22:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [[6, 16, 19, 22]],
      );
    }),
  );
  return _destroyExistingData.apply(this, arguments);
}
