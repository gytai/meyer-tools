/**
 * Author: TaiGuangYin
 * Created Time: 2019-09-24
 * Description: 路由文件
 */
const apiFileRouter = require('./routes/api/file');
const usersRouter = require('./routes/api/users');
const indexRouter = require('./routes/api/index');

function setup(app){
    app.use('/api', indexRouter);
    app.use('/api/file', apiFileRouter);
    app.use('/api/users', usersRouter);
}

exports.setup = setup;
