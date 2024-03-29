const fs = require('fs');
const path = require('path')
const router = require('koa-router')();
const AlipaySdk = require('alipay-sdk').default;
const AlipayFormData = require('alipay-sdk/lib/form').default;




router.prefix('/alipay');


router.get('/', async (ctx, next) => {
  const alipaySdk = new AlipaySdk({
    // 参考下方 SDK 配置
    appId: '2016101800717328',
    privateKey: fs.readFileSync('./config/private-key2048.pem', 'ascii'),
    signType: 'RSA2',
    alipayPublicKey: fs.readFileSync('./config/alipay-public-key.pem', 'ascii'),
    gateway: 'https://openapi.alipaydev.com/gateway.do',
    timeout: 5000,
    camelcase: true,
  });
  const formData = new AlipayFormData();
  formData.setMethod('get'); //返回一个可get请求的url
  formData.addField('appId', '2016101800717328');
  formData.addField('charset', 'utf-8');
  formData.addField('signType', 'RSA2'); //沙箱环境下RSA2，正式下RSA2
  formData.addField('returnUrl', 'http://127.0.0.1:3000/alipay/result');//网页重定向通知
  // formData.addField('notifyUrl', 'http://127.0.0.1:3000/alipay/result');//服务器通知 可能在上线时才有效
  formData.addField('bizContent', {
    outTradeNo: '1583486714619',
    merchantOrderNo: '201603753caishi02020-3-7000000',
    productCode: 'FAST_INSTANT_TRADE_PAY',
    totalAmount: '0.01',
    subject: '商品',
    body: '商品详情'
  });
  const result = await alipaySdk.exec('alipay.trade.page.pay', {}, {
    formData: formData
  });
  // ctx.set("Content-Type", "application/json")
  // ctx.body = result
  ctx.body = {
    state: '200',
    info: "查询成功",
    privateKey: fs.readFileSync('./config/private-key2048.pem', 'ascii'),
    alipayPublicKey: fs.readFileSync('./config/alipay-public-key.pem', 'ascii'),
    result: result,
  }
})
router.get('/result',async(ctx,next)=>{
  ctx.body = {
    state:200,
    result:ctx.request.query
  }
})
// router.post('/result',async(ctx,next)=>{
//   console.log('post')
// })





























module.exports = router;
