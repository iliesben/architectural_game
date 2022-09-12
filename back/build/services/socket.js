"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const WEBSOCKET_CORS = {
    origin: '*',
    methods: ['GET', 'POST']
};
class Websocket extends socket_io_1.Server {
    constructor(httpServer) {
        super(httpServer, {
            cors: WEBSOCKET_CORS
        });
    }
    static getInstance(httpServer) {
        if (!Websocket.io) {
            Websocket.io = new Websocket(httpServer);
        }
        return Websocket.io;
    }
}
exports.default = Websocket;
