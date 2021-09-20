const io = require('socket.io-client')
module.exports = io('http://localhost:4000')

// import React, { useContext, useEffect, useState } from 'react'

// import io from 'socket.io-client';

// export const socket = io.connect('http://localhost:4000')

// export { socket }


// export const socket = io('http://localhost:4000');
// export const SocketContext = React.createContext(socket);

// const SocketContext = React.createContext()

// export function useSocket() {
//   return useContext(SocketContext)
// }

// export function SocketProvider({ id, children }) {
//   const [socket, setSocket] = useState()

//   useEffect(() => {
//     const newSocket = io(
//       'http://localhost:4000',
//       { query: { id } }
//     )
//     setSocket(newSocket)

//     return () => newSocket.close()
//   }, [id])

//   return (
//     <SocketContext.Provider value={socket}>
//       {children}
//     </SocketContext.Provider>
//   )
// }