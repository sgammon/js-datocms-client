'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = categories;

var _allPages = _interopRequireDefault(require('../utils/allPages'));

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

var _require = require('../utils/progress'),
  progress = _require.progress;

function categories(_x, _x2, _x3) {
  return _categories.apply(this, arguments);
}

function _categories() {
  _categories = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(
      dato,
      wp,
      itemTypeId,
    ) {
      var mapping,
        resources,
        tick,
        _iterator,
        _step,
        category,
        childCategories,
        tick2,
        _iterator2,
        _step2,
        _category;

      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                mapping = {};
                _context.next = 3;
                return (0, _allPages['default'])(
                  'Fetching categories',
                  wp.categories(),
                );

              case 3:
                resources = _context.sent;
                tick = progress('Creating categories', resources.length + 1);
                _iterator = _createForOfIteratorHelper(resources);
                _context.prev = 6;

                _iterator.s();

              case 8:
                if ((_step = _iterator.n()).done) {
                  _context.next = 15;
                  break;
                }

                category = _step.value;
                _context.next = 12;
                return tick(
                  category.name,
                  dato.items.create({
                    itemType: itemTypeId,
                    name: category.name,
                    slug: category.slug,
                    description: category.description,
                  }),
                );

              case 12:
                mapping[category.id] = _context.sent.id;

              case 13:
                _context.next = 8;
                break;

              case 15:
                _context.next = 20;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context['catch'](6);

                _iterator.e(_context.t0);

              case 20:
                _context.prev = 20;

                _iterator.f();

                return _context.finish(20);

              case 23:
                _context.next = 25;
                return tick(
                  'Uncategorized',
                  dato.items.create({
                    itemType: itemTypeId,
                    name: 'Uncategorized',
                    slug: 'uncategorized',
                    description: 'Uncategorized',
                  }),
                );

              case 25:
                mapping[1] = _context.sent.id;
                childCategories = resources.filter(function(c) {
                  return c.parent;
                });
                tick2 = progress(
                  'Reordering categories',
                  childCategories.length,
                );
                _iterator2 = _createForOfIteratorHelper(childCategories);
                _context.prev = 29;

                _iterator2.s();

              case 31:
                if ((_step2 = _iterator2.n()).done) {
                  _context.next = 37;
                  break;
                }

                _category = _step2.value;
                _context.next = 35;
                return tick2(
                  _category.name,
                  dato.items.update(mapping[_category.id], {
                    parentId: mapping[_category.parent],
                    position: 0,
                  }),
                );

              case 35:
                _context.next = 31;
                break;

              case 37:
                _context.next = 42;
                break;

              case 39:
                _context.prev = 39;
                _context.t1 = _context['catch'](29);

                _iterator2.e(_context.t1);

              case 42:
                _context.prev = 42;

                _iterator2.f();

                return _context.finish(42);

              case 45:
                return _context.abrupt('return', mapping);

              case 46:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [
          [6, 17, 20, 23],
          [29, 39, 42, 45],
        ],
      );
    }),
  );
  return _categories.apply(this, arguments);
}
