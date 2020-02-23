const fs = require('fs');
const router = require('koa-router')()
const canteen = require('../modules/DB/canteen.js');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
  await new Promise(function(resolve,reject){
    canteen._findById(1,(err,result)=>{
      if(err){
        console.log(err)
      }else{
        resolve(result)
      }
    })
  }).then((val)=>{
    ctx.body = val
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/test', async (ctx, next) => {
  console.log(222)
  ctx.body = 'koa2 test'
})



// 插入ShoppingMallInfo信息
router.get('/getShoppingMallInfo', async (ctx, next)=>{
  await new Promise((resolve,reject)=>{
    fs.readFile('./data_json/caishi_json/shopping_mall_info.json','utf8',(err,data)=>{
      if(err) reject(err);
      else resolve(data)
    })
  }).then(result=>{
    ctx.body = result;
  }).catch(err=>{
    ctx.body = err;
  })  
})



module.exports = router
