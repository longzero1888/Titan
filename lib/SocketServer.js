var EventEmitter = require('events').EventEmitter;
var util = require('util');
var fs = require('fs');
var net = require('net');

/**
 * SocketServer
 */

var SocketServer = module.exports = function (){
    this.server = null;
    this.socks = [];
}

/**
 * 继承事件模型
 */
util.inherits(SocketServer, EventEmitter);

/**
 * bind
 * @param {string} path
 * @param {Function} callback
 * @return {SocketServer}
 */
SocketServer.prototype.bind = function (path, callback){
    var self = this;

    this.server = net.createServer(this.connectHandle.bind(this));

    this.server.on('error', function(err) {
        if (err.code == 'EADDRINUSE'){
            // 如果 socket 被占用
            // 不管三七二十一 直接干掉
            // 是不是太坏了，有问题之后再改吧
            fs.unlinkSync(path);
            self.server.listen(path, callback);
        }
    });

    this.server.listen(path, callback);
    return this;
}

/**
 * connect handle
 * @param {Socket} sock
 */
SocketServer.prototype.connectHandle = function(sock){
    var self = this;

    // 添加到 socks 队列里去
    this.socks.push(sock);

    // 监听 socket error
    sock.on('error', function(err){
        // 触发 error 并移除 sock
        self.emit('error', err);
        self.removeSocket(sock);
    });

    // 监听 socket close
    sock.on('close', function(){
        // 从 socks 里移除被 close 的 sock
        self.removeSocket(sock);
    })

    // 监听 data
    sock.on('data', function (msg){
        self.emit('message', msg.toString(), sock);
    });
}

/**
 * remove sock
 * @param {Socket} sock
 */
SocketServer.prototype.removeSocket = function (sock){
    var i = this.socks.indexOf(sock);
    this.socks.splice(i, 1);
}

/**
 * close server
 * @param {Function} callback
 */
SocketServer.prototype.close = function(callback){
    // 向外触发close事件
    this.server.on('close', this.emit.bind(this, 'close'));
    this.server.close();
    callback && callback();
};