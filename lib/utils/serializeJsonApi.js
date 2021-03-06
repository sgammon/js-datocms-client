'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.serializedAttributes = serializedAttributes;
exports.serializedMeta = serializedMeta;
exports['default'] = serializeJsonApi;

var _arrDiff = _interopRequireDefault(require('arr-diff'));

var _object = _interopRequireDefault(require('object.omit'));

var _keyFormatter = require('./keyFormatter');

var _findInfoForProperty = _interopRequireDefault(
  require('./findInfoForProperty'),
);

var _jsonSchemaRelationships = _interopRequireDefault(
  require('./jsonSchemaRelationships'),
);

var _jsonSchemaType = _interopRequireDefault(require('./jsonSchemaType'));

var _jsonSchemaRequired = require('./jsonSchemaRequired');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var findAttributes = function findAttributes(schema) {
  var info = (0, _findInfoForProperty['default'])('attributes', schema);

  if (info && info.properties) {
    return Object.keys(info.properties);
  }

  return [];
};

var findMetas = function findMetas(schema) {
  var info = (0, _findInfoForProperty['default'])('meta', schema);

  if (info && info.properties) {
    return Object.keys(info.properties);
  }

  return [];
};

var metaProperties = function metaProperties(schema, meta) {
  var info = (0, _findInfoForProperty['default'])('meta', schema);

  if (info && info.properties) {
    return info.properties[meta];
  }

  return null;
};

var attributeProperties = function attributeProperties(schema, attribute) {
  var info = (0, _findInfoForProperty['default'])('attributes', schema);

  if (info && info.properties) {
    return info.properties[attribute];
  }

  return null;
};

var hasKey = function hasKey(o, k) {
  return Object.prototype.hasOwnProperty.call(o, k);
};

function serializedRelationships(type, unserializedBody, schema) {
  var relationships = (0, _jsonSchemaRelationships['default'])(schema);
  return relationships.reduce(function(acc, _ref) {
    var relationship = _ref.relationship,
      collection = _ref.collection,
      types = _ref.types;
    var camelizedRelationship = (0, _keyFormatter.camelize)(relationship);

    if (
      relationship !== camelizedRelationship &&
      hasKey(unserializedBody, relationship) &&
      hasKey(unserializedBody, camelizedRelationship)
    ) {
      throw new Error(
        'Attribute '.concat(
          camelizedRelationship,
          ' is expressed both in camelCase and snake_case',
        ),
      );
    }

    if (
      hasKey(unserializedBody, camelizedRelationship) ||
      hasKey(unserializedBody, relationship)
    ) {
      var value =
        unserializedBody[camelizedRelationship] ||
        unserializedBody[relationship];
      var data;

      if (value) {
        if (types.length > 1) {
          data = value;
        } else if (collection) {
          data = value.map(function(id) {
            return {
              type: types[0],
              id: id,
            };
          });
        } else {
          data = {
            type: types[0],
            id: value,
          };
        }
      } else {
        if (
          (0, _jsonSchemaRequired.jsonSchemaGroupPropertyRequired)(
            schema,
          ).includes('relationships') &&
          (0, _jsonSchemaRequired.jsonSchemaValueRequired)(
            'relationships',
            schema,
          ).includes(relationship)
        ) {
          throw new Error(
            'Required relationship: '.concat(camelizedRelationship),
          );
        }

        data = null;
      }

      if (
        relationship !== camelizedRelationship &&
        hasKey(unserializedBody, relationship)
      ) {
        console.warn(
          'Warning: Attribute '
            .concat(relationship, ' should be expressed in camelCase syntax (')
            .concat(camelizedRelationship, ')'),
        );
      }

      return Object.assign(
        acc,
        _defineProperty({}, relationship, {
          data: data,
        }),
      );
    }

    if (
      (0, _jsonSchemaRequired.jsonSchemaGroupPropertyRequired)(schema).includes(
        'relationships',
      ) &&
      (0, _jsonSchemaRequired.jsonSchemaPropertyRequired)(
        'relationships',
        schema,
      ).includes(relationship)
    ) {
      if (
        (0, _jsonSchemaRequired.jsonSchemaValueRequired)(
          'relationships',
          schema,
        ).includes(relationship)
      ) {
        throw new Error(
          'Required relationship: '.concat(camelizedRelationship),
        );
      }

      return Object.assign(
        acc,
        _defineProperty({}, relationship, {
          data: null,
        }),
      );
    }

    return acc;
  }, {});
}

function serializedAttributes(type) {
  var unserializedBody =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var schema = arguments.length > 2 ? arguments[2] : undefined;
  var attrs =
    type === 'item'
      ? (0, _arrDiff['default'])(
          Object.keys((0, _keyFormatter.decamelizeKeys)(unserializedBody)),
          ['item_type', 'id', 'created_at', 'updated_at', 'creator'],
        )
      : findAttributes(schema);
  return attrs.reduce(function(acc, attr) {
    var camelizedAttr = (0, _keyFormatter.camelize)(attr);
    var properties = attributeProperties(schema, attr);

    var decamelizeKeysIfRequired = function decamelizeKeysIfRequired(obj) {
      return !properties || !properties.keepOriginalCaseOnKeys
        ? (0, _keyFormatter.decamelizeKeys)(obj)
        : obj;
    };

    if (
      attr !== camelizedAttr &&
      hasKey(unserializedBody, attr) &&
      hasKey(unserializedBody, camelizedAttr)
    ) {
      throw new Error(
        'Attribute '.concat(
          camelizedAttr,
          ' is expressed both in camelCase and snake_case',
        ),
      );
    }

    if (attr !== camelizedAttr && hasKey(unserializedBody, attr)) {
      console.warn(
        'Warning: Attribute '
          .concat(attr, ' should be expressed in camelCase syntax (')
          .concat(camelizedAttr, ')'),
      );
      return Object.assign(
        acc,
        _defineProperty(
          {},
          attr,
          decamelizeKeysIfRequired(unserializedBody[attr]),
        ),
      );
    }

    if (hasKey(unserializedBody, camelizedAttr)) {
      return Object.assign(
        acc,
        _defineProperty(
          {},
          attr,
          decamelizeKeysIfRequired(unserializedBody[camelizedAttr]),
        ),
      );
    }

    if (
      (0, _jsonSchemaRequired.jsonSchemaPropertyRequired)(
        'attributes',
        schema,
      ).includes(attr)
    ) {
      throw new Error('Required attribute: '.concat(camelizedAttr));
    }

    return acc;
  }, {});
}

function serializedMeta() {
  var unserializedMeta =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var schema = arguments.length > 1 ? arguments[1] : undefined;
  var metas = findMetas(schema);

  if (metas.length === 0) {
    return null;
  }

  return metas.reduce(function(acc, attr) {
    var camelizedAttr = (0, _keyFormatter.camelize)(attr);
    var properties = metaProperties(schema, attr);

    var decamelizeKeysIfRequired = function decamelizeKeysIfRequired(obj) {
      return !properties || !properties.keepOriginalCaseOnKeys
        ? (0, _keyFormatter.decamelizeKeys)(obj)
        : obj;
    };

    if (
      attr !== camelizedAttr &&
      hasKey(unserializedMeta, attr) &&
      hasKey(unserializedMeta, camelizedAttr)
    ) {
      throw new Error(
        'Meta '.concat(
          camelizedAttr,
          ' is expressed both in camelCase and snake_case',
        ),
      );
    }

    if (attr !== camelizedAttr && hasKey(unserializedMeta, attr)) {
      console.warn(
        'Warning: Meta '
          .concat(attr, ' should be expressed in camelCase syntax (')
          .concat(camelizedAttr, ')'),
      );
      return Object.assign(
        acc,
        _defineProperty(
          {},
          attr,
          decamelizeKeysIfRequired(unserializedMeta[attr]),
        ),
      );
    }

    if (hasKey(unserializedMeta, camelizedAttr)) {
      return Object.assign(
        acc,
        _defineProperty(
          {},
          attr,
          decamelizeKeysIfRequired(unserializedMeta[camelizedAttr]),
        ),
      );
    }

    if (
      (0, _jsonSchemaRequired.jsonSchemaPropertyRequired)(
        'attributes',
        schema,
      ).includes(attr)
    ) {
      throw new Error('Required meta: '.concat(camelizedAttr));
    }

    return acc;
  }, {});
}

function serializeJsonApi(unserializedBody, link, itemId) {
  var data = {};

  if (itemId || unserializedBody.id) {
    data.id = itemId || unserializedBody.id;
  }

  var bodyWithoutMeta = hasKey(unserializedBody, 'meta')
    ? (0, _object['default'])(unserializedBody, ['meta'])
    : unserializedBody;
  var type = (0, _jsonSchemaType['default'])(link.schema);
  data.type = type;
  var attributes = serializedAttributes(type, bodyWithoutMeta, link.schema);
  var relationships = serializedRelationships(
    type,
    bodyWithoutMeta,
    link.schema,
  );
  var meta =
    unserializedBody.meta && serializedMeta(unserializedBody.meta, link.schema);

  if (
    (0, _jsonSchemaRequired.jsonSchemaGroupPropertyRequired)(
      link.schema,
    ).includes('attributes') ||
    Object.keys(attributes).length > 0
  ) {
    data.attributes = attributes;
  }

  if (
    (0, _jsonSchemaRequired.jsonSchemaGroupPropertyRequired)(
      link.schema,
    ).includes('relationships') ||
    Object.keys(relationships).length > 0
  ) {
    data.relationships = relationships;
  }

  if (meta) {
    data.meta = meta;
  }

  return {
    data: data,
  };
}
