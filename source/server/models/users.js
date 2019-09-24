/**
 * Author: TaiGuangYin
 * Created Time: 2019-09-24
 * Description: 文件模型
 */
const Sequelize = require("sequelize");
const sequelizeInstance = require("../utils/sequelize").sequelizeInstance;
const crypto = require('crypto');

const Model = sequelizeInstance.define(
    "my_users",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        account: {
            type: Sequelize.STRING(50),
            comment: "账户"
        },
        password: {
            type: Sequelize.STRING(100),
            comment: "密码"
        },
        status: {
            type: Sequelize.INTEGER(2),
            comment: "是否禁用",
            defaultValue:0
        },
        avatar: {
            type: Sequelize.STRING(200),
            comment: "头像"
        }
    },
    {
        freezeTableName: true,
        tableName: "my_users",
        paranoid: false,
        timestamps: true
    }
);

//生成数据表
Model.sync()
    .then(() => {
        console.log("my_users表生成成功");
    })
    .catch(error => {
        console.error("my_users表生成失败");
        console.error(error);
    });

/**
 * 根据姓名查找用户
 * @param account
 * @param password
 * @returns {Promise<Model | null>}
 */
function findByAccountAndPassword(account, password) {
    let md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');

    return Model.findOne({
        attributes: ['id','avatar','status'],
        where:{
            account: account,
            password: password
        },
        raw:true
    })
}

exports.findByAccountAndPassword = findByAccountAndPassword;
