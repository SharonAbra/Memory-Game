const exp = require("express");
const cors = require("cors");
const DB = require("./modules/db_module.js");
const env = require("dotenv");
env.config();
const app = exp();
const http = require("http");
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = require("socket.io")(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "https://memory-game-english.herokuapp.com",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.get("/animals", (req, res) => {
  DB.getAllAnimals()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send("Things are not working as expected");
    });
});

// initialize variables for socket functionality

let players = [];
let current_turn = 0;

function next_turn() {
  if (current_turn === players.length - 1) {
    current_turn = 0;
  } else {
    current_turn++;
  }

  if (current_turn <= players.length - 1) {
    io.emit("next", `${players[current_turn].username}'s turn.`);
    players[current_turn].emit("your_turn", current_turn);
  }
}

io.on("connection", (socket) => {
  socket.on("user", (user) => {
    socket.username = user;
    players.push(socket);
    socket.emit("user turn", players.indexOf(socket));
    console.log(players.length);
    socket.emit("welcome", `Welcome ${user}!`);
    socket.broadcast.emit("welcome", `${user} has joined the game.`);
  });

  socket.on("disconnect", () => {
    if (players.includes(socket)) {
      socket.broadcast.emit(
        "disconnected",
        `${socket.username} has disconnected.`
      );
      const index = players.indexOf(socket);
      players.splice(index, 1);
      if (index === current_turn) {
        current_turn = index >= players.length - 1 ? 0 : current_turn++;
        // io.emit("next", `${players[current_turn].username} is now playing`);
        if (players.length > 0) {
          players[current_turn].emit("your_turn", current_turn);
        }
      }
    }
  });

  socket.on("message", (message) => {
    io.emit("message", `${socket.username}: ${message}`);
  });

  socket.on("turn card", (item) => {
    socket.broadcast.emit("turn card", item);
  });

  socket.on("pass_turn", function () {
    if (players[current_turn] == socket) {
      next_turn();
    }
  });
});

server.listen(process.env.PORT);
