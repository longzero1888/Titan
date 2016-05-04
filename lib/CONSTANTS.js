var path = require('path');
var fs = require('fs');

var CONSTANTS = {};

/**
 * 设置项目家目录
 */
var TITAN_ROOT_PATH = '';

if (process.env.TITAN_HOME)
    TITAN_ROOT_PATH = process.env.TITAN_HOME;
else if (process.env.HOME && !process.env.HOMEPATH)
    TITAN_ROOT_PATH = path.resolve(process.env.HOME, '.TITAN');
else if (process.env.HOME || process.env.HOMEPATH)
    TITAN_ROOT_PATH = path.resolve(process.env.HOMEDRIVE, process.env.HOME || process.env.HOMEPATH, '.TITAN');
else {
    TITAN_ROOT_PATH = path.resolve('/etc', '.TITAN');
}


CONSTANTS = {
    TITAN_ROOT_PATH: TITAN_ROOT_PATH,
    TITAN_LOG_PATH: path.join(TITAN_ROOT_PATH, 'log'),
    TITAN_PID_PATH: path.join(TITAN_ROOT_PATH, 'pid'),
    DAEMON_RPC_PORT: 23871,
    // DAEMON_RPC_PORT: path.join(TITAN_ROOT_PATH, 'rpc.sock'),
    DAEMON_PUB_PORT: path.join(TITAN_ROOT_PATH, 'pub.sock')
};

module.exports = CONSTANTS;
