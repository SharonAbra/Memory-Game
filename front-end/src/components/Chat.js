import React,{ useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import  { SocketContext } from '../contexts/Socket.js';

const Chat = () => {
    const socket = React.useContext(SocketContext);
    const [ input, setInput ] = useState()
    const [ messageList , setMessageList ] = useState(['Welcome!'])
    const user = useSelector(state => state.user);

    socket.on('user', (user) => {
        setMessageList([...messageList, `${user} has joined the game`]);
    })

    socket.on('message', (message) => {
        setMessageList([...messageList, message]);
    })

    function handleInput (e) {
        setInput(e.target.value)
    }

    function handleSend () {
        socket.emit('message', input)
    }

    return (
    <> 
   <div className="chatContainer">
        <div className="chat">
            {
                messageList.map(msg => <li>{msg}</li>)
            }
        </div>
        <input type="text" onChange = {(e) => handleInput(e)}></input>
        <button onClick = {handleSend}>SEND</button>
    </div>
    </>
    ) 
}
export default Chat;