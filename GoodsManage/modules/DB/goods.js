const db = require('./db.js')
const mongoose = require('mongoose');
const canteen = require('./canteen.js');
const Schema = mongoose.Schema;
// 设置表结构
var mySchema = new Schema({
  ID: {
    unique: true,
    type: String,
    required: true,
  },
  MALL_CATEGORY_ID: {
    type: String
  },
  SUB_ID: {
    type: String,
    required: true
  },
  NAME: {
    type: String,
  },
  window_num: {
    type: Number,
    required: true
  },
  canteen_id: {
    type: Number,
    required: true
  },
  ORI_PRICE: {
    type: String
  },
  PRESENT_PRICE: {
    type: String
  },
  AMOUNT: {
    type: String
  },
  DETAIL: {
    type: String
  },
  IMAGE1: {
    type: String
  },
  href: {
    type: String
  },
  PICTURE_COMPERSS_PATH: {
    type: String
  },
}, {
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
}); //timestamps 用于记录创建和修改时间
mySchema.set('collection', 'goods');
// mySchema.statics._findById = function (_id, cb) {
//     var _this = this;
//     _this.find({
//         id: _id
//     }, function (err, data) {
//         cb(err, data);
//     })
// };
// mySchema.statics._findByName = function (_name, cb) {
//     var _this = this;
//     _this.find({
//         name: _name
//     }, function (err, data) {
//         cb(err, data);
//     })
// };
// mySchema.statics._insertOne = function (obj, cb) {
//     var _this = this;
//     canteen.find({
//         id: obj["canteen_id"]
//     }, function (err, data) {
//         if (data.length <= 0) {
//             return cb(null, "餐厅id不对");
//         }
//         var doc1 = new _this(obj)
//         doc1.save(function (err, doc) {
//             cb(err, doc);
//         })
//     })
// };
// mySchema.statics._updateById = function (_id, doc, cb) {
//     var _this = this;
//     _this.update({
//         id: _id
//     }, doc, function (err, result) {
//         cb(err, result);
//     })
// };
// mySchema.statics._deleteOneById = function (_id, cb) {
//     var _this = this;
//     _this.findOneAndRemove({
//         id: _id
//     }, function (err, doc) {
//         cb(err, doc);
//     })
// };














module.exports = mongoose.model('goods', mySchema);
