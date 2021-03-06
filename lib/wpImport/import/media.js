'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = media;

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

function media(_x, _x2) {
  return _media.apply(this, arguments);
}

function _media() {
  _media = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(dato, wp) {
      var ids, urls, mediaItems, tick, _iterator, _step, _loop;

      return regeneratorRuntime.wrap(
        function _callee2$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                ids = {};
                urls = {};
                _context3.next = 4;
                return (0, _allPages['default'])('Fetching media', wp.media());

              case 4:
                mediaItems = _context3.sent;
                tick = progress('Creating media', mediaItems.length);
                _iterator = _createForOfIteratorHelper(mediaItems);
                _context3.prev = 7;
                _loop = /*#__PURE__*/ regeneratorRuntime.mark(function _loop() {
                  var mediaItem, create;
                  return regeneratorRuntime.wrap(function _loop$(_context2) {
                    while (1) {
                      switch ((_context2.prev = _context2.next)) {
                        case 0:
                          mediaItem = _step.value;

                          create = /*#__PURE__*/ (function() {
                            var _ref = _asyncToGenerator(
                              /*#__PURE__*/ regeneratorRuntime.mark(
                                function _callee() {
                                  var mediaItemUrl,
                                    path,
                                    upload,
                                    _i,
                                    _Object$keys,
                                    thumbName,
                                    _mediaItem$media_deta,
                                    width,
                                    height,
                                    sourceUrl;

                                  return regeneratorRuntime.wrap(
                                    function _callee$(_context) {
                                      while (1) {
                                        switch (
                                          (_context.prev = _context.next)
                                        ) {
                                          case 0:
                                            mediaItemUrl = mediaItem.source_url;
                                            _context.prev = 1;
                                            _context.next = 4;
                                            return dato.createUploadPath(
                                              mediaItemUrl,
                                            );

                                          case 4:
                                            path = _context.sent;
                                            _context.next = 7;
                                            return dato.uploads.create({
                                              path: path,
                                              author: null,
                                              copyright: null,
                                              defaultFieldMetadata: {
                                                en: {
                                                  title:
                                                    mediaItem.title.rendered,
                                                  alt: mediaItem.alt_text,
                                                  customData: {},
                                                },
                                              },
                                            });

                                          case 7:
                                            upload = _context.sent;
                                            ids[mediaItem.id] = upload.id;
                                            urls[mediaItemUrl] = upload.url;

                                            if (
                                              mediaItem.media_details &&
                                              mediaItem.media_details.sizes
                                            ) {
                                              for (
                                                _i = 0,
                                                  _Object$keys = Object.keys(
                                                    mediaItem.media_details
                                                      .sizes,
                                                  );
                                                _i < _Object$keys.length;
                                                _i++
                                              ) {
                                                thumbName = _Object$keys[_i];
                                                (_mediaItem$media_deta =
                                                  mediaItem.media_details.sizes[
                                                    thumbName
                                                  ]),
                                                  (width =
                                                    _mediaItem$media_deta.width),
                                                  (height =
                                                    _mediaItem$media_deta.height),
                                                  (sourceUrl =
                                                    _mediaItem$media_deta.source_url);
                                                urls[sourceUrl] = ''
                                                  .concat(upload.url, '?w=')
                                                  .concat(width, '&h=')
                                                  .concat(height, '&fit=crop');
                                              }
                                            }

                                            _context.next = 17;
                                            break;

                                          case 13:
                                            _context.prev = 13;
                                            _context.t0 = _context['catch'](1);
                                            console.log(
                                              'Cannot import: '.concat(
                                                mediaItemUrl,
                                              ),
                                            );
                                            console.log(_context.t0);

                                          case 17:
                                          case 'end':
                                            return _context.stop();
                                        }
                                      }
                                    },
                                    _callee,
                                    null,
                                    [[1, 13]],
                                  );
                                },
                              ),
                            );

                            return function create() {
                              return _ref.apply(this, arguments);
                            };
                          })();

                          _context2.next = 4;
                          return tick(mediaItem.title.rendered, create());

                        case 4:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _loop);
                });

                _iterator.s();

              case 10:
                if ((_step = _iterator.n()).done) {
                  _context3.next = 14;
                  break;
                }

                return _context3.delegateYield(_loop(), 't0', 12);

              case 12:
                _context3.next = 10;
                break;

              case 14:
                _context3.next = 19;
                break;

              case 16:
                _context3.prev = 16;
                _context3.t1 = _context3['catch'](7);

                _iterator.e(_context3.t1);

              case 19:
                _context3.prev = 19;

                _iterator.f();

                return _context3.finish(19);

              case 22:
                return _context3.abrupt('return', {
                  ids: ids,
                  urls: urls,
                });

              case 23:
              case 'end':
                return _context3.stop();
            }
          }
        },
        _callee2,
        null,
        [[7, 16, 19, 22]],
      );
    }),
  );
  return _media.apply(this, arguments);
}
