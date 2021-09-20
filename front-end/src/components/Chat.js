import React,{ useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import  { SocketContext } from '../contexts/Socket.js';

const Chat = () => {
    const socket = React.useContext(SocketContext);
    const [ input, setInput ] = useState()
    const [ messageList , setMessageList ] = useState([])
    const user = useSelector(state => state.user);

    socket.on('welcome', (msg) => {
        setMessageList([...messageList, msg]);
    })

    socket.on('disconnected', (message) => {
        setMessageList([...messageList, message]);
    })

    socket.on('message', (message) => {
        setMessageList([...messageList, message]);
    })

    function handleInput (e) {
        setInput(e.target.value);
        e.target.value = '';
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
        <input type="text" onBlur = {(e) => handleInput(e)}></input>
        <button onClick = {handleSend}>SEND</button>
    </div>
    </>
    ) 
}
export default Chat;