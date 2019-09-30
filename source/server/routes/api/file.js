const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fileModel = require('../../models/fileInfo');
const userSpaceModel = require('../../models/userSpace');
const spaceFileModel = require('../../models/spaceFile');
const config = require('../../config');

router.post('/create', async function (req, res, next) {
    let pid = req.body.pid || 0;
    let name = req.body.name;
    let type = req.body.type;
    let is_public = req.body.is_public || 0;
    let preview_path = req.body.preview_path;
    let storage_path = req.body.storage_path;

    let token = req.headers['x-access-token'];
    let decoded = jwt.verify(token, config.JWT.secret);
    let userid = decoded.userid;

    if(!name || !type){
        return res.send({ code: 404, msg: "参数不全"});
    }

    if(type != 1 && (!preview_path || !storage_path)){
        return res.send({ code: 404, msg: "参数不全"});
    }

    if(type == 1){
        userSpaceModel.creat(name,pid,userid).then(ret => {
            if (ret == -1) {
                return res.send({code: 400, msg: "文件夹已存在"});
            }

            return res.send({code: 200, msg: 'success'});
        }).catch(err => {
            console.error(err);
            return res.send({code: 500, msg: "系统错误"});
        })
    }else{
        try{
            if(pid == 0){
                return res.send({code: 400, msg: "根目录下不能添加文件"});
            }
            let ret = await fileModel.creatFile(name,is_public,preview_path,storage_path);
            spaceFileModel.creat(pid,ret.id);
            return res.send({code: 200, msg: 'success'});
        }catch (err) {
            console.error(err);
            return res.send({code: 500, msg: "系统错误"});
        }
    }
});

router.get('/list', async function (req, res, next) {
    let pid = req.query.pid || 0;
    let type = req.query.type;

    let token = req.headers['x-access-token'];
    let decoded = jwt.verify(token, config.JWT.secret);
    let userid = decoded.userid;

    if(type == 1){
        userSpaceModel.list(pid).then(ret => {
            let result = [];
            ret.forEach(function (d) {
                d.type = 1;
                d.is_public = 0;
                d.is_share = 0;
                result.push(d);
            });
            return res.send({code: 200, msg: 'success', data: result});
        }).catch(err => {
            console.error(err);
            return res.send({code: 500, msg: "系统错误"});
        })
    }else{
        let spaces = await userSpaceModel.list(userid,pid);
        let files = await spaceFileModel.listFile(userid,pid);

        let result = [];
        spaces.forEach(function (d) {
            d.type = 1;
            d.is_public = 0;
            d.is_share = 0;
            result.push(d);
        });

        files.forEach(function (d) {
            d.type = 2;
            d.preview_path = d.path;
            result.push(d);
        });

        return res.send({code: 200, msg: 'success', data: result});
    }
});

router.post('/update', function (req, res, next) {
    let id = req.body.id;
    let type = req.body.type;
    let name = req.body.name;
    let is_public = req.body.is_public;
    let is_share = req.body.is_share;

    if(!id || (!name && !is_public && !is_share)){
        return res.send({ code: 404, msg: "参数不全"});
    }

    if(type == 1){
        userSpaceModel.update(id,name).then(ret => {
            if(ret == -1){
                return res.send({code: 400, msg: '文件夹不存在'});
            }
            return res.send({code: 200, msg: 'success'});
        }).catch(err => {
            console.error(err);
            return res.send({code: 500, msg: "系统错误"});
        })
    }else{
        fileModel.updateFile(id,name,is_public,is_share).then(ret => {
            if(ret == -1){
                return res.send({code: 400, msg: '文件不存在'});
            }
            return res.send({code: 200, msg: 'success'});
        }).catch(err => {
            console.error(err);
            return res.send({code: 500, msg: "系统错误"});
        })
    }
});

router.post('/delete', function (req, res, next) {
    let pid = req.body.pid ;
    let id = req.body.id ;
    let type = req.body.type;

    if(!id || !type){
        return res.send({ code: 404, msg: "参数不全"});
    }

    if(type == 2){
        spaceFileModel.delById(pid,id).then(ret => {
            return res.send({code: 200, msg: 'success'});
        }).catch(err => {
            console.error(err);
            return res.send({code: 500, msg: "系统错误"});
        })
    }else{
        userSpaceModel.delById(id).then(ret => {
            if(ret == -1){
                return res.send({code: 400, msg: '文件不存在'});
            }
            spaceFileModel.delById(pid);
            return res.send({code: 200, msg: 'success'});
        }).catch(err => {
            console.error(err);
            return res.send({code: 500, msg: "系统错误"});
        })
    }

});

module.exports = router;
