var express = require('express');
var router = express.Router();
var product = require('./admin/product.js');
var order = require('./admin/order.js');

router.get('/',(req,res)=>{
    res.redirect('/admin/product');
})

router.use('/product',product)
router.use('/order', order)



module.exports = router;