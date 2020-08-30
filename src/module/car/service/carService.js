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
  save(car) {
    this.carRepository.save(car);
  }

  getAll() {
    return this.carRepository.getAll();
  }

  /**
   * @param {number} carId
   */
  getById(carId) {
    return this.carRepository.getById(carId);
  }

  /**
   * @param {import('../entity/Car')} car
   */
  delete(car) {
    this.carRepository.delete(car);
  }
};
