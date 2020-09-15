const { DataTypes, Model } = require('sequelize');

class CarModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   */
  static setup(sequelizeInstance) {
    CarModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        brand: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        model: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        year: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        kms: {
          type: DataTypes.INTEGER,
        },
        color: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        ac: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        passengers: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        transmission: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
        },
        img: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Car',
      }
    );

    return CarModel;
  }
}

module.exports = CarModel;
