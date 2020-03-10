const Koa = require('koa')
const app = new Koa()
// 跨域配置
const cors = require('koa2-cors'); // 跨域配置
const corsConfig = require('./modules/midderWare/cors.config.js')
app.use(cors(corsConfig));

const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const index = require('./routes/index')
const user = require('./routes/user')
const goods = require('./routes/goods')
const order = require('./routes/order.js')
const test = require('./routes/test.js')
const alipay = require('./routes/alipay.js')
const session = require('koa-session');
const SESSION_CONFIG = require('./modules/midderWare/session.config')

const seesionParser = session(SESSION_CONFIG, app);
app.use(seesionParser);
app.keys = ['some secret hurr'];





// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

















// 安装路由
app.use(index.routes(), index.allowedMethods());
app.use(user.routes(), user.allowedMethods());
app.use(goods.routes(), goods.allowedMethods());
app.use(test.routes(), test.allowedMethods());
app.use(order.routes(), order.allowedMethods());
app.use(alipay.routes(),alipay.allowedMethods());




module.exports = app
