/**
 * Author: TaiGuangYin
 * Created Time: 2019-09-24
 * Description: 用户文件空间内的文件
 */
const Sequelize = require("sequelize");
const sequelizeInstance = require("../utils/sequelize").sequelizeInstance;

const Model = sequelizeInstance.define(
    "my_space_file",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        space_id: {
            type: Sequelize.INTEGER,
            comment: "空间ID"
        },
        file_id: {
            type: Sequelize.INTEGER,
            comment: "文件ID"
        },

    },
    {
        freezeTableName: true,
        tableName: "my_space_file",
        paranoid: true,
        timestamps: true
    }
);

//生成数据表
Model.sync()
    .then(() => {
        console.log("my_space_file表生成成功");
    })
    .catch(error => {
        console.error("my_space_file表生成失败");
        console.error(error);
    });

/**
 * 创建文件和空间对应关系
 * @param name
 * @param pid
 * @param user_id
 * @returns {Promise<Model>}
 */
async function creat(space_id,file_id) {
    let info = await Model.findOne({
        where:{
            space_id:space_id,
            file_id:file_id
        }
    });

    if(info){
        return -1;
    }

    return Model.create({
        space_id:space_id,
        file_id:file_id
    });
}

/**
 * 列举文件夹
 * @param pid
 * @returns {Promise<Model[]>}
 */
function listFile(userid,space_id) {
    let sql = 'select b.* from my_space_file a inner join my_file b on a.file_id=b.id inner join my_user_space c on a.space_id=c.id' +
        ' where c.user_id=' + userid + ' and a.space_id=' + space_id + ' and a.deleted_at is null';
    return sequelizeInstance.query(sql,{type: sequelizeInstance.QueryTypes.SELECT,raw: true});
}

/**
 * 删除关联
 * @param id
 * @returns {Promise<number>}
 */
async function delById(space_id,file_id){
    let condition = {

    };

    if(space_id){
        condition.space_id = space_id;
    }

    if(file_id){
        condition.file_id = file_id;
    }

    let info = await Model.findOne({
        where:condition
    });

    if(!info){
        return -1;
    }

    return Model.destroy({
        where:condition
    })
}


exports.creat = creat;
exports.listFile = listFile;
exports.delById = delById;
