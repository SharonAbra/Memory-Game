import React from 'react';
import { connect, useSelector } from 'react-redux';
import { handleCardClick } from '../redux/actions';
// import  { socket } from '../contexts/Socket.js';
// import  { SocketContext } from '../contexts/Socket.js';
// import { Socket } from 'socket.io-client';
// import useSocket from 'use-socket.io-client';
import socket from '../modules/Socket.js'

const CardBody = (props) => {
  const { card, isTurned, isInactive, isDisabled, type, id, i, handleCardClick } = props;
  // const socket = React.useContext(SocketContext);
  const gameMode = localStorage.getItem("gameMode");

    const handleClick = () => {
      handleCardClick(i, id);
      if (gameMode === "Playing with Friends") {
        socket.emit('turn card', {id: id, type: type})
      }
    }

    if (card.includes('png')) {
      return (
        <> 
              <div
              id = {id}
              type = {type}
              className = {`cardBody ${isTurned ? "is-turned" : ""} ${isInactive ? "is-inactive" : ""} ${isDisabled ? "is-disabled" : ""}`}
              onClick={handleClick}
              >
                <div 
                className="card-face front">
                  <img src={card} height="90%" alt=""></img>
                </div>
                <div className="card-face back"> <h3>{id}</h3>
                </div>
              </div>
        </>
      )
    } else {
      return (
        <> 
              <div
              id = {id}
              className = {`cardBody ${isTurned ? "is-turned" : ""} ${isInactive ? "is-inactive" : ""} ${isDisabled ? "is-disabled" : ""}`}
              onClick={handleClick}
              >
                <div 
                className="card-face front">
                  <span>{card}</span>
                </div>
                <div className="card-face back"> <h3>{id}</h3>
                </div>
              </div>
        </>
      )
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      handleCardClick: (i, id) => dispatch(handleCardClick(i, id))
    }
  }

  export default connect(null, mapDispatchToProps)(CardBody);

  