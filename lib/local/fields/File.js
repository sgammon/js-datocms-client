'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _buildFileUrl = _interopRequireDefault(require('../../utils/buildFileUrl'));

var _i18n = _interopRequireDefault(require('../../utils/i18n'));

var _Color = _interopRequireDefault(require('./Color'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key),
        );
      });
    }
  }
  return target;
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

var VideoAttributes = /*#__PURE__*/ (function() {
  function VideoAttributes(upload) {
    _classCallCheck(this, VideoAttributes);

    this.upload = upload;
  }

  _createClass(VideoAttributes, [
    {
      key: 'muxPlaybackId',
      get: function get() {
        return this.upload.muxPlaybackId;
      },
    },
    {
      key: 'framerate',
      get: function get() {
        return this.upload.frameRate;
      },
    },
    {
      key: 'duration',
      get: function get() {
        return this.upload.duration;
      },
    },
    {
      key: 'streamingUrl',
      get: function get() {
        return 'https://stream.mux.com/'.concat(
          this.upload.muxPlaybackId,
          '.m3u8',
        );
      },
    },
    {
      key: 'thumbnailUrl',
      value: function thumbnailUrl() {
        var format =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : 'jpg';

        if (format === 'gif') {
          return 'https://image.mux.com/'.concat(
            this.upload.muxPlaybackId,
            '/animated.gif',
          );
        }

        return 'https://image.mux.com/'
          .concat(this.upload.muxPlaybackId, '/thumbnail.')
          .concat(format);
      },
    },
    {
      key: 'mp4Url',
      value: function mp4Url(options) {
        if (!this.upload.muxMp4HighestRes) {
          return null;
        }

        if (options && options.exactRes) {
          if (options.exactRes === 'low') {
            return 'https://stream.mux.com/'.concat(
              this.upload.muxPlaybackId,
              '/low.mp4',
            );
          }

          if (options.exactRes === 'medium') {
            return ['medium', 'high'].includes(this.upload.muxMp4HighestRes)
              ? 'https://stream.mux.com/'.concat(
                  this.upload.muxPlaybackId,
                  '/medium.mp4',
                )
              : null;
          }

          if (this.upload.muxMp4HighestRes === 'high') {
            return 'https://stream.mux.com/'.concat(
              this.upload.muxPlaybackId,
              '/high.mp4',
            );
          }

          return null;
        }

        if (options && options.res === 'low') {
          return 'https://stream.mux.com/'.concat(
            this.upload.muxPlaybackId,
            '/low.mp4',
          );
        }

        if (options && options.res === 'medium') {
          if (['low', 'medium'].includes(this.upload.muxMp4HighestRes)) {
            return 'https://stream.mux.com/'
              .concat(this.upload.muxPlaybackId, '/')
              .concat(this.upload.muxMp4HighestRes, '.mp4');
          }

          return 'https://stream.mux.com/'.concat(
            this.upload.muxPlaybackId,
            '/medium.mp4',
          );
        }

        return 'https://stream.mux.com/'
          .concat(this.upload.muxPlaybackId, '/')
          .concat(this.upload.muxMp4HighestRes, '.mp4');
      },
    },
    {
      key: 'toMap',
      value: function toMap() {
        return {
          muxPlaybackId: this.muxPlaybackId,
          framerate: this.framerate,
          duration: this.duration,
          streamingUrl: this.streamingUrl,
          thumbnailUrl: this.thumbnailUrl(),
          mp4Url: this.mp4Url(),
        };
      },
    },
  ]);

  return VideoAttributes;
})();

var File = /*#__PURE__*/ (function() {
  function File(value, _ref) {
    var itemsRepo = _ref.itemsRepo,
      imgixHost = _ref.imgixHost;

    _classCallCheck(this, File);

    this.value = value;
    this.imgixHost = imgixHost;
    this.itemsRepo = itemsRepo;
    this.upload = itemsRepo.entitiesRepo.findEntity('upload', value.uploadId);
  }

  _createClass(File, [
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
      key: 'author',
      get: function get() {
        return this.upload.author;
      },
    },
    {
      key: 'notes',
      get: function get() {
        return this.upload.notes;
      },
    },
    {
      key: 'copyright',
      get: function get() {
        return this.upload.copyright;
      },
    },
    {
      key: 'alt',
      get: function get() {
        return (
          this.value.alt ||
          this.upload.defaultFieldMetadata[_i18n['default'].locale].alt
        );
      },
    },
    {
      key: 'title',
      get: function get() {
        return (
          this.value.title ||
          this.upload.defaultFieldMetadata[_i18n['default'].locale].title
        );
      },
    },
    {
      key: 'tags',
      get: function get() {
        return this.upload.tags;
      },
    },
    {
      key: 'smartTags',
      get: function get() {
        return this.upload.smartTags;
      },
    },
    {
      key: 'isImage',
      get: function get() {
        return this.upload.isImage;
      },
    },
    {
      key: 'exifInfo',
      get: function get() {
        return this.upload.exifInfo;
      },
    },
    {
      key: 'mimeType',
      get: function get() {
        return this.upload.mimeType;
      },
    },
    {
      key: 'colors',
      get: function get() {
        return this.upload.colors.map(function(color) {
          return new _Color['default'](color);
        });
      },
    },
    {
      key: 'blurhash',
      get: function get() {
        return this.upload.blurhash;
      },
    },
    {
      key: 'video',
      get: function get() {
        return new VideoAttributes(this.upload);
      },
    },
    {
      key: 'customData',
      get: function get() {
        return Object.assign(
          this.value.customData,
          this.upload.defaultFieldMetadata[_i18n['default'].locale].customData,
        );
      },
    },
    {
      key: 'focalPoint',
      get: function get() {
        return (
          this.value.focalPoint ||
          this.upload.defaultFieldMetadata[_i18n['default'].locale].focalPoint
        );
      },
    },
    {
      key: 'url',
      value: function url() {
        var query =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : {};

        var queryWithFocalPoint = _objectSpread({}, query);

        if (
          this.focalPoint &&
          query.fit === 'crop' &&
          (query.h || query.height) &&
          (query.w || query.width) &&
          (!query.crop || query.crop === 'focalpoint') &&
          !query['fp-x'] &&
          !query['fp-y']
        ) {
          queryWithFocalPoint.crop = 'focalpoint';
          queryWithFocalPoint['fp-x'] = this.focalPoint.x;
          queryWithFocalPoint['fp-y'] = this.focalPoint.y;
        }

        return (0, _buildFileUrl['default'])(
          this.upload,
          this.itemsRepo.entitiesRepo,
          queryWithFocalPoint,
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
          title: this.title,
          alt: this.alt,
          url: this.url(),
          customData: this.customData,
          focalPoint: this.focalPoint,
          copyright: this.copyright,
          tags: this.tags,
          smartTags: this.smartTags,
          filename: this.filename,
          basename: this.basename,
          isImage: this.isImage,
          exifInfo: this.exifInfo,
          mimeType: this.mimeType,
          colors: this.colors.map(function(c) {
            return c.toMap();
          }),
          blurhash: this.blurhash,
          video: this.video && this.video.toMap(),
        };
      },
    },
  ]);

  return File;
})();

exports['default'] = File;
