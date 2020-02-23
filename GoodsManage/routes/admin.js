var express = require('express');
var router = express.Router();
var product = require('./admin/product.js');

router.get('/',(req,res)=>{
    res.redirect('/admin/product');
})

router.use('/product',product)




module.exports = router;