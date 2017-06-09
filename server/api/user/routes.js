var Router     = require('express').Router();
var controller = require('./controller');

Router.route('/')
  .get(controller.getAllUsers)
  .post(controller.addUser)
  .put(controller.updateUserScore);

module.exports = Router;