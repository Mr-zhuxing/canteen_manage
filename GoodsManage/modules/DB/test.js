// var user = require('./db.js').user;
// var goods = require('./db.js').goods;
// var canteen = require('./db.js').canteen;
// var admin = require('./db.js').admin;
// var order = require('./db.js').order;




// admin._find({name:"zhuxing"}, function(err,data){
//     console.log(data)
// })








// user._insertOne({
//     account: "201603754",
//     password: 123,
//     name: '朱兴',
//     tel: 11112222,
//     limit: 1,
// }, function (err, result) {
//     if(err){
//         throw err;
//     }
//     console.log(result)
// })
// user._findOne({account:1},function(err,data){
//     console.log(data);
// })
// user._updateByCount(1,{name:'he'},function(err,data){
//     console.log(data)
// })
// user._deleteOneByCount(2,function(err,doc){
//     console.log(err,doc)
// })




// goods._insertOne({
//     id: "8",
//     name: "红烧猪脚4",
//     price: 19.8,
//     mk_time: 10,
//     window_num: 1,
//     describe: "红色、香的、软的",
//     canteen_id: 1
// }, function (err, result) {
//     if(err){
//         console.log(err);
//     }
//     console.log(result)
// })

// goods._findByName("红烧猪脚",function(err,data){
//     console.log(data);
// })

// goods._findById(1,function(err,data){
//     console.log(data);
// });

// goods._updateById(1,{price:19.1},function(err,data){
//     console.log(data)
// })

// goods._deleteOneById(2,function(err,doc){
//     console.log(err,doc)
// })





// canteen._insertOne({
//     id: "3",
//     name: "桂园餐厅",
//     campus_name: "雅安校区",
//     admin_name: "小明",
//     admin_tel: 12344,
// }, function (err, result) {
//     if(err){
//         console.log(err);
//     }
//     console.log(result)
// })

// canteen._findById(1,function(err,data){
//     console.log(data);
// })

// canteen._updateById(1,{admin_tel:1999},function(err,data){
//     console.log(data)
// })

// canteen._deleteOneById(2,function(err,doc){
//     console.log(err,doc)
// })



// order._insertOne({
//     id: 1,
//     user_account: 201603753,
//     goods_id: 1,
//     finish: true,
//     quantity: 50,
// }, function (err, result) {
//     if(err){
//         console.log(err);
//     }
//     console.log(result)
// })

// order._findById(1,function(err,data){
//     console.log(data);
// });

// order._updateById(1,{quantity:49},function(err,data){
//     console.log(data)
// })

// order._deleteOneById(2,function(err,doc){
//     console.log(err,doc)
// })
