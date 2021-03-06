'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _Seo = _interopRequireDefault(require('./Seo'));

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

var GlobalSeo = /*#__PURE__*/ (function() {
  function GlobalSeo(value, _ref) {
    var imgixHost = _ref.imgixHost,
      itemsRepo = _ref.itemsRepo;

    _classCallCheck(this, GlobalSeo);

    this.value = value;
    this.imgixHost = imgixHost;
    this.itemsRepo = itemsRepo;
  }

  _createClass(GlobalSeo, [
    {
      key: 'siteName',
      get: function get() {
        return this.value.siteName;
      },
    },
    {
      key: 'titleSuffix',
      get: function get() {
        return this.value.titleSuffix;
      },
    },
    {
      key: 'twitterAccount',
      get: function get() {
        return this.value.twitterAccount;
      },
    },
    {
      key: 'twitterCard',
      get: function get() {
        return this.value.twitterCard;
      },
    },
    {
      key: 'facebookPageUrl',
      get: function get() {
        return this.value.facebookPageUrl;
      },
    },
    {
      key: 'fallbackSeo',
      get: function get() {
        var imgixHost = this.imgixHost,
          itemsRepo = this.itemsRepo;
        return (
          this.value.fallbackSeo &&
          new _Seo['default'](this.value.fallbackSeo, {
            imgixHost: imgixHost,
            itemsRepo: itemsRepo,
          })
        );
      },
    },
    {
      key: 'toMap',
      value: function toMap() {
        return {
          siteName: this.siteName,
          titleSuffix: this.titleSuffix,
          facebookPageUrl: this.facebookPageUrl,
          twitterCard: this.twitterCard,
          twitterAccount: this.twitterAccount,
          fallbackSeo: this.fallbackSeo && this.fallbackSeo.toMap(),
        };
      },
    },
  ]);

  return GlobalSeo;
})();

exports['default'] = GlobalSeo;
