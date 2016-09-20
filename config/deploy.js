/*global process,module,require*/

var credentials = require('./credentials.json');

var REDIS_PORT = 49151;

var VALID_DEPLOY_TARGETS = [ //update these to match what you call your deployment targets
  'production'
];

module.exports = function(deployTarget) {
  var ENV = {
    build: {
      environment: 'production'
    },
    redis: {
      allowOverwrite: true,
      keyPrefix: 'kue-ui:index', //make sure the key prefix matches your server appName
      port: REDIS_PORT
    },
    s3: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      bucket: 'nmcn-website-assets', // YOUR S3 BUCKET NAME */
    },
    'ssh-tunnel': {
      srcPort: REDIS_PORT
    }
  };

  if (VALID_DEPLOY_TARGETS.indexOf(deployTarget) === -1) {
    throw new Error('Invalid deployTarget ' + deployTarget);
  }

  if (deployTarget === 'production') {
    ENV['ssh-tunnel'].host = '130.211.87.138';
    ENV['ssh-tunnel'].username = 'nmcn';
    ENV['ssh-tunnel'].privateKeyPath = '~/.ssh/id_rsa_nmcn_deploy';
  }

  return ENV;
};
