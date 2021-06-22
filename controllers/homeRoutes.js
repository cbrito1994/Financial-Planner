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
      logged_in: req.session.logged_in 
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

router.get('/inventory', 
withAuth,
  async (req, res) => {
    try {
       const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
         });

        const InventoryData = await Inventory.findAll({
          where: { user_id : req.session.user_id },
        //  include: [ { model : Products },]
        });
    
        const user = userData.get({ plain: true });
        const inventories = InventoryData.map((inventory) => inventory.get({ plain: true }));

    console.log(userData);
    console.log(InventoryData);
        res.render('inventory', {
          ...user,
          inventories,
          logged_in: true
        });


    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
   });

   router.get('/wallet', 
   withAuth,
     async (req, res) => {
       try {
          const userData = await User.findByPk(req.session.user_id, {
             attributes: { exclude: ['password'] },
            });
   
           const walletData = await Wallet.findOne({
             where: { user_id : req.session.user_id },
           //  include: [ { model : Products },]
           });
       
           console.log(userData);
           console.log(walletData);

           const user = userData.get({ plain: true });
           const wallet = walletData.get({ plain: true });

           res.render('wallet', {
             ...user,
             ...wallet,
             logged_in: true
           });
   
   
       } catch (err) {
         console.log(err);
         res.status(500).json(err);
       }
      });
   
   

module.exports = router;