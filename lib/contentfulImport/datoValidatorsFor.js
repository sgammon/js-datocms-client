'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = createFields;

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

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it =
    (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator'];
  if (!it) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === 'number')
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F,
      };
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it['return'] != null) it['return']();
      } finally {
        if (didErr) throw err;
      }
    },
  };
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

var datoValidatorsForString = function datoValidatorsForString(_ref) {
  var field = _ref.field;
  var validators = {};

  if (field.required) {
    validators.required = {};
  }

  var _iterator = _createForOfIteratorHelper(field.validations),
    _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var validation = _step.value;

      if (Object.prototype.hasOwnProperty.call(validation, 'size')) {
        validators.length = {};

        if (
          validation.size.min &&
          validation.size.min === validation.size.max
        ) {
          validators.length.eq = validation.size.min.toString();
        } else {
          if (![null, undefined].includes(validation.size.min)) {
            validators.length.min = validation.size.min.toString();
          }

          if (![null, undefined].includes(validation.size.max)) {
            validators.length.max = validation.size.max.toString();
          }
        }
      }

      if (Object.prototype.hasOwnProperty.call(validation, 'unique')) {
        validators.unique = {};
      }

      if (Object.prototype.hasOwnProperty.call(validation, 'in')) {
        validators['enum'] = {
          values: validation['in'],
        };
      }

      if (Object.prototype.hasOwnProperty.call(validation, 'regexp')) {
        validators.format = {
          customPattern: validation.regexp.pattern,
        };
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return validators;
};

var datoValidatorsForInteger = function datoValidatorsForInteger(_ref2) {
  var field = _ref2.field;
  var validators = {};

  if (field.required) {
    validators.required = {};
  }

  var _iterator2 = _createForOfIteratorHelper(field.validations),
    _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var validation = _step2.value;

      if (Object.prototype.hasOwnProperty.call(validation, 'range')) {
        validators.numberRange = {};

        if (![null, undefined].includes(validation.range.min)) {
          validators.numberRange.min = validation.range.min.toString();
        }

        if (![null, undefined].includes(validation.range.max)) {
          validators.numberRange.max = validation.range.max.toString();
        }
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return validators;
};

var datoValidatorsForDate = function datoValidatorsForDate(_ref3) {
  var field = _ref3.field;
  var validators = {};

  if (field.required) {
    validators.required = {};
  }

  var _iterator3 = _createForOfIteratorHelper(field.validations),
    _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
      var validation = _step3.value;

      if (Object.prototype.hasOwnProperty.call(validation, 'dateRange')) {
        validators.dateRange = {
          min: validation.dateRange.min,
          max: validation.dateRange.max,
        };
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  return validators;
};

var datoValidatorsForAsset = function datoValidatorsForAsset(_ref4) {
  var field = _ref4.field;
  var validators = {};

  if (field.required) {
    validators.required = {};
  }

  var _iterator4 = _createForOfIteratorHelper(field.validations),
    _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
      var validation = _step4.value;

      if (Object.prototype.hasOwnProperty.call(validation, 'assetFileSize')) {
        if (
          Object.prototype.hasOwnProperty.call(validation.assetFileSize, 'min')
        ) {
          validators.file_size = _objectSpread(
            _objectSpread({}, validators.file_size),
            {},
            {
              min_value: validation.assetFileSize.min,
              min_unit: validation.assetFileSize.min ? 'B' : null,
            },
          );
        }

        if (
          Object.prototype.hasOwnProperty.call(validation.assetFileSize, 'max')
        ) {
          validators.file_size = _objectSpread(
            _objectSpread({}, validators.file_size),
            {},
            {
              max_value: validation.assetFileSize.max,
              max_unit: validation.assetFileSize.max ? 'B' : null,
            },
          );
        }
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  return validators;
};

var datoValidatorsForArray = function datoValidatorsForArray(_ref5) {
  var field = _ref5.field;
  var validators = {};

  var _iterator5 = _createForOfIteratorHelper(field.validations),
    _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
      var validation = _step5.value;

      if (Object.prototype.hasOwnProperty.call(validation, 'size')) {
        validators.size = {};

        if (
          validation.size.min &&
          validation.size.min === validation.size.max
        ) {
          validators.size.eq = validation.size.min.toString();
        } else {
          if (![null, undefined].includes(validation.size.min)) {
            validators.size.min = validation.size.min.toString();
          }

          if (![null, undefined].includes(validation.size.max)) {
            validators.size.max = validation.size.max.toString();
          }
        }
      }
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  return validators;
};

function createFields(field) {
  switch (field.type) {
    case 'Symbol':
    case 'Text':
      return datoValidatorsForString({
        field: field,
      });

    case 'Date':
      return datoValidatorsForDate({
        field: field,
      });

    case 'Integer':
    case 'Number':
      return datoValidatorsForInteger({
        field: field,
      });

    case 'Link':
      switch (field.linkType) {
        case 'Asset':
          return datoValidatorsForAsset({
            field: field,
          });

        default:
          return {};
      }

    case 'Array':
      switch (field.items.linkType) {
        case 'Asset':
        case 'Entry':
          return datoValidatorsForArray({
            field: field,
          });

        case 'Symbol':
          return datoValidatorsForString({
            field: field,
          });

        default:
          return datoValidatorsForString({
            field: field,
          });
      }

    case 'Boolean':
    default:
      return {};
  }
}
