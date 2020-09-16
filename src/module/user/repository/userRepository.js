const { fromDbToEntity } = require('../mapper/userMapper');

module.exports = class UserRepository {
  /**
   * @param {typeof import('../model/userModel')} userModel
   */
  constructor(userModel) {
    this.userModel = userModel;
  }

  /**
   * @param {import('../entity/User')} user
   */
  async save(user) {
    const userInstance = this.userModel.build(user, {
      isNewRecord: !user.id,
    });
    await userInstance.save();
    return fromDbToEntity(userInstance);
  }

  async getAll() {
    const userInstances = await this.userModel.findAll();
    const users = userInstances.map((userInstance) => fromDbToEntity(userInstance));
    return users;
  }

  /**
   * @param {number} userId
   */
  async getById(userId) {
    const userInstance = await this.userModel.findByPk(userId);
    return fromDbToEntity(userInstance);
  }
};
