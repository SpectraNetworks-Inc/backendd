const Logger = require('../config/logger');
const WebSocket = require('ws');
const { data } = require('../config/logger');
const ws_server = new WebSocket.Server({ port: 3001, path: '/ws' });

ws_server.on('connection', function connection(ws, req) {
    const ip = req.socket.remoteAddress;
    //Log Client Connection
    Logger.info("A client connected");

    //Event Listeners
    ws.on('message', function incoming(message) {
        Logger.info(`${ip} Sent Message: ${message}`);
        try {
            switch (message) {
                //Datastream1
                case 'data':
                    ws.send('DataStream1');
                    break;
                //Datastream2
                case 'data2':
                    ws.send('Datastream2');
                    break;
                //NoData
                default: 
                    ws.send('Select Datastream');
            }
        }
        catch {
            Logger.error('Error Trying to send data');
            ws.send('Server Error');
        }
    });
});