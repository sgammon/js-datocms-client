'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _ora = _interopRequireDefault(require('ora'));

var _humps = _interopRequireDefault(require('humps'));

var _progress = _interopRequireDefault(require('./progress'));

var _datoFieldTypeFor = _interopRequireDefault(require('./datoFieldTypeFor'));

var _richTextToStructuredText = require('./richTextToStructuredText');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it =
    (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator'];
  if (!it) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === 'number')
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F,
      };
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it['return'] != null) it['return']();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
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

var reservedKeys = [
  'position',
  'is_valid',
  'id',
  'type',
  'updated_at',
  'created_at',
  'attributes',
  'fields',
  'item_type',
  'is_singleton',
  'seo_meta_tags',
  'parent_id',
  'parent',
  'children',
  'status',
  'meta',
  'eq',
  'neq',
  'all_in',
  'any_in',
  'exists',
];

var toFieldApiKey = function toFieldApiKey(value) {
  var apiKey = _humps['default'].decamelize(value);

  if (reservedKeys.includes(apiKey)) {
    return ''.concat(apiKey, '_field');
  }

  return apiKey;
};

var findItemTypeId = function findItemTypeId(_ref) {
  var contentfulField = _ref.contentfulField,
    itemTypeMapping = _ref.itemTypeMapping;
  var linkValidation = contentfulField.validations.find(function(val) {
    return val.linkContentType;
  });

  if (linkValidation) {
    return linkValidation.linkContentType
      .map(function(contentTypeId) {
        return itemTypeMapping[contentTypeId]
          ? itemTypeMapping[contentTypeId].id
          : null;
      })
      .filter(Boolean);
  }

  return Object.values(itemTypeMapping).map(function(iT) {
    return iT.id;
  });
};

var _default = /*#__PURE__*/ (function() {
  var _ref3 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(_ref2) {
      var itemTypeMapping,
        datoClient,
        contentfulData,
        spinner,
        contentTypes,
        fieldSize,
        progress,
        fieldsMapping,
        _iterator,
        _step,
        contentType,
        contentTypeId,
        itemType,
        _iterator2,
        _step2,
        contentfulField,
        position,
        validators,
        assetBlockId,
        fieldAttributes,
        datoField;

      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                (itemTypeMapping = _ref2.itemTypeMapping),
                  (datoClient = _ref2.datoClient),
                  (contentfulData = _ref2.contentfulData);
                spinner = (0, _ora['default'])('').start();
                _context.prev = 2;
                contentTypes = contentfulData.contentTypes;
                fieldSize = contentTypes
                  .map(function(contentType) {
                    return contentType.fields.length;
                  })
                  .reduce(function(acc, length) {
                    return acc + length;
                  }, 0);
                progress = new _progress['default'](
                  fieldSize,
                  'Creating fields',
                );
                spinner.text = progress.tick();
                fieldsMapping = {};
                _iterator = _createForOfIteratorHelper(contentTypes);
                _context.prev = 9;

                _iterator.s();

              case 11:
                if ((_step = _iterator.n()).done) {
                  _context.next = 49;
                  break;
                }

                contentType = _step.value;
                contentTypeId = contentType.sys.id;
                fieldsMapping[contentTypeId] = [];
                itemType = itemTypeMapping[contentTypeId];
                _iterator2 = _createForOfIteratorHelper(contentType.fields);
                _context.prev = 17;

                _iterator2.s();

              case 19:
                if ((_step2 = _iterator2.n()).done) {
                  _context.next = 39;
                  break;
                }

                contentfulField = _step2.value;
                position = contentType.fields.indexOf(contentfulField);
                validators = {};

                if (
                  contentfulField.type === 'Link' &&
                  contentfulField.linkType === 'Entry'
                ) {
                  validators = {
                    itemItemType: {
                      itemTypes: findItemTypeId({
                        itemTypeMapping: itemTypeMapping,
                        contentfulField: contentfulField,
                      }),
                    },
                  };
                }

                if (
                  contentfulField.type === 'Array' &&
                  contentfulField.items.type === 'Link' &&
                  contentfulField.items.linkType === 'Entry'
                ) {
                  validators = {
                    itemsItemType: {
                      itemTypes: findItemTypeId({
                        itemTypeMapping: itemTypeMapping,
                        contentfulField: contentfulField,
                      }),
                    },
                  };
                }

                if (!(contentfulField.type === 'RichText')) {
                  _context.next = 30;
                  break;
                }

                _context.next = 28;
                return (0,
                _richTextToStructuredText.createStructuredTextAssetBlock)(
                  datoClient,
                );

              case 28:
                assetBlockId = _context.sent;
                validators = {
                  structuredTextBlocks: {
                    itemTypes: [assetBlockId],
                  },
                  structuredTextLinks: {
                    itemTypes: findItemTypeId({
                      itemTypeMapping: itemTypeMapping,
                      contentfulField: contentfulField,
                    }),
                  },
                };

              case 30:
                fieldAttributes = {
                  label: contentfulField.name,
                  fieldType: (0, _datoFieldTypeFor['default'])(contentfulField),
                  localized: contentfulField.localized,
                  apiKey: toFieldApiKey(contentfulField.id),
                  position: position,
                  validators: validators,
                };

                if (
                  contentfulField.id === contentType.displayField &&
                  contentfulField.type === 'Symbol'
                ) {
                  fieldAttributes.appearance = {
                    editor: 'single_line',
                    parameters: {
                      heading: true,
                    },
                    addons: [],
                  };
                }

                _context.next = 34;
                return datoClient.fields.create(itemType.id, fieldAttributes);

              case 34:
                datoField = _context.sent;
                spinner.text = progress.tick();
                fieldsMapping[contentTypeId].push({
                  datoField: datoField,
                  contentfulFieldId: contentfulField.id,
                });

              case 37:
                _context.next = 19;
                break;

              case 39:
                _context.next = 44;
                break;

              case 41:
                _context.prev = 41;
                _context.t0 = _context['catch'](17);

                _iterator2.e(_context.t0);

              case 44:
                _context.prev = 44;

                _iterator2.f();

                return _context.finish(44);

              case 47:
                _context.next = 11;
                break;

              case 49:
                _context.next = 54;
                break;

              case 51:
                _context.prev = 51;
                _context.t1 = _context['catch'](9);

                _iterator.e(_context.t1);

              case 54:
                _context.prev = 54;

                _iterator.f();

                return _context.finish(54);

              case 57:
                spinner.succeed();
                return _context.abrupt('return', fieldsMapping);

              case 61:
                _context.prev = 61;
                _context.t2 = _context['catch'](2);
                spinner.fail();
                throw _context.t2;

              case 65:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [
          [2, 61],
          [9, 51, 54, 57],
          [17, 41, 44, 47],
        ],
      );
    }),
  );

  return function(_x) {
    return _ref3.apply(this, arguments);
  };
})();

exports['default'] = _default;
