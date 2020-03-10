const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const session = require('express-session');
const admin = require('./routes/admin.js');
const index = require('./routes/index.js')
const WebSocketApi = require('./modules/util/ws.js')
//form表单设置enctype="multipart/form-data"时，body-parser req.body就不管用了

var app = new express();
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use('/upload', express.static('upload'));
var sessionParser = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60,
  },
  rolling: true
})
app.use(sessionParser)
app.use('/', index)
app.use('/admin', admin);

const wss = new WebSocket.Server({
  clientTracking: false,
  noServer: true
});
WebSocketApi(wss)
var server = http.createServer(app)
server.on('upgrade', function (request, socket, head) {
  console.log('Parsing session from request...');
  sessionParser(request, {}, () => {
    // console.log(request.session)
    if (!request.session.userinfo) {
      socket.destroy();
      return;
    }
    console.log('Session is parsed!');
    wss.handleUpgrade(request, socket, head, function (ws) {
      wss.emit('connection', ws, request);
    });
  })

})
server.listen(3001, '127.0.0.1', function () {
  console.log('----服务器启动----')
});
