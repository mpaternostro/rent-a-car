const Car = require('../entity/Car');
const CarNotDefinedError = require('../error/CarNotDefinedError');
const CarIdNotDefinedError = require('../error/CarIdNotDefinedError');

module.exports = class CarService {
  /**
   * @param {import('../repository/carRepository')} carRepository
   */
  constructor(carRepository) {
    this.carRepository = carRepository;
  }

  /**
   * @param {import('../entity/Car')} car
   */
  async save(car) {
    if (!(car instanceof Car)) {
      throw new CarNotDefinedError();
    }

    return this.carRepository.save(car);
  }

  async getAll() {
    return this.carRepository.getAll();
  }

  async getCarsLength() {
    return this.carRepository.getCarsLength();
  }

  async getLastCar() {
    return this.carRepository.getLastCar();
  }

  /**
   * @param {number} carId
   */
  async getById(carId) {
    if (!Number(carId)) {
      throw new CarIdNotDefinedError();
    }

    return this.carRepository.getById(carId);
  }

  /**
   * @param {import('../entity/Car')} car
   */
  async delete(car) {
    if (!(car instanceof Car)) {
      throw new CarNotDefinedError();
    }

    return this.carRepository.delete(car);
  }
};
