var kue = require('kue');
var express = require('express');

var app = express();
app.use(express.static( __dirname + '/client/dist' ));
app.use(kue.app);

// // API extension
// app.get('/jobs/:type/:state/stats', provides('json'), json.jobTypeStateStats);

// Ember app
var client = function (req, res) {
    res.sendfile( __dirname + '/client/dist/index.html' );
}

app.get('/', client);
app.get('/jobs', client);
app.get('/jobs/type/:type', client);
app.get('/jobs/state/:state', client);
app.get('/jobs/:id', client);
app.get('/jobs/new', client);

module.exports.app = app;
