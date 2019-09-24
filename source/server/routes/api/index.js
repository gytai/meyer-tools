/**
 * Author: TaiGuangYin
 * Created Time: 2019-09-24
 * Description: 公共路由
 */
const express = require('express');
const router = express.Router();
const config = require('../../config');
const path = require('path');
const multer  = require('multer');
const fs = require('fs');
const upload = multer({ dest: './tmp' });
const jwt = require('jsonwebtoken');
const fileHelper = require('../../utils/file');
const common = require('../../utils/common');
const uuid = require('uuid');

router.post('/upload', upload.single('file'), function(req, res) {
    let token = req.headers['x-access-token'];
    let decoded = jwt.verify(token, config.JWT.secret);
    let userid = decoded.userid;

    if(!req.file){
        return res.send({ code: 404, msg: "请选择文件"});
    }

    let tmpPath = path.join('uid-' + userid,common.dateFormat(new Date(),'yyyyMMdd'));
    let dirname = path.join(__dirname,'../../public/uploads/',tmpPath);
    fileHelper.mkdirsSync(dirname);

    let fileName = uuid.v1() + path.extname(req.file.originalname);
    let filePath  = path.join(dirname ,fileName);
    fs.rename(req.file.path, filePath, function(err) {
        if (err) {
            console.error(err);
            return res.send({ code: 500, msg: "系统错误"});
        }
        return res.send({ code: 200, msg: "success",data:path.join('/uploads/',tmpPath,fileName)});
    })
});


module.exports = router;
