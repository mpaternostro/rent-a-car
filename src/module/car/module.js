const CarController = require('./controller/carController');
const CarService = require('./service/carService');
const CarRepository = require('./repository/carRepository');
const CarModel = require('./model/carModel');

/**
 * @param {import('express').Application} app
 * @param {import('rsdi').IDIContainer} container
 */
function initCarModule(app, container) {
  /**
   * @type {CarController} controller
   */
  const controller = container.get('CarController');
  controller.configureRoutes(app);
}

module.exports = { CarController, CarService, CarRepository, CarModel, initCarModule };
