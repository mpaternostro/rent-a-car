const { fromModelToEntity } = require('../mapper/carMapper');
const {
  fromModelToEntity: fromReservationModelToEntity,
} = require('../../reservation/mapper/reservationMapper');
const Car = require('../entity/Car');
const CarNotDefinedError = require('../error/CarNotDefinedError');
const CarIdNotDefinedError = require('../error/CarIdNotDefinedError');
const CarNotFoundError = require('../error/CarNotFoundError');
const ReservationModel = require('../../reservation/model/reservationModel');

module.exports = class CarRepository {
  /**
   * @param {typeof import('../model/carModel')} carModel
   */
  constructor(carModel) {
    this.carModel = carModel;
  }

  /**
   * @param {import('../entity/Car')} car
   */
  async save(car) {
    if (!(car instanceof Car)) {
      throw new CarNotDefinedError();
    }

    const carInstance = this.carModel.build(car, {
      isNewRecord: !car.id,
    });
    await carInstance.save();
    return fromModelToEntity(carInstance);
  }

  async getAll() {
    const carInstances = await this.carModel.findAll();
    const cars = carInstances.map((carInstance) => fromModelToEntity(carInstance));
    return cars;
  }

  async getCarsLength() {
    return this.carModel.count();
  }

  async getLastCar() {
    const carInstance = await this.carModel.findOne({
      order: [['id', 'DESC']],
    });
    return fromModelToEntity(carInstance);
  }

  /**
   * @param {number} carId
   */
  async getById(carId) {
    if (!Number(carId)) {
      throw new CarIdNotDefinedError();
    }

    const carInstance = await this.carModel.findByPk(carId, { include: ReservationModel });
    if (!carInstance) {
      throw new CarNotFoundError(`There is no existing car with ID ${carId}`);
    }

    const car = fromModelToEntity(carInstance);
    /**
     * @type {import('../../reservation/entity/Reservation')[]} reservations
     */
    const reservations = carInstance.Reservations.map((instance) =>
      fromReservationModelToEntity(instance)
    );

    return { car, reservations };
  }

  /**
   * @param {import('../entity/Car')} car
   * @returns {Promise<Boolean>} Returns true if a car was deleted, otherwise it returns false
   */
  async delete(car) {
    if (!(car instanceof Car)) {
      throw new CarNotDefinedError();
    }

    return Boolean(await this.carModel.destroy({ where: { id: car.id } }));
  }
};
