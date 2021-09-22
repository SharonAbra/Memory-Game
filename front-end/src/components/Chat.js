import React, { useEffect, useState, useRef } from "react";
import socket from "../modules/Socket.js";
import ProgressBar from "react-bootstrap/ProgressBar";
import { toggleDisable } from "../redux/actions.js";
import { connect } from 'react-redux';

function Chat({ toggleDisable }) {
  const [input, setInput] = useState();
  const [messageList, setMessageList] = useState([]);
  const [time, setTime] = useState(100);
  const timeRef = useRef(time);
  useEffect(() => (timeRef.current = time), [time]);
  const countdown = useRef(null);
  const [yourTurn, setYourTurn] = useState(false);

  useEffect(() => {
    if (messageList.length > 10) {
      messageList.splice(0,1)
    }
  }, [messageList])

  useEffect(() => {
    socket.on("welcome", (message) => {
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
    console.log(input)
  }

  function handleSend(e) {
    e.preventDefault();
    socket.emit("message", input);
    e.target.text.value = ""; 
  }

  useEffect(() => {
    socket.on("your_turn", () => {
      setYourTurn(true);
      toggleDisable();

      if (countdown.current) {
        clearInterval(countdown.current);
      }

      countdown.current = setInterval(() => {
        if (timeRef.current > 0) {
          setTime((time) => time - 10);
        } else {
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
          {messageList.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </div>
        {yourTurn && (
          <div>
            <h2>YOUR TURN!</h2>
            <ProgressBar animated now={time} />
          </div>
        )}
        <form onSubmit = {(e) => handleSend(e)}>
          <input type="text" name="text" autoComplete="off" onChange={(e) => handleInput(e)}></input>
          <input type="submit" value="SEND"></input>
        </form>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
    return { toggleDisable: () => dispatch(toggleDisable()) }
}

export default connect(null, mapDispatchToProps)(Chat);
