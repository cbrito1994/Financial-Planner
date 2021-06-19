const router = require('express').Router();
const { Products, Inventory, User, Wallet } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all examples 
    const ProductData = await Products.findAll();

    // Serialize data so the template can read it
    const products = ProductData.map((product) => product.get({ plain: true }));

    // Pass serialized data
    res.render('homepage', { 
      products, 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login',  (req, res) => {
  console.log('login');
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;