'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = pages;

var _escapeStringRegexp = _interopRequireDefault(
  require('escape-string-regexp'),
);

var _allPages = _interopRequireDefault(require('../utils/allPages'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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

var _require = require('../utils/progress'),
  progress = _require.progress;

function pages(_x, _x2, _x3, _x4, _x5) {
  return _pages.apply(this, arguments);
}

function _pages() {
  _pages = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(
      dato,
      wp,
      schema,
      media,
      authors,
    ) {
      var resources, tick, _iterator, _step, _loop;

      return regeneratorRuntime.wrap(
        function _callee2$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                _context3.next = 2;
                return (0, _allPages['default'])('Fetching pages', wp.pages());

              case 2:
                resources = _context3.sent;
                tick = progress('Creating pages', resources.length);
                _iterator = _createForOfIteratorHelper(resources);
                _context3.prev = 5;
                _loop = /*#__PURE__*/ regeneratorRuntime.mark(function _loop() {
                  var page, createAndPublish;
                  return regeneratorRuntime.wrap(function _loop$(_context2) {
                    while (1) {
                      switch ((_context2.prev = _context2.next)) {
                        case 0:
                          page = _step.value;

                          createAndPublish = /*#__PURE__*/ (function() {
                            var _ref = _asyncToGenerator(
                              /*#__PURE__*/ regeneratorRuntime.mark(
                                function _callee() {
                                  var itemData, newItem;
                                  return regeneratorRuntime.wrap(
                                    function _callee$(_context) {
                                      while (1) {
                                        switch (
                                          (_context.prev = _context.next)
                                        ) {
                                          case 0:
                                            itemData = {
                                              itemType: schema.pageId,
                                              title: page.title.rendered,
                                              slug: page.slug,
                                              content: Object.entries(
                                                media.urls,
                                              ).reduce(function(acc, _ref2) {
                                                var _ref3 = _slicedToArray(
                                                    _ref2,
                                                    2,
                                                  ),
                                                  k = _ref3[0],
                                                  v = _ref3[1];

                                                return acc.replace(
                                                  new RegExp(
                                                    (0,
                                                    _escapeStringRegexp[
                                                      'default'
                                                    ])(k),
                                                    'ig',
                                                  ),
                                                  v,
                                                );
                                              }, page.content.rendered),
                                              excerpt: Object.entries(
                                                media.urls,
                                              ).reduce(function(acc, _ref4) {
                                                var _ref5 = _slicedToArray(
                                                    _ref4,
                                                    2,
                                                  ),
                                                  k = _ref5[0],
                                                  v = _ref5[1];

                                                return acc.replace(
                                                  new RegExp(
                                                    (0,
                                                    _escapeStringRegexp[
                                                      'default'
                                                    ])(k),
                                                    'ig',
                                                  ),
                                                  v,
                                                );
                                              }, page.excerpt.rendered),
                                              date: page.date,
                                              author: authors[page.author],
                                              featuredMedia: null,
                                              meta: {
                                                firstPublishedAt: new Date(
                                                  page.date,
                                                ),
                                                createdAt: new Date(page.date),
                                              },
                                            };

                                            if (
                                              media.ids[page.featured_media]
                                            ) {
                                              itemData.featuredMedia = {
                                                uploadId:
                                                  media.ids[
                                                    page.featured_media
                                                  ],
                                                title: page.title.rendered,
                                                alt: page.title.rendered,
                                                customData: {},
                                              };
                                            }

                                            _context.next = 4;
                                            return dato.items.create(itemData);

                                          case 4:
                                            newItem = _context.sent;

                                            if (
                                              !(
                                                page.status === 'publish' ||
                                                page.status === 'future'
                                              )
                                            ) {
                                              _context.next = 8;
                                              break;
                                            }

                                            _context.next = 8;
                                            return dato.items.publish(
                                              newItem.id,
                                            );

                                          case 8:
                                          case 'end':
                                            return _context.stop();
                                        }
                                      }
                                    },
                                    _callee,
                                  );
                                },
                              ),
                            );

                            return function createAndPublish() {
                              return _ref.apply(this, arguments);
                            };
                          })();

                          _context2.next = 4;
                          return tick(page.title.rendered, createAndPublish());

                        case 4:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _loop);
                });

                _iterator.s();

              case 8:
                if ((_step = _iterator.n()).done) {
                  _context3.next = 12;
                  break;
                }

                return _context3.delegateYield(_loop(), 't0', 10);

              case 10:
                _context3.next = 8;
                break;

              case 12:
                _context3.next = 17;
                break;

              case 14:
                _context3.prev = 14;
                _context3.t1 = _context3['catch'](5);

                _iterator.e(_context3.t1);

              case 17:
                _context3.prev = 17;

                _iterator.f();

                return _context3.finish(17);

              case 20:
              case 'end':
                return _context3.stop();
            }
          }
        },
        _callee2,
        null,
        [[5, 14, 17, 20]],
      );
    }),
  );
  return _pages.apply(this, arguments);
}
