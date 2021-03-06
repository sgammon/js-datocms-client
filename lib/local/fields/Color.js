'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

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

var Color = /*#__PURE__*/ (function() {
  function Color(value) {
    _classCallCheck(this, Color);

    this.value = value;
  }

  _createClass(Color, [
    {
      key: 'red',
      get: function get() {
        return this.value.red;
      },
    },
    {
      key: 'green',
      get: function get() {
        return this.value.green;
      },
    },
    {
      key: 'blue',
      get: function get() {
        return this.value.blue;
      },
    },
    {
      key: 'alpha',
      get: function get() {
        return this.value.alpha / 255.0;
      },
    },
    {
      key: 'rgb',
      get: function get() {
        if (this.value.alpha === 255) {
          return 'rgb('
            .concat(this.red, ', ')
            .concat(this.green, ', ')
            .concat(this.blue, ')');
        }

        return 'rgba('
          .concat(this.red, ', ')
          .concat(this.green, ', ')
          .concat(this.blue, ', ')
          .concat(this.alpha, ')');
      },
    },
    {
      key: 'hex',
      get: function get() {
        var hex = '#';
        var r = this.red.toString(16);
        var g = this.green.toString(16);
        var b = this.blue.toString(16);
        var a = parseInt(this.alpha * 255, 10).toString(16);
        if (r.length === 1) r = '0'.concat(r);
        if (g.length === 1) g = '0'.concat(g);
        if (b.length === 1) b = '0'.concat(b);
        if (a.length === 1) a = '0'.concat(a);
        hex += r + g + b;

        if (a !== 'ff') {
          hex += a;
        }

        return hex;
      },
    },
    {
      key: 'toMap',
      value: function toMap() {
        return {
          red: this.red,
          green: this.green,
          blue: this.blue,
          rgb: this.rgb,
          alpha: this.alpha,
          hex: this.hex,
        };
      },
    },
  ]);

  return Color;
})();

exports['default'] = Color;
