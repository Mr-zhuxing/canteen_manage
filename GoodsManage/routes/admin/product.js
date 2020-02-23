var express = require('express');
var fs = require('fs');
var path = require('path');
var multiparty = require('multiparty');
var router = express.Router();
var goods = require('../../modules/DB/goods.js')

router.get('/', async (req, res) => {
  let data = await goods.find().skip(0).limit(10).exec();
  res.render('admin/product/index.ejs', {
    list: data
  })

})


router.get('/add', (req, res) => {
  res.render('admin/product/add.ejs')
})
router.post('/doAdd', function (req, res) {
  var form = new multiparty.Form({
    "uploadDir": "upload"
  });
  form.parse(req, function (err, fields, files) {
    var ID = Date.now().toString()
    var MALL_CATEGORY_ID = fields.MALL_CATEGORY_ID[0];
    var SUB_ID = fields.SUB_ID[0];
    var NAME = fields.NAME[0];
    var window_num = fields.window_num[0];
    var canteen_id = fields.canteen_id[0];
    var ORI_PRICE = fields.ORI_PRICE[0];
    var PRESENT_PRICE = fields.PRESENT_PRICE[0];
    var AMOUNT = fields.AMOUNT[0];
    var DETAIL = fields.DETAIL[0];
    var IMAGE1 = files.pic[0].path;
    let newGoods = {
      ID,
      MALL_CATEGORY_ID,
      SUB_ID,
      NAME,
      window_num,
      canteen_id,
      ORI_PRICE,
      PRESENT_PRICE,
      AMOUNT,
      DETAIL,
      IMAGE1,
    }
    var sourceFile = path.resolve(newGoods.IMAGE1);
    var destPath = path.resolve("public\\goodsImg\\" + newGoods.MALL_CATEGORY_ID + "\\" + newGoods.SUB_ID + "\\" + files.pic[0].path.slice(7));
    newGoods.IMAGE1 = "http://127.0.0.1:3001/" + "public/goodsImg/" + newGoods.MALL_CATEGORY_ID + "/" + newGoods.SUB_ID + "/" + files.pic[0].path.slice(7)
    console.log(sourceFile)
    console.log(destPath)
    console.log(newGoods.IMAGE1)
    fs.rename(sourceFile, destPath, function (err) {
      if (err) throw err;
      else {
        let docGoods = new goods(newGoods);
        docGoods.save((err, result) => {
          if (err) console.log(err);
          else console.log(result);
        })
      }
    });
    res.redirect('/admin/product')
  })
})

router.get('/edit', async (req, res) => {
  var ID = req.query.id;
  goods.find({
    ID,
  }, function (err, data) {
    res.render('admin/product/edit.ejs', {
      list: data
    })
  })

})

router.post('/doEdit', async function (req, res) {
  let path = 'public/goodsImg/' + req.query.oldUrl;
  var form = new multiparty.Form({
    'uploadDir': path
  })
  form.parse(req, async function (err, fields, files) {
    console.log(fields)
    console.log(files)
    var json2 = {
      ...fields
    };
    for (let key in json2) {
      json2[key] = json2[key][0];
    }
    console.log(json2)
    json2.ID = json2['id'];
    delete json2['id'];
    delete json2['oldpic'];
    //判断是否上传新图片
    if (files.IMAGE1[0].originalFilename) {
      let imgReg = /\\/g;
      json2['IMAGE1'] = "http://127.0.0.1:3001/" + files.IMAGE1[0].path.replace(imgReg, '/');
      fs.unlink(fields.oldpic[0].slice(22), (err) => {
        if (err) console.log(err);
      })
    } else {
      fs.unlink(files.IMAGE1[0].path, (err) => {
        if (err)
          console.log(err);
      });
    }
    await goods.update({
      ID: json2.ID,
    }, json2, (err, raw) => {
      if (err) console.log(err);
      else console.log(raw)
    })
    res.redirect('/admin/product');
  })
})


router.get('/doDelete', async function (req, res) {
  await goods.remove({
    ID: req.query.ID
  }, function (err, data) {
    fs.unlink(req.query.IMAGE1.slice(22), (err) => {
      if (err) console.log(err);
      else console.log('删除成功')
    })
  })
  res.redirect('/admin/product')
})

// 分页查询
router.get('/fenyeFind', async (req, res) => {
  let start = 2; //第几页
  let num = 10; //一页数目
  start = (start - 1) * num;
  var result = await goods.find().skip(start).limit(num).exec();
  res.json(result);
})

module.exports = router;
