const router = require('express').Router();
const { Inventory, User, Products,  Wallet } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', 
//withAuth, 
 async (req, res) => {
   try {
     const WalletData = await Wallet.findAll(
    //   {
    //  include: [ 
    //    { model : User }
    //    { model : Inventory }
    //   ]
    // }
     );
      res.status(200).json(WalletData);
   } catch (err) {
     res.status(500).json(err);
   }
  });







   module.exports = router;