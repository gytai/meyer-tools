/**
 * Author: TaiGuangYin
 * Created Time: 2019-09-24
 * Description: 路由文件
 */
const apiFileRouter = require('./routes/api/file');
const usersRouter = require('./routes/api/users');
const indexRouter = require('./routes/api/index');
const todoRouter = require('./routes/api/todo');
const mdRouter = require('./routes/api/markdown');

function setup(app){
    app.use('/api', indexRouter);
    app.use('/api/file', apiFileRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/todo', todoRouter);
    app.use('/api/markdown', mdRouter);
}

exports.setup = setup;
