'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _ora = _interopRequireDefault(require('ora'));

var _progress = _interopRequireDefault(require('./progress'));

var _datoValidatorsFor = _interopRequireDefault(require('./datoValidatorsFor'));

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

var _default = /*#__PURE__*/ (function() {
  var _ref2 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(_ref) {
      var fieldsMapping,
        datoClient,
        contentfulData,
        spinner,
        contentTypes,
        fieldsSize,
        progress,
        _iterator,
        _step,
        contentType,
        datoFields,
        _iterator2,
        _step2,
        _loop,
        _ret;

      return regeneratorRuntime.wrap(
        function _callee$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                (fieldsMapping = _ref.fieldsMapping),
                  (datoClient = _ref.datoClient),
                  (contentfulData = _ref.contentfulData);
                spinner = (0, _ora['default'])('').start();
                _context2.prev = 2;
                contentTypes = contentfulData.contentTypes;
                fieldsSize = contentTypes
                  .map(function(contentType) {
                    return contentType.fields.length;
                  })
                  .reduce(function(acc, length) {
                    return acc + length;
                  }, 0);
                progress = new _progress['default'](
                  fieldsSize,
                  'Adding validations on fields',
                );
                spinner.text = progress.tick();
                _iterator = _createForOfIteratorHelper(contentTypes);
                _context2.prev = 8;

                _iterator.s();

              case 10:
                if ((_step = _iterator.n()).done) {
                  _context2.next = 34;
                  break;
                }

                contentType = _step.value;
                datoFields = fieldsMapping[contentType.sys.id];
                _iterator2 = _createForOfIteratorHelper(contentType.fields);
                _context2.prev = 14;
                _loop = /*#__PURE__*/ regeneratorRuntime.mark(function _loop() {
                  var contentfulField, _datoFields$find, datoField, validators;

                  return regeneratorRuntime.wrap(function _loop$(_context) {
                    while (1) {
                      switch ((_context.prev = _context.next)) {
                        case 0:
                          contentfulField = _step2.value;
                          (_datoFields$find = datoFields.find(function(f) {
                            return f.contentfulFieldId === contentfulField.id;
                          })),
                            (datoField = _datoFields$find.datoField);

                          if (datoField) {
                            _context.next = 5;
                            break;
                          }

                          console.log('Dato field not found'); // eslint-disable-next-line no-continue

                          return _context.abrupt('return', 'continue');

                        case 5:
                          validators = (0, _datoValidatorsFor['default'])(
                            contentfulField,
                          );
                          _context.next = 8;
                          return datoClient.fields.update(datoField.id, {
                            validators: _objectSpread(
                              _objectSpread({}, datoField.validators),
                              validators,
                            ),
                          });

                        case 8:
                          spinner.text = progress.tick();

                        case 9:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _loop);
                });

                _iterator2.s();

              case 17:
                if ((_step2 = _iterator2.n()).done) {
                  _context2.next = 24;
                  break;
                }

                return _context2.delegateYield(_loop(), 't0', 19);

              case 19:
                _ret = _context2.t0;

                if (!(_ret === 'continue')) {
                  _context2.next = 22;
                  break;
                }

                return _context2.abrupt('continue', 22);

              case 22:
                _context2.next = 17;
                break;

              case 24:
                _context2.next = 29;
                break;

              case 26:
                _context2.prev = 26;
                _context2.t1 = _context2['catch'](14);

                _iterator2.e(_context2.t1);

              case 29:
                _context2.prev = 29;

                _iterator2.f();

                return _context2.finish(29);

              case 32:
                _context2.next = 10;
                break;

              case 34:
                _context2.next = 39;
                break;

              case 36:
                _context2.prev = 36;
                _context2.t2 = _context2['catch'](8);

                _iterator.e(_context2.t2);

              case 39:
                _context2.prev = 39;

                _iterator.f();

                return _context2.finish(39);

              case 42:
                spinner.succeed();
                _context2.next = 49;
                break;

              case 45:
                _context2.prev = 45;
                _context2.t3 = _context2['catch'](2);
                spinner.fail();
                throw _context2.t3;

              case 49:
              case 'end':
                return _context2.stop();
            }
          }
        },
        _callee,
        null,
        [
          [2, 45],
          [8, 36, 39, 42],
          [14, 26, 29, 32],
        ],
      );
    }),
  );

  return function(_x) {
    return _ref2.apply(this, arguments);
  };
})();

exports['default'] = _default;
