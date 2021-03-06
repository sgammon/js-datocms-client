'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = nodeLocal;

var _got = _interopRequireDefault(require('got'));

var _path = _interopRequireDefault(require('path'));

var _fs = _interopRequireDefault(require('fs'));

var _mimeTypes = _interopRequireDefault(require('mime-types'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function uploadToS3(url, filePath, _ref) {
  var onProgress = _ref.onProgress;

  var totalLength = _fs['default'].statSync(filePath).size;

  var isCancelled = false;

  var promise = _got['default'].put(url, {
    headers: {
      'Content-Type': _mimeTypes['default'].lookup(filePath),
      'Content-Length': totalLength,
    },
    responseType: 'json',
    body: _fs['default'].createReadStream(filePath),
  });

  if (typeof onProgress === 'function') {
    promise.on('uploadProgress', function(_ref2) {
      var percent = _ref2.percent;

      if (!isCancelled) {
        onProgress({
          type: 'upload',
          payload: {
            percent: Math.round(percent * 100),
          },
        });
      }
    });
  }

  return {
    promise: promise['catch'](function(error) {
      if (error instanceof _got['default'].CancelError) {
        throw new Error('upload aborted');
      }

      throw error;
    }),
    cancel: function cancel() {
      isCancelled = true;
      promise.cancel();
    },
  };
}

function nodeLocal(client, filePath, options) {
  var isCancelled = false;

  var _cancel = function cancel() {
    isCancelled = true;
  };

  var promise = client.uploadRequest
    .create({
      filename: options.filename || _path['default'].basename(filePath),
    })
    .then(function(_ref3) {
      var id = _ref3.id,
        url = _ref3.url;

      if (isCancelled) {
        return Promise.reject(new Error('upload aborted'));
      }

      if (options.onProgress) {
        options.onProgress({
          type: 'uploadRequestComplete',
          payload: {
            id: id,
            url: url,
          },
        });
      }

      var _uploadToS = uploadToS3(url, filePath, {
          onProgress: options.onProgress,
        }),
        uploadPromise = _uploadToS.promise,
        cancelUpload = _uploadToS.cancel;

      _cancel = cancelUpload;
      return uploadPromise.then(function() {
        return id;
      });
    });
  return {
    promise: promise,
    cancel: function cancel() {
      return _cancel();
    },
  };
}
