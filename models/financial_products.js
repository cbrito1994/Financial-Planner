const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Products extends Model {}

Products.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ticker_symbol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capitalization: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    circulating_stocks: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock_price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Products;
