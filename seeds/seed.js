const sequelize = require('../config/connection');
const { Products, Inventory, User, Wallet } = require('../models');

const userData = require('./userData.json');
const productData = require('./productData.json');
const walletData = require('./walletData.json');
const inventoryData = require('./inventoryData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    return: true
  });

  await Products.bulkCreate(productData);

  await Wallet.bulkCreate(walletData);

  await Inventory.bulkCreate(inventoryData);

  process.exit(0);
};

seedDatabase();
