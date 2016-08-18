var express = require('express');
var path = require('path');

/**
 * Config object for the app that contains the apiUrl
 * @type {Object}
 */
var config = {};

/**
 * Server Ember application
 */
var clientRoute = function(req, res) {
    return res.render('build', {
        baseURL: config.baseURL,
        apiURL: config.apiURL,
        updateInterval: config.updateInterval
    });
};


/**
 * Setup the baseUrl for the Ember app
 * @param  {Object} opts Options
 * @param  {String} opts.baseURL BaseUrl
 */
var setup = function(opts) {
    if (opts.apiURL) config.apiURL = opts.apiURL;
    if (opts.baseURL) config.baseURL = opts.baseURL;
    if (opts.updateInterval) config.updateInterval = opts.updateInterval;

    // Remove trailing '/'
    if (config.apiURL && config.apiURL.slice(-1) === '/') config.apiURL = config.apiURL.slice(0, -1);
    if (config.baseURL && config.baseURL.slice(-1) === '/') config.baseURL = config.baseURL.slice(0, -1);
}

// Express app
var app = express();

// Static files
app.set('view engine', 'jade');
app.set('views', __dirname + '/client/dist');

// Static routes
app.get('/', clientRoute);
app.get('/jobs', clientRoute);
app.get('/jobs/type/:type', clientRoute);
app.get('/jobs/state/:state', clientRoute);
app.get('/jobs/:id', clientRoute);
app.get('/jobs/new', clientRoute);

// After to avoid overriding `/`
app.use(express.static( __dirname + '/client/dist' ));

module.exports = {
    app: app,
    setup: setup,
    index: path.resolve(__dirname + '/client/dist/build.jade')
};
