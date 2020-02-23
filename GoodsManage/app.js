var express = require('express');
var session = require('express-session')
var admin = require('./routes/admin.js');
var index = require('./routes/index.js')
//form表单设置enctype="multipart/form-data"时，body-parser req.body就不管用了

var app = new express();

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use('/upload', express.static('upload'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
    },
    rolling: true
}))
app.use('/',index)
app.use('/admin',admin);

app.listen(3001, '127.0.0.1');