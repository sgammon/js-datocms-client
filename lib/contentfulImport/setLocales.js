'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _ora = _interopRequireDefault(require('ora'));

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

var _default = /*#__PURE__*/ (function() {
  var _ref2 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(_ref) {
      var datoClient, contentfulData, spinner, site, locales;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              (datoClient = _ref.datoClient),
                (contentfulData = _ref.contentfulData);
              spinner = (0, _ora['default'])('Setting locales');
              _context.next = 4;
              return datoClient.site.find();

            case 4:
              site = _context.sent;
              locales = contentfulData.locales.map(function(locale) {
                return locale;
              });
              _context.next = 8;
              return datoClient.site.update({
                id: site.id,
                locales: locales,
              });

            case 8:
              spinner.succeed();

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    }),
  );

  return function(_x) {
    return _ref2.apply(this, arguments);
  };
})();

exports['default'] = _default;
