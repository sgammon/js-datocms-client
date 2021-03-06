'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _ora = _interopRequireDefault(require('ora'));

var _pluralize = require('pluralize');

var _progress = _interopRequireDefault(require('./progress'));

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
        contentfulData,
        spinner,
        itemTypes,
        importedItemTypes,
        importedFieldIds,
        progress,
        _iterator,
        _step,
        fieldId,
        field,
        validators;

      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                (datoClient = _ref.datoClient),
                  (contentfulData = _ref.contentfulData);
                spinner = (0, _ora['default'])(
                  'Fetching existing fields',
                ).start();
                _context.prev = 2;
                _context.next = 5;
                return datoClient.itemTypes.all();

              case 5:
                itemTypes = _context.sent;
                importedItemTypes = itemTypes.filter(function(iT) {
                  return contentfulData.contentTypes
                    .map(function(c) {
                      return (0, _pluralize.singular)(c.sys.id);
                    })
                    .includes(iT.apiKey);
                });
                importedFieldIds = importedItemTypes
                  .map(function(itemType) {
                    return itemType.fields;
                  })
                  .flat();
                spinner.succeed();
                spinner = (0, _ora['default'])('').start();
                progress = new _progress['default'](
                  importedFieldIds.length,
                  'Removing validations from fields',
                );
                spinner.text = progress.tick();
                _iterator = _createForOfIteratorHelper(importedFieldIds);
                _context.prev = 13;

                _iterator.s();

              case 15:
                if ((_step = _iterator.n()).done) {
                  _context.next = 28;
                  break;
                }

                fieldId = _step.value;
                _context.next = 19;
                return datoClient.fields.find(fieldId);

              case 19:
                field = _context.sent;
                validators = {};

                if (field.validators.itemItemType) {
                  validators = {
                    itemItemType: field.validators.itemItemType,
                  };
                }

                if (field.validators.itemsItemType) {
                  validators = {
                    itemsItemType: field.validators.itemsItemType,
                  };
                }

                _context.next = 25;
                return datoClient.fields.update(fieldId, {
                  validators: validators,
                });

              case 25:
                spinner.text = progress.tick();

              case 26:
                _context.next = 15;
                break;

              case 28:
                _context.next = 33;
                break;

              case 30:
                _context.prev = 30;
                _context.t0 = _context['catch'](13);

                _iterator.e(_context.t0);

              case 33:
                _context.prev = 33;

                _iterator.f();

                return _context.finish(33);

              case 36:
                spinner.succeed();
                _context.next = 43;
                break;

              case 39:
                _context.prev = 39;
                _context.t1 = _context['catch'](2);
                spinner.fail();
                throw _context.t1;

              case 43:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [
          [2, 39],
          [13, 30, 33, 36],
        ],
      );
    }),
  );

  return function(_x) {
    return _ref2.apply(this, arguments);
  };
})();

exports['default'] = _default;
