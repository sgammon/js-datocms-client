'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _UploadId = _interopRequireDefault(require('./fields/UploadId'));

var _Theme = _interopRequireDefault(require('./fields/Theme'));

var _GlobalSeo = _interopRequireDefault(require('./fields/GlobalSeo'));

var _faviconTagsBuilder = _interopRequireDefault(
  require('../utils/faviconTagsBuilder'),
);

var _localizedRead = _interopRequireDefault(require('../utils/localizedRead'));

var _i18n = _interopRequireDefault(require('../utils/i18n'));

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

var Site = /*#__PURE__*/ (function() {
  function Site(entity, itemsRepo) {
    _classCallCheck(this, Site);

    this.entity = entity;
    this.itemsRepo = itemsRepo;
  }

  _createClass(Site, [
    {
      key: 'id',
      get: function get() {
        return this.entity.id;
      },
    },
    {
      key: 'name',
      get: function get() {
        return this.entity.name;
      },
    },
    {
      key: 'locales',
      get: function get() {
        return this.entity.locales;
      },
    },
    {
      key: 'theme',
      get: function get() {
        return this.readAttribute('theme', _Theme['default'], false);
      },
    },
    {
      key: 'domain',
      get: function get() {
        return this.entity.domain;
      },
    },
    {
      key: 'imgixHost',
      get: function get() {
        return this.entity.imgixHost;
      },
    },
    {
      key: 'internalDomain',
      get: function get() {
        return this.entity.internalDomain;
      },
    },
    {
      key: 'noIndex',
      get: function get() {
        return this.entity.noIndex;
      },
    },
    {
      key: 'globalSeo',
      get: function get() {
        return this.readAttribute(
          'globalSeo',
          _GlobalSeo['default'],
          this.locales.length > 1,
        );
      },
    },
    {
      key: 'favicon',
      get: function get() {
        return this.readAttribute('favicon', _UploadId['default'], false);
      },
    },
    {
      key: 'faviconMetaTags',
      get: function get() {
        return (0, _faviconTagsBuilder['default'])(this.entity.repo);
      },
    },
    {
      key: 'toMap',
      value: function toMap() {
        var _this = this;

        var fields = [
          'id',
          'name',
          'locales',
          'theme',
          'domain',
          'internalDomain',
          'noIndex',
          'globalSeo',
          'favicon',
          'faviconMetaTags',
        ];
        return fields.reduce(function(acc, field) {
          var value = _this[field];

          if (value && value.toMap) {
            value = value.toMap();
          }

          return Object.assign(acc, _defineProperty({}, field, value));
        }, {});
      },
    },
    {
      key: 'readAttribute',
      value: function readAttribute(attribute, TypeKlass, localized) {
        var value = (0, _localizedRead['default'])(
          this.entity,
          attribute,
          localized,
          _i18n['default'],
        );
        return (
          value &&
          new TypeKlass(value, {
            imgixHost: this.imgixHost,
            itemsRepo: this.itemsRepo,
          })
        );
      },
    },
  ]);

  return Site;
})();

exports['default'] = Site;
