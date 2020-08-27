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
    app.get(`${ROUTE}/add`, this.add.bind(this));
    app.post(`${ROUTE}/save`, this.save.bind(this));
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  index(req, res) {
    const cars = this.carService.getAll();
    console.log(cars);
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
  add(req, res) {
    res.render(`${this.CAR_VIEWS}/add-form.njk`, {
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
};
