'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = _default;

var _path = _interopRequireDefault(require('path'));

var _fs = _interopRequireDefault(require('fs'));

var _chokidar = _interopRequireDefault(require('chokidar'));

var _ora = _interopRequireDefault(require('ora'));

var _SiteClient = _interopRequireDefault(require('../site/SiteClient'));

var _detectSsg = _interopRequireDefault(require('./detectSsg'));

var _dump = _interopRequireDefault(require('./dump'));

var _requireToken = _interopRequireDefault(require('./requireToken'));

var _Loader = _interopRequireDefault(require('../local/Loader'));

var _ItemsRepo = _interopRequireDefault(require('../local/ItemsRepo'));

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

function _default(_x) {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(options) {
      var configFile,
        environment,
        tokenOption,
        watch,
        quiet,
        previewMode,
        cmaBaseUrl,
        token,
        headers,
        client,
        loader,
        unwatch;
      return regeneratorRuntime.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                configFile = _path['default'].resolve(
                  options['--config'] || 'dato.config.js',
                );
                environment = options['--environment'];
                tokenOption = options['--token'] || process.env.DATO_API_TOKEN;
                watch = options['--watch'];
                quiet = options['--quiet'];
                previewMode = options['--preview'];
                cmaBaseUrl = options['--cmaBaseUrl'];
                _context2.t0 = tokenOption;

                if (_context2.t0) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 11;
                return (0, _requireToken['default'])();

              case 11:
                _context2.t0 = _context2.sent;

              case 12:
                token = _context2.t0;
                _context2.prev = 13;

                _fs['default'].accessSync(configFile);

                _context2.next = 20;
                break;

              case 17:
                _context2.prev = 17;
                _context2.t1 = _context2['catch'](13);
                throw new Error(
                  'Missing config file '.concat(configFile, '\n'),
                );

              case 20:
                headers = {
                  'X-Reason': 'dump',
                  'X-SSG': (0, _detectSsg['default'])(process.cwd()),
                };

                if (environment) {
                  headers['X-Environment'] = environment;
                }

                client = new _SiteClient['default'](token, headers, cmaBaseUrl);
                loader = new _Loader['default'](
                  client,
                  previewMode,
                  environment,
                );
                process.stdout.write('Fetching content from DatoCMS');
                _context2.next = 27;
                return loader.load();

              case 27:
                process.stdout.write('Done');
                _context2.next = 30;
                return (0, _dump['default'])(
                  configFile,
                  new _ItemsRepo['default'](loader.entitiesRepo),
                  quiet,
                );

              case 30:
                if (watch) {
                  unwatch = loader.watch(
                    /*#__PURE__*/ (function() {
                      var _ref2 = _asyncToGenerator(
                        /*#__PURE__*/ regeneratorRuntime.mark(function _callee(
                          promise,
                        ) {
                          var watchSpinner;
                          return regeneratorRuntime.wrap(function _callee$(
                            _context,
                          ) {
                            while (1) {
                              switch ((_context.prev = _context.next)) {
                                case 0:
                                  watchSpinner = (0, _ora['default'])(
                                    'Detected change in content, loading new data',
                                  ).start();
                                  _context.next = 3;
                                  return promise;

                                case 3:
                                  watchSpinner.succeed();
                                  return _context.abrupt(
                                    'return',
                                    (0, _dump['default'])(
                                      configFile,
                                      new _ItemsRepo['default'](
                                        loader.entitiesRepo,
                                      ),
                                      quiet,
                                    ),
                                  );

                                case 5:
                                case 'end':
                                  return _context.stop();
                              }
                            }
                          },
                          _callee);
                        }),
                      );

                      return function(_x2) {
                        return _ref2.apply(this, arguments);
                      };
                    })(),
                  );
                  process.on('SIGINT', function() {
                    unwatch();
                    process.exit();
                  });

                  _chokidar['default']
                    .watch(configFile)
                    .on('change', function() {
                      process.stdout.write('Detected change to config file!');
                      return (0,
                      _dump['default'])(configFile, loader.itemsRepo, quiet);
                    });
                }

              case 31:
              case 'end':
                return _context2.stop();
            }
          }
        },
        _callee2,
        null,
        [[13, 17]],
      );
    }),
  );
  return _ref.apply(this, arguments);
}
