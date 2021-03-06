'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;
var currentLocale = 'en';
var _default = {
  availableLocales: ['en'],
  fallbacks: {},

  get locale() {
    return currentLocale;
  },

  set locale(value) {
    if (this.availableLocales.includes(value)) {
      currentLocale = value;
    } else {
      throw new Error('Invalid locale '.concat(value));
    }
  },

  withLocale: function withLocale(locale, fn) {
    var oldLocale = currentLocale;
    this.locale = locale;
    var result = fn();
    this.locale = oldLocale;
    return result;
  },
};
exports['default'] = _default;
