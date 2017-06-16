var Router = require('express').Router();
var controller = require('./controller');

Router.route('/')
  .get(controller.constructLeaderBoard)
  .post(controller.addUser)
  .put(controller.updateUserName);

Router.route('/:id')
  .get(controller.getUserName);

Router.route('/score')
  .put(controller.updateUserScore);

module.exports = Router;
