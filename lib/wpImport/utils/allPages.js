'use strict';

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

/* eslint-disable */
var _require = require('../utils/progress'),
  spin = _require.spin,
  progress = _require.progress;

var allPages = /*#__PURE__*/ (function() {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(
      label,
      requestPromise,
    ) {
      var tick,
        page,
        response,
        nextPage,
        _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              tick =
                _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
              page = _args.length > 3 && _args[3] !== undefined ? _args[3] : 1;
              _context.next = 4;
              return tick
                ? tick('', requestPromise)
                : spin(label, requestPromise);

            case 4:
              response = _context.sent;

              if (!(!response._paging || response._paging.totalPages <= page)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt('return', response);

            case 7:
              nextPage = response._paging.next.page(page + 1);
              _context.t0 = response;
              _context.next = 11;
              return allPages(
                label,
                nextPage,
                tick || progress(label, response._paging.totalPages - 1),
                page + 1,
              );

            case 11:
              _context.t1 = _context.sent;
              return _context.abrupt(
                'return',
                _context.t0.concat.call(_context.t0, _context.t1),
              );

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    }),
  );

  return function allPages(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

module.exports = allPages;
