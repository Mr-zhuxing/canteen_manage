const router = require('koa-router')();
const goods = require('../modules/DB/goods.js')
const order = require('../modules/DB/order.js');
const user = require('../modules/DB/user.js');
const alipaySync = require('../modules/midderWare/alipay_sync_return.js')

router.prefix('/order');


router.post('/confirmBuy', async (ctx, next) => {
  //   console.log(ctx.request.body);
  // 创建订单
  // console.log("ctx.session---",ctx.session.userInfo.userID)

  let newOrders = await new Promise((resolve, reject) => {
    let newOrders = []
    let num = 0;
    ctx.request.body.allGoods.forEach(async (item, index) => {
      let user_account = ctx.request.body.userId; //用户号
      let itemUser = await user.find({
        account: user_account,
      })
      let user_name = itemUser[0]['name']; //用户名
      let goods_id = item.id; //菜式Id
      let time = new Date(ctx.request.body.time).getTime(); //时间
      let ID = '' + user_account + '_' + time + '_' + goods_id;
      let count = item.count; // 数量      
      let itemGoods = await goods.find({
        ID: item.id,
      });
      let goods_name = itemGoods[0].NAME; //商品名字
      // 单价
      goodsPrice = parseFloat(itemGoods[0]["PRESENT_PRICE"]);
      //   总价
      let goodsTotalPrice = goodsPrice * parseInt(item.count);
      let state = "unpaid"; //状态未完成
      if (count != 0) {
        newOrders.push({
          ID,
          user_account,
          user_name,
          goods_id,
          goods_name,
          time,
          state,
          count,
          goodsPrice,
          goodsTotalPrice
        })
      }
      num++;
      if (num == ctx.request.body.allGoods.length) {
        resolve(newOrders);
      }
    });
  })
  console.log(newOrders);
  await order.insertMany(newOrders);
  let alipay_totalPrice = newOrders.reduce((accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue.goodsTotalPrice);
  }, 0)
  ctx.body = await alipaySync(newOrders[0].user_account + '_' + newOrders[0].time, alipay_totalPrice);
})
router.get('/alipay_success', async (ctx, next) => {
  console.log(ctx.request.query.out_trade_no)
  let num = await order.updateMany({
    user_account: ctx.request.query.out_trade_no.split('_')[0],
    time: ctx.request.query.out_trade_no.split('_')[1],
  }, {
    state: 'pending'
  })
  console.log(num);
  ctx.response.type = 'html'
  ctx.body = '<script>window.location.href = "http://localhost:8080/#/Main/Cart";</script>'
})


router.get('/getOrder', async (ctx, next) => {
  let result = await order._findOrders({
    user_account: ctx.request.query.userId,
    state: {
      $regex: /^pending$|^waiting$|^finished$/
    },
    time: {
      $gt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    }
  })
  ctx.body = result
})
// router.get('/pay', async (ctx, next) => {
//   let result = await order._findOrders({
//     user_account: ctx.request.query.userId,
//     state: {
//       $regex: /^pending$|^waiting$|^finished$/
//     },
//     time: {
//       $gt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
//     }
//   })
//   ctx.body = result
// })






























module.exports = router;
