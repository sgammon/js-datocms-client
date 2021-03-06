'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = buildFileUrl;

var _querystring = _interopRequireDefault(require('querystring'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function buildFileUrl(uploadEntity, entitiesRepo) {
  var params =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!uploadEntity) {
    return null;
  }

  var imgixHost = entitiesRepo.site.imgixHost;
  var path = uploadEntity.path;

  if (params && Object.keys(params).length > 0) {
    return 'https://'
      .concat(imgixHost)
      .concat(path, '?')
      .concat(_querystring['default'].stringify(params));
  }

  return 'https://'.concat(imgixHost).concat(path);
}
