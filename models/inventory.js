const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Inventory extends Model {}

Inventory.init(
  {
    // define columns
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
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    entry_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    owned_stocks: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    inventory_valuation: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'inventory',
  }
);

module.exports = Inventory;