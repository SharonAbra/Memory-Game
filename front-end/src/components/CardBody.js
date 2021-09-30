import { useDispatch, useSelector } from 'react-redux';
import { handleCardClick, handleCounter, handleDisable } from '../redux/actions';
import socket from '../modules/Socket.js'

export default function CardBody ({ card, isTurned, isInactive, isDisabled, type, id, i}) {
  const dispatch = useDispatch();
  const turnedCards = useSelector(state => state.turnedCards);
  const gameMode = sessionStorage.getItem("gameMode");

  function handleClick () {
    dispatch(handleCardClick(i, id));
    if (gameMode === "Playing with Friends") {
      // send the other players information about the turned cards
      socket.emit('turn card', {id: id, type: type})
      if (turnedCards.length === 0) {
        // increase click counter
        dispatch(handleCounter());
      } else if (turnedCards.length === 1) {
        // increase click counter
        dispatch(handleCounter());
        // when second card is clicked, pass the turn
        socket.emit('pass_turn');
        // prevent player from playing
        dispatch(handleDisable());
      }
    } else if (gameMode === "Playing Solo" && turnedCards.length === 1) {
      dispatch(handleDisable());
    }
  }

  // image cards
  if (card.includes('png')) {
    return (
      <> 
        <div
        onClick={handleClick}
        id = {id}
        type = {type}
        className = {`cardBody ${isTurned ? "is-turned" : ""}
                    ${isInactive ? "is-inactive" : ""}
                    ${isDisabled ? "is-disabled" : ""}`}
        >
          <div 
          className="card-face front">
            <img src={card} className="pic" alt=""></img>
          </div>
          <div className="card-face back"></div>
        </div>
      </>
    )
    
  // text cards
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
        <div className="card-face back"></div>
      </div>
    )
  }
}
  