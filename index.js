var express  = require('express');
var app      = express();
var path     = require('path');
var config   = require('./server/config/config');
var mongoose = require('mongoose');
var api      = require('./server/api/api');

mongoose.connect(config.database, function() {
  console.log('connected to database');
});

require('./server/config/middlewares')(app);

app.use('/api', api);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(config.port, function() {
  console.log('server is listening at localhost:' + config.port);
});