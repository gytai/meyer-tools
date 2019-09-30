/**
 * Author: TaiGuangYin
 * Created Time: 2019-09-24
 * Description: 用户文件空间
 */
const Sequelize = require("sequelize");
const sequelizeInstance = require("../utils/sequelize").sequelizeInstance;

const Model = sequelizeInstance.define(
    "my_user_space",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pid: {
            type: Sequelize.INTEGER,
            comment: "父ID"
        },
        name: {
            type: Sequelize.STRING(50),
            comment: "文件名称"
        },
        img: {
            type: Sequelize.STRING(150),
            comment: "文件类型图片"
        },
        user_id: {
            type: Sequelize.INTEGER,
            comment: "所属用户",
        },

    },
    {
        freezeTableName: true,
        tableName: "my_user_space",
        paranoid: true,
        timestamps: true
    }
);

//生成数据表
Model.sync()
    .then(() => {
        console.log("my_user_space表生成成功");
    })
    .catch(error => {
        console.error("my_user_space表生成失败");
        console.error(error);
    });

/**
 * 创建文件夹
 * @param name
 * @param pid
 * @param user_id
 * @returns {Promise<Model>}
 */
async function creat(name,pid,user_id) {
    let info = await Model.findOne({
        where:{
            name:name
        }
    });

    if(info){
        return -1;
    }

    let img = 'https://cdn.chinameyer.com/images/filetype/folder.png';
    return Model.create({
        pid: pid || 0,
        name: name,
        img: img,
        user_id: user_id
    });
}

/**
 * 列举文件夹
 * @param pid
 * @returns {Promise<Model[]>}
 */
function list(userid,pid) {
    let condition = {
        pid: pid,
        user_id:userid
    }
    return Model.findAll({
        attributes: ['id','pid','name','img'],
        where:condition,
        raw: true,
        paranoid: true
    });
}

/**
 * 根据ID查找
 * @param id
 * @returns {Promise<Model | null> | Promise<Model>}
 */
function findById(id){
    return Model.findOne({
        attributes: ['id','pid','name','img'],
        where:{id:id},
        paranoid: true
    })
}

/**
 * 删除文件夹
 * @param id
 * @returns {Promise<number>}
 */
async function delById(id){
    let info = await Model.findOne({
        where:{
            id: id
        }
    });

    if(!info){
        return -1;
    }

    return Model.destroy({
        where:{
            id: id
        }
    })
}

/**
 * 更新文件夹信息
 * @param id
 * @param name
 * @param is_public
 * @returns {Promise<void>}
 */
async function update(id,name){
    let info = await Model.findOne({
        where:{
            id: id
        }
    });

    if(!info){
        return -1;
    }

    return Model.update({
        name : name
    },{
        where:{
            id: id
        }
    });
}

exports.creat = creat;
exports.list = list;
exports.findById = findById;
exports.delById = delById;
exports.update = update;
