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

function allPages(_x) {
  return _allPages.apply(this, arguments);
}

function _allPages() {
  _allPages = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(apiCall) {
      var limit, items, skip, response, pageItems, total;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              limit = 100;
              items = [];
              skip = 0; // eslint-disable-next-line no-constant-condition

            case 3:
              if (!true) {
                _context2.next = 16;
                break;
              }

              _context2.next = 6;
              return apiCall({
                skip: skip,
                limit: limit,
                order: 'sys.createdAt',
              });

            case 6:
              response = _context2.sent;
              (pageItems = response.items), (total = response.total);
              items = [].concat(items, pageItems);

              if (!(items.length >= total)) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt('break', 16);

            case 13:
              skip += limit;

            case 14:
              _context2.next = 3;
              break;

            case 16:
              return _context2.abrupt('return', items);

            case 17:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2);
    }),
  );
  return _allPages.apply(this, arguments);
}

var _default = /*#__PURE__*/ (function() {
  var _ref2 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(_ref) {
      var client,
        skipContent,
        contentType,
        contentfulEnvironment,
        spinner,
        environments,
        environment,
        rawLocales,
        defaultLocale,
        locales,
        rawContentTypes,
        includeTypes,
        contentTypes,
        entries,
        assets,
        rawEntries,
        rawAssets;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              (client = _ref.client),
                (skipContent = _ref.skipContent),
                (contentType = _ref.contentType),
                (contentfulEnvironment = _ref.contentfulEnvironment);
              spinner = (0, _ora['default'])(
                'Downloading Contentful data structure',
              ).start();
              _context.next = 4;
              return client.getEnvironments();

            case 4:
              environments = _context.sent;
              environment = environments.items.find(function(e) {
                return e.name === (contentfulEnvironment || 'master');
              });
              _context.next = 8;
              return environment.getLocales();

            case 8:
              rawLocales = _context.sent;
              defaultLocale = rawLocales.items.find(function(locale) {
                return locale['default'];
              }).code;
              locales = rawLocales.items.map(function(locale) {
                return locale.code;
              });
              _context.next = 13;
              return environment.getContentTypes();

            case 13:
              rawContentTypes = _context.sent;
              includeTypes = new Set(contentType || null);
              contentTypes = contentType
                ? rawContentTypes.items.filter(function(type) {
                    return includeTypes.has(type.sys.id);
                  })
                : rawContentTypes.items;

              if (skipContent) {
                _context.next = 25;
                break;
              }

              _context.next = 19;
              return allPages(environment.getEntries.bind(environment));

            case 19:
              rawEntries = _context.sent;
              _context.next = 22;
              return allPages(environment.getAssets.bind(environment));

            case 22:
              rawAssets = _context.sent;
              entries = contentType
                ? rawEntries.filter(function(entry) {
                    return includeTypes.has(entry.sys.contentType.sys.id);
                  })
                : rawEntries;
              assets = rawAssets;

            case 25:
              spinner.succeed(
                'Found '
                  .concat((entries || []).length, ' entries and ')
                  .concat(
                    (assets || []).length,
                    ' assets in Contentful project',
                  ),
              );
              return _context.abrupt('return', {
                defaultLocale: defaultLocale,
                locales: locales,
                contentTypes: contentTypes,
                entries: entries,
                assets: assets,
              });

            case 27:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    }),
  );

  return function(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

exports['default'] = _default;
