'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _buildFileUrl = _interopRequireDefault(require('../../utils/buildFileUrl'));

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

var UploadId = /*#__PURE__*/ (function() {
  function UploadId(value, _ref) {
    var itemsRepo = _ref.itemsRepo,
      imgixHost = _ref.imgixHost;

    _classCallCheck(this, UploadId);

    this.imgixHost = imgixHost;
    this.itemsRepo = itemsRepo;
    this.upload = itemsRepo.entitiesRepo.findEntity('upload', value);
  }

  _createClass(UploadId, [
    {
      key: 'path',
      get: function get() {
        return this.upload.path;
      },
    },
    {
      key: 'format',
      get: function get() {
        return this.upload.format;
      },
    },
    {
      key: 'size',
      get: function get() {
        return this.upload.size;
      },
    },
    {
      key: 'width',
      get: function get() {
        return this.upload.width;
      },
    },
    {
      key: 'height',
      get: function get() {
        return this.upload.height;
      },
    },
    {
      key: 'url',
      value: function url() {
        var params =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : {};
        return (0, _buildFileUrl['default'])(
          this.upload,
          this.itemsRepo.entitiesRepo,
          params,
        );
      },
    },
    {
      key: 'toMap',
      value: function toMap() {
        return {
          format: this.format,
          size: this.size,
          width: this.width,
          height: this.height,
          url: this.url(),
        };
      },
    },
  ]);

  return UploadId;
})();

exports['default'] = UploadId;
