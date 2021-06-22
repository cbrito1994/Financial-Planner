const router = require('express').Router();
const userRoutes = require('./userRoutes');
const productsRoutes = require('./productsRoutes');
const inventoryRoutes = require('./inventoryRoutes');
const walletRoutes = require('./walletRoutes');

router.use('/user', userRoutes);
router.use('/product', productsRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/wallet', walletRoutes);

module.exports = router;
