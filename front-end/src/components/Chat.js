import React,{ useEffect, useState } from 'react';
// import { useSelector } from 'react-redux'
// import  { SocketContext } from '../contexts/Socket.js';
// import  { socket } from '../contexts/Socket.js';
// import useSocket from 'use-socket.io-client';
import socket from '../modules/Socket.js';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Chat = () => {
    // const socket = React.useContext(SocketContext);
    const [ input, setInput ] = useState()
    const [ messageList , setMessageList ] = useState([])
    const [ time, setTime ] = useState(100)
    // const user = useSelector(state => state.user);

    socket.on('welcome', (msg) => {
        setMessageList([...messageList, msg]);
    })

    socket.on('disconnected', (message) => {
        setMessageList([...messageList, message]);
    })

    socket.on('message', (message) => {
        setMessageList([...messageList, message]);
    })

    socket.on('next', (message) => {
        setMessageList([...messageList, message]);
    })

    function handleInput (e) {
        setInput(e.target.value);
        e.target.value = '';
    }

    function handleSend () {
        socket.emit('message', input)
    }

    socket.on('your_turn', (message) => {
        setMessageList([...messageList, message]);
        const countdown = setInterval(function() {
            setTime(time => time -10);
        },1000);
        return () => clearInterval(countdown);
    })


    return (
    <> 
   <div className="chatContainer">
        <div className="chat">
            {
                messageList.map((msg, i) => <li key={i}>{msg}</li>)
            }
        </div>
        <ProgressBar animated now={time}/>
        <input type="text" onBlur = {(e) => handleInput(e)}></input>
        <button onClick = {handleSend}>SEND</button>
    </div>
    </>
    ) 
}
export default Chat;