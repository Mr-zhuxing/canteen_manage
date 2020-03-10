const goods = require('../DB/goods.js')
const order = require('../DB/order.js')
var admins = new Map();
var start = 0;
var theOrder = ''
// 每隔几秒都要查询数据库
var goodsTimer = setInterval(async function () {
  theOrder = await order.find({state:{
    $regex: /^pending$/
  }})
  // console.log("查询订单:",theOrder[0]);
  //   每次查询完数据库都要遍历map，选择要发送的人
  admins.forEach((ws, account) => {
    ws.send(JSON.stringify(theOrder));
  })
}, 2000)
module.exports = (wss) => {
  wss.on('connection', function (ws, request) {
    //   当建立连接时为其设置定时器监听， 保持心跳
    let timeout = 1 * 60 * 60 * 1000
    let timer = setTimeout(() => {
      ws.close();
    }, timeout);
    const userinfo = request.session.userinfo;
    if (!admins.has(userinfo.account)) {
      admins.set(userinfo.account, ws)
    }
    ws.on('message', function (message) {
      console.log(`Received message ${message} from user ${userinfo.name}`);
      //   重置心跳监听定时器
      clearTimeout(timer)
      timer = setTimeout(() => {
        ws.close();
      }, timeout);
      ws.send(JSON.stringify(userinfo));
    });
    ws.on('close', function (code, reason) {
      console.log(userinfo.name, "---关闭了连接--- ---状态码---", code, "---reason---", reason)
      admins.delete(userinfo.account);
    })
  })
}
