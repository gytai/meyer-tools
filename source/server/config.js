// 通过NODE_ENV来设置环境变量，如果没有指定则默认为生产环境
var env = process.env.NODE_ENV || 'production';
env = env.toLowerCase();

if(env == 'production'){
    console.log('当前环境为生产环境');
    module.exports = require('./config-pro');
}else{
    console.log('当前环境为开发环境');
    module.exports = require('./config-dev');
}


