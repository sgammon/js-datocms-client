'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = buildModularBlock;

var _serializeJsonApi = require('./serializeJsonApi');

function buildModularBlock(unserializedBody) {
  var attributes = (0, _serializeJsonApi.serializedAttributes)(
    'item',
    unserializedBody,
    null,
  );
  var payload = {
    type: 'item',
    attributes: attributes,
    relationships: {
      item_type: {
        data: {
          id: unserializedBody.itemType || unserializedBody.item_type,
          type: 'item_type',
        },
      },
    },
  };

  if (unserializedBody.id) {
    payload.id = unserializedBody.id;
  }

  return payload;
}
