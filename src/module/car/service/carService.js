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
    return this.carRepository.save(car);
  }

  async getAll() {
    return this.carRepository.getAll();
  }

  /**
   * @param {number} carId
   */
  async getById(carId) {
    return this.carRepository.getById(carId);
  }

  /**
   * @param {import('../entity/Car')} car
   */
  async delete(car) {
    return this.carRepository.delete(car);
  }
};
