const Products = require('./financial_products');
const User = require ('./user')
const Wallet = require('./wallet')
const Inventory = require('./inventory')

User.hasMany(Products, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Products.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasOne(Wallet, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Wallet.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// User.belongsToMany(Products, {
//     through: {
//         model: Inventory,
//         foreignKey: 'user_id'
//     }
// })

// Products.belongsToMany(User, {
//     through: {
//         model: Inventory,
//         foreignKey: 'user_id'
//     }
// })



module.exports = { User, Products, Inventory, Wallet };
