const db = require('./db.js')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 设置表结构
var mySchema = new Schema({
    id: {
        type: Number,
        required: true, //设置必须有值
        unique: true //设置值唯一
    },
    name: {
        type: String,
        required: true,
    },
    campus_name: {
        type: String
    },
    admin_name: {
        type: String
    },
    admin_tel: Number,
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
mySchema.set('collection', 'canteen');
mySchema.statics._insertOne = function (obj, cb) {
    var _this = this;
    var doc1 = new _this(obj)
    doc1.save(function (err, doc) {
        cb(err, doc);
    })
}

mySchema.statics._findById = function (_id, cb) {
    var _this = this;
    _this.find({
        id: _id
    }, function (err, data) {
        cb(err, data);
    })
}
mySchema.statics._updateById = function (_id, doc, cb) {
    var _this = this;
    _this.update({
        id: _id
    }, doc, function (err, result) {
        cb(err, result);
    })
}
mySchema.statics._deleteOneById = function (_id, cb) {
    var _this = this;
    _this.findOneAndRemove({
        id: _id
    }, function (err, doc) {
        cb(err, doc);
    })
}






module.exports = mongoose.model('canteen', mySchema);


