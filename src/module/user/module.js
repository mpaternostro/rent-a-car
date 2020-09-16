const UserController = require('./controller/userController');
const UserService = require('./service/userService');
const UserRepository = require('./repository/userRepository');
const UserModel = require('./model/userModel');

/**
 * @param {import('express').Application} app
 * @param {import('rsdi').IDIContainer} container
 */
function initUserModule(app, container) {
  /**
   * @type {UserController} controller
   */
  const controller = container.get('UserController');
  controller.configureRoutes(app);
}

module.exports = { UserController, UserService, UserRepository, UserModel, initUserModule };
