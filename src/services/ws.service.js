const Logger = require('../config/logger');
const WebSocket = require('ws');
const ws_server = new WebSocket.Server({ port: 3001, path: '/ws' }, function(){
    Logger.log('WS Server Started');
});

ws_server.on('connection', function connection(ws, req) {
    const ip = req.socket.remoteAddress;
    //Log Client Connection
    Logger.info("A client connected");

    //Event Listeners
    ws.on('message', function incoming(message) {
        Logger.info(`${ip} Sent Message: ${message}`);
    });
});