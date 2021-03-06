'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = _default;

var _readline = _interopRequireDefault(require('readline'));

var _fs = _interopRequireDefault(require('fs'));

var _denodeify = _interopRequireDefault(require('denodeify'));

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

var fsAppendFile = (0, _denodeify['default'])(_fs['default'].appendFile);

function _default() {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
      var token;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return new Promise(function(resolve, reject) {
                process.stdout.write(
                  'Site token is not specified! Please paste your DatoCMS site read-only API token.\n',
                );

                var rl = _readline['default'].createInterface({
                  input: process.stdin,
                  output: process.stdout,
                });

                rl.on('SIGINT', function() {
                  reject(new Error('Received SIGINT'));
                });
                rl.on('SIGCONT', function() {
                  rl.prompt();
                });
                rl.question('> ', function(input) {
                  rl.close();

                  if (input) {
                    resolve(input);
                    return;
                  }

                  reject(new Error('Missing token'));
                });
              });

            case 2:
              token = _context.sent;
              _context.next = 5;
              return fsAppendFile('.env', 'DATO_API_TOKEN='.concat(token));

            case 5:
              process.stdout.write('\nToken added to .env file.\n\n');

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    }),
  );
  return _ref.apply(this, arguments);
}
