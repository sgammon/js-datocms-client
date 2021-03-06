'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = subscribeToChannel;

var _pusherJs = _interopRequireDefault(require('pusher-js'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var PUSHER_API_KEY = '75e6ef0fe5d39f481626';
var channels = {};

function subscribeToChannel(client, siteId, environment) {
  var cacheKey = ''.concat(siteId, '--').concat(environment || 'primary');
  var cachedPromise = channels[cacheKey];

  if (cachedPromise) {
    return cachedPromise;
  }

  var promise = (siteId
    ? Promise.resolve(siteId)
    : client.site.find().then(function(site) {
        return site.id;
      })
  ).then(function(realSiteId) {
    return new Promise(function(resolve, reject) {
      var pusher = new _pusherJs['default'](PUSHER_API_KEY, {
        authEndpoint: ''.concat(
          client.rawClient.baseUrl,
          '/pusher/authenticate',
        ),
        auth: {
          headers: {
            Authorization: 'Bearer '.concat(client.rawClient.token),
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      });
      var channelName = environment
        ? 'private-site-'
            .concat(realSiteId, '-environment-')
            .concat(environment)
        : 'private-site-'.concat(realSiteId);
      var channel = pusher.subscribe(channelName);
      channel.bind('pusher:subscription_error', function() {
        reject(new Error('Could not subscribe to real-time events!'));
      });
      channel.bind('pusher:subscription_succeeded', function() {
        resolve([
          channel,
          function() {
            channels[cacheKey] = null;
            return pusher.disconnect();
          },
        ]);
      });
    });
  });
  channels[cacheKey] = promise;
  return promise;
}
