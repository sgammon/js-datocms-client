'use strict';

function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.jsonSchemaPropertyRequired = jsonSchemaPropertyRequired;
exports.jsonSchemaValueRequired = jsonSchemaValueRequired;
exports.jsonSchemaGroupPropertyRequired = jsonSchemaGroupPropertyRequired;

var _findInfoForProperty = _interopRequireWildcard(
  require('./findInfoForProperty'),
);

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop,
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== 'object' && typeof obj !== 'function')
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj['default'] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

var toArray = function toArray(obj) {
  return Array.isArray(obj) ? obj : [obj];
};

function jsonSchemaPropertyRequired(propertyName, schema) {
  var info = (0, _findInfoForProperty['default'])(propertyName, schema);
  return (info && info.required) || [];
}

function jsonSchemaValueRequired(propertyName, schema) {
  var info = (0, _findInfoForProperty['default'])(propertyName, schema);
  var maybeRequired = jsonSchemaPropertyRequired(propertyName, schema);
  return maybeRequired.filter(function(property) {
    var propertySchema =
      propertyName === 'relationships'
        ? info.properties[property].properties.data
        : info.properties[property];

    if (propertySchema.anyOf) {
      var isNullAllowed = propertySchema.anyOf.some(function(def) {
        return toArray(def.type).includes('null');
      });
      return !isNullAllowed;
    }

    return !toArray(propertySchema.type).includes('null');
  });
}

function jsonSchemaGroupPropertyRequired(schema) {
  var entity = (0, _findInfoForProperty.findEntityInData)(schema);
  return (entity && entity.required) || [];
}
