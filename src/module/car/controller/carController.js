const { fromFormToEntity } = require('../mapper/carMapper');
const CarIdNotDefinedError = require('../error/CarIdNotDefinedError');

module.exports = class CarController {
  /**
   * @param {import('../service/carService')} carService
   */
  constructor(carService, uploadMiddleware) {
    this.carService = carService;
    this.uploadMiddleware = uploadMiddleware;
    this.ROUTE_BASE = '/car';
    this.CAR_VIEWS = 'car/views';
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;
    app.get(`${ROUTE}`, this.index.bind(this));
    app.get(`${ROUTE}/manage`, this.manage.bind(this));
    app.get(`${ROUTE}/view/:carId`, this.view.bind(this));
    app.get(`${ROUTE}/edit/:carId`, this.edit.bind(this));
    app.get(`${ROUTE}/add`, this.add.bind(this));
    app.post(`${ROUTE}/save`, this.uploadMiddleware.single('car-photo'), this.save.bind(this));
    app.post(`${ROUTE}/delete/:carId`, this.delete.bind(this));
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    const carsLength = await this.carService.getCarsLength();
    const lastAddedCar = await this.carService.getLastCar();
    res.render(`${this.CAR_VIEWS}/index.njk`, {
      title: 'Rent a Car',
      carsLength,
      lastAddedCar,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async manage(req, res) {
    const cars = await this.carService.getAll();
    res.render(`${this.CAR_VIEWS}/manage.njk`, {
      title: 'Car List',
      cars,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async view(req, res) {
    const { carId } = req.params;
    if (!Number(carId)) {
      throw new CarIdNotDefinedError();
    }

    const { car, reservations } = await this.carService.getById(carId);
    res.render(`${this.CAR_VIEWS}/view.njk`, {
      title: `Viewing ${car.brand} ${car.model} ${car.year}`,
      car,
      reservations,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async edit(req, res) {
    const { carId } = req.params;
    if (!Number(carId)) {
      throw new CarIdNotDefinedError();
    }

    const { car } = await this.carService.getById(carId);
    res.render(`${this.CAR_VIEWS}/edit.njk`, {
      title: `Editing ${car.brand} ${car.model} #${car.id}`,
      car,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  add(req, res) {
    res.render(`${this.CAR_VIEWS}/add.njk`, {
      title: 'Add New Car',
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async save(req, res) {
    const car = fromFormToEntity(req.body);
    if (req.file) {
      const path = req.file.path.split('public')[1];
      car.img = path;
    }
    await this.carService.save(car);
    res.redirect('/');
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async delete(req, res) {
    const { carId } = req.params;
    const { car } = await this.carService.getById(carId);
    this.carService.delete(car);
    res.redirect('/');
  }
};
