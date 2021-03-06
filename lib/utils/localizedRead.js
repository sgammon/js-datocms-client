'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = localizedRead;

function localizedRead(entity, key, localized, i18n) {
  var hash = entity[key];

  if (localized && hash) {
    var fallbacks = i18n.fallbacks || {};
    var locales = [i18n.locale].concat(fallbacks[i18n.locale] || []);
    var localeWithValue = locales.find(function(locale) {
      var localeValue = hash[locale];
      return (
        localeValue !== null && localeValue !== undefined && localeValue !== ''
      );
    });
    return localeWithValue ? hash[localeWithValue] : null;
  }

  return hash;
}
