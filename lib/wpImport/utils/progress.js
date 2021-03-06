'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.spin = spin;
exports.progress = progress;

var _clui = require('clui');

var _ora = _interopRequireDefault(require('ora'));

var _truncate = _interopRequireDefault(require('truncate'));

var _safe = _interopRequireDefault(require('colors/safe'));

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

function spin(_x, _x2) {
  return _spin.apply(this, arguments);
}

function _spin() {
  _spin = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(label, promise) {
      var spinner, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              spinner = (0, _ora['default'])(label).start();
              _context2.next = 3;
              return promise;

            case 3:
              result = _context2.sent;
              spinner.succeed();
              return _context2.abrupt('return', result);

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2);
    }),
  );
  return _spin.apply(this, arguments);
}

function progress(label, max) {
  if (max === 0) {
    return function() {};
  }

  var spinner = (0, _ora['default'])(label).start();
  var prog = new _clui.Progress(30);
  var i = 0;

  var tick = /*#__PURE__*/ (function() {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(info, promise) {
        var newInfo, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                newInfo =
                  info.length > 0
                    ? _safe['default'].grey(
                        ' \u2014 '.concat((0, _truncate['default'])(info, 25)),
                      )
                    : info;
                spinner.text = ''
                  .concat(label, ' (')
                  .concat(i, '/')
                  .concat(max, ') ')
                  .concat(prog.update(i, max), ' ')
                  .concat(newInfo);
                _context.next = 4;
                return promise;

              case 4:
                result = _context.sent;
                i += 1;
                spinner.text = ''
                  .concat(label, ' (')
                  .concat(i, '/')
                  .concat(max, ') ')
                  .concat(prog.update(i, max), ' ')
                  .concat(newInfo);

                if (i === max) {
                  spinner.text = ''
                    .concat(label, ' (')
                    .concat(i, '/')
                    .concat(max, ') ')
                    .concat(prog.update(i, max));
                  spinner.succeed();
                }

                return _context.abrupt('return', result);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee);
      }),
    );

    return function tick(_x3, _x4) {
      return _ref.apply(this, arguments);
    };
  })();

  return tick;
}
