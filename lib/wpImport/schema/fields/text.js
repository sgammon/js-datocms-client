'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = text;

var _inflected = require('inflected');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

function text(_x, _x2, _x3) {
  return _text.apply(this, arguments);
}

function _text() {
  _text = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(
      itemType,
      dato,
      apiKey,
    ) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              return _context.abrupt(
                'return',
                dato.fields.create(itemType.id, {
                  apiKey: apiKey,
                  label: (0, _inflected.titleize)(apiKey),
                  appearance: {
                    editor: 'wysiwyg',
                    parameters: {
                      toolbar: [
                        'format',
                        'bold',
                        'italic',
                        'strikethrough',
                        'ordered_list',
                        'unordered_list',
                        'quote',
                        'table',
                        'link',
                        'image',
                        'show_source',
                      ],
                    },
                    addons: [],
                  },
                  fieldType: 'text',
                }),
              );

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    }),
  );
  return _text.apply(this, arguments);
}
