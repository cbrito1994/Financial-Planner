const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Wallet extends Model {}

Wallet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    credit: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    debit: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'wallet',
  }
);

module.exports = Wallet;