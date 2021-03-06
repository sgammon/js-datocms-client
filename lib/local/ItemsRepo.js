'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _pluralize = _interopRequireDefault(require('pluralize'));

var _humps = require('humps');

var _Item = _interopRequireDefault(require('./Item'));

var _Site = _interopRequireDefault(require('./Site'));

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

function buildCollectionsByType(repo, itemTypeMethods) {
  var collectionsByType = {};
  var itemsById = {};
  var itemsByParentId = {};
  repo.itemTypes.forEach(function(itemType) {
    var method = itemTypeMethods[itemType.apiKey];
    collectionsByType[method] = itemType.singleton ? null : [];
  });
  repo.entitiesRepo.findEntitiesOfType('item').forEach(function(entity) {
    var item = new _Item['default'](entity, repo);
    var method = itemTypeMethods[entity.itemType.apiKey];

    if (!entity.itemType.singleton) {
      collectionsByType[method].push(item);
    }

    itemsById[item.id] = item;

    if (entity.parentId) {
      itemsByParentId[entity.parentId] = itemsByParentId[entity.parentId] || [];
      itemsByParentId[entity.parentId].push(item);
    }
  });
  repo.itemTypes.forEach(function(itemType) {
    var method = itemTypeMethods[itemType.apiKey];

    if (!itemType.singleton && itemType.sortable) {
      collectionsByType[method] = collectionsByType[method].sort(function(
        a,
        b,
      ) {
        return a.position - b.position;
      });
    } else if (itemType.orderingField) {
      var field = (0, _humps.camelize)(itemType.orderingField.apiKey);
      var direction = itemType.orderingDirection === 'asc' ? 1 : -1;
      collectionsByType[method] = collectionsByType[method].sort(function(
        a,
        b,
      ) {
        return (a[field] - b[field]) * direction;
      });
    }
  });
  repo.itemTypes.forEach(function(itemType) {
    var method = itemTypeMethods[itemType.apiKey];

    if (itemType.singleton && itemType.singletonItem) {
      collectionsByType[method] = itemsById[itemType.singletonItem.id];
    }
  });
  return {
    collectionsByType: collectionsByType,
    itemsById: itemsById,
    itemsByParentId: itemsByParentId,
  };
}

function buildItemTypeMethods(repo) {
  var result = {};
  var singletonKeys = repo.singleInstanceItemTypes.map(function(t) {
    return t.apiKey;
  });
  var collectionKeys = repo.collectionItemTypes.map(function(t) {
    return (0, _pluralize['default'])(t.apiKey);
  });
  var clashingKeys = singletonKeys.filter(function(k) {
    return collectionKeys.includes(k);
  });
  repo.itemTypes.forEach(function(itemType) {
    var singleton = itemType.singleton,
      modularBlock = itemType.modularBlock;

    if (modularBlock) {
      return;
    }

    var pluralizedApiKey = (0, _pluralize['default'])(itemType.apiKey);
    var method = (0, _humps.camelize)(
      singleton ? itemType.apiKey : pluralizedApiKey,
    );

    if (clashingKeys.includes(pluralizedApiKey)) {
      var suffix = singleton ? 'Instance' : 'Collection';
      method += suffix;
    }

    result[itemType.apiKey] = method;
  });
  return result;
}

function buildCache(repo) {
  var itemTypeMethods = buildItemTypeMethods(repo);

  var _buildCollectionsByTy = buildCollectionsByType(repo, itemTypeMethods),
    collectionsByType = _buildCollectionsByTy.collectionsByType,
    itemsById = _buildCollectionsByTy.itemsById,
    itemsByParentId = _buildCollectionsByTy.itemsByParentId;

  return {
    collectionsByType: collectionsByType,
    itemsById: itemsById,
    itemTypeMethods: itemTypeMethods,
    itemsByParentId: itemsByParentId,
  };
}

var ItemsRepo = /*#__PURE__*/ (function() {
  function ItemsRepo(entitiesRepo) {
    var _this = this;

    _classCallCheck(this, ItemsRepo);

    this.entitiesRepo = entitiesRepo;

    var _buildCache = buildCache(this),
      collectionsByType = _buildCache.collectionsByType,
      itemsById = _buildCache.itemsById,
      itemTypeMethods = _buildCache.itemTypeMethods,
      itemsByParentId = _buildCache.itemsByParentId;

    this.collectionsByType = collectionsByType;
    this.itemsById = itemsById;
    this.itemsByParentId = itemsByParentId;
    this.itemTypeMethods = itemTypeMethods;
    Object.values(itemTypeMethods).forEach(function(method) {
      Object.defineProperty(_this, method, {
        get: function get() {
          return collectionsByType[method];
        },
      });
    });
  }

  _createClass(ItemsRepo, [
    {
      key: 'site',
      get: function get() {
        return new _Site['default'](this.entitiesRepo.site, this);
      },
    },
    {
      key: 'itemTypes',
      get: function get() {
        return this.entitiesRepo.findEntitiesOfType('item_type');
      },
    },
    {
      key: 'singleInstanceItemTypes',
      get: function get() {
        return this.itemTypes.filter(function(t) {
          return t.singleton;
        });
      },
    },
    {
      key: 'collectionItemTypes',
      get: function get() {
        return this.itemTypes.filter(function(t) {
          return !t.singleton && !t.modularBlock;
        });
      },
    },
    {
      key: 'find',
      value: function find(id) {
        return this.itemsById[id];
      },
    },
    {
      key: 'childrenOf',
      value: function childrenOf(id) {
        return this.itemsByParentId[id] || [];
      },
    },
    {
      key: 'itemsOfType',
      value: function itemsOfType(itemType) {
        var method = this.itemTypeMethods[itemType.apiKey];

        if (itemType.singleton) {
          var item = this.collectionsByType[method];
          return [item];
        }

        return this.collectionsByType[method];
      },
    },
  ]);

  return ItemsRepo;
})();

exports['default'] = ItemsRepo;
