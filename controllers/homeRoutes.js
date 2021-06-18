const router = require('express').Router();
const { Products, Inventory, User, Wallet } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all examples 
    const stocksData = await Products.findAll();

    // Serialize data so the template can read it
    const stocks = stocksData.map((stock) => stock.get({ plain: true }));

    // Pass serialized data
    res.render('homepage', { 
      stocks, 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', withAuth, (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;