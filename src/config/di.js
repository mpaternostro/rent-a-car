const fs = require('fs');
const path = require('path');

const { default: DIContainer, object, get, factory } = require('rsdi');
const { Sequelize } = require('sequelize');
const multer = require('multer');

const { CarController, CarService, CarRepository, CarModel } = require('../module/car/module');
const { UserController, UserService, UserRepository, UserModel } = require('../module/user/module');

function configureSequelizeDatabase() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH,
  });
  return sequelize;
}

/**
 * @param {DIContainer} container
 */
function configureCarModule(container) {
  return CarModel.setup(container.get('Sequelize'));
}

/**
 * @param {DIContainer} container
 */
function configureUserModule(container) {
  return UserModel.setup(container.get('Sequelize'));
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
    Sequelize: factory(configureSequelizeDatabase),
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
    CarRepository: object(CarRepository).construct(get('CarModel')),
    CarModel: factory(configureCarModule),
  });
}

/**
 * @param {DIContainer} container
 */
function addUserModuleDefinitions(container) {
  container.addDefinitions({
    UserController: object(UserController).construct(get('UserService'), get('Multer')),
    UserService: object(UserService).construct(get('UserRepository')),
    UserRepository: object(UserRepository).construct(get('UserModel')),
    UserModel: factory(configureUserModule),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addCarModuleDefinitions(container);
  addUserModuleDefinitions(container);
  return container;
};
