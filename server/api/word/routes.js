var Router = require('express').Router();
var controller = require('./controller');

Router.route('/')
  .get(controller.getWord);

Router.route('/check')
  .get(controller.checkSolution);

module.exports = Router;
