
var p = require('path');
var stream = require('stream');

var EventProtocol = require('./EventProtocol');

var titanEnv = JSON.parse(process.env.TITAN_ENV); // WorkerEntrance 注入的环境变量
var appEntranceJs = titanEnv.APP_ENTRANCE_JS; // app 的入口 js
var appEntrancePath = p.dirname(titanEnv.APP_ENTRANCE_JS); // app 的入口 js 的 path

process.title = 'Titan Worker : ' + titanEnv.DB_NAME + titanEnv.DB_ID;

/**
 * 将事件主线 _event 注入到 worker 的 global 上
 */
global._event = EventProtocol.worker();


// todo:如果以后要做日志文件
// 把要输出的文件目录从 titanEnv 带过来
// 然后在这里把输出 write 过去就好了
/**
 * 重写 process.stderr.
 * 中间加一层发给 master 事件
 */
process.stdout.write = (function(write) {
    return function (data){
        global._event.emitOS('log.out', data);
        write.apply(this, arguments);
    }
})(process.stdout.write);

/**
 * 重写 process.stderr.
 * 中间加一层发给 master 事件
 */
 process.stderr.write = (function(write) {
     return function (data){
         global._event.emitOS('log.err', data);
         write.apply(this, arguments);
     }
 })(process.stderr.write);

/**
 * 重设一堆路径，指向到入口 js
 * 一定要放在最后执行，不要改位置
 */
__filename = appEntranceJs;
__dirname = appEntranceJs;
require.main.filename = appEntranceJs;
// 重新指定入口文件，此行请放在最后
require('module')._load(appEntranceJs, null, true);