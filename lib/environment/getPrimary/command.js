'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = command;

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
      var tokenByArg, cmaBaseUrl, token, client, allEnvs, primaryEnv;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              (tokenByArg = _ref.token), (cmaBaseUrl = _ref.cmaBaseUrl);
              token = tokenByArg || process.env.DATO_MANAGEMENT_API_TOKEN;
              client = new _SiteClient['default'](token, {}, cmaBaseUrl);
              _context.next = 5;
              return client.environments.all();

            case 5:
              allEnvs = _context.sent;
              primaryEnv = allEnvs.find(function(_ref2) {
                var primary = _ref2.meta.primary;
                return primary;
              });
              process.stdout.write(primaryEnv.id);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    }),
  );
  return _command.apply(this, arguments);
}
