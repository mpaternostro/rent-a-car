const { fromDbToEntity } = require('../mapper/carMapper');

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
    const carInstance = this.carModel.build(car, {
      isNewRecord: !car.id,
    });
    // carInstance.setDataValue('updatedAt', new Date().toISOString());
    await carInstance.save();
    return fromDbToEntity(carInstance);
  }

  async getAll() {
    const carInstances = await this.carModel.findAll();
    const cars = carInstances.map((carInstance) => fromDbToEntity(carInstance));
    return cars;
  }

  /**
   * @param {number} carId
   */
  async getById(carId) {
    const carInstance = await this.carModel.findByPk(carId);
    return fromDbToEntity(carInstance);
  }

  /**
   * @param {import('../entity/Car')} car
   */
  async delete(car) {
    return Boolean(
      await this.carModel.destroy({
        where: {
          id: car.id,
        },
      })
    );
  }
};
