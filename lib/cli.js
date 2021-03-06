'use strict';

require('dotenv/config');

var _docopt = require('docopt');

var _package = _interopRequireDefault(require('../package.json'));

var _command = _interopRequireDefault(require('./dump/command'));

var _command2 = _interopRequireDefault(require('./check/command'));

var _command3 = _interopRequireDefault(require('./wpImport/command'));

var _command4 = _interopRequireDefault(require('./contentfulImport/command'));

var _command5 = _interopRequireDefault(
  require('./toggleMaintenanceMode/command'),
);

var _command6 = _interopRequireDefault(
  require('./createMigrationScript/command'),
);

var _command7 = _interopRequireDefault(
  require('./runPendingMigrations/command'),
);

var _command8 = _interopRequireDefault(
  require('./environment/getPrimary/command'),
);

var _command9 = _interopRequireDefault(
  require('./environment/promote/command'),
);

var _command10 = _interopRequireDefault(
  require('./environment/destroy/command'),
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var doc =
  '\nDatoCMS CLI tool\n\nUsage:\n  dato dump [--watch] [--verbose] [--preview] [--token=<apiToken>] [--environment=<environment>] [--config=<file>] [--cmaBaseUrl=<url>]\n  dato new migration <name> [--migrationsDir=<directory>] [--migrationTemplate=<migrationTemplateFile>]\n  dato migrate [--source=<environment>] [--destination=<environment>] [--inPlace] [--migrationModel=<apiKey>] [--migrationsDir=<directory>] [--token=<apiToken>] [--cmaBaseUrl=<url>]\n  dato environment get-primary [--token=<apiToken>] [--cmaBaseUrl=<url>]\n  dato environment promote <environmentId> [--token=<apiToken>] [--cmaBaseUrl=<url>]\n  dato environment destroy <environmentId> [--token=<apiToken>] [--cmaBaseUrl=<url>]\n  dato maintenance (on|off) [--force] [--token=<apiToken>] [--cmaBaseUrl=<url>]\n  dato wp-import --token=<datoApiToken> [--environment=<datoEnvironment>] --wpUrl=<url> --wpUser=<user> --wpPassword=<password> [--datoCmaBaseUrl=<url>]\n  dato contentful-import --datoCmsToken=<apiToken> --contentfulToken=<apiToken> --contentfulSpaceId=<spaceId> [--contentfulEnvironment=<contentfulEnvironment>] [--datoCmsEnvironment=<datoEnvironment>] [--skipContent] [--datoCmaBaseUrl=<url>] [(--includeOnly <contentType>...)]\n  dato check\n  dato -h | --help\n  dato --version\n\nOptions:\n  --migrationsDir=<directory>   Directory containing the migration scripts [default: ./migrations]\n  --migrationModel=<apiKey>     API key of the migration model [default: schema_migration]\n  --cmaBaseUrl=<url>           DatoCMS CMA base URL [default: https://site-api.datocms.com/]\n';

module.exports = function(argv) {
  var options = (0, _docopt.docopt)(doc, {
    argv: argv,
    version: _package['default'].version,
  });

  if (options.dump) {
    return (0, _command['default'])(options);
  }

  if (options.check) {
    return (0, _command2['default'])(options);
  }

  if (options.maintenance) {
    var on = options.on,
      token = options['--token'],
      force = options['--force'],
      cmaBaseUrl = options['--cmaBaseUrl'];
    return (0, _command5['default'])({
      activate: on,
      token: token,
      force: force,
      cmaBaseUrl: cmaBaseUrl,
    });
  }

  if (options['new'] && options.migration) {
    var name = options['<name>'],
      relativeMigrationsDir = options['--migrationsDir'],
      _options$MigrationT = options['--migrationTemplate'],
      relativeMigrationTemplatePath =
        _options$MigrationT === void 0 ? null : _options$MigrationT;
    return (0, _command6['default'])({
      name: name,
      relativeMigrationsDir: relativeMigrationsDir,
      relativeMigrationTemplatePath: relativeMigrationTemplatePath,
    });
  }

  if (options.migrate) {
    var sourceEnvId = options['--source'],
      destinationEnvId = options['--destination'],
      migrationModelApiKey = options['--migrationModel'],
      _relativeMigrationsDir = options['--migrationsDir'],
      inPlace = options['--inPlace'],
      _token = options['--token'],
      _cmaBaseUrl = options['--cmaBaseUrl'];
    return (0, _command7['default'])({
      sourceEnvId: sourceEnvId,
      destinationEnvId: destinationEnvId,
      inPlace: inPlace,
      migrationModelApiKey: migrationModelApiKey,
      relativeMigrationsDir: _relativeMigrationsDir,
      token: _token,
      cmaBaseUrl: _cmaBaseUrl,
    });
  }

  if (options.environment) {
    if (options['get-primary']) {
      var _token2 = options['--token'],
        _cmaBaseUrl2 = options['--cmaBaseUrl'];
      return (0, _command8['default'])({
        token: _token2,
        cmaBaseUrl: _cmaBaseUrl2,
      });
    }

    if (options.promote) {
      var environmentId = options['<environmentId>'],
        _token3 = options['--token'],
        _cmaBaseUrl3 = options['--cmaBaseUrl'];
      return (0, _command9['default'])({
        environmentId: environmentId,
        token: _token3,
        cmaBaseUrl: _cmaBaseUrl3,
      });
    }

    if (options.destroy) {
      var _environmentId = options['<environmentId>'],
        _token4 = options['--token'],
        _cmaBaseUrl4 = options['--cmaBaseUrl'];
      return (0, _command10['default'])({
        environmentId: _environmentId,
        token: _token4,
        cmaBaseUrl: _cmaBaseUrl4,
      });
    }
  }

  if (options['wp-import']) {
    var _token5 = options['--token'],
      environment = options['--environment'],
      wpUrl = options['--wpUrl'],
      wpUser = options['--wpUser'],
      wpPassword = options['--wpPassword'],
      _cmaBaseUrl5 = options['--datoCmaBaseUrl'];
    return (0, _command3['default'])(
      _token5,
      environment,
      wpUrl,
      wpUser,
      wpPassword,
      _cmaBaseUrl5,
    );
  }

  if (options['contentful-import']) {
    var contentfulToken = options['--contentfulToken'],
      contentfulSpaceId = options['--contentfulSpaceId'],
      contentfulEnvironment = options['--contentfulEnvironment'],
      datoCmsToken = options['--datoCmsToken'],
      datoCmsEnvironment = options['--datoCmsEnvironment'],
      skipContent = options['--skipContent'],
      includeOnly = options['--includeOnly'],
      datoCmsCmaBaseUrl = options['--datoCmaBaseUrl'],
      contentType = options['<contentType>'];
    return (0, _command4['default'])({
      contentfulToken: contentfulToken,
      contentfulSpaceId: contentfulSpaceId,
      contentfulEnvironment: contentfulEnvironment,
      datoCmsCmaBaseUrl: datoCmsCmaBaseUrl,
      datoCmsToken: datoCmsToken,
      datoCmsEnvironment: datoCmsEnvironment,
      skipContent: skipContent,
      contentType: includeOnly ? contentType : false,
    });
  }

  return false;
};
