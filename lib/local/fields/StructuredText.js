'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _unistUtilVisit = _interopRequireDefault(require('unist-util-visit'));

var _datocmsStructuredTextUtils = require('datocms-structured-text-utils');

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

var uniq = function uniq(arr) {
  return arr.filter(function(item, index) {
    return arr.indexOf(item) >= index;
  });
};

var findAll = function findAll(document, predicate) {
  var result = [];
  (0, _unistUtilVisit['default'])(document, predicate, function(node) {
    result.push(node);
  });
  return result;
};

var StructuredText = /*#__PURE__*/ (function() {
  function StructuredText(value, _ref) {
    var itemsRepo = _ref.itemsRepo;

    _classCallCheck(this, StructuredText);

    this.value = value;
    this.itemsRepo = itemsRepo;
  }

  _createClass(StructuredText, [
    {
      key: 'blocks',
      get: function get() {
        var _this = this;

        return uniq(
          findAll(this.value.document, _datocmsStructuredTextUtils.isBlock).map(
            function(node) {
              return node.item;
            },
          ),
        ).map(function(id) {
          return _this.itemsRepo.find(id);
        });
      },
    },
    {
      key: 'links',
      get: function get() {
        var _this2 = this;

        return uniq(
          findAll(this.value.document, [
            _datocmsStructuredTextUtils.isInlineItem,
            _datocmsStructuredTextUtils.isItemLink,
          ]).map(function(node) {
            return node.item;
          }),
        ).map(function(id) {
          return _this2.itemsRepo.find(id);
        });
      },
    },
    {
      key: 'toMap',
      value: function toMap() {
        var maxDepth =
          arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
        var currentDepth =
          arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return {
          value: this.value,
          blocks: this.blocks.map(function(item) {
            return item.toMap(maxDepth, currentDepth);
          }),
          links: this.links.map(function(item) {
            return item.toMap(maxDepth, currentDepth);
          }),
        };
      },
    },
  ]);

  return StructuredText;
})();

exports['default'] = StructuredText;
