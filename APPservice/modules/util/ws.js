const order = require('../DB/order.js');
var users = new Map(); //key:userID,value:client
var usersOrders = new Map(); //key:userID,value:orders
var allOrders = []
// 每隔一段时间查询当天的所有订单并将订单数据传到浏览器
setInterval(async function () {
  allOrders = await order._findOrders({
    time: {
      $gt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    }
  })
  if (users.size > 0) {
    allOrders.forEach((item, index) => {
      users.forEach((val, key) => {
        if (item["user_account"] == key) {
          usersOrders.set(key, usersOrders.get(key).concat(item))
        }
      })
    })
    users.forEach((val, key) => {
      val.send(JSON.stringify({
        orders: usersOrders.get(key)
      }));
      usersOrders.set(key, []);
    })
  }

}, 3000)

module.exports = wss => {
  wss.on('connection', function connection(ws, req) {
    let userID = req.url.slice(1); //动态路由的方式传递用户id
    if (!users.has(userID)) { //如果没有该用户的连接情况，就添加进去
      users.set(userID, ws)
      usersOrders.set(userID, [])
    };
    console.log(users.keys());
    ws.on('close', (code, reason) => { // 该用户连接关闭时去除掉
      users.delete(userID);
      usersOrders.delete(userID);
      console.log(`用户${userID}断开连接----状态码:${code}----reason:${reason}`)
    })
    ws.send(JSON.stringify(req))
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    });
  });
  wss.on('close', function close() { //服务器关闭时清除连接信息
    users.clear()
  })

}
