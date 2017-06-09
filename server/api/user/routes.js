var Router = require('express').Router();
var controller = require('./controller');

Router.route('/:userName')
  .get(controller.getUser);

module.exports = Router;