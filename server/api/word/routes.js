var Router = require('express').Router();
var controller = require('./controller');

Router.route('/')
  .get(controller.getWord);

Router.route('/check')
  .get(controller.checkSolution);

Router.route('/hint')
  .get(controller.getHint);

module.exports = Router;
