const router = require('express').Router();
const { Products, Inventory, User, Wallet } = require('../models');

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    // Get all examples 
    const inventoryData = await Inventory.findOne(id, {
        where: {
            user_id: id
        },
        include: [
            {
                model: User
            }
        ]
    });

    const walletData = await Wallet.findOne(id, {
        where: {
            user_id: id
        },
        include: [
            {
                model: User
            }
        ]
    });

    // Serialize data so the template can read it
    const inventories = inventoryData.map((inventory) => inventory.get({ plain: true }));
    const wallet = walletData.map((data) => data.get({ plain: true }));

    // Pass serialized data
    res.render('dashboard', { 
        inventories,
        wallet
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;