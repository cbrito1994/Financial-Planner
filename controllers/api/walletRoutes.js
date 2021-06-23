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