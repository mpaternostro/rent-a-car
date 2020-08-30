const { fromFormToEntity } = require('../mapper/carMapper');

module.exports = class CarController {
  /**
   * @param {import('../service/carService')} carService
   */
  constructor(carService) {
    this.carService = carService;
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
    app.post(`${ROUTE}/save`, this.save.bind(this));
    app.post(`${ROUTE}/delete/:carId`, this.delete.bind(this));
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  index(req, res) {
    const cars = this.carService.getAll();
    res.render(`${this.CAR_VIEWS}/index.njk`, {
      title: 'Rent a Car',
      cars,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  manage(req, res) {
    const cars = this.carService.getAll();
    res.render(`${this.CAR_VIEWS}/manage.njk`, {
      title: 'Car List',
      cars,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  view(req, res) {
    const { carId } = req.params;
    const car = this.carService.getById(carId);
    res.render(`${this.CAR_VIEWS}/view.njk`, {
      title: `${car.brand} ${car.model} ${car.id}`,
      car,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  edit(req, res) {
    const { carId } = req.params;
    const car = this.carService.getById(carId);
    res.render(`${this.CAR_VIEWS}/edit.njk`, {
      title: `Editing ${car.brand} ${car.model} ${car.id}`,
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
  save(req, res) {
    const car = fromFormToEntity(req.body);
    this.carService.save(car);
    res.redirect('/');
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  delete(req, res) {
    const { carId } = req.params;
    const car = this.carService.getById(carId);
    this.carService.delete(car);
    res.redirect('/');
  }
};
