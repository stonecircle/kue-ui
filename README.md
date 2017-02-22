# Kue-Ui-Client
## Introduction
Job management client for [kue](https://github.com/LearnBoost/kue/) (Version `>=0.8.10`)

### Important note!
This repository used to contain instructions on how to enable this new UI for Kue, now it only contains the Ember application itself. To add Kue-Ui to an existing Express application please see [Kue-Ui-Express](https://github.com/stonecircle/kue-ui-express)

## Screenshots

![Screenshot 1](https://cloud.githubusercontent.com/assets/1458008/5229932/76dd0e70-7716-11e4-9551-e87ce799d8dc.png)

![Screenshot 2](https://cloud.githubusercontent.com/assets/1458008/5229934/7fdf1c84-7716-11e4-8fa3-3d9f3dc947c7.png)

## Installation

    $ npm install kue-ui

## Setup
### Mount with express and kue

```javascript
var kue = require('kue');
var express = require('express');
var ui = require('kue-ui');
var app = express();

// connect kue to appropriate redis, or omit for default localhost
kue.createQueue({
    redis: REDIS_URL
});

ui.setup({
    apiURL: '/api', // IMPORTANT: specify the api url
    baseURL: '/kue', // IMPORTANT: specify the base url
    updateInterval: 5000 // Optional: Fetches new data every 5000 ms
});

// Mount kue JSON api
app.use('/api', kue.app);
// Mount UI
app.use('/kue', ui.app);

app.listen(3000);
```

Note that with the above configuration you can still access the built-in Kue UI at /api/active in the browser.

### Standalone app
You can publish the application with any backend by serving the main index file. The application is built with Ember and only has one `.jade` file.
```javascript
var template = require('kue-ui').index
// -> absolute path to lib/client/dist/build.jade
```

The index file needs to be compiled with jade. You have to define the following locals:

* baseURL: namespace of the application (in previous example: `/kue`),
* apiURL: kue's JSON api (in previous example: `/api`)
* [optional] updateInterval: Time between each refresh of the app (in previous example: 5000)



## Development

An example is provided in `example/many.js`. Run it alongside redis (`redis-server`)

    $ node example/many.js

The app is now accessible on `localhost:3000/kue/`.

You can modify the app in `lib/client/app` and build it with `grunt build`.

### Errors


- Forgot to run redis-server
```
events.js:72
        throw er; // Unhandled 'error' event
              ^
Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED
```

- Stats route not implemented yet on kue. Update kue to `>=0.8.10`

```
GET http://localhost:3000/api/jobs/video%20conversion/inactive/stats 404 (Not Found)
```



### License
`kue-ui` is released under the MIT license. See LICENSE.txt for the complete text.

### Contributors

* [Arnaud Benard](//github.com/arnaudbenard)
* [Peter Kadlot](//github.com/daralthus)
* [Alex Loizou](//github.com/alexloi)
