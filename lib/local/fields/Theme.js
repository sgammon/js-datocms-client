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

var Theme = /*#__PURE__*/ (function() {
  function Theme(value, _ref) {
    var imgixHost = _ref.imgixHost,
      itemsRepo = _ref.itemsRepo;

    _classCallCheck(this, Theme);

    this.value = value;
    this.imgixHost = imgixHost;
    this.itemsRepo = itemsRepo;
  }

  _createClass(Theme, [
    {
      key: 'primaryColor',
      get: function get() {
        return this.value.primaryColor;
      },
    },
    {
      key: 'lightColor',
      get: function get() {
        return this.value.lightColor;
      },
    },
    {
      key: 'darkColor',
      get: function get() {
        return this.value.darkColor;
      },
    },
    {
      key: 'accentColor',
      get: function get() {
        return this.value.accentColor;
      },
    },
    {
      key: 'logo',
      get: function get() {
        var imgixHost = this.imgixHost,
          itemsRepo = this.itemsRepo;
        return (
          this.value.logo &&
          new _UploadId['default'](this.value.logo, {
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
          logo: this.logo && this.logo.toMap(),
          primaryColor: this.primaryColor,
          lightColor: this.lightColor,
          darkColor: this.darkColor,
          accentColor: this.accentColor,
        };
      },
    },
  ]);

  return Theme;
})();

exports['default'] = Theme;
