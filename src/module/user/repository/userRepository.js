const { fromModelToEntity } = require('../mapper/userMapper');
const UserNotDefinedError = require('../error/UserNotDefinedError');
const UserIdNotDefinedError = require('../error/UserIdNotDefinedError');
const UserNotFoundError = require('../error/UserNotFoundError');
const User = require('../entity/User');

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
    if (!(user instanceof User)) {
      throw new UserNotDefinedError();
    }
    const userInstance = this.userModel.build(user, {
      isNewRecord: !user.id,
    });
    await userInstance.save();
    return fromModelToEntity(userInstance);
  }

  async getAll() {
    const userInstances = await this.userModel.findAll();
    const users = userInstances.map((userInstance) => fromModelToEntity(userInstance));
    return users;
  }

  /**
   * @param {number} userId
   */
  async getById(userId) {
    if (!Number(userId)) {
      throw new UserIdNotDefinedError();
    }
    const userInstance = await this.userModel.findByPk(userId);
    if (!userInstance) {
      throw new UserNotFoundError(`There is no existing user with ID ${userId}`);
    }
    return fromModelToEntity(userInstance);
  }
};
