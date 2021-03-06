'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = upsertMigrationModel;

var _ora = _interopRequireDefault(require('ora'));

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

function createMigrationModel(_x, _x2) {
  return _createMigrationModel.apply(this, arguments);
}

function _createMigrationModel() {
  _createMigrationModel = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(
      client,
      migrationModelApiKey,
    ) {
      var model;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return client.itemTypes.create({
                name: 'Schema migration',
                apiKey: migrationModelApiKey,
              });

            case 2:
              model = _context.sent;
              _context.next = 5;
              return client.fields.create(model.id, {
                label: 'Migration file name',
                apiKey: 'name',
                fieldType: 'string',
                validators: {
                  required: {},
                },
              });

            case 5:
              return _context.abrupt('return', model);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    }),
  );
  return _createMigrationModel.apply(this, arguments);
}

function upsertMigrationModel(_x3, _x4) {
  return _upsertMigrationModel.apply(this, arguments);
}

function _upsertMigrationModel() {
  _upsertMigrationModel = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(
      client,
      migrationModelApiKey,
    ) {
      var creationSpinner, migrationItemType;
      return regeneratorRuntime.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return client.itemTypes.find(migrationModelApiKey);

              case 3:
                return _context2.abrupt('return', _context2.sent);

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2['catch'](0);

                if (
                  !(
                    _context2.t0 instanceof _ApiException['default'] &&
                    _context2.t0.statusCode === 404
                  )
                ) {
                  _context2.next = 15;
                  break;
                }

                creationSpinner = (0, _ora['default'])(
                  'Creating `'.concat(migrationModelApiKey, '` model...\n'),
                ).start();
                _context2.next = 12;
                return createMigrationModel(client, migrationModelApiKey);

              case 12:
                migrationItemType = _context2.sent;
                creationSpinner.succeed();
                return _context2.abrupt('return', migrationItemType);

              case 15:
                throw _context2.t0;

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        },
        _callee2,
        null,
        [[0, 6]],
      );
    }),
  );
  return _upsertMigrationModel.apply(this, arguments);
}
