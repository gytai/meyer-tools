var DB = {
    database:"meyertools",
    username:"meyertools",
    password:"meyertools",
    host:"localhost",
    //支持的数据库类型'mysql'|'sqlite'|'postgres'|'mssql'
    dialect:"mysql"
};

//Redis配置信息
var REDIS = {
    port: 6379,
    host: "127.0.0.1"
}

exports.DB = DB;
exports.REDIS = REDIS;
