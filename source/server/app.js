const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const routers = require('./router');
const jwt = require('jsonwebtoken');
const config = require('./config');
const redis = require('./utils/redis');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 验证用户登录
app.use(function (req, res, next) {
    if (req.originalUrl == '/' || req.originalUrl == '/api/users/login') {
        return next();
    }
    let token = req.headers['x-access-token'];
    jwt.verify(token, config.JWT.secret, function (err, decoded) {
        if (err) {
            console.error(err);
            return res.send({code: 505, msg: '请先登录'});
        }

        redis.get('token-' + decoded.userid).then(storageToken => {
            if (storageToken != token || !storageToken) {
                return res.send({code: 505, msg: '您已退出 请重新登录'});
            }
            next();
        }).catch(err => {
            console.log(err);
            return res.send({code: 500, msg: '服务器异常'});
        });
    });
});

app.use('/', indexRouter);

routers.setup(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
