var fs = require('fs');

var csts = require('./CONSTANTS.js');
var communication = require('./communication.js');

var cli = module.exports = {};

cli.socketServer = communication.socketServer;
cli.socketClient = communication.socketClient;
cli.closeSocketServer = communication.closeSocketServer;

/**
 * 初始化: light与dark的通信端口
 */
cli.init = function() {
    if (!fs.existsSync(csts.TITAN_ROOT_PATH)) {
        fs.mkdirSync(csts.TITAN_ROOT_PATH);
        fs.mkdirSync(csts.TITAN_LOG_PATH); //创建日志目录
        fs.mkdirSync(csts.TITAN_PID_PATH); //创建
    }

};

cli.start = function() {

};

cli.connect = function() {

};

cli.disconnect = function() {

};

cli.init();
