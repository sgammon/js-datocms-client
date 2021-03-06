'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = fetchAllPages;

var _bottleneck = _interopRequireDefault(require('bottleneck'));

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

var MAX_CONCURRENT = 10;
var ITEMS_PER_PAGE = 500;

function fetchAllPages(_x, _x2, _x3) {
  return _fetchAllPages.apply(this, arguments);
}

function _fetchAllPages() {
  _fetchAllPages = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(
      client,
      endpoint,
      params,
    ) {
      var perPage,
        limiter,
        baseResponse,
        totalCount,
        promises,
        _loop,
        index,
        data,
        result,
        _args2 = arguments;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              perPage =
                _args2.length > 3 && _args2[3] !== undefined
                  ? _args2[3]
                  : ITEMS_PER_PAGE;
              limiter = new _bottleneck['default']({
                maxConcurrent: MAX_CONCURRENT,
              });
              _context2.next = 4;
              return client.get(
                endpoint,
                _objectSpread(
                  _objectSpread({}, params),
                  {},
                  {
                    'page[limit]': perPage,
                  },
                ),
              );

            case 4:
              baseResponse = _context2.sent;
              totalCount = baseResponse.meta.total_count;
              promises = [];

              _loop = function _loop(index) {
                promises.push(
                  limiter.schedule(
                    /*#__PURE__*/ _asyncToGenerator(
                      /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
                        var response;
                        return regeneratorRuntime.wrap(function _callee$(
                          _context,
                        ) {
                          while (1) {
                            switch ((_context.prev = _context.next)) {
                              case 0:
                                _context.next = 2;
                                return client.get(
                                  endpoint,
                                  _objectSpread(
                                    _objectSpread({}, params),
                                    {},
                                    {
                                      'page[offset]': index,
                                      'page[limit]': perPage,
                                    },
                                  ),
                                );

                              case 2:
                                response = _context.sent;
                                return _context.abrupt('return', response);

                              case 4:
                              case 'end':
                                return _context.stop();
                            }
                          }
                        },
                        _callee);
                      }),
                    ),
                  ),
                );
              };

              for (index = perPage; index < totalCount; index += perPage) {
                _loop(index);
              }

              _context2.next = 11;
              return Promise.all(promises);

            case 11:
              data = _context2.sent;
              result = data.reduce(function(response, results) {
                response.data = response.data.concat(results.data);
                return response;
              }, _objectSpread({}, baseResponse));
              return _context2.abrupt('return', result);

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2);
    }),
  );
  return _fetchAllPages.apply(this, arguments);
}
