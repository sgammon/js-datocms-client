'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _ora = _interopRequireDefault(require('ora'));

var _progress = _interopRequireDefault(require('./progress'));

var _richTextToStructuredText = _interopRequireDefault(
  require('./richTextToStructuredText'),
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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
        e: function e(_e2) {
          throw _e2;
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
    e: function e(_e3) {
      didErr = true;
      err = _e3;
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

var _require = require('humps'),
  camelize = _require.camelize;

function uploadData(id) {
  if (!id) {
    return null;
  }

  return {
    uploadId: id,
    alt: null,
    title: null,
    customData: {},
  };
}

var _default = /*#__PURE__*/ (function() {
  var _ref2 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(_ref) {
      var datoClient,
        fieldsMapping,
        contentfulData,
        contentfulRecordMap,
        uploadsMapping,
        spinner,
        entries,
        progress,
        richTextToStructuredText,
        datoValueForFieldType,
        recordsToPublish,
        _iterator,
        _step,
        entry,
        datoItemId,
        datoFields,
        datoNewValue,
        _loop,
        _i,
        _Object$entries,
        _ret;

      return regeneratorRuntime.wrap(
        function _callee2$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                (datoClient = _ref.datoClient),
                  (fieldsMapping = _ref.fieldsMapping),
                  (contentfulData = _ref.contentfulData),
                  (contentfulRecordMap = _ref.contentfulRecordMap),
                  (uploadsMapping = _ref.uploadsMapping);
                spinner = (0, _ora['default'])('').start();
                entries = contentfulData.entries;
                progress = new _progress['default'](
                  entries.length,
                  'Create links',
                );
                _context3.next = 6;
                return (0, _richTextToStructuredText['default'])(
                  datoClient,
                  contentfulRecordMap,
                  uploadsMapping,
                );

              case 6:
                richTextToStructuredText = _context3.sent;
                _context3.prev = 7;
                spinner.text = progress.tick();

                datoValueForFieldType = /*#__PURE__*/ (function() {
                  var _ref3 = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(
                      value,
                      field,
                    ) {
                      var structured;
                      return regeneratorRuntime.wrap(function _callee$(
                        _context,
                      ) {
                        while (1) {
                          switch ((_context.prev = _context.next)) {
                            case 0:
                              if (!(field.fieldType === 'file')) {
                                _context.next = 2;
                                break;
                              }

                              return _context.abrupt(
                                'return',
                                value && value.sys
                                  ? uploadData(uploadsMapping[value.sys.id])
                                  : null,
                              );

                            case 2:
                              if (!(field.fieldType === 'link')) {
                                _context.next = 4;
                                break;
                              }

                              return _context.abrupt(
                                'return',
                                value && value.sys
                                  ? contentfulRecordMap[value.sys.id]
                                  : null,
                              );

                            case 4:
                              if (!(field.fieldType === 'links')) {
                                _context.next = 6;
                                break;
                              }

                              return _context.abrupt(
                                'return',
                                value
                                  .map(function(link) {
                                    return link && link.sys
                                      ? contentfulRecordMap[link.sys.id]
                                      : null;
                                  })
                                  .filter(function(v) {
                                    return !!v;
                                  }),
                              );

                            case 6:
                              if (!(field.fieldType === 'gallery')) {
                                _context.next = 8;
                                break;
                              }

                              return _context.abrupt(
                                'return',
                                value
                                  .map(function(link) {
                                    return link && link.sys
                                      ? uploadData(uploadsMapping[link.sys.id])
                                      : null;
                                  })
                                  .filter(function(v) {
                                    return !!v;
                                  }),
                              );

                            case 8:
                              if (!(field.fieldType === 'structured_text')) {
                                _context.next = 13;
                                break;
                              }

                              _context.next = 11;
                              return richTextToStructuredText(value);

                            case 11:
                              structured = _context.sent;
                              return _context.abrupt('return', structured);

                            case 13:
                              return _context.abrupt('return', value);

                            case 14:
                            case 'end':
                              return _context.stop();
                          }
                        }
                      },
                      _callee);
                    }),
                  );

                  return function datoValueForFieldType(_x2, _x3) {
                    return _ref3.apply(this, arguments);
                  };
                })();

                recordsToPublish = [];
                _iterator = _createForOfIteratorHelper(entries);
                _context3.prev = 12;

                _iterator.s();

              case 14:
                if ((_step = _iterator.n()).done) {
                  _context3.next = 34;
                  break;
                }

                entry = _step.value;
                datoItemId = contentfulRecordMap[entry.sys.id];
                datoFields = fieldsMapping[entry.sys.contentType.sys.id];
                datoNewValue = {};

                if (datoFields) {
                  _context3.next = 21;
                  break;
                }

                return _context3.abrupt('continue', 32);

              case 21:
                _loop = /*#__PURE__*/ regeneratorRuntime.mark(function _loop() {
                  var _Object$entries$_i,
                    id,
                    contentfulItem,
                    _datoFields$find,
                    datoField,
                    _i2,
                    _Object$entries2,
                    _Object$entries2$_i,
                    locale,
                    val,
                    recordAttributes;

                  return regeneratorRuntime.wrap(function _loop$(_context2) {
                    while (1) {
                      switch ((_context2.prev = _context2.next)) {
                        case 0:
                          (_Object$entries$_i = _slicedToArray(
                            _Object$entries[_i],
                            2,
                          )),
                            (id = _Object$entries$_i[0]),
                            (contentfulItem = _Object$entries$_i[1]);
                          (_datoFields$find = datoFields.find(function(f) {
                            return f.contentfulFieldId === id;
                          })),
                            (datoField = _datoFields$find.datoField);

                          if (
                            [
                              'file',
                              'gallery',
                              'link',
                              'links',
                              'structured_text',
                            ].includes(datoField.fieldType)
                          ) {
                            _context2.next = 4;
                            break;
                          }

                          return _context2.abrupt('return', 'continue');

                        case 4:
                          if (!datoField.localized) {
                            _context2.next = 16;
                            break;
                          }

                          (_i2 = 0),
                            (_Object$entries2 = Object.entries(contentfulItem));

                        case 6:
                          if (!(_i2 < _Object$entries2.length)) {
                            _context2.next = 14;
                            break;
                          }

                          (_Object$entries2$_i = _slicedToArray(
                            _Object$entries2[_i2],
                            2,
                          )),
                            (locale = _Object$entries2$_i[0]),
                            (val = _Object$entries2$_i[1]);
                          _context2.next = 10;
                          return datoValueForFieldType(val, datoField);

                        case 10:
                          datoNewValue[locale] = _context2.sent;

                        case 11:
                          _i2++;
                          _context2.next = 6;
                          break;

                        case 14:
                          _context2.next = 19;
                          break;

                        case 16:
                          _context2.next = 18;
                          return datoValueForFieldType(
                            contentfulItem[contentfulData.defaultLocale],
                            datoField,
                          );

                        case 18:
                          datoNewValue = _context2.sent;

                        case 19:
                          recordAttributes = _defineProperty(
                            {},
                            camelize(datoField.apiKey),
                            datoNewValue,
                          );
                          _context2.next = 22;
                          return datoClient.items.update(
                            datoItemId,
                            recordAttributes,
                          );

                        case 22:
                          if (entry.sys.publishedVersion) {
                            recordsToPublish.push(datoItemId);
                          }

                        case 23:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _loop);
                });
                (_i = 0), (_Object$entries = Object.entries(entry.fields));

              case 23:
                if (!(_i < _Object$entries.length)) {
                  _context3.next = 31;
                  break;
                }

                return _context3.delegateYield(_loop(), 't0', 25);

              case 25:
                _ret = _context3.t0;

                if (!(_ret === 'continue')) {
                  _context3.next = 28;
                  break;
                }

                return _context3.abrupt('continue', 28);

              case 28:
                _i++;
                _context3.next = 23;
                break;

              case 31:
                spinner.text = progress.tick();

              case 32:
                _context3.next = 14;
                break;

              case 34:
                _context3.next = 39;
                break;

              case 36:
                _context3.prev = 36;
                _context3.t1 = _context3['catch'](12);

                _iterator.e(_context3.t1);

              case 39:
                _context3.prev = 39;

                _iterator.f();

                return _context3.finish(39);

              case 42:
                spinner.succeed();
                return _context3.abrupt('return', recordsToPublish);

              case 46:
                _context3.prev = 46;
                _context3.t2 = _context3['catch'](7);
                spinner.fail();
                throw _context3.t2;

              case 50:
              case 'end':
                return _context3.stop();
            }
          }
        },
        _callee2,
        null,
        [
          [7, 46],
          [12, 36, 39, 42],
        ],
      );
    }),
  );

  return function(_x) {
    return _ref2.apply(this, arguments);
  };
})();

exports['default'] = _default;
