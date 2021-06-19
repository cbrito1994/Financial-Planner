const router = require('express').Router();
const { Products, Inventory, User, Wallet } = require('../models');
const withAuth = require('../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
  try {
    const id = req.params.id;

    const inventoryData = await Inventory.findAll(id, {
        where: {
            user_id: id
        },
        include: [
            {
                model: User,
               }
        ]
    });

    const walletData = await Wallet.findAll(id, {
        where: {
            user_id: id
        },
        include: [
            {
                model: User,
              
            }
        ]
    });

    // Serialize data so the template can read it
    const inventories = inventoryData.map((inventory) => inventory.get({ plain: true }));
    const wallets = walletData.map((wallet) => wallet.get({ plain: true }));

    res.render('main', { 
   //logged_in: true
   logged_in: req.session.logged_in
    });

    // Pass serialized data
    res.render('profile', { 
        inventories,
        wallets,
    
    });


  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;