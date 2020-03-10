var fs = require('fs');
var express = require('express');
var md5 = require('md5')
var bodyParser = require('body-parser')
var admin = require('../modules/DB/admin.js')
var router = express.Router();


router.use(bodyParser.urlencoded({
  extended: false
}))
router.use(bodyParser.json())


router.use(function (req, res, next) {
  console.log(req.url)
  if (req.url == '/login' || req.url == '/doLogin' || req.url == '/myDelete' || req.url == '/register' || req.url == '/doRegister' || req.url == '/admin/product/fenyeFind') next();
  else {
    if (req.session.userinfo && req.session.userinfo.name != '') {
      next()
    } else {
      res.redirect('/login');
    }
  }
})




router.get('/', function (req, res) {
  res.redirect('/admin/product');
})
router.get('/login', function (req, res) {
  res.render('login.ejs');
})
router.post('/doLogin', async function (req, res) {
  var account = req.body.account;
  var password = md5(req.body.password);
  admin.find({
    account,
    password
  }, function (err, data) {
    if (data.length > 0) {
      console.log('登录成功');
      req.session.userinfo = data[0];//设置session数据
      req.app.locals['userinfo'] = req.session.userinfo;//模板引擎的全局的值
      res.redirect('/admin/product');
    } else {
      res.send("<script>alert('登录失败');location.href = '/login'</script>")
    }
  })
})
router.get('/register', async (req, res) => {
  res.render('register.ejs');
})
router.post('/doRegister', async (req, res) => {
  let newAdmin = new admin({
    account: req.body.account,
    password: md5(req.body.password),
    name: req.body.name,
    admin_tel: req.body.admin_tel,
  });
  await newAdmin.save()
  res.redirect('/login')
})



router.get('/myDelete', function (req, res) {
  productmanageDb.find('product', {}, (err, data) => {
    var pics = data.map((value, index) => {
      return value.pic;
    })
    // console.log(pics);
    fs.readdir('./upload', function (err, files) {
      files = files.map((file, index) => {
        return 'upload\\' + file;
      })
      var deletFiles = files.filter((file1, index) => {
        var i = 0
        for (let file2 of pics) {
          if (file1 == file2) {
            break;
          } else {
            i++
          }
        }
        if (i == pics.length) {
          return true;
        } else {
          return false;
        }
      })
      // console.log(deletFiles);
      while (deletFiles.length)
        fs.unlink(deletFiles.pop(), (err) => {});
    })
    res.send('myDelete')
  })
})



module.exports = router;
