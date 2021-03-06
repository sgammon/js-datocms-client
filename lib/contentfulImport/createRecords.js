'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _ora = _interopRequireDefault(require('ora'));

var _promiseLimit = _interopRequireDefault(require('promise-limit'));

var _humps = require('humps');

var _progress = _interopRequireDefault(require('./progress'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
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

var datoValueForFieldType = /*#__PURE__*/ (function() {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(value, field) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              if (!['links', 'gallery'].includes(field.fieldType)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', []);

            case 2:
              if (!['link', 'file'].includes(field.fieldType)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return', null);

            case 4:
              if (!(field.fieldType === 'structured_text')) {
                _context.next = 6;
                break;
              }

              return _context.abrupt('return', null);

            case 6:
              if (!(field.fieldType === 'lat_lon')) {
                _context.next = 8;
                break;
              }

              return _context.abrupt(
                'return',
                value && {
                  latitude: value.lat,
                  longitude: value.lon,
                },
              );

            case 8:
              if (!(field.fieldType === 'string' && Array.isArray(value))) {
                _context.next = 10;
                break;
              }

              return _context.abrupt('return', value && value.join(', '));

            case 10:
              if (!(field.fieldType === 'json')) {
                _context.next = 12;
                break;
              }

              return _context.abrupt(
                'return',
                value && JSON.stringify(value, null, 2),
              );

            case 12:
              return _context.abrupt('return', value);

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    }),
  );

  return function datoValueForFieldType(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var _default = /*#__PURE__*/ (function() {
  var _ref3 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee4(_ref2) {
      var itemTypeMapping,
        fieldsMapping,
        datoClient,
        contentfulData,
        spinner,
        _ret;

      return regeneratorRuntime.wrap(
        function _callee4$(_context6) {
          while (1) {
            switch ((_context6.prev = _context6.next)) {
              case 0:
                (itemTypeMapping = _ref2.itemTypeMapping),
                  (fieldsMapping = _ref2.fieldsMapping),
                  (datoClient = _ref2.datoClient),
                  (contentfulData = _ref2.contentfulData);
                spinner = (0, _ora['default'])('').start();
                _context6.prev = 2;
                return _context6.delegateYield(
                  /*#__PURE__*/ regeneratorRuntime.mark(function _callee3() {
                    var entries,
                      progress,
                      contentfulRecordMap,
                      recordsToPublish,
                      limit,
                      jobs,
                      _iterator,
                      _step,
                      _loop,
                      _ret2;

                    return regeneratorRuntime.wrap(
                      function _callee3$(_context5) {
                        while (1) {
                          switch ((_context5.prev = _context5.next)) {
                            case 0:
                              entries = contentfulData.entries;
                              progress = new _progress['default'](
                                entries.length,
                                'Creating records',
                              );
                              contentfulRecordMap = {};
                              recordsToPublish = [];
                              spinner.text = progress.tick();
                              limit = (0, _promiseLimit['default'])(5);
                              jobs = [];
                              _iterator = _createForOfIteratorHelper(entries);
                              _context5.prev = 8;
                              _loop = /*#__PURE__*/ regeneratorRuntime.mark(
                                function _loop() {
                                  var entry,
                                    contentType,
                                    itemType,
                                    datoFields,
                                    allFieldApiKeys,
                                    recordAttributes,
                                    _iterator2,
                                    _step2,
                                    _loop2;

                                  return regeneratorRuntime.wrap(
                                    function _loop$(_context4) {
                                      while (1) {
                                        switch (
                                          (_context4.prev = _context4.next)
                                        ) {
                                          case 0:
                                            entry = _step.value;
                                            contentType = entry.sys.contentType;
                                            itemType =
                                              itemTypeMapping[
                                                contentType.sys.id
                                              ];

                                            if (itemType) {
                                              _context4.next = 5;
                                              break;
                                            }

                                            return _context4.abrupt(
                                              'return',
                                              'continue',
                                            );

                                          case 5:
                                            datoFields =
                                              fieldsMapping[contentType.sys.id]; // Contentful returns only valorized fields while Dato requires all the fields to be passed

                                            allFieldApiKeys = _toConsumableArray(
                                              new Set(
                                                [].concat(
                                                  _toConsumableArray(
                                                    Object.keys(entry.fields),
                                                  ),
                                                  _toConsumableArray(
                                                    datoFields.map(function(f) {
                                                      return f.contentfulFieldId;
                                                    }),
                                                  ),
                                                ),
                                              ),
                                            );
                                            recordAttributes = {};
                                            _iterator2 = _createForOfIteratorHelper(
                                              allFieldApiKeys,
                                            );
                                            _context4.prev = 9;
                                            _loop2 = /*#__PURE__*/ regeneratorRuntime.mark(
                                              function _loop2() {
                                                var apiKey,
                                                  contentfulContent,
                                                  _datoFields$find,
                                                  datoField,
                                                  datoFieldValue,
                                                  _iterator3,
                                                  _step3,
                                                  locale;

                                                return regeneratorRuntime.wrap(
                                                  function _loop2$(_context3) {
                                                    while (1) {
                                                      switch (
                                                        (_context3.prev =
                                                          _context3.next)
                                                      ) {
                                                        case 0:
                                                          apiKey = _step2.value;
                                                          contentfulContent =
                                                            entry.fields[
                                                              apiKey
                                                            ];
                                                          (_datoFields$find = datoFields.find(
                                                            function(f) {
                                                              return (
                                                                f.contentfulFieldId ===
                                                                apiKey
                                                              );
                                                            },
                                                          )),
                                                            (datoField =
                                                              _datoFields$find.datoField);
                                                          datoFieldValue = {};

                                                          if (
                                                            !datoField.localized
                                                          ) {
                                                            _context3.next = 25;
                                                            break;
                                                          }

                                                          _iterator3 = _createForOfIteratorHelper(
                                                            contentfulData.locales,
                                                          );
                                                          _context3.prev = 6;

                                                          _iterator3.s();

                                                        case 8:
                                                          if (
                                                            (_step3 = _iterator3.n())
                                                              .done
                                                          ) {
                                                            _context3.next = 15;
                                                            break;
                                                          }

                                                          locale = _step3.value;
                                                          _context3.next = 12;
                                                          return datoValueForFieldType(
                                                            contentfulContent &&
                                                              contentfulContent[
                                                                locale
                                                              ],
                                                            datoField,
                                                          );

                                                        case 12:
                                                          datoFieldValue[
                                                            locale
                                                          ] = _context3.sent;

                                                        case 13:
                                                          _context3.next = 8;
                                                          break;

                                                        case 15:
                                                          _context3.next = 20;
                                                          break;

                                                        case 17:
                                                          _context3.prev = 17;
                                                          _context3.t0 = _context3[
                                                            'catch'
                                                          ](6);

                                                          _iterator3.e(
                                                            _context3.t0,
                                                          );

                                                        case 20:
                                                          _context3.prev = 20;

                                                          _iterator3.f();

                                                          return _context3.finish(
                                                            20,
                                                          );

                                                        case 23:
                                                          _context3.next = 28;
                                                          break;

                                                        case 25:
                                                          _context3.next = 27;
                                                          return datoValueForFieldType(
                                                            contentfulContent &&
                                                              contentfulContent[
                                                                contentfulData
                                                                  .defaultLocale
                                                              ],
                                                            datoField,
                                                          );

                                                        case 27:
                                                          datoFieldValue =
                                                            _context3.sent;

                                                        case 28:
                                                          recordAttributes[
                                                            (0,
                                                            _humps.camelize)(
                                                              datoField.apiKey,
                                                            )
                                                          ] = datoFieldValue;

                                                        case 29:
                                                        case 'end':
                                                          return _context3.stop();
                                                      }
                                                    }
                                                  },
                                                  _loop2,
                                                  null,
                                                  [[6, 17, 20, 23]],
                                                );
                                              },
                                            );

                                            _iterator2.s();

                                          case 12:
                                            if (
                                              (_step2 = _iterator2.n()).done
                                            ) {
                                              _context4.next = 16;
                                              break;
                                            }

                                            return _context4.delegateYield(
                                              _loop2(),
                                              't0',
                                              14,
                                            );

                                          case 14:
                                            _context4.next = 12;
                                            break;

                                          case 16:
                                            _context4.next = 21;
                                            break;

                                          case 18:
                                            _context4.prev = 18;
                                            _context4.t1 = _context4['catch'](
                                              9,
                                            );

                                            _iterator2.e(_context4.t1);

                                          case 21:
                                            _context4.prev = 21;

                                            _iterator2.f();

                                            return _context4.finish(21);

                                          case 24:
                                            jobs.push(
                                              limit(
                                                /*#__PURE__*/ _asyncToGenerator(
                                                  /*#__PURE__*/ regeneratorRuntime.mark(
                                                    function _callee2() {
                                                      var record;
                                                      return regeneratorRuntime.wrap(
                                                        function _callee2$(
                                                          _context2,
                                                        ) {
                                                          while (1) {
                                                            switch (
                                                              (_context2.prev =
                                                                _context2.next)
                                                            ) {
                                                              case 0:
                                                                _context2.next = 2;
                                                                return datoClient.items.create(
                                                                  _objectSpread(
                                                                    _objectSpread(
                                                                      {},
                                                                      recordAttributes,
                                                                    ),
                                                                    {},
                                                                    {
                                                                      itemType: itemType.id.toString(),
                                                                    },
                                                                  ),
                                                                );

                                                              case 2:
                                                                record =
                                                                  _context2.sent;

                                                                if (
                                                                  entry.sys
                                                                    .publishedVersion
                                                                ) {
                                                                  recordsToPublish.push(
                                                                    record.id,
                                                                  );
                                                                }

                                                                spinner.text = progress.tick();
                                                                contentfulRecordMap[
                                                                  entry.sys.id
                                                                ] = record.id;

                                                              case 6:
                                                              case 'end':
                                                                return _context2.stop();
                                                            }
                                                          }
                                                        },
                                                        _callee2,
                                                      );
                                                    },
                                                  ),
                                                ),
                                              ),
                                            );

                                          case 25:
                                          case 'end':
                                            return _context4.stop();
                                        }
                                      }
                                    },
                                    _loop,
                                    null,
                                    [[9, 18, 21, 24]],
                                  );
                                },
                              );

                              _iterator.s();

                            case 11:
                              if ((_step = _iterator.n()).done) {
                                _context5.next = 18;
                                break;
                              }

                              return _context5.delegateYield(_loop(), 't0', 13);

                            case 13:
                              _ret2 = _context5.t0;

                              if (!(_ret2 === 'continue')) {
                                _context5.next = 16;
                                break;
                              }

                              return _context5.abrupt('continue', 16);

                            case 16:
                              _context5.next = 11;
                              break;

                            case 18:
                              _context5.next = 23;
                              break;

                            case 20:
                              _context5.prev = 20;
                              _context5.t1 = _context5['catch'](8);

                              _iterator.e(_context5.t1);

                            case 23:
                              _context5.prev = 23;

                              _iterator.f();

                              return _context5.finish(23);

                            case 26:
                              _context5.next = 28;
                              return Promise.all(jobs);

                            case 28:
                              spinner.succeed();
                              return _context5.abrupt('return', {
                                v: {
                                  contentfulRecordMap: contentfulRecordMap,
                                  recordsToPublish: recordsToPublish,
                                },
                              });

                            case 30:
                            case 'end':
                              return _context5.stop();
                          }
                        }
                      },
                      _callee3,
                      null,
                      [[8, 20, 23, 26]],
                    );
                  })(),
                  't0',
                  4,
                );

              case 4:
                _ret = _context6.t0;

                if (!(_typeof(_ret) === 'object')) {
                  _context6.next = 7;
                  break;
                }

                return _context6.abrupt('return', _ret.v);

              case 7:
                _context6.next = 13;
                break;

              case 9:
                _context6.prev = 9;
                _context6.t1 = _context6['catch'](2);
                spinner.fail();
                throw _context6.t1;

              case 13:
              case 'end':
                return _context6.stop();
            }
          }
        },
        _callee4,
        null,
        [[2, 9]],
      );
    }),
  );

  return function(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

exports['default'] = _default;
