var fs = require('fs');

var csts = require('./CONSTANTS.js');


var cli = module.exports = {};

/**
 * 初始化: light与dark的通信端口
 */
cli.init = function() {
if (!fs.existsSync(csts.TITAN_ROOT_PATH)) {
    fs.mkdirSync(csts.TITAN_ROOT_PATH);
    fs.mkdirSync(csts.TITAN_LOG_PATH);
    fs.mkdirSync(csts.TITAN_PID_PATH);
  }

};

cli.start = function() {

};

cli.connect = function() {

};

cli.disconnect = function() {

};

cli.init();
