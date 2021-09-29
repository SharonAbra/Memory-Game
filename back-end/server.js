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
    // url of client
    origin: "http://localhost:3000",
    // origin: "https://memory-game-english.herokuapp.com",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

// server is divided according to categories in the game
app.get("/animals", (req, res) => {
  DB.getAllAnimals()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send("Things are not working as expected");
    });
});

app.get("/clothes", (req, res) => {
  DB.getAllClothes()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send("Things are not working as expected");
    });
});

app.get("/kitchen", (req, res) => {
  DB.getAllKitchen()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send("Things are not working as expected");
    });
});

app.get("/music", (req, res) => {
  DB.getAllMusic()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send("Things are not working as expected");
    });
});


app.get("/home", (req, res) => {
  DB.getAllHome()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send("Things are not working as expected");
    });
});


app.get("/jobs", (req, res) => {
  DB.getAllJobs()
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

// function to manage the turns in the game
function next_turn() {
  if (current_turn === players.length - 1) {
    current_turn = 0;
  } else {
    current_turn++;
  }

  if (current_turn <= players.length - 1) {
    // inform all players who is playing now
    io.emit("next", `${players[current_turn].username}'s turn.`);
    // inform the current player that it is their turn
    players[current_turn].emit("your_turn", current_turn);
  }
}

io.on("connection", (socket) => {
  socket.on("user", (user) => {
    socket.username = user;
    // each player is pushed into the players list
    players.push(socket);
    // send the user's location in the list
    socket.emit("user turn", players.indexOf(socket));
    // welcome the user
    socket.emit("welcome", `Welcome ${user}! Your turn is ${players.indexOf(socket)+1}.`);
    // inform the other users of a new player
    socket.broadcast.emit("welcome", `${user} has joined the game.`);
  });

  socket.on("disconnect", () => {
    if (players.includes(socket)) {
      // inform the players if someone disconnects
      socket.broadcast.emit(
        "disconnected",
        `${socket.username} has disconnected.`
      );
      // remove disconnected player from the turns and pass it to the next
      const index = players.indexOf(socket);
      players.splice(index, 1);
      if (index === current_turn) {
        current_turn = index >= players.length - 1 ? 0 : current_turn++;
        if (players.length > 0) {
          players[current_turn].emit("your_turn", current_turn);
        }
      }
    }
  });

  // send chat messages
  socket.on("message", (message) => {
    io.emit("message", `${socket.username}: ${message}`);
  });

  // send information about each turned card
  socket.on("turn card", (item) => {
    socket.broadcast.emit("turn card", item);
  });

  // handle incomplete turns (no cards or only one card flipped)
  socket.on("flip_back", function () {
    io.emit("flip_back");
  });

  // handle passing the turn to next player
  socket.on("pass_turn", function () {
    if (players[current_turn] == socket) {
      next_turn();
    }
  });
});

server.listen(process.env.PORT);