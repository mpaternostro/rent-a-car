const fs = require('fs');
const path = require('path');

const { default: DIContainer, object, get, factory } = require('rsdi');
const Database = require('better-sqlite3');
const multer = require('multer');

const CarController = require('../module/car/controller/carController');
const CarRepository = require('../module/car/repository/carRepository');
const CarService = require('../module/car/service/carService');

function configureMainDatabaseAdapter() {
  return new Database(process.env.DB_PATH, { verbose: console.log });
}

function configureMulter() {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      const dir = `${process.env.MULTER_UPLOADS_DIR}/`;
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename(req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
  });
  return multer({ storage });
}

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions(container) {
  container.addDefinitions({
    MainDatabaseAdapter: factory(configureMainDatabaseAdapter),
    Multer: factory(configureMulter),
  });
}

/**
 * @param {DIContainer} container
 */
function addCarModuleDefinitions(container) {
  container.addDefinitions({
    CarController: object(CarController).construct(get('CarService'), get('Multer')),
    CarService: object(CarService).construct(get('CarRepository')),
    CarRepository: object(CarRepository).construct(get('MainDatabaseAdapter')),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addCarModuleDefinitions(container);
  return container;
};
