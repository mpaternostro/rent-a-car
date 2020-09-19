const ReservationNotDefinedError = require('../error/ReservationNotDefinedError');
const ReservationIdNotDefinedError = require('../error/ReservationIdNotDefinedError');
const Reservation = require('../entity/Reservation');

module.exports = class ReservationService {
  /**
   * @param {import('../repository/reservationRepository')} reservationRepository
   */
  constructor(reservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  /**
   * @param {import('../entity/Reservation')} reservation
   * @param {import('../../car/entity/Car')} car
   * @param {boolean} isFinished
   */
  async save(reservation, car) {
    if (!(reservation instanceof Reservation)) {
      throw new ReservationNotDefinedError();
    }
    reservation.fillReservationPrice(car, reservation.pricePerDay);
    reservation.fillReservationStatus();
    return this.reservationRepository.save(reservation);
  }

  /**
   * @param {import('../entity/Reservation')} reservation
   */
  async finish(reservation) {
    reservation.fillReservationStatus(true);
    return this.reservationRepository.save(reservation);
  }

  /**
   * @param {import('../entity/Reservation')} reservation
   */
  async unblock(reservation) {
    reservation.fillReservationStatus(false);
    return this.reservationRepository.save(reservation);
  }

  async getAll() {
    return this.reservationRepository.getAll();
  }

  /**
   * @param {number} reservationId
   */
  async getById(reservationId) {
    if (!Number(reservationId)) {
      throw new ReservationIdNotDefinedError();
    }
    return this.reservationRepository.getById(reservationId);
  }
};
