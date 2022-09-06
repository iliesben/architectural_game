import Express, { json } from "express"
import http from "http";
import socket from "socket.io";
import { LobbyCrud } from "../src/routes";

const app = Express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.get('/join/:lobbyId', LobbyCrud.join)
app.post('/create', LobbyCrud.create)

// var nbr = 0;


// io.on("connection", (socket) => {
//   console.log("a user connected");
//   nbr++;
//   console.log("Y a actuellement " + nbr + "connecter");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//     nbr--;
//     console.log("Y a actuellement " + nbr + "connecter");
//   });

//   socket.on("chat message", (msg) => {
//     console.log("message: " + msg);
//     io.emit("chat message", msg);
//   });
// });

// to send a message for everyone
/*io.on("connection", (socket) => {
  socket.broadcast.emit("hi");
});*/

server.listen(3000, () => {
  console.log("listening on *:3000");
});
