'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _ora = _interopRequireDefault(require('ora'));

var _appClient = _interopRequireDefault(require('./appClient'));

var _getContentfulData = _interopRequireDefault(require('./getContentfulData'));

var _destroyExistingModels = _interopRequireDefault(
  require('./destroyExistingModels'),
);

var _destroyExistingAssets = _interopRequireDefault(
  require('./destroyExistingAssets'),
);

var _removeAllValidators = _interopRequireDefault(
  require('./removeAllValidators'),
);

var _setLocales = _interopRequireDefault(require('./setLocales'));

var _createModels = _interopRequireDefault(require('./createModels'));

var _createFields = _interopRequireDefault(require('./createFields'));

var _createRecords = _interopRequireDefault(require('./createRecords'));

var _addValidationsOnField = _interopRequireDefault(
  require('./addValidationsOnField'),
);

var _linkRecords = _interopRequireDefault(require('./linkRecords'));

var _createUploads = _interopRequireDefault(require('./createUploads'));

var _publishRecords = _interopRequireDefault(require('./publishRecords'));

var _cache = require('./cache');

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
      var contentfulToken,
        contentfulSpaceId,
        contentfulEnvironment,
        datoCmsToken,
        datoCmsEnvironment,
        datoCmsCmaBaseUrl,
        skipContent,
        contentType,
        client,
        datoClient,
        contentfulData,
        itemTypeMapping,
        fieldsMapping,
        recordsMapping,
        cachedUploads,
        uploadsMapping,
        linkedRecords,
        spinner;
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                (contentfulToken = _ref.contentfulToken),
                  (contentfulSpaceId = _ref.contentfulSpaceId),
                  (contentfulEnvironment = _ref.contentfulEnvironment),
                  (datoCmsToken = _ref.datoCmsToken),
                  (datoCmsEnvironment = _ref.datoCmsEnvironment),
                  (datoCmsCmaBaseUrl = _ref.datoCmsCmaBaseUrl),
                  (skipContent = _ref.skipContent),
                  (contentType = _ref.contentType);
                _context.prev = 1;
                _context.next = 4;
                return (0, _cache.initializeCache)();

              case 4:
                _context.next = 6;
                return (0, _appClient['default'])(
                  contentfulToken,
                  contentfulSpaceId,
                  datoCmsToken,
                  datoCmsEnvironment,
                  datoCmsCmaBaseUrl,
                );

              case 6:
                client = _context.sent;
                datoClient = client.dato;

                if (!(0, _cache.cached)('contentfulData')) {
                  _context.next = 12;
                  break;
                }

                _context.t0 = (0, _cache.cached)('contentfulData');
                _context.next = 15;
                break;

              case 12:
                _context.next = 14;
                return (0, _getContentfulData['default'])({
                  client: client.contentful,
                  skipContent: skipContent,
                  contentType: contentType,
                  contentfulEnvironment: contentfulEnvironment,
                });

              case 14:
                _context.t0 = _context.sent;

              case 15:
                contentfulData = _context.t0;
                (0, _cache.writeToFile)({
                  contentfulData: contentfulData,
                });

                if ((0, _cache.cached)('fieldsMapping')) {
                  _context.next = 20;
                  break;
                }

                _context.next = 20;
                return (0, _removeAllValidators['default'])({
                  datoClient: datoClient,
                  contentfulData: contentfulData,
                });

              case 20:
                if ((0, _cache.cached)('itemTypeMapping')) {
                  _context.next = 23;
                  break;
                }

                _context.next = 23;
                return (0, _destroyExistingModels['default'])({
                  datoClient: datoClient,
                  contentfulData: contentfulData,
                });

              case 23:
                if ((0, _cache.cached)('uploadsMapping')) {
                  _context.next = 26;
                  break;
                }

                _context.next = 26;
                return (0, _destroyExistingAssets['default'])({
                  datoClient: datoClient,
                });

              case 26:
                _context.next = 28;
                return (0, _setLocales['default'])({
                  datoClient: datoClient,
                  contentfulData: contentfulData,
                });

              case 28:
                if (!(0, _cache.cached)('itemTypeMapping')) {
                  _context.next = 32;
                  break;
                }

                _context.t1 = (0, _cache.cached)('itemTypeMapping');
                _context.next = 35;
                break;

              case 32:
                _context.next = 34;
                return (0, _createModels['default'])({
                  datoClient: datoClient,
                  contentfulData: contentfulData,
                });

              case 34:
                _context.t1 = _context.sent;

              case 35:
                itemTypeMapping = _context.t1;
                (0, _cache.writeToFile)({
                  itemTypeMapping: itemTypeMapping,
                }); // fieldsMapping = { <contentTypeId>: Array<{ datoField: Field, contentfulFieldId: string}> }

                if (!(0, _cache.cached)('fieldsMapping')) {
                  _context.next = 41;
                  break;
                }

                _context.t2 = (0, _cache.cached)('fieldsMapping');
                _context.next = 44;
                break;

              case 41:
                _context.next = 43;
                return (0, _createFields['default'])({
                  datoClient: datoClient,
                  itemTypeMapping: itemTypeMapping,
                  contentfulData: contentfulData,
                });

              case 43:
                _context.t2 = _context.sent;

              case 44:
                fieldsMapping = _context.t2;
                (0, _cache.writeToFile)({
                  fieldsMapping: fieldsMapping,
                });

                if (skipContent) {
                  _context.next = 73;
                  break;
                }

                if (!(0, _cache.cached)('recordsMapping')) {
                  _context.next = 51;
                  break;
                }

                _context.t3 = (0, _cache.cached)('recordsMapping');
                _context.next = 54;
                break;

              case 51:
                _context.next = 53;
                return (0, _createRecords['default'])({
                  itemTypeMapping: itemTypeMapping,
                  fieldsMapping: fieldsMapping,
                  datoClient: datoClient,
                  contentfulData: contentfulData,
                });

              case 53:
                _context.t3 = _context.sent;

              case 54:
                recordsMapping = _context.t3;
                (0, _cache.writeToFile)({
                  recordsMapping: recordsMapping,
                });
                cachedUploads = (0, _cache.cached)('uploadsMapping');

                if (
                  !(
                    cachedUploads &&
                    Object.keys(cachedUploads).length ===
                      contentfulData.assets.length
                  )
                ) {
                  _context.next = 61;
                  break;
                }

                _context.t4 = cachedUploads;
                _context.next = 64;
                break;

              case 61:
                _context.next = 63;
                return (0, _createUploads['default'])({
                  datoClient: datoClient,
                  contentfulData: contentfulData,
                });

              case 63:
                _context.t4 = _context.sent;

              case 64:
                uploadsMapping = _context.t4;
                (0, _cache.writeToFile)({
                  uploadsMapping: uploadsMapping,
                }); // publish all records that should be published...

                _context.next = 68;
                return (0, _publishRecords['default'])({
                  recordIds: recordsMapping.recordsToPublish,
                  datoClient: datoClient,
                });

              case 68:
                _context.next = 70;
                return (0, _linkRecords['default'])({
                  datoClient: datoClient,
                  fieldsMapping: fieldsMapping,
                  contentfulData: contentfulData,
                  contentfulRecordMap: recordsMapping.contentfulRecordMap,
                  uploadsMapping: uploadsMapping,
                });

              case 70:
                linkedRecords = _context.sent;
                _context.next = 73;
                return (0, _publishRecords['default'])({
                  recordIds: linkedRecords,
                  datoClient: datoClient,
                });

              case 73:
                _context.next = 75;
                return (0, _addValidationsOnField['default'])({
                  fieldsMapping: fieldsMapping,
                  datoClient: datoClient,
                  contentfulData: contentfulData,
                });

              case 75:
                spinner = (0, _ora['default'])('Import completed! 🎉🎉🎉');
                (0, _cache.destroyTempFile)();
                spinner.succeed();
                _context.next = 84;
                break;

              case 80:
                _context.prev = 80;
                _context.t5 = _context['catch'](1);
                console.error(
                  'Importer error:',
                  JSON.stringify(_context.t5, null, 2),
                );
                throw _context.t5;

              case 84:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [[1, 80]],
      );
    }),
  );

  return function(_x) {
    return _ref2.apply(this, arguments);
  };
})();

exports['default'] = _default;
