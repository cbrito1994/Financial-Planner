const router = require('express').Router();
const userRoutes = require('./userRoutes');

router.use('/examples', userRoutes);

module.exports = router;
