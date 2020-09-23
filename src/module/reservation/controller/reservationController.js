const { fromFormToEntity } = require('../mapper/reservationMapper');
const ReservationIdNotDefinedError = require('../error/ReservationIdNotDefinedError');

module.exports = class reservationController {
  /**
   * @param {import('../service/reservationService')} reservationService
   * @param {import('../../car/service/carService')} carService
   * @param {import('../../user/service/userService')} userService
   */
  constructor(reservationService, carService, userService) {
    this.reservationService = reservationService;
    this.carService = carService;
    this.userService = userService;
    this.ROUTE_BASE = '/reservation';
    this.RESERVATION_VIEWS = 'reservation/views';
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;
    app.get(`${ROUTE}/manage`, this.manage.bind(this));
    app.get(`${ROUTE}/view/:reservationId`, this.view.bind(this));
    app.get(`${ROUTE}/edit/:reservationId`, this.edit.bind(this));
    app.get(`${ROUTE}/add`, this.add.bind(this));
    app.post(`${ROUTE}/save`, this.save.bind(this));
    app.post(`${ROUTE}/finish/:reservationId`, this.finish.bind(this));
    app.post(`${ROUTE}/unblock/:reservationId`, this.unblock.bind(this));
    app.post(`${ROUTE}/pay/:reservationId`, this.pay.bind(this));
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async manage(req, res) {
    const reservations = await this.reservationService.getAll();
    res.render(`${this.RESERVATION_VIEWS}/manage.njk`, {
      title: 'Reservation List',
      reservations,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async view(req, res) {
    const { reservationId } = req.params;
    if (!Number(reservationId)) {
      throw new ReservationIdNotDefinedError();
    }

    const { reservation, car, user } = await this.reservationService.getById(reservationId);
    res.render(`${this.RESERVATION_VIEWS}/view.njk`, {
      title: `Viewing Reservation #${reservation.id}`,
      reservation,
      car,
      user,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async edit(req, res) {
    const { reservationId } = req.params;
    if (!Number(reservationId)) {
      throw new ReservationIdNotDefinedError();
    }
    const cars = await this.carService.getAll();
    const users = await this.userService.getAll();

    const { reservation } = await this.reservationService.getById(reservationId);
    res.render(`${this.RESERVATION_VIEWS}/edit.njk`, {
      title: `Editing Reservation #${reservation.id}`,
      reservation,
      cars,
      users,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async add(req, res) {
    const cars = await this.carService.getAll();
    const users = await this.userService.getAll();
    res.render(`${this.RESERVATION_VIEWS}/add.njk`, {
      title: 'Add New Reservation',
      cars,
      users,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async save(req, res) {
    const reservation = fromFormToEntity(req.body);
    const { car } = await this.carService.getById(reservation.carId);
    await this.reservationService.save(reservation, car);
    res.redirect(`${this.ROUTE_BASE}/manage`);
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async finish(req, res) {
    const { reservationId } = req.params;
    if (!Number(reservationId)) {
      throw new ReservationIdNotDefinedError();
    }

    const { reservation } = await this.reservationService.getById(reservationId);
    await this.reservationService.finish(reservation);
    res.redirect(`${this.ROUTE_BASE}/manage`);
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async unblock(req, res) {
    const { reservationId } = req.params;
    if (!Number(reservationId)) {
      throw new ReservationIdNotDefinedError();
    }

    const { reservation } = await this.reservationService.getById(reservationId);
    await this.reservationService.unblock(reservation);
    res.redirect(`${this.ROUTE_BASE}/manage`);
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async pay(req, res) {
    const { reservationId } = req.params;
    if (!Number(reservationId)) {
      throw new ReservationIdNotDefinedError();
    }

    const { reservation } = await this.reservationService.getById(reservationId);
    await this.reservationService.pay(reservation);
    res.redirect(`${this.ROUTE_BASE}/manage`);
  }
};
