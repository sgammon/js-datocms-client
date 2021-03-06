'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = toggleMaintenanceMode;

var _SiteClient = _interopRequireDefault(require('../site/SiteClient'));

var _ApiException = _interopRequireDefault(require('../ApiException'));

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

function toggleMaintenanceMode(_x) {
  return _toggleMaintenanceMode.apply(this, arguments);
}

function _toggleMaintenanceMode() {
  _toggleMaintenanceMode = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(_ref) {
      var activate,
        tokenByArg,
        force,
        cmaBaseUrl,
        token,
        client,
        _yield$client$mainten,
        active,
        params,
        error;

      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                (activate = _ref.activate),
                  (tokenByArg = _ref.token),
                  (force = _ref.force),
                  (cmaBaseUrl = _ref.cmaBaseUrl);
                token = tokenByArg || process.env.DATO_MANAGEMENT_API_TOKEN;
                client = new _SiteClient['default'](token, {}, cmaBaseUrl);
                _context.next = 5;
                return client.maintenanceMode.find();

              case 5:
                _yield$client$mainten = _context.sent;
                active = _yield$client$mainten.active;

                if (!activate) {
                  _context.next = 27;
                  break;
                }

                if (!active) {
                  _context.next = 11;
                  break;
                }

                process.stdout.write('Maintenance mode is already active!\n');
                return _context.abrupt('return');

              case 11:
                params = force
                  ? {
                      force: true,
                    }
                  : {};
                _context.prev = 12;
                _context.next = 15;
                return client.maintenanceMode.activate(params);

              case 15:
                _context.next = 24;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context['catch'](12);

                if (!(_context.t0 instanceof _ApiException['default'])) {
                  _context.next = 23;
                  break;
                }

                error = _context.t0.errorWithCode('ACTIVE_EDITING_SESSIONS');

                if (!error) {
                  _context.next = 23;
                  break;
                }

                throw new Error(
                  'Cannot activate maintenance mode as some users are currently editing records!\nTo proceed anyway, please use the --force flag',
                );

              case 23:
                throw _context.t0;

              case 24:
                process.stdout.write(
                  'Maintenance mode activated: the primary environment is now read-only\n',
                );
                _context.next = 33;
                break;

              case 27:
                if (active) {
                  _context.next = 30;
                  break;
                }

                process.stdout.write(
                  'Maintenance mode is already deactivated!\n',
                );
                return _context.abrupt('return');

              case 30:
                _context.next = 32;
                return client.maintenanceMode.deactivate();

              case 32:
                process.stdout.write('Maintenance mode deactivated\n');

              case 33:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [[12, 17]],
      );
    }),
  );
  return _toggleMaintenanceMode.apply(this, arguments);
}
