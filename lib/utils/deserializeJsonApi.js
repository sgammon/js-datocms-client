'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = deserializeJsonApi;

var _keyFormatter = require('./keyFormatter');

var _jsonSchemaRelationships = _interopRequireDefault(
  require('./jsonSchemaRelationships'),
);

var _findInfoForProperty = _interopRequireDefault(
  require('./findInfoForProperty'),
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
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

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) ||
        arr['@@iterator'];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var hasKey = function hasKey(o, k) {
  return Object.prototype.hasOwnProperty.call(o, k);
};

var findKey = function findKey(jsonApiKey, schema) {
  var info = (0, _findInfoForProperty['default'])(jsonApiKey, schema);

  if (info && info.properties) {
    return Object.entries(info.properties).map(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        details = _ref2[1];

      return {
        key: key,
        details: details,
      };
    });
  }

  return [];
};

var findAttributes = findKey.bind(null, 'attributes');
var findMeta = findKey.bind(null, 'meta');

function deserialize(type, relationshipsMeta, schema, _ref3) {
  var id = _ref3.id,
    attributes = _ref3.attributes,
    meta = _ref3.meta,
    relationships = _ref3.relationships;
  var result = {
    id: id,
  };
  var attrs =
    type === 'item' && attributes
      ? Object.keys(attributes).map(function(key) {
          return {
            key: key,
            details: null,
          };
        })
      : findAttributes(schema);
  attrs.forEach(function(_ref4) {
    var key = _ref4.key,
      details = _ref4.details;

    if (hasKey(attributes, key)) {
      result[(0, _keyFormatter.camelize)(key)] =
        details && details.keepOriginalCaseOnKeys
          ? attributes[key]
          : (0, _keyFormatter.camelizeKeys)(attributes[key]);
    }
  });

  if (meta) {
    result.meta = {};
    findMeta(schema).forEach(function(_ref5) {
      var key = _ref5.key,
        details = _ref5.details;

      if (hasKey(meta, key)) {
        result.meta[(0, _keyFormatter.camelize)(key)] =
          details && details.keepOriginalCaseOnKeys
            ? meta[key]
            : (0, _keyFormatter.camelizeKeys)(meta[key]);
      }
    });
  }

  if (relationships) {
    relationshipsMeta.forEach(function(_ref6) {
      var relationship = _ref6.relationship,
        collection = _ref6.collection,
        types = _ref6.types;

      if (relationships[relationship]) {
        var relData = relationships[relationship].data;
        var value;

        if (types.length > 1) {
          value = relData;
        } else if (!relData) {
          value = null;
        } else if (collection) {
          value = relData.map(function(x) {
            return x.id;
          });
        } else {
          value = relData.id;
        }

        result[(0, _keyFormatter.camelize)(relationship)] = value;
      }
    });
  }

  return result;
}

function deserializeJsonApi(type, targetSchema, json) {
  if (!json) {
    return json;
  }

  var relationshipsMeta = (0, _jsonSchemaRelationships['default'])(
    targetSchema,
  );
  var data = json.data;

  if (Array.isArray(data)) {
    return data.map(function(item) {
      return deserialize(type, relationshipsMeta, targetSchema, item);
    });
  }

  return deserialize(type, relationshipsMeta, targetSchema, data);
}
