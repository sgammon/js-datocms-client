'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = command;

var _ora = _interopRequireDefault(require('ora'));

var _SiteClient = _interopRequireDefault(require('../../site/SiteClient'));

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

function command(_x) {
  return _command.apply(this, arguments);
}

function _command() {
  _command = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(_ref) {
      var environmentId, tokenByArg, cmaBaseUrl, spinner, token, client;
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                (environmentId = _ref.environmentId),
                  (tokenByArg = _ref.token),
                  (cmaBaseUrl = _ref.cmaBaseUrl);
                spinner = (0, _ora['default'])(
                  'Destroying environment `'.concat(environmentId, '`...\n'),
                ).start();
                token = tokenByArg || process.env.DATO_MANAGEMENT_API_TOKEN;
                client = new _SiteClient['default'](token, {}, cmaBaseUrl);
                _context.prev = 4;
                _context.next = 7;
                return client.environments.destroy(environmentId);

              case 7:
                spinner.succeed(
                  'Destroyed environment: `'.concat(environmentId, '`'),
                );
                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context['catch'](4);
                spinner.fail();
                throw _context.t0;

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [[4, 10]],
      );
    }),
  );
  return _command.apply(this, arguments);
}
