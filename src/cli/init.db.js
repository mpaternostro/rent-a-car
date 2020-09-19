require('dotenv').config();
const configureDI = require('../config/di');

(async () => {
  const container = configureDI();
  /**
   * @type {import('sequelize').Sequelize} sequelize
   */
  const sequelize = container.get('Sequelize');
  container.get('CarModel');
  container.get('UserModel');
  container.get('ReservationModel');
  await sequelize.sync();
})();
