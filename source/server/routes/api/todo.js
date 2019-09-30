const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const todoModel = require('../../models/todo');
const config = require('../../config');

router.post('/create', function (req, res, next) {
    let content = req.body.content;
    let end_time = req.body.end_time;

    let token = req.headers['x-access-token'];
    let decoded = jwt.verify(token, config.JWT.secret);
    let userid = decoded.userid;


    if(!content){
        return res.send({code: 404, msg:'参数不全'});
    }

    todoModel.create(userid,content,end_time).then( data => {
        return res.send({ code: 200, msg: "success", data:data });
    }).catch( err => {
        console.error(err);
        return res.send({ code: 500, msg: "系统错误" });
    })
});

router.get('/list', function (req, res, next) {
    let is_finished = req.query.is_finished;

    let token = req.headers['x-access-token'];
    let decoded = jwt.verify(token, config.JWT.secret);
    let userid = decoded.userid;

    todoModel.list(userid,is_finished).then( data => {
        return res.send({ code: 200, msg: "success", data:data });
    }).catch( err => {
        console.error(err);
        return res.send({ code: 500, msg: "系统错误" });
    })
});

router.post('/update', function (req, res, next) {
    let id = req.body.id;

    if(!id){
        return res.send({code: 404, msg:'参数不全'});
    }

    todoModel.update(id).then( () => {
        return res.send({ code: 200, msg: "success" });
    }).catch( err => {
        console.error(err);
        return res.send({ code: 500, msg: "系统错误" });
    })
});

module.exports = router;
