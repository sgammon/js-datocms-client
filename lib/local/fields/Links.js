'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = Links;

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

/* eslint-disable no-proto */
function Links() {
  for (
    var _len = arguments.length, args = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    args[_key] = arguments[_key];
  }

  var instance = _construct(Array, args);

  instance.__proto__ = Links.prototype;
  return instance;
}

Links.prototype = Object.create(Array.prototype);

Links.prototype.toMap = function toMap() {
  var maxDepth =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
  var currentDepth =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return this.filter(function(item) {
    return !!item;
  }).map(function(item) {
    return item.toMap(maxDepth, currentDepth);
  });
};
