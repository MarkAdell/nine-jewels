var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var compression = require('compression')

module.exports = function(app) {
  app.use(cors());
  app.use(compression());
  app.use(morgan(':method :url - :response-time ms'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('public'));
}
