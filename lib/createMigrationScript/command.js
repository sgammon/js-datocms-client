'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = toggleMaintenanceMode;

var _humps = require('humps');

var _mkdirp = _interopRequireDefault(require('mkdirp'));

var _denodeify = _interopRequireDefault(require('denodeify'));

var _path = _interopRequireDefault(require('path'));

var _fs = _interopRequireDefault(require('fs'));

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

var mkdirp = (0, _denodeify['default'])(_mkdirp['default']);
var defaultTemplate = "\n'use strict';\n\nmodule.exports = async (client) => {\n  // DatoCMS migration script\n\n  // For more examples, head to our Content Management API docs:\n  // https://www.datocms.com/docs/content-management-api\n\n  // Create an Article model:\n  // https://www.datocms.com/docs/content-management-api/resources/item-type/create\n\n  const articleModel = await client.itemTypes.create({\n    name: 'Article',\n    apiKey: 'article',\n  });\n\n  // Create a Title field (required):\n  // https://www.datocms.com/docs/content-management-api/resources/field/create\n\n  const titleField = await client.fields.create(articleModel.id, {\n    label: 'Title',\n    apiKey: 'title',\n    fieldType: 'string',\n    validators: {\n      required: {},\n    },\n    appearance: {\n      editor: 'single_line',\n      parameters: {\n        heading: true,\n      },\n      addons: [],\n    },\n  });\n\n  // Create an Article record:\n  // https://www.datocms.com/docs/content-management-api/resources/item/create\n\n  const article = await client.items.create({\n    itemType: articleModel.id,\n    title: 'My first article!',\n  });\n}\n".trim();

var getTemplate = function getTemplate(templatePath) {
  if (!templatePath) return defaultTemplate;

  if (!_fs['default'].existsSync(templatePath)) {
    throw new Error('Could not load template with path '.concat(templatePath));
  }

  return _fs['default'].readFileSync(templatePath, 'utf8');
};

function toggleMaintenanceMode(_x) {
  return _toggleMaintenanceMode.apply(this, arguments);
}

function _toggleMaintenanceMode() {
  _toggleMaintenanceMode = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(_ref) {
      var name,
        relativeMigrationsDir,
        relativeMigrationTemplatePath,
        migrationsDir,
        template,
        timestamp,
        migrationFile,
        migrationAbsolutePath;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              (name = _ref.name),
                (relativeMigrationsDir = _ref.relativeMigrationsDir),
                (relativeMigrationTemplatePath =
                  _ref.relativeMigrationTemplatePath);
              migrationsDir = _path['default'].resolve(relativeMigrationsDir);
              template = getTemplate(relativeMigrationTemplatePath);
              _context.next = 5;
              return mkdirp(migrationsDir);

            case 5:
              timestamp = Math.floor(Date.now() / 1000);
              migrationFile = ''
                .concat(timestamp, '_')
                .concat((0, _humps.camelize)(name), '.js');
              migrationAbsolutePath = _path['default'].join(
                migrationsDir,
                migrationFile,
              );

              _fs['default'].writeFileSync(
                migrationAbsolutePath,
                template,
                'utf8',
              );

              process.stdout.write(
                'Created '.concat(
                  _path['default'].join(relativeMigrationsDir, migrationFile),
                  '\n',
                ),
              );

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    }),
  );
  return _toggleMaintenanceMode.apply(this, arguments);
}
