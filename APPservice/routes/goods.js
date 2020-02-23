const goods = require('../modules/DB/goods.js');
const category = require('../modules/DB/category.js')
const categorySub = require('../modules/DB/categorySub.js');
// const md5 = require('md5')
const router = require('koa-router')();
const fs = require('fs');

router.prefix('/goods')

router.get('/', async function (ctx, next) {



  ctx.body = "goods/"
});

router.post('/getDetailGoodsInfo', async (ctx, next) => {
  await goods.findOne({
    ID: ctx.request.body.goodsId
  }).then(result => {
    ctx.body = {
      code: 200,
      message: result
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      message: err
    }
  })
})


// 读取商品大类的信息
router.get('/getCategoryList', async (ctx) => {
  try {
    var result = await category.find().exec()
    ctx.body = {
      code: 200,
      message: result
    };
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err
    };
  }

})
// 读取商品子类的数据
router.post('/getCategorySubList', async (ctx) => {
  try {
    let categoryId = ctx.request.body.categoryId;
    var result = await categorySub.find({
      MALL_CATEGORY_ID: categoryId
    }).exec();
    ctx.body = {
      code: 200,
      message: result
    };
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err
    };
  }
})
// 通过商品子类id获取商品信息 . 分页查询
router.post('/getGoodsListByCategorySubID', async (ctx) => {
  try {
    let categorySubId = ctx.request.body.categorySubId //小类别
    let page = ctx.request.body.page; //页数
    let num = 10; //一页的数目
    let start = (page - 1) * num; //开始数
    var result = await goods.find({
      SUB_ID: categorySubId
    }).skip(start).limit(num).exec();
    ctx.body = {
      code: 200,
      message: result
    };
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err
    };
  }
})
//模糊查询商品
router.get('/mohuQuery', async (ctx, next) => {
  let reg = new RegExp(ctx.query.str)
  let result = await goods.find({
    $or: [{
      NAME: {
        $regex: reg
      },
    }],
  }).catch(err => {
    ctx.body = {
      code: 500,
      message: err
    }
  })
  ctx.body = {
    code: 200,
    message: result
  }
})

































































// //插入商品数据
// router.get('/insertAllGoodsInfo', async function (ctx, next) {
//   await new Promise(function (resolve, reject) {
//     fs.readFile('./data_json/newGoods.json', 'utf8', (err, result) => {
//       if (err) reject(err);
//       else resolve(JSON.parse(result));
//     })
//   }).then(result => {
//     let count = 0
//     result.map((value, index) => {
//       // console.log(Math.ceil(Math.random()*3))
//       var newGoods = new goods({
//         canteen_id: Math.ceil(Math.random() * 3),
//         window_num: Math.ceil(Math.random() * 10),
//         ID: value.ID,
//         GOODS_SERIAL_NUMBER: value.GOODS_SERIAL_NUMBER,
//         SHOP_ID: value.SHOP_ID,
//         SUB_ID: value.SUB_ID,
//         GOOD_TYPE: value.GOOD_TYPE,
//         STATE: value.STATE,
//         NAME: value.NAME,
//         ORI_PRICE: value.ORI_PRICE,
//         PRESENT_PRICE: value.PRESENT_PRICE,
//         AMOUNT: value.AMOUNT,
//         DETAIL: value.DETAIL,
//         BRIEF: value.BRIEF,
//         SALES_COUNT: value.SALES_COUNT,
//         IMAGE1: value.IMAGE1,
//         IMAGE2: value.IMAGE2,
//         IMAGE3: value.IMAGE3,
//         IMAGE4: value.IMAGE4,
//         IMAGE5: value.IMAGE5,
//         ORIGIN_PLACE: value.ORIGIN_PLACE,
//         GOOD_SCENT: value.GOOD_SCENT,
//         CREATE_TIME: value.CREATE_TIME,
//         UPDATE_TIME: value.UPDATE_TIME,
//         IS_RECOMMEND: value.IS_RECOMMEND,
//         PICTURE_COMPERSS_PATH: value.PICTURE_COMPERSS_PATH
//       });
//       console.log(newGoods)
//       newGoods.save().then(_ => {
//         count++;
//       }).catch(err => {
//         console.log("失败" + err)
//       })
//       console.log(count);
//     })
//   }).catch(err => {
//     console.log(err)
//   })
//   ctx.body = "goods/insertAllGoodsInfo"
// })
// // 插入商品大类数据
// router.get('/insertAllCategory', async (ctx) => {
//   fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
//     data = JSON.parse(data)
//     let saveCount = 0
//     data.RECORDS.map((value, index) => {
//       console.log(value)
//       let newCategory = new category(value)
//       newCategory.save().then(() => {
//         saveCount++
//         console.log('成功' + saveCount)
//       }).catch(error => {
//         console.log('失败：' + error)
//       })
//     })
//   })
//   ctx.body = "开始导入数据";
// })
// // 插入商品子类数据
// router.get('/insertAllCategorySub', async (ctx) => {
//   fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
//     data = JSON.parse(data)
//     let saveCount = 0
//     data.RECORDS.map((value, index) => {
//       console.log(value)
//       let newCategorysub = new categorySub(value)
//       newCategorysub.save().then(() => {
//         saveCount++
//         console.log('成功' + saveCount)
//       }).catch(error => {
//         console.log('失败：' + error)
//       })
//     })
//   })
//   ctx.body = "开始导入商品子类数据";
// })



// 新数据新数据新数据新数据新数据
// 新数据新数据新数据新数据新数据
// 新数据新数据新数据新数据新数据
// 新数据新数据新数据新数据新数据
// 新数据新数据新数据新数据新数据


//插入商品数据
// router.get('/insertAllGoodsInfo', async function (ctx, next) {
//   await new Promise(function (resolve, reject) {
//     fs.readFile('./data_json/caishi_json/goods.json', 'utf8', (err, result) => {
//       if (err) reject(err);
//       else resolve(JSON.parse(result));
//     })
//   }).then(result => {
//     let count = 0
//     result.map((value, index) => {
//       // console.log(Math.ceil(Math.random()*3))
//       var newGoods = new goods({
//         ID: value.ID,
//         MALL_CATEGORY_ID: value['MALL_CATEGORY_ID'],
//         SUB_ID: value['SUB_ID'],
//         NAME: value['NAME'],
//         window_num: value['window_num'],
//         canteen_id: value['canteen_id'],
//         ORI_PRICE: value['ORI_PRICE'],
//         PRESENT_PRICE: value['PRESENT_PRICE'],
//         AMOUNT: value['AMOUNT'],
//         DETAIL: value['DETAIL'],
//         IMAGE1: value['IMAGE1'],
//         href: value['href'],
//         PICTURE_COMPERSS_PATH: value['PICTURE_COMPERSS_PATH'],
//       });
//       // console.log(newGoods)
//       newGoods.save().then(_ => {
//         count++;
//       }).catch(err => {
//         console.log("失败" + err)
//       })
//       console.log(count);
//     })
//   }).catch(err => {
//     console.log(err)
//   })
//   ctx.body = "goods/insertAllGoodsInfo"
// })
// // 插入商品大类数据
// router.get('/insertAllCategory', async (ctx) => {
//   fs.readFile('./data_json/caishi_json/category.json', 'utf8', (err, data) => {
//     data = JSON.parse(data)
//     let saveCount = 0
//     data.map((value, index) => {
//       console.log(value)
//       let newCategory = new category({
//         ID: value.ID,
//         MALL_CATEGORY_NAME: value.name,
//       })
//       newCategory.save().then(() => {
//         saveCount++
//         console.log('成功' + saveCount)
//       }).catch(error => {
//         console.log('失败：' + error)
//       })
//     })
//   })
//   ctx.body = "开始导入数据";
// })
// // 插入商品子类数据
// router.get('/insertAllCategorySub', async (ctx) => {
//   fs.readFile('./data_json/caishi_json/categorySub.json', 'utf8', (err, data) => {
//     data = JSON.parse(data)
//     let saveCount = 0
//     data.map((value, index) => {
//       // console.log(value)
//       let newCategorysub = new categorySub({
//         ID: value['ID'],
//         MALL_CATEGORY_ID: value['MALL_CATEGORY_ID'],
//         MALL_SUB_NAME: value['MALL_SUB_NAME'],
//         IMG_SRC: value['img_src'],
//       })
//       newCategorysub.save().then(() => {
//         saveCount++
//         console.log('成功' + saveCount)
//       }).catch(error => {
//         console.log('失败：' + error)
//       })
//     })
//   })
//   ctx.body = "开始导入商品子类数据";
// })


//改图片数据url
// router.get('/test', async function(ctx, next){
//   fs.readFile('./data_json/caishi_json/goods.json',{
//     encoding:'utf8'
//   },function(err,data){
//     data = JSON.parse(data);
//     data.forEach((item,index) => {
//       item['IMAGE1'] = `http://127.0.0.1:3001/public/goodsImg/${item["MALL_CATEGORY_ID"]}/${item["SUB_ID"]}/${item["ID"]}.jpg`
//     });
//     fs.writeFile('./data_json/caishi_json/goods.json',JSON.stringify(data),{
//       encoding: 'utf8'
//     },function(err,data){
//       if(err){
//         console.log("err")
//       }else{
//         console.log('ok')
//       }
//     })
//   })
//   ctx.body = {
//     code: 200,
//     message: 'test'
//   }
// })

// 获取并修改首页数据
// router.get('/getShoppingMallInfo2', async (ctx, next) => {
//   let oldData = await new Promise((resolve, reject) => {
//     fs.readFile('./data_json/shopping_mall_info.json', {
//       encoding: 'utf8',
//     }, function (err, data) {
//       if (err) reject(err);
//       else resolve(JSON.parse(data));
//     })
//   })
//   let hotGoods = await goods.find({
//     MALL_CATEGORY_ID: 0,
//   }).limit(20).exec();
//   let recommend = await goods.find({
//     MALL_CATEGORY_ID: 3,
//   }).limit(17).exec();
//   let floor1 = await goods.find({
//     MALL_CATEGORY_ID: 1,
//   }).limit(5).exec();
//   let floor2 = await goods.find({
//     MALL_CATEGORY_ID: 2,
//   }).limit(5).exec();
//   let floor3 = await goods.find({
//     MALL_CATEGORY_ID: 4,
//   }).limit(5).exec();
//   let newData = {
//     data: {
//       floorName: ['每日三餐', '主食', '中华菜系'],
//       floor1,
//       floor2,
//       floor3,
//       hotGoods,
//       recommend,
//       category: oldData.data.category,
//     },
//     page: null,
//     limit: null,
//   }
//   // fs.writeFile('./data_json/caishi_json/shopping_mall_info.json',JSON.stringify(newData),{
//   //   encoding:'utf8'
//   // },function(err){
//   //   if(err) console.log(err);
//   //   else console.log('ok')
//   // })

//   ctx.body = newData;
// })















module.exports = router
