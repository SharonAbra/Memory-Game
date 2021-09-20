import { connect } from 'react-redux';
import {handleCardClick, checkMatch, checkFinish, computerMove, toggleDisable, handleUser} from '../redux/actions.js'
import React,{ useEffect, useState } from 'react';
import CardBody from './CardBody';
import { Container, Col, Row,  ProgressBar } from 'react-bootstrap';
// import ProgressBar from 'react-bootstrap/ProgressBar'
// import useSocket from 'use-socket.io-client';

// import  { socket } from '../contexts/Socket.js';
// import io from "socket.io-client";
import socket from '../modules/Socket.js'

const CardList = (props) => {
    // const socket = React.useContext(SocketContext);
    const { cards, turnedCards, matchingCards, disable, handleCardClick, checkMatch, checkFinish, vsComp, computerMove, compTurn, multiPlayer, toggleDisable } = props;
    const [ gameMode, setGameMode ] = useState(localStorage.getItem("gameMode"))
    const [ firstUser, setFirstUser ] = useState(false);
    // const [socket, setSocket] = useState(null);
    // const [socket] = useSocket('http://localhost:4000')
    
    const isInactive = (i) => {
      return matchingCards.includes(i)
    }

    const isTurned = (i) => {
      return turnedCards.includes(i);
    }
 
    useEffect(() => {
      if (cards.length > 0 && matchingCards.length > 0) {
      checkFinish();
      }
    }, [matchingCards])

    const chooseRandomCard = () => {
      let randomCard;
      const rLength = cards.length-1;
      do {
        randomCard = pairList[Math.floor(Math.random()*rLength)];
      }
      while (matchingCards.includes(randomCard.i) && turnedCards.includes(randomCard.i))
    return randomCard;
    }

    useEffect(() => {
      if (gameMode === "Playing vs Computer" && compTurn) {
        setTimeout(() => {
          const randomCard = chooseRandomCard(); 
          computerMove(randomCard);   
      }, 700)
      setTimeout(() => {
        const randomCard = chooseRandomCard(); 
        computerMove(randomCard);
    }, 1500)
  }
}, [compTurn])

useEffect(() => {
  setTimeout(() => {
  if (gameMode === "Playing with Friends" && cards.length > 0) {
    toggleDisable();
    let user = '';
    while (user === '') {
      user = prompt('Welcome! what is your name?')
    }
    // do I need handleUser?
    //can I move this part to chat?
    handleUser(user)
    handleSocketInfo();
    socket.emit('user', user)
    socket.on('user turn', (number) => {
      if (number === 0) {
        setFirstUser(true);
      }
    })
  }
}, 500)
}, [cards])

const handleSocketInfo = () => {
  socket.on('turn card', (item) => {
    const flippedCardIndex = cards.findIndex(card => card.id === item.id && card.type === item.type)
    if (flippedCardIndex > -1) {
      handleCardClick(flippedCardIndex, item.id);
    }
  })
}

useEffect(() => {
  if (turnedCards.length === 2) {
    setTimeout(checkMatch, 700);
  }
}, [turnedCards])

useEffect(() => {
  if (firstUser === true){
    toggleDisable();
  }
}, [firstUser])

let pairList = [];
    return (
      <>
      <Container>
        <Row>
          {
            cards.map((card, i) => {
              pairList.push({i:i, id:card.id})
              let data = '';
              if (card.name === undefined) {
                data = card.url;
              } else {
                data = card.name;
              }
   
              return (
                <Col key={i} xs={2}>
                  <CardBody
                  // key is unique for each card
                    key={i}
                    card={data}
                    id={card.id}
                    type ={card.type}
                   // id is shared by two identical cards
                    i = {i}
                    isDisabled={disable}
                    isInactive={isInactive(i)}
                    isTurned={isTurned(i)}
                  />
                </Col>
              );
            })
          }
        </Row>
      </Container>
      {/* <button onClick={handleSocketInfo}>Start Playing with Friends</button> */}
      </>
    )
  }

  const mapStateToProps = (state) => {
    return {
      turnedCards: state.turnedCards,
      turnedCardsId: state.turnedCardsId,
      matchingCards: state.matchingCards,
      disable: state.disable,
      vsComp: state.vsComp,
      compTurn: state.compTurn,
      multiPlayer: state.multiPlayer
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      checkMatch: () => dispatch(checkMatch()),
      checkFinish: () => dispatch(checkFinish()),
      computerMove: (i) => dispatch(computerMove(i)), 
      handleCardClick: (i, id) => dispatch(handleCardClick(i, id)),
      toggleDisable: () => dispatch(toggleDisable()),
      handleUser: (user) => dispatch(handleUser(user))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(CardList);
