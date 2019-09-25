/*
*介绍：socket.io 功能封装 用于小程序链接服务器
*作者：TaiGuangYin
*时间：2017-09-09
* *消息格式：{
*   type:xxxx        ->消息类型 1=请求 2=回复
*   from:xxxx        ->发送者
*   to:xxxx          ->接受者
*   data:xxxx        ->发送的数据
*   msg:xxxx         ->消息说明
*   code:xxxx        ->命令编码
* }
* */

const redis = require('../utils/redis');
const clientOnlineBuff = [];

function sendMessage(io, msg) {
    try {
        if (typeof msg == 'string') {
            msg = JSON.parse(msg);
        }
        redis.get('uid-' + msg.to).then((sid) => {
            if (sid) {
                io.to(sid).emit('singleMessage', msg);
            }
        }).catch((err) => {
            console.error(err);
        });
    } catch (err) {
        console.error(err);
    }
}

function sendRoomMessage(io, msg) {
    try {
        if (typeof msg == 'string') {
            msg = JSON.parse(msg);
        }
        if (msg.to && msg.from) {
            io.to('room-' + msg.to).emit('roomMessage', msg);
        }
    } catch (err) {
        console.error(err);
    }
}

function getUserListJson() {
    let result = []
    for(let obj in clientOnlineBuff){
        result.push(clientOnlineBuff[obj]);
    }
    return result;
}

//服务端连接
function ioServer(io) {
    var clientCount = 0;

    io.on('connection', function (socket) {
        console.log('SocketIO有新的连接!');
        clientCount = Object.keys(io.eio.clients).length;
        console.log('当前连接数 = ', clientCount);

        //用户登录
        socket.on('login', function (from) {
            console.log(from.account + ' 登录成功');
            redis.set('uid-' + from.account, socket.id).catch((err) => {
                console.error(err);
            });
            redis.set('sid-' + socket.id, from.account).catch((err) => {
                console.error(err);
            });
            socket.broadcast.emit('userOnline', from);
            clientOnlineBuff[socket.id] = from;
            socket.broadcast.emit('userList', getUserListJson());
            socket.emit('userList', getUserListJson());
        });

        socket.on('joinRoom', function (msg) {
            socket.join('room-' + msg.roomId);
            console.log(msg.from + ' 加入房间:room-' + msg.roomId);
        });

        //断开事件
        socket.on('disconnect', function () {
            clientCount = Object.keys(io.eio.clients).length;
            console.log('当前连接数 = ', clientCount);
            delete clientOnlineBuff[socket.id];
            socket.broadcast.emit('userList', getUserListJson());

            redis.get('sid-' + socket.id).then((uid) => {
                console.log(uid + '用户与服务器断开');
                redis.del('uid-' + uid).catch((err) => {
                    console.error(err);
                });
                redis.del('sid-' + socket.id).catch((err) => {
                    console.error(err);
                });
            }).catch((err) => {
                console.error(err);
            });
        });

        //监听客户端发送的信息,实现消息转发到各个其他客户端
        socket.on('singleMessage', function (msg) {
            console.log('收到消息：', msg);
            sendMessage(io, msg);
        });

        socket.on('roomMessage', function (msg) {
            console.log('收到Room消息：', msg);
            sendRoomMessage(io, msg);
        });
    });
}

//模块导出
exports.ioServer = ioServer;
