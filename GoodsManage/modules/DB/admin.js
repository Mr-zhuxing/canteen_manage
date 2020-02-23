const db = require('./db.js')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 设置表结构
var mySchema = new Schema({
    account: {
        type: String,
        required: true, //设置必须有值
        unique: true //设置值唯一
    },
    password:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
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
mySchema.set('collection', 'admin');
mySchema.statics._find = function(obj,cb){
    var _this = this;
    _this.find(obj,function(err,data){
        cb(err,data);
    })
}




module.exports = mongoose.model('admin', mySchema);

