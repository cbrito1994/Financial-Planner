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

  router.put('/update', withAuth, async (req, res) => {
    try {
   const walletwallet = await Wallet.findOne({
    where: { user_id : req.session.user_id}
   });

    const walletData = await Wallet.update({
          credit : req.body.credit*1 + walletwallet.credit*1,
          debit : req.body.debit*1 + walletwallet.debit*1,
          balance : walletwallet.balance*1 - req.body.credit*1 + req.body.debit*1,
     },
    {where: { user_id : req.session.user_id}},
    );

    res.status(200).json(walletData);
    } catch (err) {
      console.log(err);
        res.status(500).json(err);
      }
    });



    router.put('/sell', withAuth, async (req, res) => {
      try {
     const inventoryID = await Inventory.findOne({
      where: { product_id : req.body.product_id}
     });

     const selldebit = inventoryID.inventory_valuation*1;

     const walletwallet = await Wallet.findOne({
      where: { user_id : req.session.user_id}
     });
  
      const walletData = await Wallet.update({
            debit : walletwallet.debit*1 +selldebit,
            balance : walletwallet.balance*1  + selldebit,
       },
      {where: { user_id : req.session.user_id}},
      );

      const inventoryDist = await Inventory.destroy({
        where: { product_id : req.body.product_id}
       });
  
      } catch (err) {
        console.log(err);
          res.status(500).json(err);
        }
      });
  





  router.get('/getWallet', 
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

           const user = userData.get({ plain: true });
           const wallet = walletData.get({ plain: true });

                  
           console.log(user);
           console.log(wallet);

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