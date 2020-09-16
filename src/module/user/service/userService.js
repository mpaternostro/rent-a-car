const UserNotDefinedError = require('../error/UserNotDefinedError');
const UserIdNotDefinedError = require('../error/UserIdNotDefinedError');
const User = require('../entity/User');

module.exports = class UserService {
  /**
   * @param {import('../repository/userRepository')} userRepository
   */
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * @param {import('../entity/User')} user
   */
  async save(user) {
    if (!(user instanceof User)) {
      throw new UserNotDefinedError();
    }
    return this.userRepository.save(user);
  }

  async getAll() {
    return this.userRepository.getAll();
  }

  /**
   * @param {number} userId
   */
  async getById(userId) {
    if (!Number(userId)) {
      throw new UserIdNotDefinedError();
    }
    return this.userRepository.getById(userId);
  }
};
