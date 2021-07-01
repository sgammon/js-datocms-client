'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = nodeUrl;

var _tmp = _interopRequireDefault(require('tmp'));

var _got = _interopRequireDefault(require('got'));

var _fs = _interopRequireDefault(require('fs'));

var _path = _interopRequireDefault(require('path'));

var _url = _interopRequireDefault(require('url'));

var _decode = _interopRequireDefault(require('../../utils/decode'));

var _nodeLocal = _interopRequireDefault(require('./nodeLocal'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function nodeUrl(client, fileUrl, options) {
  var isCancelled = false;

  var _cancel = function cancel() {
    isCancelled = true;
  };

  var promise = new Promise(function(resolve, reject) {
    if (isCancelled) {
      return reject(new Error('upload aborted'));
    }

    return _tmp['default'].dir(function(err, dir, cleanupCallback) {
      if (err) {
        cleanupCallback();
        reject(err);
        return;
      }

      if (isCancelled) {
        cleanupCallback();
        reject(new Error('upload aborted'));
        return;
      }

      var encodedFileUrl = (0, _decode['default'])(fileUrl);
      var request = (0, _got['default'])(encodedFileUrl, {
        responseType: 'buffer',
        maxRedirects: 10,
      });

      if (typeof options.onProgress === 'function') {
        request.on('downloadProgress', function(_ref) {
          var percent = _ref.percent;

          if (!isCancelled) {
            options.onProgress({
              type: 'download',
              payload: {
                percent: Math.round(percent * 100),
              },
            });
          }
        });
      }

      _cancel = function cancel() {
        isCancelled = true;
        request.cancel();
        cleanupCallback();
      };

      request
        .then(function(response) {
          var _url$parse = _url['default'].parse(
              (0, _decode['default'])(response.url),
            ),
            pathname = _url$parse.pathname;

          var filePath = _path['default'].join(
            dir,
            _path['default'].basename(pathname),
          );

          _fs['default'].writeFileSync(filePath, response.body);

          var _local = (0, _nodeLocal['default'])(client, filePath, options),
            uploadPromise = _local.promise,
            cancelUpload = _local.cancel;

          _cancel = function cancel() {
            cancelUpload();
          };

          return uploadPromise.then(
            function(result) {
              _fs['default'].unlinkSync(filePath);

              cleanupCallback();
              resolve(result);
            },
            function(error) {
              _fs['default'].unlinkSync(filePath);

              cleanupCallback();
              throw error;
            },
          );
        })
        ['catch'](function(error) {
          if (error instanceof _got['default'].CancelError) {
            reject(new Error('upload aborted'));
          } else if (error.response) {
            reject(
              new Error(
                'Invalid status code for '
                  .concat(encodedFileUrl, ': ')
                  .concat(error.response.statusCode),
              ),
            );
          } else {
            reject(error);
          }
        });
    });
  });
  return {
    promise: promise,
    cancel: function cancel() {
      _cancel();
    },
  };
}
