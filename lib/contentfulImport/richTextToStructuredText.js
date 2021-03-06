'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = _default;
exports.createStructuredTextAssetBlock = void 0;

var _datocmsContentfulToStructuredText = require('datocms-contentful-to-structured-text');

var _datocmsStructuredTextUtils = require('datocms-structured-text-utils');

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
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

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
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

var createItemLinkHandler = /*#__PURE__*/ (function() {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(
      createNode,
      node,
      context,
    ) {
      var isAllowedChild, children;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              isAllowedChild = _datocmsStructuredTextUtils.allowedChildren[
                context.parentNodeType
              ].includes('inlineNodes');
              _context.next = 3;
              return (0, _datocmsContentfulToStructuredText.visitChildren)(
                createNode,
                node,
                _objectSpread(
                  _objectSpread({}, context),
                  {},
                  {
                    parentNodeType: isAllowedChild
                      ? 'itemLink'
                      : context.parentNodeType,
                  },
                ),
              );

            case 3:
              children = _context.sent;
              return _context.abrupt('return', function(item) {
                return isAllowedChild && item
                  ? createNode('itemLink', {
                      item: item,
                      children: children,
                    })
                  : children;
              });

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    }),
  );

  return function createItemLinkHandler(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

var createInlineItemHandler = /*#__PURE__*/ (function() {
  var _ref2 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(
      createNode,
      node,
      context,
    ) {
      var isAllowedChild;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              isAllowedChild = _datocmsStructuredTextUtils.allowedChildren[
                context.parentNodeType
              ].includes('inlineNodes');
              return _context2.abrupt('return', function(item) {
                return isAllowedChild && item
                  ? createNode('inlineItem', {
                      item: item,
                    })
                  : createNode('span', {
                      value: '** Contentful entry missing or inaccessible: '.concat(
                        node.data.target.sys.id,
                        ' **',
                      ),
                    });
              });

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2);
    }),
  );

  return function createInlineItemHandler(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
})();

var createBlockHandler = /*#__PURE__*/ (function() {
  var _ref3 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(
      createNode,
      node,
      context,
      assetBlockId,
    ) {
      var isAllowedChild;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch ((_context3.prev = _context3.next)) {
            case 0:
              // assetBlockId is created on createFields
              isAllowedChild = _datocmsStructuredTextUtils.allowedChildren[
                context.parentNodeType
              ].includes('block');
              return _context3.abrupt('return', function(uploadId) {
                var payload = {
                  type: 'item',
                  attributes: {
                    file: uploadId
                      ? {
                          uploadId: uploadId,
                        }
                      : null,
                  },
                  relationships: {
                    item_type: {
                      data: {
                        id: assetBlockId,
                        type: 'item_type',
                      },
                    },
                  },
                };
                return isAllowedChild
                  ? createNode('block', {
                      item: payload,
                    })
                  : createNode('span', {
                      value: '** Contentful asset inaccessible: #'.concat(
                        node.data.target.sys.id,
                        ' **',
                      ),
                    });
              });

            case 2:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3);
    }),
  );

  return function createBlockHandler(_x7, _x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
})();

var createAssetLinkHandler = /*#__PURE__*/ (function() {
  var _ref4 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee4(
      createNode,
      node,
      context,
    ) {
      var isAllowedChild, children;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch ((_context4.prev = _context4.next)) {
            case 0:
              isAllowedChild = _datocmsStructuredTextUtils.allowedChildren[
                context.parentNodeType
              ].includes('inlineNodes');
              _context4.next = 3;
              return (0, _datocmsContentfulToStructuredText.visitChildren)(
                createNode,
                node,
                _objectSpread(
                  _objectSpread({}, context),
                  {},
                  {
                    parentNodeType: isAllowedChild
                      ? 'link'
                      : context.parentNodeType,
                  },
                ),
              );

            case 3:
              children = _context4.sent;
              return _context4.abrupt('return', function(assetUrl) {
                return isAllowedChild && assetUrl
                  ? createNode('link', {
                      url: assetUrl,
                      children: children,
                    })
                  : children;
              });

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4);
    }),
  );

  return function createAssetLinkHandler(_x11, _x12, _x13) {
    return _ref4.apply(this, arguments);
  };
})();

var createStructuredTextAssetBlock = /*#__PURE__*/ (function() {
  var _ref5 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee5(datoClient) {
      var contentfulAssetModularBlock;
      return regeneratorRuntime.wrap(
        function _callee5$(_context5) {
          while (1) {
            switch ((_context5.prev = _context5.next)) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return datoClient.itemTypes.find('structured_text_asset');

              case 3:
                contentfulAssetModularBlock = _context5.sent;
                _context5.next = 8;
                break;

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5['catch'](0);

              case 8:
                if (contentfulAssetModularBlock) {
                  _context5.next = 14;
                  break;
                }

                _context5.next = 11;
                return datoClient.itemTypes.create({
                  name: 'Structured Text asset',
                  apiKey: 'structured_text_asset',
                  modularBlock: true,
                });

              case 11:
                contentfulAssetModularBlock = _context5.sent;
                _context5.next = 14;
                return datoClient.fields.create(
                  contentfulAssetModularBlock.id,
                  {
                    label: 'File',
                    apiKey: 'file',
                    fieldType: 'file',
                  },
                );

              case 14:
                return _context5.abrupt(
                  'return',
                  contentfulAssetModularBlock.id,
                );

              case 15:
              case 'end':
                return _context5.stop();
            }
          }
        },
        _callee5,
        null,
        [[0, 6]],
      );
    }),
  );

  return function createStructuredTextAssetBlock(_x14) {
    return _ref5.apply(this, arguments);
  };
})();

exports.createStructuredTextAssetBlock = createStructuredTextAssetBlock;

var liftAssets = function liftAssets(richText) {
  var visit = function visit(node, cb) {
    var index =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var parents =
      arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    if (node.content && node.content.length > 0) {
      node.content.forEach(function(child, i) {
        visit(child, cb, i, [].concat(_toConsumableArray(parents), [node]));
      });
    }

    cb(node, index, parents);
  };

  var liftedImages = new WeakSet();
  visit(richText, function(node, index, parents) {
    if (
      !node ||
      node.nodeType !== 'embedded-asset-block' ||
      liftedImages.has(node) ||
      parents.length === 1 // is a top level asset
    ) {
      return;
    }

    var imgParent = parents[parents.length - 1];
    imgParent.content.splice(index, 1);
    var i = parents.length;
    var splitChildrenIndex = index;
    var contentAfterSplitPoint = [];
    /* eslint-disable no-plusplus */

    while (--i > 0) {
      var parent = parents[i];
      var parentsParent = parents[i - 1];
      contentAfterSplitPoint = parent.content.splice(splitChildrenIndex);
      splitChildrenIndex = parentsParent.content.indexOf(parent);
      var nodeInserted = false;

      if (i === 1) {
        splitChildrenIndex += 1;
        parentsParent.content.splice(splitChildrenIndex, 0, node);
        liftedImages.add(node);
        nodeInserted = true;
      }

      splitChildrenIndex += 1;

      if (contentAfterSplitPoint.length > 0) {
        parentsParent.content.splice(
          splitChildrenIndex,
          0,
          _objectSpread(
            _objectSpread({}, parent),
            {},
            {
              content: contentAfterSplitPoint,
            },
          ),
        );
      } // Remove the parent if empty

      if (parent.content.length === 0) {
        splitChildrenIndex -= 1;
        parentsParent.content.splice(
          nodeInserted ? splitChildrenIndex - 1 : splitChildrenIndex,
          1,
        );
      }
    }
  });
};

function _default(_x15, _x16, _x17) {
  return _ref6.apply(this, arguments);
}

function _ref6() {
  _ref6 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee12(
      datoClient,
      contentfulRecordMap,
      uploadsMapping,
    ) {
      var assetBlock, handlers;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch ((_context12.prev = _context12.next)) {
            case 0:
              _context12.next = 2;
              return datoClient.itemTypes.find('structured_text_asset');

            case 2:
              assetBlock = _context12.sent;
              handlers = {
                'embedded-entry-inline': (function() {
                  var _embeddedEntryInline = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee6(
                      createNode,
                      node,
                      context,
                    ) {
                      var inlineItemHandler;
                      return regeneratorRuntime.wrap(function _callee6$(
                        _context6,
                      ) {
                        while (1) {
                          switch ((_context6.prev = _context6.next)) {
                            case 0:
                              _context6.next = 2;
                              return createInlineItemHandler(
                                createNode,
                                node,
                                context,
                              );

                            case 2:
                              inlineItemHandler = _context6.sent;
                              return _context6.abrupt(
                                'return',
                                inlineItemHandler(
                                  contentfulRecordMap[node.data.target.sys.id],
                                ),
                              );

                            case 4:
                            case 'end':
                              return _context6.stop();
                          }
                        }
                      },
                      _callee6);
                    }),
                  );

                  function embeddedEntryInline(_x18, _x19, _x20) {
                    return _embeddedEntryInline.apply(this, arguments);
                  }

                  return embeddedEntryInline;
                })(),
                'embedded-entry-block': (function() {
                  var _embeddedEntryBlock = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee7(
                      createNode,
                      node,
                      context,
                    ) {
                      var inlineItemHandler;
                      return regeneratorRuntime.wrap(function _callee7$(
                        _context7,
                      ) {
                        while (1) {
                          switch ((_context7.prev = _context7.next)) {
                            case 0:
                              _context7.next = 2;
                              return createInlineItemHandler(
                                createNode,
                                node,
                                context,
                              );

                            case 2:
                              inlineItemHandler = _context7.sent;
                              return _context7.abrupt(
                                'return',
                                inlineItemHandler(
                                  contentfulRecordMap[node.data.target.sys.id],
                                ),
                              );

                            case 4:
                            case 'end':
                              return _context7.stop();
                          }
                        }
                      },
                      _callee7);
                    }),
                  );

                  function embeddedEntryBlock(_x21, _x22, _x23) {
                    return _embeddedEntryBlock.apply(this, arguments);
                  }

                  return embeddedEntryBlock;
                })(),
                'entry-hyperlink': (function() {
                  var _entryHyperlink = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee8(
                      createNode,
                      node,
                      context,
                    ) {
                      var createItemLink;
                      return regeneratorRuntime.wrap(function _callee8$(
                        _context8,
                      ) {
                        while (1) {
                          switch ((_context8.prev = _context8.next)) {
                            case 0:
                              _context8.next = 2;
                              return createItemLinkHandler(
                                createNode,
                                node,
                                context,
                              );

                            case 2:
                              createItemLink = _context8.sent;
                              return _context8.abrupt(
                                'return',
                                createItemLink(
                                  contentfulRecordMap[node.data.target.sys.id],
                                ),
                              );

                            case 4:
                            case 'end':
                              return _context8.stop();
                          }
                        }
                      },
                      _callee8);
                    }),
                  );

                  function entryHyperlink(_x24, _x25, _x26) {
                    return _entryHyperlink.apply(this, arguments);
                  }

                  return entryHyperlink;
                })(),
                'asset-hyperlink': (function() {
                  var _assetHyperlink = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee9(
                      createNode,
                      node,
                      context,
                    ) {
                      var assetLinkHandler, upload;
                      return regeneratorRuntime.wrap(function _callee9$(
                        _context9,
                      ) {
                        while (1) {
                          switch ((_context9.prev = _context9.next)) {
                            case 0:
                              _context9.next = 2;
                              return createAssetLinkHandler(
                                createNode,
                                node,
                                context,
                              );

                            case 2:
                              assetLinkHandler = _context9.sent;

                              if (uploadsMapping[node.data.target.sys.id]) {
                                _context9.next = 5;
                                break;
                              }

                              return _context9.abrupt('return', null);

                            case 5:
                              _context9.next = 7;
                              return datoClient.uploads.find(
                                uploadsMapping[node.data.target.sys.id],
                              );

                            case 7:
                              upload = _context9.sent;
                              return _context9.abrupt(
                                'return',
                                assetLinkHandler(upload.url),
                              );

                            case 9:
                            case 'end':
                              return _context9.stop();
                          }
                        }
                      },
                      _callee9);
                    }),
                  );

                  function assetHyperlink(_x27, _x28, _x29) {
                    return _assetHyperlink.apply(this, arguments);
                  }

                  return assetHyperlink;
                })(),
                'embedded-asset-block': (function() {
                  var _embeddedAssetBlock = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee10(
                      createNode,
                      node,
                      context,
                    ) {
                      var modularBlockHandler;
                      return regeneratorRuntime.wrap(function _callee10$(
                        _context10,
                      ) {
                        while (1) {
                          switch ((_context10.prev = _context10.next)) {
                            case 0:
                              _context10.next = 2;
                              return createBlockHandler(
                                createNode,
                                node,
                                context,
                                assetBlock.id,
                              );

                            case 2:
                              modularBlockHandler = _context10.sent;
                              return _context10.abrupt(
                                'return',
                                modularBlockHandler(
                                  uploadsMapping[node.data.target.sys.id],
                                ),
                              );

                            case 4:
                            case 'end':
                              return _context10.stop();
                          }
                        }
                      },
                      _callee10);
                    }),
                  );

                  function embeddedAssetBlock(_x30, _x31, _x32) {
                    return _embeddedAssetBlock.apply(this, arguments);
                  }

                  return embeddedAssetBlock;
                })(),
              };
              return _context12.abrupt(
                'return',
                /*#__PURE__*/ (function() {
                  var _ref7 = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee11(
                      value,
                    ) {
                      return regeneratorRuntime.wrap(function _callee11$(
                        _context11,
                      ) {
                        while (1) {
                          switch ((_context11.prev = _context11.next)) {
                            case 0:
                              // Extrapolate assets from lists without losing content
                              liftAssets(value);
                              return _context11.abrupt(
                                'return',
                                (0,
                                _datocmsContentfulToStructuredText.richTextToStructuredText)(
                                  value,
                                  {
                                    handlers: handlers,
                                  },
                                ),
                              );

                            case 2:
                            case 'end':
                              return _context11.stop();
                          }
                        }
                      },
                      _callee11);
                    }),
                  );

                  return function(_x33) {
                    return _ref7.apply(this, arguments);
                  };
                })(),
              );

            case 5:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12);
    }),
  );
  return _ref6.apply(this, arguments);
}
