'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = seoTagsBuilder;
exports.builders = void 0;

var _humps = require('humps');

var _localizedRead = _interopRequireDefault(require('./localizedRead'));

var _buildFileUrl = _interopRequireDefault(require('./buildFileUrl'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var tag = function tag(tagName, attributes) {
  return {
    tagName: tagName,
    attributes: attributes,
  };
};

var metaTag = function metaTag(name, content) {
  return tag('meta', {
    name: name,
    content: content,
  });
};

var ogTag = function ogTag(property, content) {
  return tag('meta', {
    property: property,
    content: content,
  });
};

var cardTag = function cardTag(name, content) {
  return tag('meta', {
    name: name,
    content: content,
  });
};

var contentTag = function contentTag(tagName, content) {
  return {
    tagName: tagName,
    content: content,
  };
};

function seoAttributeWithFallback(
  attribute,
  alternative,
  itemEntity,
  entitiesRepo,
  i18n,
) {
  var site = entitiesRepo.site;
  var seoField =
    itemEntity &&
    itemEntity.itemType.fields.find(function(f) {
      return f.fieldType === 'seo';
    });
  var itemSeoValue =
    seoField &&
    (0, _localizedRead['default'])(
      itemEntity,
      (0, _humps.camelize)(seoField.apiKey),
      seoField.localized,
      i18n,
    ) &&
    (0, _localizedRead['default'])(
      itemEntity,
      (0, _humps.camelize)(seoField.apiKey),
      seoField.localized,
      i18n,
    )[attribute];
  var multiLocaleSite = site.locales.length > 1;
  var fallbackSeo =
    (0, _localizedRead['default'])(site, 'globalSeo', multiLocaleSite, i18n) &&
    (0, _localizedRead['default'])(site, 'globalSeo', multiLocaleSite, i18n)
      .fallbackSeo;
  var fallbackSeoValue = fallbackSeo && fallbackSeo[attribute];
  return itemSeoValue || alternative || fallbackSeoValue;
}

var builders = {
  title: function title(itemEntity, entitiesRepo, i18n) {
    var site = entitiesRepo.site;
    var titleField = itemEntity && itemEntity.itemType.titleField;
    var title = seoAttributeWithFallback(
      'title',
      titleField &&
        (0, _localizedRead['default'])(
          itemEntity,
          (0, _humps.camelize)(titleField.apiKey),
          titleField.localized,
          i18n,
        ),
      itemEntity,
      entitiesRepo,
      i18n,
    );

    if (title) {
      var multiLocaleSite = site.locales.length > 1;
      var suffix =
        ((0, _localizedRead['default'])(
          site,
          'globalSeo',
          multiLocaleSite,
          i18n,
        ) &&
          (0, _localizedRead['default'])(
            site,
            'globalSeo',
            multiLocaleSite,
            i18n,
          ).titleSuffix) ||
        '';
      var titleWithSuffix =
        (title + suffix).length <= 60 ? title + suffix : title;
      return [
        contentTag('title', titleWithSuffix),
        ogTag('og:title', title),
        cardTag('twitter:title', title),
      ];
    }

    return undefined;
  },
  description: function description(itemEntity, entitiesRepo, i18n) {
    var description = seoAttributeWithFallback(
      'description',
      null,
      itemEntity,
      entitiesRepo,
      i18n,
    );

    if (description) {
      return [
        metaTag('description', description),
        ogTag('og:description', description),
        cardTag('twitter:description', description),
      ];
    }

    return undefined;
  },
  robots: function robots(itemEntity, entitiesRepo) {
    if (!entitiesRepo.site.noIndex) return undefined;
    return metaTag('robots', 'noindex');
  },
  twitterSite: function twitterSite(itemEntity, entitiesRepo) {
    var site = entitiesRepo.site;

    if (site.globalSeo && site.globalSeo.twitterAccount) {
      return cardTag('twitter:site', site.globalSeo.twitterAccount);
    }

    return undefined;
  },
  twitterCard: function twitterCard(itemEntity, entitiesRepo, i18n) {
    var card = seoAttributeWithFallback(
      'twitterCard',
      null,
      itemEntity,
      entitiesRepo,
      i18n,
    );
    return cardTag('twitter:card', card || 'summary');
  },
  articleModifiedTime: function articleModifiedTime(itemEntity) {
    if (!itemEntity) return undefined;
    var date = new Date(Date.parse(itemEntity.meta.updatedAt));
    return ogTag(
      'article:modified_time',
      ''.concat(date.toISOString().split('.')[0], 'Z'),
    );
  },
  articlePublishedTime: function articlePublishedTime(itemEntity) {
    if (!itemEntity) return undefined;
    if (!itemEntity.meta.firstPublishedAt) return undefined;
    var date = new Date(Date.parse(itemEntity.meta.firstPublishedAt));
    return ogTag(
      'article:published_time',
      ''.concat(date.toISOString().split('.')[0], 'Z'),
    );
  },
  articlePublisher: function articlePublisher(itemEntity, entitiesRepo) {
    var site = entitiesRepo.site;

    if (site.globalSeo && site.globalSeo.facebookPageUrl) {
      return ogTag('article:publisher', site.globalSeo.facebookPageUrl);
    }

    return undefined;
  },
  ogLocale: function ogLocale(itemEntity, entitiesRepo, i18n) {
    if (i18n.locale.includes('-')) {
      return ogTag('og:locale', i18n.locale.replace(/-/, '_'));
    }

    return ogTag(
      'og:locale',
      ''.concat(i18n.locale, '_').concat(i18n.locale.toUpperCase()),
    );
  },
  ogType: function ogType(itemEntity) {
    if (!itemEntity || itemEntity.singleton) {
      return ogTag('og:type', 'website');
    }

    return ogTag('og:type', 'article');
  },
  ogSiteName: function ogSiteName(itemEntity, entitiesRepo) {
    var site = entitiesRepo.site;

    if (site.globalSeo && site.globalSeo.siteName) {
      return ogTag('og:site_name', site.globalSeo.siteName);
    }

    return undefined;
  },
  image: function image(itemEntity, entitiesRepo, i18n) {
    var itemImage =
      itemEntity &&
      itemEntity.itemType.fields
        .filter(function(f) {
          return f.fieldType === 'file';
        })
        .map(function(field) {
          return (0,
          _localizedRead[
            'default'
          ])(itemEntity, (0, _humps.camelize)(field.apiKey), field.localized, i18n);
        })
        .map(function(image) {
          return image ? image.uploadId : null;
        })
        .filter(function(id) {
          return !!id;
        })
        .map(function(id) {
          return entitiesRepo.findEntity('upload', id);
        })
        .find(function(image) {
          return (
            image &&
            image.width &&
            image.height &&
            image.width >= 200 &&
            image.height >= 200
          );
        });
    var itemImageId = itemImage && itemImage.id;
    var imageId = seoAttributeWithFallback(
      'image',
      itemImageId,
      itemEntity,
      entitiesRepo,
      i18n,
    );

    if (imageId) {
      var upload = entitiesRepo.findEntity('upload', imageId);
      var url = (0, _buildFileUrl['default'])(upload, entitiesRepo, {
        w: '1000',
        fit: 'max',
        fm: 'jpg',
      });
      return [ogTag('og:image', url), cardTag('twitter:image', url)];
    }

    return undefined;
  },
};
exports.builders = builders;

function seoTagsBuilder(itemEntity, entitiesRepo, i18n) {
  return Object.values(builders).reduce(function(acc, builder) {
    var result = builder(itemEntity, entitiesRepo, i18n);

    if (result) {
      if (Array.isArray(result)) {
        return [].concat(acc, result);
      }

      return [].concat(acc, [result]);
    }

    return acc;
  }, []);
}
