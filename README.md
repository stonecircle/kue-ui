# Kue ui
## Introduction
Job management client for [kue](https://github.com/LearnBoost/kue/)

## Installation 

    $ npm install kue-ui

## Setup
### Mount with express and kue

```javascript
var kue = require('kue')
var express = require('express')
var ui = require('kue-ui');
var app = express();

ui.setup({ 
    apiURL: '/api' // IMPORTANT: specify the api url
});

// Mount kue JSON api
app.use('/api', kue.app);
// Mount UI
app.use('/kue', ui.app);

app.listen(3000);
```

### Standalone app
You can publish the application with any backend by serving the main index file ( `require('kue-ui').index`). The client is build with Ember and the index file needs to be served with jade. You can use the following locals:

* baseURL: namespace of the application (in previous example: `/kue`),
* apiURL: kue's JSON api (in previous example: `/api`)


### Contributors

* [Arnaud Benard](github.com/arnaudbenard)
* [Peter Kadlot](github.com/daralthus)
* [Alex Loizou](github.com/alexloi)
