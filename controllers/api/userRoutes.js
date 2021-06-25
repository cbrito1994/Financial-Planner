const router = require('express').Router();
const { User, Products, Inventory, Wallet } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
        
      res.status(200).json(userData);
    });


 const useruserData = await User.findOne({
   where : { user_email: req.body.user_email}
 })

      
  const walletData = await Wallet.create({
       user_id : useruserData.user_id,
       credit : 0,
       debit : 0,
       balance :0
   });

   const inventoryData = await Inventory.create({
     user_id : useruserData.user_id,
  product_id : 1,
  entry_price : 0,
  owned_stocks : 0,
  inventory_valuation : 0
   });
  
  } 
   
  catch (err) {
    res.status(400).json(err);
    console.log(err)
  }
});


router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { user_email: req.body.email } });
    console.log(req.body.email)

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;
      console.log('You are now logged in!') 
      res.status(200).json({ user: userData, message: 'You are now logged in!' });
      console.log(userData);
      

    });

    router.post('/logout', (req, res) => {
      console.log(req.session.logged_in)
      if (req.session.logged_in == true) {
        req.session.destroy(() => {
          res.status(204).end();
        });
        console.log("you are logged out");
      } else {
        res.status(404).end();
        console.log(res)
      }
    });
      } catch (err) {
        console.log(err)
    res.status(400).json(err);
  }
});


module.exports = router;
