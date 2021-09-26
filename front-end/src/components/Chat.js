import React, { useEffect, useState, useRef } from "react";
import socket from "../modules/Socket.js";
import ProgressBar from "react-bootstrap/ProgressBar";
import { handleCardClick, handleEnable, handleDisable, flipBack, handleYourTurn } from "../redux/actions.js";
import { useSelector, useDispatch } from 'react-redux';

export default function Chat({ cards }) {
  const counter = useSelector(state => state.counter);
  const username = useSelector(state => state.username);
  const [ input, setInput ] = useState();
  const [ messageList, setMessageList ] = useState([]);
  const [ time, setTime ] = useState(100);  
  const yourTurn = useSelector(state => state.yourTurn);
  const [ next, setNext ] = useState('')
  const countdown = useRef(null);
  const timeRef = useRef(time);
  const dispatch = useDispatch();
  const gameMode = sessionStorage.getItem("gameMode");

  useEffect(() => (timeRef.current = time), [time]);

  useEffect(() => {
    if (messageList.length > 7) {
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
      setNext(message)
    );
  }, []);

  useEffect(() => {
    socket.on("flip_back", () => {
    dispatch(flipBack());
    });
  }, []);

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleSend(e) {
    e.preventDefault();
    socket.emit("message", input);
    e.target.text.value = ""; 
    setInput('');
  }

  // function to execute the cards that were flipped by other sockets
  const handleSocketInfo = () => {
    socket.on('turn card', (item) => {
      const flippedCardIndex = cards.findIndex(card => card.id === item.id && card.type === item.type)
      if (flippedCardIndex > -1) {
        dispatch(handleCardClick(flippedCardIndex, item.id));
      }
    })
  }

  // function to commence the multi-player mode
  useEffect(()=> {
    if (gameMode === "Playing with Friends" && cards.length > 0) {
      handleSocketInfo();
      socket.emit("user", username);
      // determine if this player is the first socket that connected
      socket.on("user turn", (number) => {
        if (number === 0) {
          dispatch(handleYourTurn());
        } else {
          dispatch(handleDisable());
        }
      });
    }
  }, [username])

  useEffect(() => {
    socket.on("your_turn", () => {
      // instruct the user to play
      dispatch(handleYourTurn());
      // enable clicks
      dispatch(handleEnable());
      // manage the time for each turn
      if (countdown.current) {
        clearInterval(countdown.current);
      }
       // each turn is 10 seconds
      countdown.current = setInterval(() => {
        if (timeRef.current > 0) {
          setTime((time) => time - 1);
        } else {
          clearInterval(countdown.current);
          setTime(100);
           // change your turn to false
          dispatch(handleYourTurn());
          dispatch(handleDisable());
          socket.emit("pass_turn");
          socket.emit("flip_back");
          // setTimeout(() => {
          //   // wait until check match is done and change your turn to false
          //   dispatch(handleYourTurn());
          // }, 800);
        }
      }, 100);
    });
  }, []);

  // when the player turned two cards, the turn will be passed to the next
  useEffect(() => {
    if (counter === 2) {
      clearInterval(countdown.current);
      setTime(100);
      // change your turn to false
      dispatch(handleYourTurn());
      dispatch(handleDisable());
      socket.emit("pass_turn");
      // setTimeout(() => {
      //   // wait until check match is done and change your turn to false
      //   dispatch(handleYourTurn());
      // }, 800);
    }
  }, [counter])

  return (
    <>
      <div className="chatContainer">
        <div className="chat">
          {messageList.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </div>
        <form onSubmit = {(e) => handleSend(e)}>
          <input type="text" name="text" autoComplete="off" onChange={(e) => handleInput(e)}></input>
          <input type="submit" value="SEND"></input>
        </form>
        {
          yourTurn ? 
          <div className="turnManager">
            <h2>YOUR TURN!</h2>
            <ProgressBar animated now={time} />
          </div> :
          <div className="turnManagerOther">
          <h2>{next}</h2>
        </div>
        }
      </div>
    </>
  );
}
