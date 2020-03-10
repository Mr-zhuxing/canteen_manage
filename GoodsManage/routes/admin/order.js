const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const order = require('../../modules/DB/order.js')
const mDate = require('../../modules/util/date.js')

router.get('/index', async (req, res) => {
  let data = await order.find()
  let theData = JSON.parse(JSON.stringify(data))
  theData.forEach((item, index) => {
    item.time = mDate.call(new Date(item.time), 'yyyy-MM-dd hh:mm:ss');
  });
  res.render('admin/order/order.ejs', {
    list: theData,
    //   nowPage: 1,
    //   startPage,
    //   endPage,
  })

})

router.get('/receipt', async (req, res) => {
  console.log(req.query);
  try {
    let result = await order.findOneAndUpdate({
      ID: req.query.ID
    }, {
      state: 'waiting'
    });
    res.json({
      state: 200,
    })
  } catch (err) {
    console.log(err)
  }
})
router.get('/finishOrder', async (req, res) => {
  console.log(req.query);
  try {
    let result = await order.findOneAndUpdate({
      ID: req.query.ID
    }, {
      state: 'finished'
    });
    res.json({
      state: 200,
    })
  } catch (err) {
    console.log(err)
  }
})







module.exports = router;
