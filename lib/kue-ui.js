var kue = require('kue');
var express = require('express');


// // API extension
// app.get('/jobs/:type/:state/stats', provides('json'), json.jobTypeStateStats);

// Ember app
var client = function (req, res) {
    // res.sendfile( __dirname + '/client/dist/index.html' );
    return res.render('index');
};

var setup = function(opts) {

    if (opts.baseURL) {
        app.locals.baseURL = opts.baseURL;
    }

    if (opts.baseURL === 'BASE_URL') {
        console.warn('This baseURL is reserved by kue-ui');
    }
}

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/client/dist');
app.use(express.static( __dirname + '/client/dist' ));
app.use(kue.app);

console.log(app.get('views'));
app.get('/', client);
app.get('/jobs', client);
app.get('/jobs/type/:type', client);
app.get('/jobs/state/:state', client);
app.get('/jobs/:id', client);
app.get('/jobs/new', client);

module.exports.app = app;
module.exports.setup = setup;
