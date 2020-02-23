const db = require('./db.js')
const mongoose = require('mongoose');
const user = require('./user.js');
const goods = require('./goods.js');
const Schema = mongoose.Schema;
// 设置表结构
var mySchema = new Schema({
    id: {
        type: Number,
        required: true, //设置必须有值
        unique: true //设置值唯一
    },
    user_account: {
        type: Number,
        required: true, //设置必须有值
    },
    goods_id: {
        type: Number,
        required: true, //设置必须有值
    },
    finish: {
        type: Boolean,
        required: true, //设置必须有值
    },
    add_time: {
        type: Number,
        required: true,
        default: Date.now()
    },
    quantity: {
        type: Number,
        required: true
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
mySchema.set('collection', 'order');
mySchema.statics._findById = function (_id, cb) {
    var _this = this;
    _this.find({
        id: _id
    }, function (err, data) {
        cb(err, data);
    })
};
mySchema.statics._insertOne = function (obj, cb) {
    var _this = this;
    var lock_1 = false;
    var lock_2 = false;
    var doc1 = new _this(obj)
    user._findOne({
        account: obj["user_account"]
    }, function (err, data) {
        if (data) {
            lock_1 = true;
            // console.log('ok1')
        }
        if(lock_1 && lock_2){
            doc1.save(function (err, doc) {
                cb(err, doc);
            })
        }
    })
    goods._findById(obj["goods_id"], function (err, data) {
        if (data.length > 0) {
            lock_2 = true;
            // console.log('ok2')
        }
        if(lock_1 && lock_2){
            doc1.save(function (err, doc) {
                cb(err, doc);
            })
        }
    })

};
mySchema.statics._updateById = function (_id, doc, cb) {
    var _this = this;
    _this.update({
        id: _id
    }, doc, function (err, result) {
        cb(err, result);
    })
};
mySchema.statics._deleteOneById = function (_id, cb) {
    var _this = this;
    _this.findOneAndRemove({
        id: _id
    }, function (err, doc) {
        cb(err, doc);
    })
};













module.exports = mongoose.model('order', mySchema);

