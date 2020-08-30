const { default: DIContainer, object, get, factory } = require('rsdi');
const Database = require('better-sqlite3');

const CarController = require('../module/car/controller/carController');
const CarRepository = require('../module/car/repository/carRepository');
const CarService = require('../module/car/service/carService');

function configureMainDatabaseAdapter() {
  return new Database(process.env.DB_PATH, { verbose: console.log });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  container.addDefinitions({
    MainDatabaseAdapter: factory(configureMainDatabaseAdapter),
    CarController: object(CarController).construct(get('CarService')),
    CarService: object(CarService).construct(get('CarRepository')),
    CarRepository: object(CarRepository).construct(get('MainDatabaseAdapter')),
  });

  return container;
};
