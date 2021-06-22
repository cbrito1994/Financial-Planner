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

  console.log("---------------User Data Created ---------------------------------")

  await Products.bulkCreate(productData);

  console.log("---------------Products Data Created ---------------------------------")

  await Wallet.bulkCreate(walletData);

  console.log("---------------Wallet Data Created ---------------------------------")

  await Inventory.bulkCreate(inventoryData);

  console.log("---------------Inventory Data Created ---------------------------------")

  process.exit(0);
};

seedDatabase();
