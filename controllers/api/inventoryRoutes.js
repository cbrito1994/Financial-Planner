const router = require('express').Router();
const { Inventory, User, Products, Wallet } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/',
  withAuth,
  async (req, res) => {
    try {
      const InventoryData = await Inventory.findAll(
      );
      res.status(200).json(InventoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.put('/buy', withAuth, async (req, res) => {
  try {
    const productData = await Products.findOne({
      where: { id: req.body.product_id }
    });

    const price = productData.stock_price*1;
    const numberStock = req.body.number_stocks*1;
    const purchase_value = price * numberStock;
    console.log(purchase_value);
 
    const walletwallet = await Wallet.findOne({
      where: { user_id: req.session.user_id }
    });

    console.log(walletwallet.balance)

    if (walletwallet.balance >= purchase_value) {

      const walletData = await Wallet.update({
        credit: walletwallet.credit*1 + purchase_value*1,
        balance: walletwallet.balance*1 - purchase_value*1,
      },
        { where: { user_id: req.session.user_id } },
      );
       console.log("wallet updated")
      const inventoryData = await Inventory.update({
        user_id: req.session.user_id,
        product_id: req.body.product_id,
        entry_price: price,
        owned_stocks: numberStock,
        inventory_valuation: purchase_value,
      },
       { where: { user_id: req.session.user_id } },
      );
      console.log("inventory updated");
      res.status(200).json("operation done");
    }
    else {
      res.status(400).json("operation done");
    }
   } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});










module.exports = router;