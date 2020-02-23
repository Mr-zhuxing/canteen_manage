const user = require('../modules/DB/user.js');
const md5 = require('md5')
const router = require('koa-router')()

router.prefix('/user')

router.get('/', async function (ctx, next) {
  await new Promise(function (resolve, reject) {
    user._findOne({
      account: 201603753
    }, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        resolve(result)
      }
    })
  }).then((val) => {
    ctx.body = val
  })
})
router.post('/register', async function (ctx, next) {
  console.log(ctx.request.body)
  var newUser = new user({
    account: parseInt(ctx.request.body.account),
    password: md5(ctx.request.body.password),
    name: ctx.request.body.username,
  })
  await newUser.save().then(result => {
    ctx.body = {
      code: 200,
      message: "注册成功",
    };
  }).catch(err => {
    ctx.body = {
      code: 500,
      message: err,
    }
  })
})
router.post('/login', async (ctx, next) => {
  // console.log(ctx.request.body);
  let account = parseInt(ctx.request.body.account);
  let password = md5(ctx.request.body.password);
  await user.findOne({
    account,
    password,
  }).exec().then(result => {
    if (result) {
      // 保存登录状态，这句代码会在浏览器中生成一个以 "koa:sess" 为 Name 的 cookie
      // 只要设置了session 就会 在浏览器的 cookie中设置一个sessionid，这儿是 koa:sess。
      ctx.session.userInfo = {
        username: result.name,
        userID: result.account
      }
      ctx.cookies.set('userID', result.account, {
        maxAge: 1*24*60*60*1000,
        httpOnly: false,
        overwrite: false
      });
      console.log(JSON.stringify(ctx.session.userInfo))
      ctx.cookies.set('userInfo', new Buffer(JSON.stringify(ctx.session.userInfo)).toString('base64'), {
        maxAge: 1 * 24 * 60 * 60 * 1000, // cookie有效时长
        httpOnly: false, // 是否只用于http请求中获取
        overwrite: false // 是否允许重写
      });
      ctx.body = {
        code: 200,
        message: "登录成功",
      };
    } else {
      // ctx.session.userState = false;
      ctx.body = {
        code: 500,
        message: err,
      };
    }
  }).catch(err => {
    console.log(err)
    ctx.body = {
      code: 500,
      message: err,
    };
  })
})
router.get('/getSession', async (ctx) => {
  console.log(ctx.session)
  try {
    if (ctx.session.userInfo) {
      ctx.body = {
        code: 1,
        message: '已登陆'
      }
    } else {
      ctx.body = {
        code: 0,
        message: '未登陆'
      }
    }
  } catch (err) {
    throw new Error(err)
  }
})
//退出登录
router.get('/logout', async (ctx, next) => {
  try {
    // 将登录信息清空
    console.log(ctx.session)
    ctx.session = null;
    ctx.cookies.set('userInfo', null);
    ctx.cookies.set('userInfo.sig', null);
    ctx.cookies.set('userID', null);
    ctx.cookies.set('userID.sig', null);
    // console.log(new Buffer(ctx.cookies.get('userInfo'),'base64').toString())    
    ctx.body = {
      code: 1,
      message: '退出成功'
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      message: err
    }
  }

})




module.exports = router
