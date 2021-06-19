const router = require('express').Router();
const { User, Products, Inventory, Wallet } = require('../../models');
//const withAuth = require('.../utils/auth');

router.get('/', async (req, res) => {
    try {
      const ProductData = await Products.findAll(
     //   {
     //  include: [ 
     //    { model : User }
     //    { model : Inventory }
     //   ]
     // }
      );
       res.status(200).json(ProductData);
    } catch (err) {
      res.status(500).json(err);
    }
   });

   
router.get('/:id', async (req, res) => {
    try {
      const ProductData = await Products.findOne({
        where: {
            id: req.params.id
        },
     //   {
     //  include: [ 
     //    { model : User }
     //    { model : Inventory }
     //   ]
     // }
    });
       res.status(200).json(ProductData);
    } catch (err) {
      res.status(500).json(err);
    }
   });

   router.post('/', async (req, res) => {
    try {
    const ProductData = await Products.create({
        category_name: req.body.category_name,
        ticker_symbol: req.body.ticker_symbol,
        capitalization: req.body.capitalization,
        circulating_stocks: req.body.circulating_stocks,
        stock_price: req.body.stock_price,
        user_id: req.body.user_id
    });
    res.status(200).json(ProductData);
    } catch (err) {
        res.status(500).json(err);
      }
    });

    router.put('/:id', (req, res) => {
        Products.update({
            category_name: req.body.category_name,
            ticker_symbol: req.body.ticker_symbol,
            capitalization: req.body.capitalization,
            circulating_stocks: req.body.circulating_stocks,
            stock_price: req.body.stock_price,
            user_id: req.body.user_id
            }, {
            where: {
                id: req.params.id
            }
        }).then(ProductData => {
            if (!ProductData) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }            
            res.status(200).json(ProductData);
        })
        
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        }); 
    });
    
    router.delete('/:id', async (req, res) => {
        try {
          const ProductData = await Products.destroy({
            where: {
              id: req.params.id
            }
          });
          if (!ProductData) {
            res.status(404).json({ message: 'No Product found with this id!' });
            return;
          }
          res.status(200).json(ProductData);
        } catch (err) {
          res.status(500).json(err);
        }
      });


   module.exports = router;