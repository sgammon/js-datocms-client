'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _contentfulManagement = require('contentful-management');

var _ora = _interopRequireDefault(require('ora'));

var _SiteClient = _interopRequireDefault(require('../site/SiteClient'));

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
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(
      contentfulToken,
      contentfulSpaceId,
      datoCmsToken,
      datoCmsEnvironment,
      datoCmsCmaBaseUrl,
    ) {
      var spinner, contentfulClient, dato, contentful;
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                spinner = (0, _ora['default'])(
                  'Configuring DatoCMS/Contentful clients',
                ).start();
                _context.prev = 1;
                contentfulClient = (0, _contentfulManagement.createClient)({
                  accessToken: contentfulToken,
                });
                dato = new _SiteClient['default'](
                  datoCmsToken,
                  {
                    environment: datoCmsEnvironment,
                  },
                  datoCmsCmaBaseUrl,
                );
                _context.next = 6;
                return contentfulClient.getSpace(contentfulSpaceId);

              case 6:
                contentful = _context.sent;
                spinner.succeed();
                return _context.abrupt('return', {
                  dato: dato,
                  contentful: contentful,
                });

              case 11:
                _context.prev = 11;
                _context.t0 = _context['catch'](1);
                spinner.fail();
                throw _context.t0;

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [[1, 11]],
      );
    }),
  );

  return function(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
})();

exports['default'] = _default;
