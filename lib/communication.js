var axon = require('axon');
var rpc = require('axon-rpc');

var csts = require('./CONSTANTS.js');

var communication = module.exports = {};

var rep = axon.socket('rep');
var req = axon.socket('req');

communication.socketServer = function() {
    rep.bind(csts.DAEMON_RPC_PORT);

    var server = new rpc.Server(rep);
    server.expose({
        message: function(clientMessage, fn) {
            console.log(clientMessage); // server处理
            fn(null, clientMessage);
        }
    });
};

communication.closeSocketServer = function() {
    rep.close();
};

communication.socketClient = function(message) {
    req.connect(csts.DAEMON_RPC_PORT);

    var client = new rpc.Client(req);
    client.call('message', message, function(err, serverMessage) {
        if (err) {
            return;
        }
        console.log(serverMessage);
    });
};
