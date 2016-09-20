/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'client',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    authMaker: {},
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.apiURL = 'http://localhost:4040';
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.authMaker.domainUrl = "http://localhost:5000";
    ENV.authMaker.redirectUri = "http://localhost:4200/login";
    ENV.authMaker.clientId = "LjSnLQKCLWiG9EbqH3Kz";
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    // for search and replace in dist/index.html
    ENV.apiURL = 'https://kue.nmcn.co/api';

    ENV.authMaker.domainUrl = "https://auth.nmcn.co";
    ENV.authMaker.redirectUri = "https://kue.nmcn.co/login";
    ENV.authMaker.clientId = "hQaVQRQ9yWG9yBeUtADo";
  }

  return ENV;
};
