const sequelize = require('../config/connection');
const { Products, Inventory, User, Wallet } = require('../models');

const userData = require('./exampleData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Example.bulkCreate(exampleData);

  process.exit(0);
};

seedDatabase();
