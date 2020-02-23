
var users = new Map(); //key:userID,value:client
module.exports = wss => {
  wss.on('connection', function connection(ws, req) {
    let userID = req.url.slice(1);
    if(! users.has(userID)){//如果没有该用户的连接情况，就添加进去
      users.set(userID,ws)
    };
    console.log(users.keys());    
    ws.on('close',(code,reason)=>{// 该用户连接关闭时去除掉
      users.delete(userID);
      console.log(`用户${userID}断开连接----状态码:${code}----reason:${reason}`)
    })
    ws.send(JSON.stringify(req))
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    });      
  });
  wss.on('close', function close(){//服务器关闭时清除连接信息
    users.clear()
  })

}
