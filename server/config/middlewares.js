var bodyParser = require('body-parser');
var cors       = require('cors');
var morgan     = require('morgan');

module.exports = function(app) {
  app.use(cors());
  app.use(morgan(':method :url - :response-time ms'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
}