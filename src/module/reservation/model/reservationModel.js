const { DataTypes, Model } = require('sequelize');

class ReservationModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   */
  static setup(sequelizeInstance) {
    ReservationModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        startDate: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        finishDate: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        pricePerDay: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        totalPrice: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        paymentMethod: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        paid: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Reservation',
      }
    );

    return ReservationModel;
  }

  /**
   * @param {typeof import('../../car/model/carModel')} CarModel
   * @param {typeof import('../../user/model/userModel')} UserModel
   */
  static setupAssociations(CarModel, UserModel) {
    CarModel.hasMany(ReservationModel, { foreignKey: 'carId' });
    ReservationModel.belongsTo(CarModel, { foreignKey: 'carId' });
    UserModel.hasMany(ReservationModel, { foreignKey: 'userId' });
    ReservationModel.belongsTo(UserModel, { foreignKey: 'userId' });
  }
}

module.exports = ReservationModel;
