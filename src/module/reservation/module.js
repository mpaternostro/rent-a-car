const ReservationController = require('./controller/reservationController');
const ReservationService = require('./service/reservationService');
const ReservationRepository = require('./repository/reservationRepository');
const ReservationModel = require('./model/reservationModel');

/**
 * @param {import('express').Application} app
 * @param {import('rsdi').IDIContainer} container
 */
function initReservationModule(app, container) {
  /**
   * @type {ReservationController} controller
   */
  const controller = container.get('ReservationController');
  controller.configureRoutes(app);
}

module.exports = {
  ReservationController,
  ReservationService,
  ReservationRepository,
  ReservationModel,
  initReservationModule,
};
