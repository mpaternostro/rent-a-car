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
    return this.userRepository.save(user);
  }

  async getAll() {
    return this.userRepository.getAll();
  }

  /**
   * @param {number} userId
   */
  async getById(userId) {
    return this.userRepository.getById(userId);
  }
};
