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

var redis = require('../utils/redis');

function sendMessage(io,msg) {
    try{
        if(typeof msg == 'string'){
            msg = JSON.parse(msg);
        }
        redis.get('uid-' + msg.to).then((sid)=>{
            if(sid){
                io.to(sid).emit('message',msg);
            }
        }).catch((err)=>{
            console.error(err);
        });
    }catch(err){
        console.error(err);
    }
}

function sendRoomMessage(io,msg) {
    try{
        if(typeof msg == 'string'){
            msg = JSON.parse(msg);
        }
        if(msg.to  && msg.from) {
            io.to('room-' + msg.to).emit('message', msg);
        }
    }catch(err){
        console.error(err);
    }
}

//服务端连接
function ioServer(io) {
    var device_count = 0;

    io.on('connection', function (socket) {
        console.log('SocketIO有新的连接!');
        device_count = Object.keys(io.eio.clients).length;
        console.log('当前连接数 = ',device_count);
        redis.set('app_online_count',device_count);

        //用户登录
        socket.on('login', function (from) {
            console.log(from+'登录成功');
            redis.set('uid-'+from,socket.id).catch((err)=>{
                console.error(err);
            });
            redis.set('sid-'+socket.id,from).catch((err)=>{
                console.error(err);
            });
        });

        socket.on('join-room', function (from) {
            redis.get('sid-'+socket.id).then((unionid)=>{
                if(unionid){
                    console.log('小程序' + unionid+'加入房间:room-'+from);
                }
            }).catch((err)=>{
                console.error(err);
            });
        });

        //断开事件
        socket.on('disconnect', function() {
            device_count = Object.keys(io.eio.clients).length;
            console.log('当前连接数 = ',device_count);
            redis.set('app_online_count',device_count);
            redis.get('sid-'+socket.id).then((uid)=>{
                console.log(uid + '用户与服务器断开');
                redis.del('uid-'+uid).catch((err)=>{
                    console.error(err);
                });
                redis.del('sid-'+socket.id).catch((err)=>{
                    console.error(err);
                });
            }).catch((err)=>{
                console.error(err);
            });
        });

        //重连事件
        socket.on('reconnect', function() {
            device_count ++;
            redis.get('sid-'+socket.id).then((uid)=>{
                console.log(uid + '重新连接到服务器,当前在线人数:' + device_count);
            }).catch((err)=>{
                console.error(err);
            })
        });

        //监听客户端发送的信息,实现消息转发到各个其他客户端
        socket.on('msg-single',function(msg){
            console.log('收到消息：',msg);
            sendMessage(io,msg);
        });

        socket.on('msg-room',function(msg){
            console.log('收到Room消息：',msg);
            sendRoomMessage(io,msg);
        });
    });
}

//模块导出
exports.ioServer = ioServer;
