/**
 *Author: TaiGuangYin
 *Date: 2017
 *Description:数据库操作基础类
 */
const Sequelize = require('sequelize');
const DB = require('./config').DB;

const sequelizeInstance = new Sequelize(DB.database, DB.username, DB.password, {
    host: DB.host,
    dialect: DB.dialect,
    //连接池设置
    pool: {
        max: 2,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define:{
        paranoid: true,
        underscored: true
    },
    logging: false,
    timezone: '+08:00' //东八时区
});

sequelizeInstance
    .authenticate()
    .then(() => {
        console.log('数据库连接成功.');
    })
    .catch(err => {
        console.error('数据库连接失败:', err);
    });



exports.sequelizeInstance = sequelizeInstance;
