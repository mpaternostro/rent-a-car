const CarController = require('./controller/carController');
const CarService = require('./service/carService');
const CarRepository = require('./repository/carRepository');

/**
 * @param {import('express').Application} app
 * @param {import('rsdi').IDIContainer} container
 */
function initCarModule(app, container) {
  /**
   * @type {carController}
   */
  const controller = container.get('CarController');
  controller.configureRoutes(app);
}

module.exports = { CarController, CarService, CarRepository, initCarModule };
