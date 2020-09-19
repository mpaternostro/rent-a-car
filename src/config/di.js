const fs = require('fs');
const path = require('path');

const { default: DIContainer, object, get, factory } = require('rsdi');
const { Sequelize } = require('sequelize');
const multer = require('multer');

const { CarController, CarService, CarRepository, CarModel } = require('../module/car/module');
const { UserController, UserService, UserRepository, UserModel } = require('../module/user/module');
const {
  ReservationController,
  ReservationService,
  ReservationRepository,
  ReservationModel,
} = require('../module/reservation/module');

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

/**
 * @param {DIContainer} container
 */
function configureReservationModule(container) {
  const model = ReservationModel.setup(container.get('Sequelize'));
  model.setupAssociations(CarModel, UserModel);
  return model;
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
    UserController: object(UserController).construct(get('UserService')),
    UserService: object(UserService).construct(get('UserRepository')),
    UserRepository: object(UserRepository).construct(get('UserModel')),
    UserModel: factory(configureUserModule),
  });
}

/**
 * @param {DIContainer} container
 */
function addReservationModuleDefinitions(container) {
  container.addDefinitions({
    ReservationController: object(ReservationController).construct(
      get('ReservationService'),
      get('CarService'),
      get('UserService')
    ),
    ReservationService: object(ReservationService).construct(get('ReservationRepository')),
    ReservationRepository: object(ReservationRepository).construct(get('ReservationModel')),
    ReservationModel: factory(configureReservationModule),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addCarModuleDefinitions(container);
  addUserModuleDefinitions(container);
  addReservationModuleDefinitions(container);
  return container;
};
