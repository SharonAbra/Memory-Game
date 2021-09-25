const io = require('socket.io-client')
// url of server
module.exports = io('http://localhost:4000')
// module.exports = io('https://memory-game-g.herokuapp.com')