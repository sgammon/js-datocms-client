'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = generateClient;

var _jsonSchemaRefParser = _interopRequireDefault(
  require('json-schema-ref-parser'),
);

var _pluralize = require('pluralize');

var _humps = require('humps');

var _fetch = _interopRequireDefault(require('./fetch'));

var _deserializeJsonApi = _interopRequireDefault(
  require('./deserializeJsonApi'),
);

var _serializeJsonApi = _interopRequireDefault(require('./serializeJsonApi'));

var _Client = _interopRequireDefault(require('../Client'));

var _fetchAllPages = _interopRequireDefault(require('./fetchAllPages'));

var _ApiException = _interopRequireDefault(require('../ApiException'));

var _InvalidApiRequestException = _interopRequireDefault(
  require('../InvalidApiRequestException'),
);

var _wait = _interopRequireDefault(require('./wait'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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

var identityRegexp = /\{\(.*?definitions%2F(.*?)%2Fdefinitions%2Fidentity\)}/g;
var pluralResources = ['ssoSettings', 'whiteLabelSettings'];

var getProps = function getProps(obj) {
  return Object.getOwnPropertyNames(obj)
    .concat(
      Object.getPrototypeOf(obj) !== Object.prototype &&
        Object.getOwnPropertyNames(Object.getPrototypeOf(obj)),
    )
    .filter(function(p) {
      return p !== 'constructor';
    });
};

var toMap = function toMap(keys) {
  return keys.reduce(function(acc, prop) {
    return Object.assign(acc, _defineProperty({}, prop, true));
  }, {});
};

var findLinkFor = function findLinkFor(schema, namespace, apiCall) {
  var sub = schema.properties[namespace];

  if (!sub) {
    throw new TypeError(''.concat(namespace, ' is not a valid namespace'));
  }

  var methodNames = {
    instances: 'all',
    self: 'find',
  };
  var link = sub.links.find(function(l) {
    return (methodNames[l.rel] || (0, _humps.camelize)(l.rel)) === apiCall;
  });

  if (!link) {
    throw new TypeError(
      ''.concat(namespace, '.').concat(apiCall, ' is not a valid API method'),
    );
  }

  return link;
};

function generateClient(subdomain, cache) {
  var extraMethods =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return function Client(token) {
    var extraHeaders =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var baseUrl = arguments.length > 2 ? arguments[2] : undefined;
    var schemaPromise;

    var headers = _objectSpread({}, extraHeaders);

    if (extraHeaders && extraHeaders.environment) {
      headers['X-Environment'] = extraHeaders.environment;
      delete headers.environment;
    }

    var rawClient = new _Client['default'](
      token,
      headers,
      baseUrl || 'https://'.concat(subdomain, '.datocms.com'),
    );
    var extraProps = getProps(extraMethods);
    var rawClientProps = getProps(rawClient);
    Object.assign(
      cache,
      {
        rawClient: true,
      },
      toMap(extraProps),
      toMap(rawClientProps),
    );
    var client = new Proxy(cache, {
      get: function get(obj1, namespace) {
        var preCallStack = new Error().stack;

        if (namespace === 'rawClient') {
          return rawClient;
        }

        if (rawClientProps.includes(namespace)) {
          return typeof rawClient[namespace] === 'function'
            ? rawClient[namespace].bind(rawClient)
            : rawClient[namespace];
        }

        if (extraProps.includes(namespace)) {
          return typeof extraMethods[namespace] === 'function'
            ? extraMethods[namespace].bind(client, client)
            : extraMethods[namespace];
        }

        return new Proxy(cache[namespace] || {}, {
          get: function get(obj2, apiCall) {
            return function call() {
              for (
                var _len = arguments.length, args = new Array(_len), _key = 0;
                _key < _len;
                _key++
              ) {
                args[_key] = arguments[_key];
              }

              if (!schemaPromise) {
                schemaPromise = (0, _fetch['default'])(
                  'https://'
                    .concat(subdomain, '.datocms.com/docs/')
                    .concat(subdomain, '-hyperschema.json'),
                )
                  .then(function(res) {
                    return res.json();
                  })
                  .then(function(schema) {
                    return _jsonSchemaRefParser['default'].dereference(schema);
                  });
              }

              return schemaPromise.then(
                /*#__PURE__*/ (function() {
                  var _ref = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(
                      schema,
                    ) {
                      var singularized,
                        resourceName,
                        link,
                        lastUrlId,
                        url,
                        body,
                        queryString,
                        options,
                        deserializeResponse,
                        deserialize,
                        serializeRequest,
                        _fetchRequest,
                        _fetchRequest2,
                        _fetchRequest3,
                        allPages,
                        perPage,
                        request,
                        fetchRequest;

                      return regeneratorRuntime.wrap(
                        function _callee2$(_context2) {
                          while (1) {
                            switch ((_context2.prev = _context2.next)) {
                              case 0:
                                singularized = pluralResources.includes(
                                  namespace,
                                )
                                  ? namespace
                                  : (0, _pluralize.singular)(namespace);
                                resourceName = (0, _humps.decamelize)(
                                  singularized,
                                );
                                link = findLinkFor(
                                  schema,
                                  resourceName,
                                  apiCall,
                                );
                                url = link.href.replace(
                                  identityRegexp,
                                  function() {
                                    lastUrlId = args.shift();
                                    return lastUrlId;
                                  },
                                );
                                body = {};

                                if (
                                  link.schema &&
                                  (link.method === 'PUT' ||
                                    link.method === 'POST')
                                ) {
                                  body = args.shift() || {};
                                }

                                queryString = args.shift() || {};
                                options = args.shift() || {};
                                deserializeResponse = Object.prototype.hasOwnProperty.call(
                                  options,
                                  'deserializeResponse',
                                )
                                  ? options.deserializeResponse
                                  : true;

                                deserialize = /*#__PURE__*/ (function() {
                                  var _ref2 = _asyncToGenerator(
                                    /*#__PURE__*/ regeneratorRuntime.mark(
                                      function _callee(fetchRequest, response) {
                                        var jobResult, retryCount;
                                        return regeneratorRuntime.wrap(
                                          function _callee$(_context) {
                                            while (1) {
                                              switch (
                                                (_context.prev = _context.next)
                                              ) {
                                                case 0:
                                                  if (
                                                    !(
                                                      response &&
                                                      response.data.type ===
                                                        'job'
                                                    )
                                                  ) {
                                                    _context.next = 19;
                                                    break;
                                                  }

                                                  retryCount = 0;

                                                case 2:
                                                  _context.prev = 2;
                                                  retryCount += 1;
                                                  _context.next = 6;
                                                  return (0, _wait['default'])(
                                                    retryCount * 1000,
                                                  );

                                                case 6:
                                                  _context.next = 8;
                                                  return client.jobResult.find(
                                                    response.data.id,
                                                    {},
                                                    {
                                                      deserializeResponse: false,
                                                    },
                                                  );

                                                case 8:
                                                  jobResult =
                                                    _context.sent.data;
                                                  _context.next = 15;
                                                  break;

                                                case 11:
                                                  _context.prev = 11;
                                                  _context.t0 = _context[
                                                    'catch'
                                                  ](2);

                                                  if (
                                                    !(
                                                      !(
                                                        _context.t0 instanceof
                                                        _ApiException['default']
                                                      ) ||
                                                      _context.t0.statusCode !==
                                                        404
                                                    )
                                                  ) {
                                                    _context.next = 15;
                                                    break;
                                                  }

                                                  throw _context.t0;

                                                case 15:
                                                  if (!jobResult) {
                                                    _context.next = 2;
                                                    break;
                                                  }

                                                case 16:
                                                  if (
                                                    !(
                                                      jobResult.attributes
                                                        .status < 200 ||
                                                      jobResult.attributes
                                                        .status >= 300
                                                    )
                                                  ) {
                                                    _context.next = 18;
                                                    break;
                                                  }

                                                  throw new _ApiException[
                                                    'default'
                                                  ](
                                                    {
                                                      status:
                                                        jobResult.attributes
                                                          .status,
                                                      statusText:
                                                        jobResult.attributes
                                                          .statusText,
                                                    },
                                                    jobResult.attributes.payload,
                                                    _objectSpread(
                                                      _objectSpread(
                                                        {},
                                                        fetchRequest,
                                                      ),
                                                      {},
                                                      {
                                                        preCallStack: preCallStack,
                                                      },
                                                    ),
                                                  );

                                                case 18:
                                                  return _context.abrupt(
                                                    'return',
                                                    deserializeResponse
                                                      ? (0,
                                                        _deserializeJsonApi[
                                                          'default'
                                                        ])(
                                                          resourceName,
                                                          link.jobSchema,
                                                          jobResult.attributes
                                                            .payload,
                                                        )
                                                      : jobResult.attributes
                                                          .payload,
                                                  );

                                                case 19:
                                                  return _context.abrupt(
                                                    'return',
                                                    deserializeResponse
                                                      ? (0,
                                                        _deserializeJsonApi[
                                                          'default'
                                                        ])(
                                                          resourceName,
                                                          link.targetSchema,
                                                          response,
                                                        )
                                                      : response,
                                                  );

                                                case 20:
                                                case 'end':
                                                  return _context.stop();
                                              }
                                            }
                                          },
                                          _callee,
                                          null,
                                          [[2, 11]],
                                        );
                                      },
                                    ),
                                  );

                                  return function deserialize(_x2, _x3) {
                                    return _ref2.apply(this, arguments);
                                  };
                                })();

                                serializeRequest = Object.prototype.hasOwnProperty.call(
                                  options,
                                  'serializeRequest',
                                )
                                  ? options.serializeRequest
                                  : true;

                                if (
                                  !(
                                    link.schema &&
                                    (link.method === 'PUT' ||
                                      link.method === 'POST') &&
                                    serializeRequest
                                  )
                                ) {
                                  _context2.next = 19;
                                  break;
                                }

                                _context2.prev = 12;
                                body = (0, _serializeJsonApi['default'])(
                                  body,
                                  link,
                                  link.method === 'PUT' && lastUrlId,
                                );
                                _context2.next = 19;
                                break;

                              case 16:
                                _context2.prev = 16;
                                _context2.t0 = _context2['catch'](12);
                                throw new _InvalidApiRequestException[
                                  'default'
                                ](_context2.t0.message, preCallStack);

                              case 19:
                                if (!(link.method === 'POST')) {
                                  _context2.next = 22;
                                  break;
                                }

                                _fetchRequest = rawClient.buildPostRequest(
                                  url,
                                  body,
                                  queryString,
                                );
                                return _context2.abrupt(
                                  'return',
                                  rawClient
                                    .request(_fetchRequest, preCallStack)
                                    .then(function(response) {
                                      return deserialize(
                                        _fetchRequest,
                                        response,
                                      );
                                    }),
                                );

                              case 22:
                                if (!(link.method === 'PUT')) {
                                  _context2.next = 25;
                                  break;
                                }

                                _fetchRequest2 = rawClient.buildPutRequest(
                                  url,
                                  body,
                                  queryString,
                                );
                                return _context2.abrupt(
                                  'return',
                                  rawClient
                                    .request(_fetchRequest2, preCallStack)
                                    .then(function(response) {
                                      return deserialize(
                                        _fetchRequest2,
                                        response,
                                      );
                                    }),
                                );

                              case 25:
                                if (!(link.method === 'DELETE')) {
                                  _context2.next = 28;
                                  break;
                                }

                                _fetchRequest3 = rawClient.buildDeleteRequest(
                                  url,
                                  queryString,
                                );
                                return _context2.abrupt(
                                  'return',
                                  rawClient
                                    .request(_fetchRequest3, preCallStack)
                                    .then(function(response) {
                                      return deserialize(
                                        _fetchRequest3,
                                        response,
                                      );
                                    }),
                                );

                              case 28:
                                allPages = Object.prototype.hasOwnProperty.call(
                                  options,
                                  'allPages',
                                )
                                  ? options.allPages
                                  : false;

                                if (!allPages) {
                                  _context2.next = 33;
                                  break;
                                }

                                perPage =
                                  allPages === true ? undefined : allPages;
                                request = (0, _fetchAllPages['default'])(
                                  rawClient,
                                  url,
                                  queryString,
                                  perPage,
                                );
                                return _context2.abrupt(
                                  'return',
                                  request.then(function(response) {
                                    return deserialize(null, response);
                                  }),
                                );

                              case 33:
                                fetchRequest = rawClient.buildGetRequest(
                                  url,
                                  queryString,
                                );
                                return _context2.abrupt(
                                  'return',
                                  rawClient
                                    .request(fetchRequest, preCallStack)
                                    .then(function(response) {
                                      return deserialize(
                                        fetchRequest,
                                        response,
                                      );
                                    }),
                                );

                              case 35:
                              case 'end':
                                return _context2.stop();
                            }
                          }
                        },
                        _callee2,
                        null,
                        [[12, 16]],
                      );
                    }),
                  );

                  return function(_x) {
                    return _ref.apply(this, arguments);
                  };
                })(),
              );
            };
          },
        });
      },
    });
    return client;
  };
}
