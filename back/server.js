const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

var nbr = 0;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  nbr++;
  console.log("Y a actuellement " + nbr + "connecter");
  socket.on("disconnect", () => {
    console.log("user disconnected");
    nbr--;
    console.log("Y a actuellement " + nbr + "connecter");
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

// to send a message for everyone
/*io.on("connection", (socket) => {
  socket.broadcast.emit("hi");
});*/

server.listen(3000, () => {
  console.log("listening on *:3000");
});
