'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _EntitiesRepo = _interopRequireDefault(require('./EntitiesRepo'));

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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Loader = /*#__PURE__*/ (function() {
  function Loader(client) {
    var previewMode =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var environment =
      arguments.length > 2 && arguments[2] !== undefined
        ? arguments[2]
        : undefined;

    _classCallCheck(this, Loader);

    this.client = client;
    this.environment = environment;
    this.previewMode = previewMode;
    this.entitiesRepo = new _EntitiesRepo['default']();
  }

  _createClass(Loader, [
    {
      key: 'loadSchema',
      value: function loadSchema() {
        var _this = this;

        return this.client
          .get('/site', {
            include: 'item_types,item_types.fields',
          })
          .then(function(site) {
            _this.entitiesRepo.destroyAllEntities();

            _this.siteId = site.data.id;

            _this.entitiesRepo.upsertEntities(site);
          });
      },
    },
    {
      key: 'loadSchemaWithinEnvironment',
      value: function loadSchemaWithinEnvironment() {
        var _this2 = this;

        return this.client
          .get('/site', {
            include: 'item_types,item_types.fields',
          })
          .then(function(site) {
            _this2.siteId = site.data.id;

            _this2.entitiesRepo.upsertEntities(site);
          });
      },
    },
    {
      key: 'load',
      value: function load() {
        var _this3 = this;

        return Promise.all([
          this.client.get('/site', {
            include: 'item_types,item_types.fields',
          }),
          this.client.items.all(
            {
              version: this.previewMode ? 'latest' : 'published',
            },
            {
              deserializeResponse: false,
              allPages: true,
            },
          ),
          this.client.uploads.all(
            {},
            {
              deserializeResponse: false,
              allPages: true,
            },
          ),
        ]).then(function(_ref) {
          var _ref2 = _slicedToArray(_ref, 3),
            site = _ref2[0],
            items = _ref2[1],
            uploads = _ref2[2];

          _this3.siteId = site.data.id;

          _this3.entitiesRepo.destroyAllEntities();

          _this3.entitiesRepo.upsertEntities(site, items, uploads);
        });
      },
    },
    {
      key: 'watch',
      value: (function() {
        var _watch = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee5(notifier) {
            var _this4 = this;

            var _yield$this$client$su,
              _yield$this$client$su2,
              watcher,
              disconnect,
              addEventListener,
              itemVersion,
              previewMode;

            return regeneratorRuntime.wrap(
              function _callee5$(_context5) {
                while (1) {
                  switch ((_context5.prev = _context5.next)) {
                    case 0:
                      if (this.siteId) {
                        _context5.next = 3;
                        break;
                      }

                      _context5.next = 3;
                      return this.load();

                    case 3:
                      _context5.next = 5;
                      return this.client.subscribeToChannel(
                        this.siteId,
                        this.environment,
                      );

                    case 5:
                      _yield$this$client$su = _context5.sent;
                      _yield$this$client$su2 = _slicedToArray(
                        _yield$this$client$su,
                        2,
                      );
                      watcher = _yield$this$client$su2[0];
                      disconnect = _yield$this$client$su2[1];

                      addEventListener = function addEventListener(
                        eventName,
                        entitiesRepoRefresher,
                      ) {
                        watcher.bind(eventName, function(data) {
                          notifier(entitiesRepoRefresher(data));
                        });
                      };

                      itemVersion = this.previewMode ? 'latest' : 'published';
                      previewMode = this.previewMode
                        ? 'preview_mode'
                        : 'published_mode';
                      addEventListener(
                        'site:upsert',
                        /*#__PURE__*/ _asyncToGenerator(
                          /*#__PURE__*/ regeneratorRuntime.mark(
                            function _callee() {
                              var _this4$entitiesRepo;

                              var payloads;
                              return regeneratorRuntime.wrap(function _callee$(
                                _context,
                              ) {
                                while (1) {
                                  switch ((_context.prev = _context.next)) {
                                    case 0:
                                      _context.next = 2;
                                      return Promise.all([
                                        _this4.client.get('/site', {
                                          include:
                                            'item_types,item_types.fields',
                                        }),
                                        _this4.client.items.all(
                                          {
                                            version: itemVersion,
                                          },
                                          {
                                            deserializeResponse: false,
                                            allPages: true,
                                          },
                                        ),
                                        _this4.client.uploads.all(
                                          {},
                                          {
                                            deserializeResponse: false,
                                            allPages: true,
                                          },
                                        ),
                                      ]);

                                    case 2:
                                      payloads = _context.sent;

                                      _this4.entitiesRepo.destroyAllEntities();

                                      (_this4$entitiesRepo =
                                        _this4.entitiesRepo).upsertEntities.apply(
                                        _this4$entitiesRepo,
                                        _toConsumableArray(payloads),
                                      );

                                    case 5:
                                    case 'end':
                                      return _context.stop();
                                  }
                                }
                              },
                              _callee);
                            },
                          ),
                        ),
                      );
                      addEventListener(
                        'item:'.concat(previewMode, ':upsert'),
                        /*#__PURE__*/ (function() {
                          var _ref5 = _asyncToGenerator(
                            /*#__PURE__*/ regeneratorRuntime.mark(
                              function _callee2(_ref4) {
                                var ids, payload;
                                return regeneratorRuntime.wrap(
                                  function _callee2$(_context2) {
                                    while (1) {
                                      switch (
                                        (_context2.prev = _context2.next)
                                      ) {
                                        case 0:
                                          ids = _ref4.ids;
                                          _context2.next = 3;
                                          return _this4.client.items.all(
                                            {
                                              'filter[ids]': ids.join(','),
                                              version: itemVersion,
                                            },
                                            {
                                              deserializeResponse: false,
                                              allPages: true,
                                            },
                                          );

                                        case 3:
                                          payload = _context2.sent;

                                          _this4.entitiesRepo.upsertEntities(
                                            payload,
                                          );

                                        case 5:
                                        case 'end':
                                          return _context2.stop();
                                      }
                                    }
                                  },
                                  _callee2,
                                );
                              },
                            ),
                          );

                          return function(_x2) {
                            return _ref5.apply(this, arguments);
                          };
                        })(),
                      );
                      addEventListener(
                        'item:'.concat(previewMode, ':destroy'),
                        function(_ref6) {
                          var ids = _ref6.ids;

                          _this4.entitiesRepo.destroyEntities('item', ids);
                        },
                      );
                      addEventListener(
                        'upload:upsert',
                        /*#__PURE__*/ (function() {
                          var _ref8 = _asyncToGenerator(
                            /*#__PURE__*/ regeneratorRuntime.mark(
                              function _callee3(_ref7) {
                                var ids, payload;
                                return regeneratorRuntime.wrap(
                                  function _callee3$(_context3) {
                                    while (1) {
                                      switch (
                                        (_context3.prev = _context3.next)
                                      ) {
                                        case 0:
                                          ids = _ref7.ids;
                                          _context3.next = 3;
                                          return _this4.client.uploads.all(
                                            {
                                              'filter[ids]': ids.join(','),
                                            },
                                            {
                                              deserializeResponse: false,
                                              allPages: true,
                                            },
                                          );

                                        case 3:
                                          payload = _context3.sent;

                                          _this4.entitiesRepo.upsertEntities(
                                            payload,
                                          );

                                        case 5:
                                        case 'end':
                                          return _context3.stop();
                                      }
                                    }
                                  },
                                  _callee3,
                                );
                              },
                            ),
                          );

                          return function(_x3) {
                            return _ref8.apply(this, arguments);
                          };
                        })(),
                      );
                      addEventListener('upload:destroy', function(_ref9) {
                        var ids = _ref9.ids;

                        _this4.entitiesRepo.destroyEntities('upload', ids);
                      });
                      addEventListener(
                        'item_type:upsert',
                        /*#__PURE__*/ (function() {
                          var _ref11 = _asyncToGenerator(
                            /*#__PURE__*/ regeneratorRuntime.mark(
                              function _callee4(_ref10) {
                                var ids,
                                  _iterator,
                                  _step,
                                  _this4$entitiesRepo2,
                                  id,
                                  payloads;

                                return regeneratorRuntime.wrap(
                                  function _callee4$(_context4) {
                                    while (1) {
                                      switch (
                                        (_context4.prev = _context4.next)
                                      ) {
                                        case 0:
                                          ids = _ref10.ids;
                                          _iterator = _createForOfIteratorHelper(
                                            ids,
                                          );
                                          _context4.prev = 2;

                                          _iterator.s();

                                        case 4:
                                          if ((_step = _iterator.n()).done) {
                                            _context4.next = 12;
                                            break;
                                          }

                                          id = _step.value;
                                          _context4.next = 8;
                                          return Promise.all([
                                            _this4.client.itemTypes.find(
                                              id,
                                              {},
                                              {
                                                deserializeResponse: false,
                                              },
                                            ),
                                            _this4.client.items.all(
                                              {
                                                'filter[type]': id,
                                                version: itemVersion,
                                              },
                                              {
                                                deserializeResponse: false,
                                                allPages: true,
                                              },
                                            ),
                                          ]);

                                        case 8:
                                          payloads = _context4.sent;

                                          (_this4$entitiesRepo2 =
                                            _this4.entitiesRepo).upsertEntities.apply(
                                            _this4$entitiesRepo2,
                                            _toConsumableArray(payloads),
                                          );

                                        case 10:
                                          _context4.next = 4;
                                          break;

                                        case 12:
                                          _context4.next = 17;
                                          break;

                                        case 14:
                                          _context4.prev = 14;
                                          _context4.t0 = _context4['catch'](2);

                                          _iterator.e(_context4.t0);

                                        case 17:
                                          _context4.prev = 17;

                                          _iterator.f();

                                          return _context4.finish(17);

                                        case 20:
                                        case 'end':
                                          return _context4.stop();
                                      }
                                    }
                                  },
                                  _callee4,
                                  null,
                                  [[2, 14, 17, 20]],
                                );
                              },
                            ),
                          );

                          return function(_x4) {
                            return _ref11.apply(this, arguments);
                          };
                        })(),
                      );
                      addEventListener('item_type:destroy', function(_ref12) {
                        var ids = _ref12.ids;
                        ids.forEach(function(id) {
                          _this4.entitiesRepo.destroyItemType(id);
                        });
                      });
                      return _context5.abrupt('return', disconnect);

                    case 20:
                    case 'end':
                      return _context5.stop();
                  }
                }
              },
              _callee5,
              this,
            );
          }),
        );

        function watch(_x) {
          return _watch.apply(this, arguments);
        }

        return watch;
      })(),
    },
  ]);

  return Loader;
})();

exports['default'] = Loader;
