'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = runPendingMigrations;

var _path = _interopRequireDefault(require('path'));

var _fs = _interopRequireDefault(require('fs'));

var _ora = _interopRequireDefault(require('ora'));

var _SiteClient = _interopRequireDefault(require('../site/SiteClient'));

var _upsertMigrationModel = _interopRequireDefault(
  require('./upsertMigrationModel'),
);

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

var MIGRATION_FILE_REGEXP = /^[0-9]+.*\.js$/;

function runPendingMigrations(_x) {
  return _runPendingMigrations.apply(this, arguments);
}

function _runPendingMigrations() {
  _runPendingMigrations = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(_ref) {
      var sourceEnvId,
        destinationEnvId,
        migrationModelApiKey,
        relativeMigrationsDir,
        inPlace,
        cmaBaseUrl,
        tokenByArg,
        migrationsDir,
        allMigrations,
        token,
        globalClient,
        allEnvironments,
        primaryEnv,
        sourceEnv,
        environmentId,
        forkSpinner,
        existingEnvironment,
        client,
        migrationModel,
        alreadyRunMigrations,
        migrationsToRun,
        _iterator,
        _step,
        migrationFile,
        migrationAbsolutePath,
        migration,
        migrationSpinner;

      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                (sourceEnvId = _ref.sourceEnvId),
                  (destinationEnvId = _ref.destinationEnvId),
                  (migrationModelApiKey = _ref.migrationModelApiKey),
                  (relativeMigrationsDir = _ref.relativeMigrationsDir),
                  (inPlace = _ref.inPlace),
                  (cmaBaseUrl = _ref.cmaBaseUrl),
                  (tokenByArg = _ref.token);
                migrationsDir = _path['default'].resolve(relativeMigrationsDir);

                if (_fs['default'].existsSync(migrationsDir)) {
                  _context.next = 4;
                  break;
                }

                throw new Error(
                  'Error: '.concat(
                    relativeMigrationsDir,
                    ' is not a directory!\n',
                  ),
                );

              case 4:
                allMigrations = _fs['default']
                  .readdirSync(migrationsDir)
                  .filter(function(file) {
                    return file.match(MIGRATION_FILE_REGEXP);
                  });
                token = tokenByArg || process.env.DATO_MANAGEMENT_API_TOKEN;
                globalClient = new _SiteClient['default'](
                  token,
                  {},
                  cmaBaseUrl,
                );
                _context.next = 9;
                return globalClient.environments.all();

              case 9:
                allEnvironments = _context.sent;
                primaryEnv = allEnvironments.find(function(env) {
                  return env.meta.primary;
                });

                if (!sourceEnvId) {
                  _context.next = 17;
                  break;
                }

                _context.next = 14;
                return globalClient.environments.find(sourceEnvId);

              case 14:
                _context.t0 = _context.sent;
                _context.next = 18;
                break;

              case 17:
                _context.t0 = primaryEnv;

              case 18:
                sourceEnv = _context.t0;
                environmentId = inPlace
                  ? sourceEnv.id
                  : destinationEnvId ||
                    ''.concat(sourceEnv.id, '-post-migrations');

                if (!inPlace) {
                  _context.next = 26;
                  break;
                }

                if (!(primaryEnv.id === environmentId)) {
                  _context.next = 23;
                  break;
                }

                throw new Error(
                  'Running migrations on primary environment is not allowed!',
                );

              case 23:
                process.stdout.write(
                  'Migrations will be run in sandbox env `'.concat(
                    environmentId,
                    '`\n',
                  ),
                );
                _context.next = 34;
                break;

              case 26:
                forkSpinner = (0, _ora['default'])(
                  'Creating a fork of `'
                    .concat(sourceEnv.id, '` called `')
                    .concat(environmentId, '`...'),
                ).start();
                existingEnvironment = allEnvironments.find(function(env) {
                  return env.id === environmentId;
                });

                if (!existingEnvironment) {
                  _context.next = 31;
                  break;
                }

                forkSpinner.fail();
                throw new Error(
                  'Environment '.concat(
                    environmentId,
                    ' already exists! If you want to run the migrations inside this existing environment you can add the --inPlace flag.',
                  ),
                );

              case 31:
                _context.next = 33;
                return globalClient.environments.fork(sourceEnv.id, {
                  id: environmentId,
                });

              case 33:
                forkSpinner.succeed();

              case 34:
                client = new _SiteClient['default'](
                  token,
                  {
                    environment: environmentId,
                  },
                  cmaBaseUrl,
                );
                _context.next = 37;
                return (0, _upsertMigrationModel['default'])(
                  client,
                  migrationModelApiKey,
                );

              case 37:
                migrationModel = _context.sent;
                _context.next = 40;
                return client.items.all(
                  {
                    filter: {
                      type: migrationModel.id,
                    },
                  },
                  {
                    allPages: true,
                  },
                );

              case 40:
                alreadyRunMigrations = _context.sent.map(function(m) {
                  return m.name;
                });
                migrationsToRun = allMigrations
                  .filter(function(file) {
                    return !alreadyRunMigrations.includes(file);
                  })
                  .sort();
                _iterator = _createForOfIteratorHelper(migrationsToRun);
                _context.prev = 43;

                _iterator.s();

              case 45:
                if ((_step = _iterator.n()).done) {
                  _context.next = 57;
                  break;
                }

                migrationFile = _step.value;
                migrationAbsolutePath = _path['default'].join(
                  migrationsDir,
                  migrationFile,
                ); // eslint-disable-next-line global-require, import/no-dynamic-require

                migration = require(migrationAbsolutePath);
                migrationSpinner = (0, _ora['default'])(
                  'Running '.concat(migrationFile, '...'),
                ).start();
                _context.next = 52;
                return migration(client);

              case 52:
                migrationSpinner.succeed();
                _context.next = 55;
                return client.items.create({
                  itemType: migrationModel.id,
                  name: migrationFile,
                });

              case 55:
                _context.next = 45;
                break;

              case 57:
                _context.next = 62;
                break;

              case 59:
                _context.prev = 59;
                _context.t1 = _context['catch'](43);

                _iterator.e(_context.t1);

              case 62:
                _context.prev = 62;

                _iterator.f();

                return _context.finish(62);

              case 65:
                process.stdout.write('Done!\n');

              case 66:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [[43, 59, 62, 65]],
      );
    }),
  );
  return _runPendingMigrations.apply(this, arguments);
}
