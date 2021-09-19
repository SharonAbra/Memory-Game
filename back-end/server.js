const exp = require('express');
const cors = require('cors');
const DB = require('./modules/db_module.js');
const env = require('dotenv');
env.config();
const app = exp();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
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

io.on('connection', (socket) => {
  console.log(socket.id)
  // socket.emit('connection', 'WELCOME NEW USER!')
  // socket.broadcast.emit('connection', `${socket.id} has now connected`)
  socket.on('turn card', (item) => {
    socket.broadcast.emit('turn card', item);
  });
});

server.listen(process.env.PORT)