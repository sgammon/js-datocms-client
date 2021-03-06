'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = uploadFile;

var _createUploadPath = _interopRequireDefault(require('./createUploadPath'));

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

function uploadFile(client, source) {
  var uploadAttributes =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var fieldAttributes =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var options =
    arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var uploadPathPromise = (0, _createUploadPath['default'])(
    client,
    source,
    options,
  );
  var promise = uploadPathPromise
    .then(function(path) {
      return client.uploads.create(
        _objectSpread(
          _objectSpread({}, uploadAttributes),
          {},
          {
            path: path,
          },
        ),
      );
    })
    .then(function(upload) {
      return Promise.resolve(
        _objectSpread(
          _objectSpread(
            {
              alt: null,
              title: null,
              customData: {},
            },
            fieldAttributes,
          ),
          {},
          {
            uploadId: upload.id,
          },
        ),
      );
    });
  promise.cancel = uploadPathPromise.cancel;
  return promise;
}
