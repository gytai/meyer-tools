const express = require('express');
const router = express.Router();
const fileModel = require('../../models/fileInfo');

router.post('/create', function (req, res, next) {
    let pid = req.body.pid || 0;
    let name = req.body.name;
    let type = req.body.type;
    let is_public = req.body.is_public || 0;
    fileModel.creatFile(pid, name, type, is_public).then(ret => {
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

module.exports = router;
