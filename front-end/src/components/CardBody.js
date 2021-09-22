import { useDispatch, useSelector } from 'react-redux';
import { handleCardClick, toggleDisable } from '../redux/actions';
import socket from '../modules/Socket.js'

export default function CardBody ({ card, isTurned, isInactive, isDisabled, type, id, i}) {
  const dispatch = useDispatch();
  const turnedCards = useSelector(state => state.turnedCards);
  const gameMode = localStorage.getItem("gameMode");

  function handleClick () {
    if (turnedCards.length === 1) {
      socket.emit('pass_turn');
      dispatch(toggleDisable());
    }
    dispatch(handleCardClick(i, id));
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
      <div
      onClick={handleClick}
      id = {id}
      className = {
        `cardBody ${isTurned ? "is-turned" : ""}
        ${isInactive ? "is-inactive" : ""}
        ${isDisabled ? "is-disabled" : ""}`
      }
      >
        <div className="card-face front"><span>{card}</span></div>
        <div className="card-face back"> <h3>{id}</h3></div>
      </div>
    )
  }
}
  