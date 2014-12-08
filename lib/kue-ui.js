var express = require('express');
var path = require('path');

/**
 * Config object for the app that contains the apiUrl
 * @type {Object}
 */
var config = {};

/**
 * Strips out the first slash in the url for the Ember app
 * @param  {String} url Url
 * @return {String}     Sanitized
 */
var sanitize = function(url) {
    return url.charAt(0) === '/' ? url.slice(1, url.length) : url;
};

/**
 * Server Ember application
 */
var clientRoute = function(req, res) {
    return res.render('build', {
        baseURL: sanitize(req.app.route),
        apiURL: sanitize(config.apiURL)
    });
};


/**
 * Setup the baseUrl for the Ember app
 * @param  {Object} opts Options
 * @param  {String} opts.baseURL BaseUrl
 */
var setup = function(opts) {
    if (opts.apiURL) {
        config.apiURL = opts.apiURL;
    }
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
