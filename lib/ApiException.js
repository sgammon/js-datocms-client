'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = ApiException;

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) ||
        arr['@@iterator'];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function ApiException(response, body, _ref) {
  var url = _ref.url,
    options = _ref.options,
    preCallStack = _ref.preCallStack;

  if ('captureStackTrace' in Error) {
    Error.captureStackTrace(this, ApiException);
  } else {
    this.stack = new Error().stack;
  }

  if (response.status < 500) {
    var error = body.data[0];
    var details = JSON.stringify(error.attributes.details);
    this.message = ''
      .concat(response.status, ' ')
      .concat(error.attributes.code, ' (details: ')
      .concat(details, ')');
  } else {
    this.message = ''.concat(response.status, ' ').concat(response.statusText);
  }

  this.body = body;
  this.headers = {};

  if (response.headers) {
    this.headers = response.headers.raw
      ? response.headers.raw()
      : Array.from(response.headers.entries()).reduce(function(headers, _ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];

          // eslint-disable-next-line no-param-reassign
          headers[key] = value;
          return headers;
        }, {});
  }

  this.statusCode = response.status;
  this.statusText = response.statusText;
  this.requestUrl = url;
  this.requestMethod = options.method || 'GET';
  this.requestHeaders = options.headers;
  this.requestBody = options.body;
  this.stack += '\nCaused By:\n'.concat(preCallStack);
}

ApiException.prototype = Object.create(Error.prototype);
ApiException.prototype.name = 'ApiException';
ApiException.prototype.constructor = ApiException;

ApiException.prototype.errorWithCode = function errorWithCode(codeOrCodes) {
  var codes = Array.isArray(codeOrCodes) ? codeOrCodes : [codeOrCodes];

  if (!this.body || !(this.body.data instanceof Array)) {
    return null;
  }

  return this.body.data.find(function(error) {
    return codes.includes(error.attributes.code);
  });
};

var humanMessageForCode = {
  BATCH_DATA_VALIDATION_IN_PROGRESS:
    "The schema of this model changed, we're re-running validations over every record in background. Please retry with this operation in a few seconds!",
  INSUFFICIENT_PERMISSIONS: 'Your role does not permit this action',
  MAINTENANCE_MODE: 'The project is currently in maintenance mode!',
  DELETE_RESTRICTION:
    "Sorry, but you cannot delete this resource, as it's currently used/referenced elsewhere!",
  INVALID_CREDENTIALS: 'Credentials are incorrect!',
  INVALID_EMAIL: 'Email address is incorrect!',
  INVALID_FORMAT:
    "The format of the parameters passed is incorrect, take a look at the details of the error to know what's wrong!",
  ITEM_LOCKED:
    'The operation cannot be completed as some other user is currently editing this record!',
  LINKED_FROM_PUBLISHED_ITEMS:
    "Couldn't unpublish the record, as some published records are linked to it!",
  PLAN_UPGRADE_REQUIRED: 'Cannot proceed, please upgrade plan!',
  PUBLISHED_CHILDREN:
    "Couldn't unpublish the record, some children records are still published!",
  REQUIRED_2FA_SETUP:
    'This project requires every user to turn on 2-factor authentication! Please go to your Dashboard and activate it! (https://dashboard.datocms.com/account/setup-2fa)',
  REQUIRED_BY_ASSOCIATION:
    "Cannot delete the record, as it's required by other records:",
  STALE_ITEM_VERSION:
    'Someone else made a change while you were editing this record, please refresh the page!',
  TITLE_ALREADY_PRESENT: 'There can only be one Title field per model',
  UNPUBLISHED_LINK:
    "Couldn't publish the record, as it links some unpublished records!",
  UNPUBLISHED_PARENT:
    "Couldn't publish the record, as the parent record is not published!",
  UPLOAD_IS_CURRENTLY_IN_USE:
    "Couldn't delete this asset, as it's currently used by some records!",
  UPLOAD_NOT_PASSING_FIELD_VALIDATIONS:
    "Couldn't update this asset since some records are failing to pass the validations!",
};
var humanMessageForPlanUpgradeLimit = {
  build_triggers:
    "You've reached the maximum number of build triggers your plan allows",
  sandbox_environments:
    "You've reached the maximum number of environments your plan allows",
  item_types:
    "You've reached the maximum number of models your plan allows to create",
  items:
    "You've reached the maximum number of records your plan allows to create",
  locales: "You've reached the maximum number of locales your plan allows",
  mux_encoding_seconds:
    "You've reached the maximum video encoding limits of your plan",
  otp: 'Two-factor authentication cannot be on the current plan',
  plugins: "You've reached the maximum number of plugins your plan allows",
  roles:
    "You've reached the maximum number of roles your plan allows to create",
  uploadable_bytes: "You've reached the file storage limits of your plan",
  users:
    "You've reached the maximum number of collaborators your plan allows to invite to the project",
  access_tokens:
    "You've reached the maximum number of API tokens your plan allows to create",
};

ApiException.prototype.humanMessageForFailedResponse = function humanMessageForFailedResponse() {
  var _this = this;

  var planUpgradeError = this.errorWithCode('PLAN_UPGRADE_REQUIRED');

  if (planUpgradeError) {
    var limit = planUpgradeError.attributes.details.limit;
    return ''.concat(
      humanMessageForPlanUpgradeLimit[limit],
      '. Please head over to your account dashboard (https://dashboard.datocms.com/) to upgrade the plan or, if no publicly available plan suits your needs, contact our Sales team (https://www.datocms.com/contact) to get a custom quote!',
    );
  }

  var errors = Object.keys(humanMessageForCode)
    .filter(function(code) {
      return _this.errorWithCode(code);
    })
    .map(function(code) {
      return humanMessageForCode[code];
    });

  if (errors.length === 0) {
    return null;
  }

  return errors.join('\n');
};
