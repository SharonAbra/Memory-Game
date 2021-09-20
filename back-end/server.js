const exp = require('express');
const cors = require('cors');
const DB = require('./modules/db_module.js');
const env = require('dotenv');
env.config();
const app = exp();
const http = require('http');
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

app.get('/animals', (req,res)=> {
  DB.getAllAnimals()
  .then(data => {
    res.send(data)
  })
  .catch(e => {
    res.send('Things are not working as expected')
  })
})

// initialize variables for socket functionality

let players = [];
let current_turn = 0;
let timeOut;
let turn = 0;
const MAX_WAITING = 10000;

function next_turn(){
  turn = current_turn++ % players.length;
  console.log(turn)
  players[turn].broadcast.emit('next', `${players[turn].username} is now playing`)
  players[turn].emit('your_turn', 'Your Turn!');
  console.log("next turn triggered " , turn);
  triggerTimeout();
}

function triggerTimeout(){
 timeOut = setTimeout(()=>{
   next_turn();
 },MAX_WAITING);
}

function resetTimeOut(){
  if(typeof timeOut === 'object'){
    console.log("timeout reset");
    clearTimeout(timeOut);
  }
}

io.on('connection', (socket) => {
  console.log(socket.id)
  socket.on('user', (user) => {
  socket.username = user;
  players.push(socket)
  socket.emit('user turn', players.indexOf(socket))
  console.log(players.length)
  socket.emit ('welcome', (`Welcome ${user}!`))
  socket.broadcast.emit('welcome', (`${user} has joined the game.`));
  });
  socket.on('disconnect', () => {
    if (players.includes(socket)) {
      socket.broadcast.emit('disconnected', (`${socket.username} has disconnected.`));
      players.splice(players.indexOf(socket),1);
      turn--;
      console.log(players.length)
    }
  });
  socket.on('message', (message) => {
    io.emit('message', (`${socket.username}: ${message}`));
  });
  socket.on('turn card', (item) => {
    socket.broadcast.emit('turn card', item);
  });
  socket.on('pass_turn',function(){
    io.emit('message', (`${players[turn]} is now playing`));
    if(players[turn] == socket){
       resetTimeOut();
       next_turn();
    }
 })
});

server.listen(process.env.PORT)