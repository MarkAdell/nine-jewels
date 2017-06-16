var Router = require('express').Router();
var controller = require('./controller');

Router.route('/')
  .get(controller.getAllWords);

module.exports = Router;
