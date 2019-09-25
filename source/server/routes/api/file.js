const express = require('express');
const router = express.Router();
const fileModel = require('../../models/fileInfo');

router.post('/create', function (req, res, next) {
    let pid = req.body.pid || 0;
    let name = req.body.name;
    let type = req.body.type;
    let is_public = req.body.is_public || 0;
    let preview_path = req.body.preview_path;
    let storage_path = req.body.storage_path;

    if(!name || !type){
        return res.send({ code: 404, msg: "参数不全"});
    }

    if(type != 1 && (!preview_path || !storage_path)){
        return res.send({ code: 404, msg: "参数不全"});
    }

    fileModel.creatFile(pid, name, type, is_public, preview_path, storage_path).then(ret => {
        if (ret == -1) {
            return res.send({code: 400, msg: "文件已存在"});
        }

        return res.send({code: 200, msg: 'success'});
    }).catch(err => {
        console.error(err);
        return res.send({code: 500, msg: "系统错误"});
    })
});

router.get('/list', function (req, res, next) {
    let pid = req.query.pid || 0;
    let type = req.query.type;
    fileModel.listFile(pid, type).then(ret => {
        return res.send({code: 200, msg: 'success', data: ret});
    }).catch(err => {
        console.error(err);
        return res.send({code: 500, msg: "系统错误"});
    })
});

router.post('/update', function (req, res, next) {
    let id = req.body.id ;
    let name = req.body.name;
    let is_public = req.body.is_public;
    let is_share = req.body.is_share;

    if(!id || (!name && !is_public && !is_share)){
        return res.send({ code: 404, msg: "参数不全"});
    }

    fileModel.updateFile(id,name,is_public,is_share).then(ret => {
        if(ret == -1){
            return res.send({code: 400, msg: '文件不存在'});
        }
        return res.send({code: 200, msg: 'success'});
    }).catch(err => {
        console.error(err);
        return res.send({code: 500, msg: "系统错误"});
    })
});

router.post('/delete', function (req, res, next) {
    let id = req.body.id ;

    if(!id){
        return res.send({ code: 404, msg: "参数不全"});
    }

    fileModel.delById(id).then(ret => {
        if(ret == -1){
            return res.send({code: 400, msg: '文件不存在'});
        }
        return res.send({code: 200, msg: 'success'});
    }).catch(err => {
        console.error(err);
        return res.send({code: 500, msg: "系统错误"});
    })
});

module.exports = router;
