const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usersModel = require('../../models/users');
const config = require('../../config');
const redis = require('../../utils/redis');

router.post('/login', function (req, res, next) {
    let account = req.body.account;
    let password = req.body.password;

    if(!account || !password){
        return res.send({code: 404, msg:'参数不全'});
    }

    usersModel.findByAccountAndPassword(account, password).then( user => {
        if(user){
            let token = jwt.sign({ userid: user.id }, config.JWT.secret,{expiresIn:config.JWT.expiresIn});
            user.token = token;

            redis.set('token-' + user.id,token,60*60*12);

            return res.send({ code: 200, msg: "success", data:user });
        }
        return res.send({ code: 400, msg: "用户名密码不正确" });
    }).catch( err => {
        console.error(err);
        return res.send({ code: 500, msg: "系统错误" });
    })
});

router.post('/logout', function (req, res, next) {
    let token = req.headers['x-access-token'];
    let decoded = jwt.verify(token, config.JWT.secret);
    let userid = decoded.userid;

    redis.del('token-' + userid);

    return res.send({ code: 200, msg: "success"});
});

module.exports = router;
