'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _JsonApiEntity = _interopRequireDefault(require('./JsonApiEntity'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
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

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function payloadEntities(payload) {
  var accumulator = [];

  if (payload.data) {
    if (Array.isArray(payload.data)) {
      accumulator.push.apply(accumulator, _toConsumableArray(payload.data));
    } else {
      accumulator.push(payload.data);
    }
  }

  if (payload.included) {
    accumulator.push.apply(accumulator, _toConsumableArray(payload.included));
  }

  return accumulator;
}

var EntitiesRepo = /*#__PURE__*/ (function() {
  function EntitiesRepo() {
    _classCallCheck(this, EntitiesRepo);

    this.entities = {};
    this.destroyListeners = [];
    this.upsertListeners = [];
    this.upsertEntities.apply(this, arguments);
  }

  _createClass(EntitiesRepo, [
    {
      key: 'addDestroyListener',
      value: function addDestroyListener(cb) {
        var _this = this;

        this.destroyListeners.push(cb);
        return function() {
          _this.destroyListeners = _this.destroyListeners.filter(function(x) {
            return x !== cb;
          });
        };
      },
    },
    {
      key: 'addUpsertListener',
      value: function addUpsertListener(cb) {
        var _this2 = this;

        this.upsertListeners.push(cb);
        return function() {
          _this2.upsertListeners = _this2.upsertListeners.filter(function(x) {
            return x !== cb;
          });
        };
      },
    },
    {
      key: 'destroyAllEntities',
      value: function destroyAllEntities() {
        var _this3 = this;

        // Order is important here! See ie. gatsby-source-datocms `destroyEntityNode` function!
        ['item', 'field', 'item_type', 'upload', 'site'].forEach(function(
          type,
        ) {
          if (_this3.entities[type]) {
            _this3.destroyEntities(type, Object.keys(_this3.entities[type]));
          }
        });
      },
    },
    {
      key: 'upsertEntities',
      value: function upsertEntities() {
        var _this4 = this;

        var entities = [];

        for (
          var _len = arguments.length, payloads = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          payloads[_key] = arguments[_key];
        }

        payloads.forEach(function(payload) {
          payloadEntities(payload).forEach(function(entityPayload) {
            var entity = new _JsonApiEntity['default'](entityPayload, _this4);
            entities.push(entity);
            _this4.entities[entity.type] = _this4.entities[entity.type] || {};
            _this4.entities[entity.type][entity.id] = entity;
          });
        });
        this.upsertListeners.forEach(function(cb) {
          return entities.forEach(cb);
        });
      },
    },
    {
      key: 'destroyEntities',
      value: function destroyEntities(type, ids) {
        var _this5 = this;

        var entities = [];
        ids.forEach(function(id) {
          if (_this5.entities[type] && _this5.entities[type][id]) {
            entities.push(_this5.entities[type][id]);
            delete _this5.entities[type][id];
          }
        });
        this.destroyListeners.forEach(function(cb) {
          return entities.forEach(cb);
        });
      },
    },
    {
      key: 'destroyItemType',
      value: function destroyItemType(id) {
        var itemIds = Object.values(this.entities.item)
          .filter(function(item) {
            return item.itemType.id === id;
          })
          .map(function(item) {
            return item.id;
          });
        this.entitiesRepo.destroyEntities('item', itemIds);
        this.entitiesRepo.destroyEntities('item_type', [id]);
      },
    },
    {
      key: 'site',
      get: function get() {
        return this.findEntitiesOfType('site')[0];
      },
    },
    {
      key: 'findEntitiesOfType',
      value: function findEntitiesOfType(type) {
        return Object.values(this.entities[type] || {});
      },
    },
    {
      key: 'findEntity',
      value: function findEntity(type, id) {
        return this.entities[type] && this.entities[type][id];
      },
    },
  ]);

  return EntitiesRepo;
})();

exports['default'] = EntitiesRepo;
