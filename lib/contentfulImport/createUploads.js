'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _ora = _interopRequireDefault(require('ora'));

var _progress = _interopRequireDefault(require('./progress'));

var _cache = require('./cache');

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
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(_ref) {
      var datoClient, contentfulData, spinner, _ret;

      return regeneratorRuntime.wrap(
        function _callee2$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                (datoClient = _ref.datoClient),
                  (contentfulData = _ref.contentfulData);
                spinner = (0, _ora['default'])('').start();
                _context3.prev = 2;
                return _context3.delegateYield(
                  /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
                    var assets,
                      progress,
                      uploadsMapping,
                      _iterator,
                      _step,
                      _loop,
                      _ret2;

                    return regeneratorRuntime.wrap(
                      function _callee$(_context2) {
                        while (1) {
                          switch ((_context2.prev = _context2.next)) {
                            case 0:
                              assets = contentfulData.assets;
                              progress = new _progress['default'](
                                assets.length,
                                'Uploading assets',
                              );
                              spinner.text = progress.tick();
                              uploadsMapping =
                                (0, _cache.cached)('uploadsMapping') || {};
                              _iterator = _createForOfIteratorHelper(assets);
                              _context2.prev = 5;
                              _loop = /*#__PURE__*/ regeneratorRuntime.mark(
                                function _loop() {
                                  var asset,
                                    fileAttributes,
                                    fileUrl,
                                    path,
                                    defaultFieldMetadata,
                                    upload;
                                  return regeneratorRuntime.wrap(
                                    function _loop$(_context) {
                                      while (1) {
                                        switch (
                                          (_context.prev = _context.next)
                                        ) {
                                          case 0:
                                            asset = _step.value;
                                            _context.prev = 1;
                                            spinner.text = progress.tick();

                                            if (
                                              !uploadsMapping[
                                                asset.sys.id.toString()
                                              ]
                                            ) {
                                              _context.next = 5;
                                              break;
                                            }

                                            return _context.abrupt(
                                              'return',
                                              'continue',
                                            );

                                          case 5:
                                            if (
                                              asset.fields &&
                                              asset.fields.file
                                            ) {
                                              _context.next = 7;
                                              break;
                                            }

                                            return _context.abrupt(
                                              'return',
                                              'continue',
                                            );

                                          case 7:
                                            fileAttributes =
                                              asset.fields.file[
                                                contentfulData.defaultLocale
                                              ];

                                            if (
                                              !(
                                                !fileAttributes ||
                                                !fileAttributes.url
                                              )
                                            ) {
                                              _context.next = 10;
                                              break;
                                            }

                                            return _context.abrupt(
                                              'return',
                                              'continue',
                                            );

                                          case 10:
                                            fileUrl = 'https:'.concat(
                                              fileAttributes.url,
                                            );
                                            _context.next = 13;
                                            return datoClient.createUploadPath(
                                              fileUrl,
                                              {
                                                onProgress: function onProgress(
                                                  info,
                                                ) {
                                                  var text = 'Asset #'.concat(
                                                    asset.sys.id.toString(),
                                                    ' ',
                                                  );

                                                  if (
                                                    info.type === 'download'
                                                  ) {
                                                    text += '(download from CF... '.concat(
                                                      info.payload.percent,
                                                      '%)',
                                                    );
                                                  }

                                                  if (info.type === 'upload') {
                                                    text += '(upload to DatoCMS... '.concat(
                                                      info.payload.percent,
                                                      '%)',
                                                    );
                                                  }

                                                  spinner.text = progress.changeText(
                                                    text,
                                                  );
                                                },
                                              },
                                            );

                                          case 13:
                                            path = _context.sent;
                                            defaultFieldMetadata = contentfulData.locales.reduce(
                                              function(acc, locale) {
                                                return Object.assign(
                                                  acc,
                                                  _defineProperty({}, locale, {
                                                    title:
                                                      asset.fields.title[
                                                        locale
                                                      ],
                                                    alt: asset.fields
                                                      .description
                                                      ? asset.fields
                                                          .description[locale]
                                                      : asset.fields.title[
                                                          locale
                                                        ],
                                                    customData: {},
                                                  }),
                                                );
                                              },
                                              {},
                                            );
                                            spinner.text = progress.changeText(
                                              'Asset #'.concat(
                                                asset.sys.id.toString(),
                                                ' (finalize upload...)',
                                              ),
                                            );
                                            _context.next = 18;
                                            return datoClient.uploads.create({
                                              path: path,
                                              author: null,
                                              copyright: null,
                                              defaultFieldMetadata: defaultFieldMetadata,
                                            });

                                          case 18:
                                            upload = _context.sent;
                                            uploadsMapping[
                                              asset.sys.id.toString()
                                            ] = upload.id;
                                            (0, _cache.writeToFile)({
                                              uploadsMapping: uploadsMapping,
                                            });
                                            _context.next = 29;
                                            break;

                                          case 23:
                                            _context.prev = 23;
                                            _context.t0 = _context['catch'](1);

                                            if (
                                              !(
                                                _context.t0.errorWithCode &&
                                                _context.t0.errorWithCode(
                                                  'PLAN_UPGRADE_REQUIRED',
                                                )
                                              )
                                            ) {
                                              _context.next = 27;
                                              break;
                                            }

                                            throw _context.t0;

                                          case 27:
                                            console.error(
                                              'Could not upload Contentful asset with ID '.concat(
                                                asset.sys.id,
                                              ),
                                            );
                                            uploadsMapping[
                                              asset.sys.id.toString()
                                            ] = null;

                                          case 29:
                                          case 'end':
                                            return _context.stop();
                                        }
                                      }
                                    },
                                    _loop,
                                    null,
                                    [[1, 23]],
                                  );
                                },
                              );

                              _iterator.s();

                            case 8:
                              if ((_step = _iterator.n()).done) {
                                _context2.next = 15;
                                break;
                              }

                              return _context2.delegateYield(_loop(), 't0', 10);

                            case 10:
                              _ret2 = _context2.t0;

                              if (!(_ret2 === 'continue')) {
                                _context2.next = 13;
                                break;
                              }

                              return _context2.abrupt('continue', 13);

                            case 13:
                              _context2.next = 8;
                              break;

                            case 15:
                              _context2.next = 20;
                              break;

                            case 17:
                              _context2.prev = 17;
                              _context2.t1 = _context2['catch'](5);

                              _iterator.e(_context2.t1);

                            case 20:
                              _context2.prev = 20;

                              _iterator.f();

                              return _context2.finish(20);

                            case 23:
                              spinner.succeed();
                              return _context2.abrupt('return', {
                                v: uploadsMapping,
                              });

                            case 25:
                            case 'end':
                              return _context2.stop();
                          }
                        }
                      },
                      _callee,
                      null,
                      [[5, 17, 20, 23]],
                    );
                  })(),
                  't0',
                  4,
                );

              case 4:
                _ret = _context3.t0;

                if (!(_typeof(_ret) === 'object')) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt('return', _ret.v);

              case 7:
                _context3.next = 13;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t1 = _context3['catch'](2);
                spinner.fail();
                throw _context3.t1;

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        },
        _callee2,
        null,
        [[2, 9]],
      );
    }),
  );

  return function(_x) {
    return _ref2.apply(this, arguments);
  };
})();

exports['default'] = _default;
