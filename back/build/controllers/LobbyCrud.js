"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyCrud = void 0;
const ILobby_1 = __importDefault(require("../models/ILobby"));
const IPlayer_1 = __importDefault(require("../models/IPlayer"));
const GameResolution_1 = require("../services/GameResolution");
const lodash_1 = require("lodash");
class LobbyCrud {
    static initSockets(sockets) {
        sockets.on('connection', (socket) => {
            socket.on('join room', (lobbyId) => {
                socket.join(lobbyId);
                const currentLobby = LobbyCrud.lobbies[lobbyId];
                if (currentLobby) {
                    sockets.sockets.to(lobbyId).emit('current lobby', (0, lodash_1.values)(currentLobby.players));
                }
            });
            socket.on('leave room', (lobbyId) => {
                socket.leave(lobbyId);
                const currentLobby = LobbyCrud.lobbies[lobbyId];
                if (currentLobby) {
                    sockets.sockets.to(lobbyId).emit('current lobby', (0, lodash_1.values)(currentLobby.players));
                }
            });
            socket.on('start game', (lobbyId) => {
                const currentLobby = LobbyCrud.lobbies[lobbyId];
                if (!currentLobby)
                    return;
                GameResolution_1.GameResolution.resetGameTurn(currentLobby.players);
                sockets.sockets.to(lobbyId).emit('is starting');
            });
            socket.on('user choice', ({ lobbyId, player }) => {
                const currentLobby = LobbyCrud.lobbies[lobbyId];
                if (!currentLobby)
                    return;
                const currentPlayer = currentLobby.players[player.id];
                if (!currentPlayer)
                    return;
                currentPlayer.setCurrentUserChoice(player.currentChoice);
                currentLobby.players[player.id] = currentPlayer;
                LobbyCrud.lobbies[lobbyId] = currentLobby;
                if (Object.keys(currentLobby.players).length < 2 || (0, lodash_1.find)(currentLobby.players, player => player.currentChoice === '')) {
                    sockets.sockets.to(lobbyId).emit('winner', null);
                }
                else {
                    sockets.sockets.to(lobbyId).emit('winner', GameResolution_1.GameResolution.playTurn(currentLobby.players));
                }
                ;
            });
            socket.on('disconnect', () => {
                const roomsMapIterator = socket.adapter.rooms.keys();
                let lobbyId = '';
                for (let i = 0; i < 2; i++) {
                    if (i === 1)
                        lobbyId = roomsMapIterator.next().value;
                    roomsMapIterator.next().value;
                }
                const currentLobby = LobbyCrud.lobbies[lobbyId];
                if (!currentLobby)
                    return;
                const currentPlayer = (0, lodash_1.find)(currentLobby.players, player => player.ip === socket.conn.remoteAddress);
                if (!currentPlayer)
                    return;
                delete currentLobby.players[currentPlayer.id];
                sockets.sockets.to(currentLobby.uuid).emit('current lobby', (0, lodash_1.values)(currentLobby.players));
            });
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const player = new IPlayer_1.default(req.socket.remoteAddress, req.body.name, 'player1');
                const newLobby = new ILobby_1.default({ [player.id]: player });
                LobbyCrud.lobbies[newLobby.uuid] = newLobby;
                return res.status(200).send({ lobbyId: newLobby.uuid, player });
            }
            catch (error) {
                res.send({ message: 'error', error });
            }
        });
    }
    static join(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lobbyId = req.body.lobbyId;
                const currentLobby = LobbyCrud.lobbies[lobbyId];
                const currentLobbyLength = Object.keys(currentLobby.players).length;
                if (currentLobby && currentLobbyLength < 2) {
                    const newPlayer = new IPlayer_1.default(req.socket.remoteAddress, req.body.name, `player${currentLobbyLength + 1}`);
                    currentLobby.addNewPlayer(newPlayer);
                    return res.status(200).send({ lobbyId: currentLobby.uuid, player: newPlayer });
                }
                return currentLobby && currentLobbyLength >= 2
                    ? res.status(404).send({ message: 'error', error: 'This lobby cannot contain more players' })
                    : res.status(404).send({ message: 'error', error: 'Lobby not found' });
            }
            catch (error) {
                res.send({ message: 'error', error });
            }
        });
    }
    static quit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lobbyId = req.params.lobbyId;
                const currentLobby = LobbyCrud.lobbies[lobbyId];
                if (currentLobby) {
                    if (currentLobby.players[req.body.playerId]) {
                        delete currentLobby.players[req.body.playerId];
                        return res.status(200).send({ players: (0, lodash_1.values)(currentLobby.players) });
                    }
                    return res.status(404).send({ message: 'error', error: 'Player not found' });
                }
                return res.status(404).send({ message: 'error', error: 'Lobby not found' });
            }
            catch (error) {
                res.send({ message: 'error', error });
            }
        });
    }
}
exports.LobbyCrud = LobbyCrud;
LobbyCrud.lobbies = {};
