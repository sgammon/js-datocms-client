'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = faviconTagsBuilder;

var _buildFileUrl = _interopRequireDefault(require('./buildFileUrl'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) ||
        arr['@@iterator'];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var tag = function tag(tagName, attributes) {
  return {
    tagName: tagName,
    attributes: attributes,
  };
};

var metaTag = function metaTag(name, content) {
  return tag('meta', {
    name: name,
    content: content,
  });
};

var url = function url(favicon, entitiesRepo, params) {
  var upload = entitiesRepo.findEntity('upload', favicon);
  return (0, _buildFileUrl['default'])(upload, entitiesRepo, params);
};

var builders = {
  apple: function apple(entitiesRepo) {
    var site = entitiesRepo.site;
    if (!site.favicon) return undefined;
    return [57, 60, 72, 76, 114, 120, 144, 152, 180].map(function(size) {
      return tag('link', {
        rel: 'apple-touch-icon',
        sizes: ''.concat(size, 'x').concat(size),
        href: url(site.favicon, entitiesRepo, {
          w: size,
          h: size,
        }),
      });
    });
  },
  windows: function windows(entitiesRepo) {
    var site = entitiesRepo.site;
    if (!site.favicon) return undefined;
    return [
      [70, 70],
      [150, 150],
      [310, 310],
      [310, 150],
    ].map(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        w = _ref2[0],
        h = _ref2[1];

      return metaTag(
        'msapplication-square'.concat(w, 'x').concat(h),
        url(site.favicon, entitiesRepo, {
          w: w,
          h: h,
        }),
      );
    });
  },
  icon: function icon(entitiesRepo) {
    var site = entitiesRepo.site;
    if (!site.favicon) return undefined;
    var upload = entitiesRepo.findEntity('upload', site.favicon);
    if (!upload) return undefined;
    return [16, 32, 96, 192].map(function(size) {
      return tag('link', {
        rel: 'icon',
        sizes: ''.concat(size, 'x').concat(size),
        href: url(site.favicon, entitiesRepo, {
          w: size,
          h: size,
        }),
        type: 'image/'.concat(upload.format === 'jpg' ? 'jpeg' : upload.format),
      });
    });
  },
  appName: function appName(entitiesRepo) {
    var site = entitiesRepo.site;
    if (!site.name) return undefined;
    return metaTag('application-name', site.name);
  },
};

function faviconTagsBuilder(entitiesRepo) {
  return Object.values(builders).reduce(function(acc, builder) {
    var result = builder(entitiesRepo);

    if (result) {
      if (Array.isArray(result)) {
        return [].concat(acc, result);
      }

      return [].concat(acc, [result]);
    }

    return acc;
  }, []);
}
