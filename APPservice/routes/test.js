const goods = require('../modules/DB/goods.js');
const category = require('../modules/DB/category.js')
const categorySub = require('../modules/DB/categorySub.js');
const router = require('koa-router')();
const fs = require('fs');

router.prefix('/test');



router.get('/', async function (ctx, next) {



  ctx.body = "test/"
});

router.get('/ws', async function (ctx, next) {



  ctx.body = "test/ws"
});
















module.exports = router;