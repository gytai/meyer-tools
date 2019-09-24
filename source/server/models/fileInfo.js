/**
 * Author: TaiGuangYin
 * Created Time: 2019-09-24
 * Description: 文件模型
 */
const Sequelize = require("sequelize");
const sequelizeInstance = require("../utils/sequelize").sequelizeInstance;
const path = require('path');

const Model = sequelizeInstance.define(
    "my_file",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pid: {
            type: Sequelize.INTEGER,
            comment: "父ID",
            defaultValue: 0
        },
        name: {
            type: Sequelize.STRING(50),
            comment: "文件名称"
        },
        img: {
            type: Sequelize.STRING(150),
            comment: "文件类型图片"
        },
        path: {
            type: Sequelize.STRING(100),
            comment: "文件路径"
        },
        type: {
            type: Sequelize.INTEGER(2),
            comment: "文件类型 1=文件夹 2=文件",
            defaultValue: 1
        },
        is_public: {
            type: Sequelize.INTEGER(2),
            comment: "是否公开 0=不公开 1=公开",
            defaultValue: 0
        },
        share_id: {
            type: Sequelize.STRING(50),
            comment: "分享串"
        },
        share_code: {
            type: Sequelize.STRING(10),
            comment: "分享提取码"
        }
    },
    {
        freezeTableName: true,
        tableName: "my_file",
        paranoid: false,
        timestamps: true
    }
);

//生成数据表
Model.sync()
    .then(() => {
        console.log("my_file表生成成功");
    })
    .catch(error => {
        console.error("my_file表生成失败");
        console.error(error);
    });

/**
 * 创建文件
 * @param pid
 * @param name
 * @param type
 * @param is_public
 */
async function creatFile(pid,name,type,is_public) {
    let info = await Model.findOne({
        where:{
            pid: pid,
            name: name
        }
    });

    if(info){
        return -1;
    }

    // 查找父文件的路径
    let pInfo = await Model.findOne({
        where:{
            id: pid
        }
    });

    let topPath = '/';
    if(pInfo){
        topPath = pInfo.path;
    }

    let filePath = path.join(topPath,name);
    let img = 'https://cdn.chinameyer.com/images/filetype/folder.png';

    if(type == 2){
        let ext = path.extname(name).toLowerCase();
        if(ext === '.zip' || ext === '.rar' || ext === '.gz' || ext === '.tar' || ext === '.bz2'){
            img = 'https://cdn.chinameyer.com/images/filetype/zip.png';
        }else if(ext === '.html'){
            img = 'https://cdn.chinameyer.com/images/filetype/web.png';
        }else if(ext === '.mp3' || ext === '.aac' || ext === '.wma'){
            img = 'https://cdn.chinameyer.com/images/filetype/audio.png';
        }else if(ext === '.avi' || ext === '.mp4' || ext === '.mov' || ext === '.mpg' || ext === '.rm'
            || ext === '.rmvb' || ext === '.flv' || ext === '.mkv'){
            img = 'https://cdn.chinameyer.com/images/filetype/video.png';
        }else if(ext === '.css' || ext === '.php' || ext === '.js' || ext === '.py' || ext === '.sql'
            || ext === '.cpp' || ext === '.c' || ext === '.cs' || ext === '.java' || ext === '.asp'
            || ext === '.jsp'){
            img = 'https://cdn.chinameyer.com/images/filetype/code.png';
        }else if(ext === '.xls' || ext === '.xlsx'){
            img = 'https://cdn.chinameyer.com/images/filetype/excel.png';
        }else if(ext === '.doc' || ext === '.docx'){
            img = 'https://cdn.chinameyer.com/images/filetype/word.png';
        }else if(ext === '.ppt' || ext === '.pptx'){
            img = 'https://cdn.chinameyer.com/images/filetype/ppt.png';
        }else if(ext === '.key'){
            img = 'https://cdn.chinameyer.com/images/filetype/keynote.png';
        }else if(ext === '.pdf'){
            img = 'https://cdn.chinameyer.com/images/filetype/pdf.png';
        }else if(ext === '.txt' || ext === '.ini'){
            img = 'https://cdn.chinameyer.com/images/filetype/txt.png';
        }else{
            img = 'https://cdn.chinameyer.com/images/filetype/mix.png';
        }
    }


    return Model.create({
        pid: pid,
        name: name,
        img: img,
        path: filePath,
        type: type,
        is_public: is_public
    });
}

/**
 * 列举文件
 * @param pid
 * @param type
 * @returns {Promise<Model[]>}
 */
function listFile(pid,type) {
    let condition = {
        pid: pid
    }
    if(type){
        condition.type = type
    }
    return Model.findAll({
        attributes: ['id','pid','name','type','img'],
        where:condition
    });
}

exports.creatFile = creatFile;
exports.listFile = listFile;
