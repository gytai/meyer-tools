/**
 * Author: TaiGuangYin
 * Created Time: 2019-10-07
 * Description: 文档路由
 */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mdFolderModel = require('../../models/mdFolder');
const config = require('../../config');

router.post('/create', function (req, res, next) {
    let title = req.body.title;
    let pid = req.body.pid;

    let token = req.headers['x-access-token'];
    let decoded = jwt.verify(token, config.JWT.secret);
    let userid = decoded.userid;


    if(!title || !pid){
        return res.send({code: 404, msg:'参数不全'});
    }

    mdFolderModel.create(title,userid,pid).then( data => {
        return res.send({ code: 200, msg: "success", data:data });
    }).catch( err => {
        console.error(err);
        return res.send({ code: 500, msg: "系统错误" });
    })
});

router.get('/list', function (req, res, next) {
    let token = req.headers['x-access-token'];
    let decoded = jwt.verify(token, config.JWT.secret);
    let userid = decoded.userid;

    mdFolderModel.findByUserid(userid).then( data => {
        return res.send({ code: 200, msg: "success", data:data });
    }).catch( err => {
        console.error(err);
        return res.send({ code: 500, msg: "系统错误" });
    })
});

router.post('/update', function (req, res, next) {
    let id = req.body.id;
    let title = req.body.title;

    if(!id || !title){
        return res.send({code: 404, msg:'参数不全'});
    }

    mdFolderModel.update(id,title).then( () => {
        return res.send({ code: 200, msg: "success" });
    }).catch( err => {
        console.error(err);
        return res.send({ code: 500, msg: "系统错误" });
    })
});

module.exports = router;
