/**
 * Author: TaiGuangYin
 * Created Time: 2019-09-24
 * Description: 文件模型
 */
const Sequelize = require("sequelize");
const sequelizeInstance = require("../utils/sequelize").sequelizeInstance;
const crypto = require('crypto');

const Model = sequelizeInstance.define(
    "my_todo",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: Sequelize.STRING,
            comment: "内容"
        },
        end_time: {
            type: Sequelize.DATE,
            comment: "时间"
        },
        is_finished: {
            type: Sequelize.INTEGER(2),
            comment: "是否完成",
            defaultValue:0
        },
        user_id: {
            type: Sequelize.INTEGER,
            comment: "用户ID"
        },
    },
    {
        freezeTableName: true,
        tableName: "my_todo",
        paranoid: false,
        timestamps: true
    }
);

//生成数据表
Model.sync()
    .then(() => {
        console.log("my_todo表生成成功");
    })
    .catch(error => {
        console.error("my_todo表生成失败");
        console.error(error);
    });

/**
 * 添加事项
 * @param user_id
 * @param content
 * @param end_time
 * @returns {Promise<Model>}
 */
function create(user_id,content,end_time){
    return Model.create({
        user_id:user_id,
        content:content,
        end_time:end_time?end_time:null,
    })
}


/**
 * 查询
 * @param user_id
 * @param is_finished
 * @returns {Promise<Model[]>}
 */
function list(user_id, is_finished){
    let condition = {
        user_id: user_id
    };

    if(is_finished){
        condition.is_finished = is_finished;
    }

    return Model.findAll({
        where:condition,
        raw: true,
        order:[
            ['created_at', 'DESC']
        ],
    })
}

/**
 * 更新状态为已完成
 * @param id
 * @returns {Promise<*>}
 */
async function update(id){
    let info = await Model.findOne({
        where:{
            id: id
        }
    });

    if(!info){
        return -1;
    }

    return Model.update({
        is_finished:1
    },{
        where: {
            id: id
        }
    });
}

exports.create = create;
exports.list = list;
exports.update = update;
