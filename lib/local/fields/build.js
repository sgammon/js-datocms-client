'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = build;

var _File = _interopRequireDefault(require('./File'));

var _Seo = _interopRequireDefault(require('./Seo'));

var _StructuredText = _interopRequireDefault(require('./StructuredText'));

var _Links = _interopRequireDefault(require('./Links'));

var _DateTime = _interopRequireDefault(require('./DateTime'));

var _DateOnly = _interopRequireDefault(require('./DateOnly'));

var _Gallery = _interopRequireDefault(require('./Gallery'));

var _Color = _interopRequireDefault(require('./Color'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function() {}),
    );
    return true;
  } catch (e) {
    return false;
  }
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
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

var fieldTypeParser = {
  date: function date(value) {
    if (!value) {
      return value;
    }

    return new _DateOnly['default'](Date.parse(value));
  },
  date_time: function date_time(value) {
    if (!value) {
      return value;
    }

    return new _DateTime['default'](Date.parse(value));
  },
  link: function link(value, _ref) {
    var itemsRepo = _ref.itemsRepo;

    if (!value) {
      return value;
    }

    return value && itemsRepo.find(value);
  },
  links: function links(value, _ref2) {
    var itemsRepo = _ref2.itemsRepo;
    var items = value
      ? value.map(function(id) {
          return itemsRepo.find(id);
        })
      : [];
    return _construct(_Links['default'], _toConsumableArray(items));
  },
  rich_text: function rich_text(value, _ref3) {
    var itemsRepo = _ref3.itemsRepo;
    var items = value
      ? value.map(function(id) {
          return itemsRepo.find(id);
        })
      : [];
    return _construct(_Links['default'], _toConsumableArray(items));
  },
  gallery: function gallery(value, _ref4) {
    var _this = this;

    var imgixHost = _ref4.imgixHost,
      itemsRepo = _ref4.itemsRepo;
    var images = value
      ? value.map(function(data) {
          return _this.file(data, {
            imgixHost: imgixHost,
            itemsRepo: itemsRepo,
          });
        })
      : [];
    return _construct(_Gallery['default'], _toConsumableArray(images));
  },
  file: function file(value, _ref5) {
    var imgixHost = _ref5.imgixHost,
      itemsRepo = _ref5.itemsRepo;

    if (!value) {
      return value;
    }

    return new _File['default'](value, {
      itemsRepo: itemsRepo,
      imgixHost: imgixHost,
    });
  },
  color: function color(value) {
    if (!value) {
      return value;
    }

    return new _Color['default'](value);
  },
  seo: function seo(value, _ref6) {
    var itemsRepo = _ref6.itemsRepo;

    if (!value) {
      return value;
    }

    return new _Seo['default'](value, {
      itemsRepo: itemsRepo,
    });
  },
  json: function json(value) {
    if (!value) {
      return value;
    }

    return JSON.parse(value);
  },
  structured_text: function structured_text(value, _ref7) {
    var itemsRepo = _ref7.itemsRepo;

    if (!value) {
      return value;
    }

    return new _StructuredText['default'](value, {
      itemsRepo: itemsRepo,
    });
  },
};

function build(fieldType, value, itemsRepo) {
  if (fieldTypeParser[fieldType]) {
    return fieldTypeParser[fieldType](value, {
      itemsRepo: itemsRepo,
      imgixHost: itemsRepo.site.imgixHost,
    });
  }

  return value;
}
