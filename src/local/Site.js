import Image from './fields/Image';
import GlobalSeo from './fields/GlobalSeo';
import faviconTagsBuilder from '../utils/faviconTagsBuilder';
import localizedRead from '../utils/localizedRead';

export default class Site {
  constructor(entity) {
    this.entity = entity;
  }

  get id() {
    return this.entity.id;
  }

  get name() {
    return this.entity.name;
  }

  get locales() {
    return this.entity.locales;
  }

  get themeHue() {
    return this.entity.themeHue;
  }

  get domain() {
    return this.entity.domain;
  }

  get internalDomain() {
    return this.entity.internalDomain;
  }

  get noIndex() {
    return this.entity.noIndex;
  }

  get globalSeo() {
    return this.readAttribute('globalSeo', GlobalSeo, this.locales > 0);
  }

  get favicon() {
    return this.readAttribute('favicon', Image, false);
  }

  get faviconMetaTags() {
    return faviconTagsBuilder(this);
  }

  toMap() {
    const fields = [
      'id',
      'name',
      'locales',
      'themeHue',
      'domain',
      'internalDomain',
      'noIndex',
      'globalSeo',
      'favicon',
      'faviconMetaTags',
    ];

    return fields.reduce((acc, field) => {
      let value = this[field];

      if (value && value.toMap) {
        value = value.toMap();
      }

      return Object.assign(acc, { [field]: value });
    }, {});
  }

  readAttribute(attribute, TypeKlass, localized) {
    let value;

    if (localized) {
      value = localizedRead(this.entity[attribute] || {});
    } else {
      value = this.entity[attribute];
    }

    const imgixHost = `https://${this.entity.imgixHost}`;

    return value && new TypeKlass(value, imgixHost);
  }
}
