const { fromModelToEntity } = require('../mapper/reservationMapper');
const ReservationNotDefinedError = require('../error/ReservationNotDefinedError');
const ReservationIdNotDefinedError = require('../error/ReservationIdNotDefinedError');
const ReservationNotFoundError = require('../error/ReservationNotFoundError');
const Reservation = require('../entity/Reservation');

module.exports = class ReservationRepository {
  /**
   * @param {typeof import('../model/reservationModel')} reservationModel
   */
  constructor(reservationModel) {
    this.reservationModel = reservationModel;
  }

  /**
   * @param {import('../entity/Reservation')} reservation
   */
  async save(reservation) {
    if (!(reservation instanceof Reservation)) {
      throw new ReservationNotDefinedError();
    }
    const reservationInstance = this.reservationModel.build(reservation, {
      isNewRecord: !reservation.id,
    });
    await reservationInstance.save();
    return fromModelToEntity(reservationInstance);
  }

  async getAll() {
    const reservationInstances = await this.reservationModel.findAll();
    const reservations = reservationInstances.map((reservationInstance) =>
      fromModelToEntity(reservationInstance)
    );
    return reservations;
  }

  /**
   * @param {number} reservationId
   */
  async getById(reservationId) {
    if (!Number(reservationId)) {
      throw new ReservationIdNotDefinedError();
    }
    const reservationInstance = await this.reservationModel.findByPk(reservationId);
    if (!reservationInstance) {
      throw new ReservationNotFoundError(
        `There is no existing reservation with ID ${reservationId}`
      );
    }
    const reservation = fromModelToEntity(reservationInstance);
    const car = await reservationInstance.getCar();
    const user = await reservationInstance.getUser();
    return { reservation, car, user };
  }
};
