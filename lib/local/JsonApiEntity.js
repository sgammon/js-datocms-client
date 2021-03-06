'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _keyFormatter = require('../utils/keyFormatter');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var JsonApiEntity = function JsonApiEntity(payload, repo) {
  _classCallCheck(this, JsonApiEntity);

  var cachedCamelizedAttributes = {};
  var cachedCamelizedMeta = null;
  return new Proxy(
    {
      type: payload.type,
      id: payload.id,
    },
    {
      get: function get(target, prop, receiver) {
        if (prop === 'id') {
          return payload.id;
        }

        if (prop === 'type') {
          return payload.type;
        }

        if (prop === 'payload') {
          return payload;
        }

        if (prop === 'repo') {
          return repo;
        }

        if (prop === 'meta') {
          if (cachedCamelizedMeta) {
            return cachedCamelizedMeta;
          }

          cachedCamelizedMeta = (0, _keyFormatter.camelizeKeys)(
            payload.meta || {},
          );
          return cachedCamelizedMeta;
        }

        for (
          var _i = 0,
            _arr = [
              (0, _keyFormatter.decamelize)(prop),
              (0,
              _keyFormatter.decamelizeLegacyApiKeysWithUnderscoreAndThenNumber)(
                prop,
              ),
            ];
          _i < _arr.length;
          _i++
        ) {
          var decamelizedProp = _arr[_i];

          if (payload.attributes && decamelizedProp in payload.attributes) {
            if (cachedCamelizedAttributes[prop]) {
              return cachedCamelizedAttributes[prop];
            }

            cachedCamelizedAttributes[prop] = (0, _keyFormatter.camelizeKeys)(
              payload.attributes[decamelizedProp],
            );
            return cachedCamelizedAttributes[prop];
          }

          if (
            payload.relationships &&
            decamelizedProp in payload.relationships
          ) {
            var linkage = payload.relationships[decamelizedProp].data;

            if (Array.isArray(linkage)) {
              return linkage.map(function(item) {
                return repo.findEntity(item.type, item.id);
              });
            }

            if (linkage) {
              return repo.findEntity(linkage.type, linkage.id);
            }

            return null;
          }
        }

        return Reflect.get(target, prop, receiver);
      },
    },
  );
};

exports['default'] = JsonApiEntity;
