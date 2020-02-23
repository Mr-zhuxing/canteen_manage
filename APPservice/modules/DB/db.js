var options = {
  poolSize: 10, // Maintain up to 10 socket connections
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const url = 'mongodb://localhost:27017/canteen_manage';
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect(url, options, function (err) {
  if (err) console.log(err);
  else console.log("数据库连接成功");
})

// 连接数据库，和数据库配置
