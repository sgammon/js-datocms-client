'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _qs = _interopRequireDefault(require('qs'));

var _ApiException = _interopRequireDefault(require('./ApiException'));

var _package = _interopRequireDefault(require('../package.json'));

var _fetch = _interopRequireDefault(require('./utils/fetch'));

var _wait = _interopRequireDefault(require('./utils/wait'));

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

var undefinedToNull = function undefinedToNull(k, v) {
  return v === undefined ? null : v;
};

function queryString(query) {
  return _qs['default'].stringify(query, {
    arrayFormat: 'brackets',
  });
}

var Client = /*#__PURE__*/ (function() {
  function Client(token, extraHeaders, baseUrl) {
    _classCallCheck(this, Client);

    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.token = token;
    this.extraHeaders = extraHeaders;
  }

  _createClass(Client, [
    {
      key: 'get',
      value: function get() {
        return this.request(this.buildGetRequest.apply(this, arguments));
      },
    },
    {
      key: 'buildGetRequest',
      value: function buildGetRequest(url) {
        var params =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
        var options =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : {};
        return this.buildFetchRequest('GET', url, params, undefined, options);
      },
    },
    {
      key: 'delete',
      value: function _delete() {
        return this.request(this.buildDeleteRequest.apply(this, arguments));
      },
    },
    {
      key: 'buildDeleteRequest',
      value: function buildDeleteRequest(url) {
        var params =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
        var options =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : {};
        return this.buildFetchRequest(
          'DELETE',
          url,
          params,
          undefined,
          options,
        );
      },
    },
    {
      key: 'put',
      value: function put() {
        return this.request(this.buildPutRequest.apply(this, arguments));
      },
    },
    {
      key: 'buildPutRequest',
      value: function buildPutRequest(url, body) {
        var params =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : {};
        var options =
          arguments.length > 3 && arguments[3] !== undefined
            ? arguments[3]
            : {};
        return this.buildFetchRequest('PUT', url, params, body, options);
      },
    },
    {
      key: 'post',
      value: function post() {
        return this.request(this.buildPostRequest.apply(this, arguments));
      },
    },
    {
      key: 'buildPostRequest',
      value: function buildPostRequest(url, body) {
        var params =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : {};
        var options =
          arguments.length > 3 && arguments[3] !== undefined
            ? arguments[3]
            : {};
        return this.buildFetchRequest('POST', url, params, body, options);
      },
    },
    {
      key: 'defaultHeaders',
      value: function defaultHeaders() {
        return {
          'content-type': 'application/json',
          accept: 'application/json',
          authorization: 'Bearer '.concat(this.token),
          'user-agent': 'js-client v'.concat(_package['default'].version),
          'X-Api-Version': '3',
        };
      },
    },
    {
      key: 'buildUrl',
      value: function buildUrl(path) {
        var params =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
        var query = Object.keys(params).length
          ? '?'.concat(queryString(params))
          : '';
        return ''
          .concat(this.baseUrl)
          .concat(path)
          .concat(query);
      },
    },
    {
      key: 'buildFetchRequest',
      value: function buildFetchRequest(
        method,
        url,
        params,
        body,
        extraOptions,
      ) {
        var options = _objectSpread(
          {
            method: method,
          },
          extraOptions || {},
        );

        if (body) {
          options.body = JSON.stringify(body, undefinedToNull);
        }

        var headers = _objectSpread(
          _objectSpread(
            _objectSpread({}, this.defaultHeaders()),
            this.extraHeaders,
          ),
          options.headers,
        );

        Object.keys(headers).forEach(function(key) {
          return !headers[key] && delete headers[key];
        });
        return {
          url: this.buildUrl(url, params),
          options: _objectSpread(
            _objectSpread({}, options),
            {},
            {
              headers: headers,
            },
          ),
        };
      },
    },
    {
      key: 'request',
      value: function request(fetchRequest) {
        var _this = this;

        var preCallStack =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : new Error().stack;
        var retryCount =
          arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        return (0, _fetch['default'])(fetchRequest.url, fetchRequest.options)
          .then(function(res) {
            if (res.status === 429) {
              var waitTime = parseInt(
                res.headers.get('X-RateLimit-Reset') || '10',
                10,
              );
              console.log(
                'Rate limit exceeded, waiting '.concat(
                  waitTime * retryCount,
                  ' seconds...',
                ),
              );
              return (0, _wait['default'])(waitTime * retryCount * 1000).then(
                function() {
                  return _this.request(
                    fetchRequest,
                    preCallStack,
                    retryCount + 1,
                  );
                },
              );
            }

            return (res.status !== 204 ? res.json() : Promise.resolve(null))
              .then(function(body) {
                if (res.status >= 200 && res.status < 300) {
                  return Promise.resolve(body);
                }

                return Promise.reject(
                  new _ApiException['default'](
                    res,
                    body,
                    _objectSpread(
                      _objectSpread({}, fetchRequest),
                      {},
                      {
                        preCallStack: preCallStack,
                      },
                    ),
                  ),
                );
              })
              ['catch'](function(error) {
                if (
                  error &&
                  error.body &&
                  error.body.data &&
                  error.body.data.some(function(e) {
                    return (
                      e.attributes.code === 'BATCH_DATA_VALIDATION_IN_PROGRESS'
                    );
                  })
                ) {
                  console.log(
                    'Data validation in progress, waiting '.concat(
                      retryCount,
                      ' seconds...',
                    ),
                  );
                  return (0, _wait['default'])(retryCount * 1000).then(
                    function() {
                      return _this.request(
                        fetchRequest,
                        preCallStack,
                        retryCount + 1,
                      );
                    },
                  );
                }

                throw error;
              });
          })
          ['catch'](function(error) {
            if (error.code && error.code.includes('ETIMEDOUT')) {
              console.log(
                'Error "'
                  .concat(error.code, '", waiting ')
                  .concat(retryCount, ' seconds to retry...'),
              );
              return (0, _wait['default'])(retryCount * 1000).then(function() {
                return _this.request(
                  fetchRequest,
                  preCallStack,
                  retryCount + 1,
                );
              });
            }

            throw error;
          });
      },
    },
  ]);

  return Client;
})();

exports['default'] = Client;
