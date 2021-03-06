'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = browser;

function uploadToS3(file, url, _ref) {
  var onProgress = _ref.onProgress;
  var xhr = new XMLHttpRequest();
  var promise = new Promise(function(resolve, reject) {
    if (onProgress && xhr.upload) {
      xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) {
          var done = typeof e.loaded !== 'undefined' ? e.loaded : e.position;
          var total = typeof e.total !== 'undefined' ? e.total : e.totalSize;
          var percent = parseInt((done / total) * 100, 10);
          onProgress({
            type: 'upload',
            payload: {
              percent: percent,
            },
          });
        }
      };
    }

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve();
        } else {
          reject(new Error(xhr.status));
        }
      }
    };

    xhr.addEventListener('error', reject, false);

    xhr.onabort = function() {
      reject(new Error('upload aborted'));
    };

    xhr.open('PUT', url, true);
    xhr.send(file);
  });

  var cancel = function cancel() {
    xhr.onreadystatechange = null;
    xhr.abort();
  };

  return {
    promise: promise,
    cancel: cancel,
  };
}

function browser(client, file, _ref2) {
  var onProgress = _ref2.onProgress,
    filename = _ref2.filename;
  var isCancelled = false;

  var _cancel = function cancel() {
    isCancelled = true;
  };

  var promise = client.uploadRequest
    .create({
      filename: filename || file.name,
    })
    .then(function(_ref3) {
      var id = _ref3.id,
        url = _ref3.url;

      if (isCancelled) {
        return Promise.reject(new Error('upload aborted'));
      }

      if (onProgress) {
        onProgress({
          type: 'uploadRequestComplete',
          payload: {
            id: id,
            url: url,
          },
        });
      }

      var _uploadToS = uploadToS3(file, url, {
          onProgress: onProgress,
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
      _cancel();
    },
  };
}
