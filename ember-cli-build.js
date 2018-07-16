'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: true,
    },
  });

  app.import('node_modules/perfect-scrollbar/css/perfect-scrollbar.css');
  app.import('node_modules/perfect-scrollbar/dist/perfect-scrollbar.js');

  // disabled until https://github.com/yesmeck/jquery-jsonview/issues/26 is fixed
  // app.import('bower_components/jquery-jsonview/dist/jquery.jsonview.css');
  app.import('bower_components/jquery-jsonview/dist/jquery.jsonview.js');

  return app.toTree();
};
