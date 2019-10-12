// 数据库配置信息
const DB = {
    database:"meyertools",
    username:"meyertools",
    password:"meyertools",
    host:"localhost",
    //支持的数据库类型'mysql'|'sqlite'|'postgres'|'mssql'
    dialect:"mysql"
};

const MONGODB = {
    url: 'mongodb://localhost/meyerTools'
};

// Redis配置信息
const REDIS = {
    port: 6379,
    host: "127.0.0.1"
}

// JWT配置
const JWT = {
    secret: 'meyer-tools',
    expiresIn: '24h'
};

exports.DB = DB;
exports.REDIS = REDIS;
exports.JWT = JWT;
exports.MONGODB = MONGODB;
