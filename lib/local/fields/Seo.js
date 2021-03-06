'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _UploadId = _interopRequireDefault(require('./UploadId'));

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

var Seo = /*#__PURE__*/ (function() {
  function Seo(value, _ref) {
    var itemsRepo = _ref.itemsRepo,
      imgixHost = _ref.imgixHost;

    _classCallCheck(this, Seo);

    this.value = value;
    this.imgixHost = imgixHost;
    this.itemsRepo = itemsRepo;
  }

  _createClass(Seo, [
    {
      key: 'title',
      get: function get() {
        return this.value.title;
      },
    },
    {
      key: 'description',
      get: function get() {
        return this.value.description;
      },
    },
    {
      key: 'twitterCard',
      get: function get() {
        return this.value.twitterCard;
      },
    },
    {
      key: 'image',
      get: function get() {
        var imgixHost = this.imgixHost,
          itemsRepo = this.itemsRepo;
        return (
          this.value.image &&
          new _UploadId['default'](this.value.image, {
            itemsRepo: itemsRepo,
            imgixHost: imgixHost,
          })
        );
      },
    },
    {
      key: 'toMap',
      value: function toMap() {
        return {
          title: this.title,
          description: this.description,
          twitterCard: this.twitterCard,
          image: this.image && this.image.toMap(),
        };
      },
    },
  ]);

  return Seo;
})();

exports['default'] = Seo;
