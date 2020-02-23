const mongoose = require('mongoose');
const db = require('./db.js')
const Schema = mongoose.Schema;
// 设置表结构
var mySchema = new Schema({
    account: {
        type: Number,
        required: true, //设置必须有值
        unique: true //设置值唯一
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tel: Number,
    limit: {
        type: Number,
        required: true,
        default: 1
    },
    createTime: {
        type: Date,
        default: Date.now()
    },
    updateTime: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
}); //timestamps 用于记录创建和修改时间
mySchema.set('collection', 'user');
// 查询用户
mySchema.statics._findOne = function (obj, cb) {
    var _this = this;
    _this.find(obj, function (err, result) {
        cb(err, result[0]);
    })
};
// 插入文档
mySchema.statics._insertOne = function (obj, cb) {
    var _this = this;
    var doc1 = new _this(obj);
    doc1.save(function (err, doc) {
        cb(err, doc);
    })
}
// 通过账号更新用户信息
mySchema.statics._updateByCount = function (num, doc, cb) {
    var _this = this;
    _this.update({
        account: num
    }, doc, function (err, result) {
        cb(err, result);
    })
};
// 通过账号删除用户 <> 
mySchema.statics._deleteOneByCount = function (num, cb) {
    var _this = this;
    _this.findOneAndRemove({
        account: num
    }, function (err, doc) {
        cb(err, doc);
    })
}




module.exports = mongoose.model('user', mySchema);