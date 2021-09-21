import React, { useEffect, useState, useRef } from "react";
import socket from "../modules/Socket.js";
import ProgressBar from "react-bootstrap/ProgressBar";
import { toggleDisable } from "../redux/actions.js";

function Chat() {
  const [input, setInput] = useState();
  const [messageList, setMessageList] = useState([]);
  const [time, setTime] = useState(100);
  const timeRef = useRef(time);
  useEffect(() => timeRef.current = time, [time]); 
    const countdown = useRef(null);
  const [yourTurn, setYourTurn] = useState(false);

  useEffect(() => {
    socket.on("welcome", (message) => {
      console.log(message);
      setMessageList((list) => [...list, message]);
    });
  }, []);

  useEffect(() => {
    socket.on("disconnected", (message) =>
      setMessageList((list) => [...list, message])
    );
  }, []);

  useEffect(() => {
    socket.on("message", (message) =>
      setMessageList((list) => [...list, message])
    );
  }, []);

  useEffect(() => {
    socket.on("next", (message) =>
      setMessageList((list) => [...list, message])
    );
  }, []);

  function handleInput(e) {
    setInput(e.target.value);
    e.target.value = "";
  }

  function handleSend() {
    socket.emit("message", input);
  }

  useEffect(() => {
    socket.on("your_turn", () => {
      setYourTurn(true);
      toggleDisable();

        if(countdown.current){
            clearInterval(countdown.current);
        }

      countdown.current = setInterval(() => {
        if (timeRef.current > 0) {
          setTime((time) => time - 10);
        } else {
          console.log("my turn ended");
          clearInterval(countdown.current);
          setTime(100);
          setYourTurn(false);
          toggleDisable();
          socket.emit("pass_turn");
        }
      }, 1000);
    });
  });

  return (
    <>
      <div className="chatContainer">
        <div className="chat">
          {messageList.map((msg, i) => <li key={i}>{msg}</li>)}
        </div>
        {yourTurn && <div>
            <h2>YOUR TURN! {time}</h2>
            <ProgressBar animated now={time} />
          </div>}
        <input type="text" onBlur={(e) => handleInput(e)}></input>
        <button onClick={handleSend}>SEND</button>
      </div>
    </>
  );
}
export default Chat;
