const db = require('./db.js')
const mongoose = require('mongoose');
const user = require('./user.js');
const goods = require('./goods.js');
const Schema = mongoose.Schema;
// 设置表结构
var mySchema = new Schema({
  ID: {
    type: String,
    required: true,
  },
  user_account: {
    type: String,
    required: true, //设置必须有值
  },
  user_name: {
    type: String,
  },
  goods_id: {
    type: String,
    required: true, //设置必须有值
  },
  goods_name: {
    type: String,
  },
  time: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true, //设置必须有值
  },
  count: {
    type: Number,
    required: true,
  },
  goodsPrice: {
    type: String,
    required: true,
  },
  goodsTotalPrice: {
    type: String,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
}); //timestamps 用于记录创建和修改时间
mySchema.set('collection', 'order');
mySchema.statics._findById = function (_id, cb) {
  var _this = this;
  _this.find({
    id: _id
  }, function (err, data) {
    cb(err, data);
  })
};
mySchema.statics._findOrders = function (condition) {
  var _this = this;
  return new Promise((resolve, reject) => {
    _this.find(condition).then((result) => {
      result = JSON.parse(JSON.stringify(result));
      return result
    }).then(result => {
      let num = 0;
      //   根据商品id查商品信息
      result.forEach(async (item, index, arr) => {
        let goodsInfo = await goods.find({
          ID: item.goods_id
        });
        goodsInfo = goodsInfo[0];
        item.NAME = goodsInfo.NAME;
        item.IMAGE1 = goodsInfo.IMAGE1;
        num++;
        if (num == result.length) {
          result = JSON.parse(JSON.stringify(result));
          resolve(result)
        }
      })
    })
  })
};













module.exports = mongoose.model('order', mySchema);
