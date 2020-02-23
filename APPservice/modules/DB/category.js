const db = require('./db.js')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 设置表结构
var mySchema = new Schema({
  ID: {
    unique: true,
    type: String
  },
  MALL_CATEGORY_NAME: {
    type: String
  },
  IMAGE: {
    type: String
  },
  TYPE: {
    type: Number
  },
  SORT: {
    type: Number
  },
  COMMENTS: {
    type: String
  }
}); //timestamps 用于记录创建和修改时间
mySchema.set('collection', 'category');








module.exports = mongoose.model('Category', mySchema);
