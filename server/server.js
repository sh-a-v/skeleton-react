'use strict';

var path = require('path');
var express = require('express');

var serverConfig = require('./server-config');

var app = express();
var router = express.Router();
var template = path.join(__dirname, 'build', 'index.html');

router.get('*', function(req, res) {
  res.sendFile(template);
});

app.use(serverConfig.assetsPath, express.static(path.join(__dirname, 'build')));
app.use('*', router);

app.listen(serverConfig.expressPort, function() {
  console.log('express server run on port ' + serverConfig.expressPort);
});
