import { connect } from 'react-redux';
import {handleCardClick, checkMatch, checkFinish, computerMove, toggleDisable, handleUser} from '../redux/actions.js'
import React,{ useEffect, useState } from 'react';
import CardBody from './CardBody';
import { Container, Col, Row } from 'react-bootstrap';
import socket from '../modules/Socket.js'

const CardList = (props) => {
    const { cards, turnedCards, matchingCards, disable, handleCardClick, checkMatch, checkFinish, vsComp, computerMove, compTurn, multiPlayer, toggleDisable } = props;
    const [ gameMode, setGameMode ] = useState(localStorage.getItem("gameMode"));
    const [ firstUser, setFirstUser ] = useState(false);
    const [ compFlipList, setCompFlipList ] = useState([]);
    
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

  // function chooseRandomCard() {
  //   let randomCard = 100;
  //   while (matchingCards.includes(randomCard)) {
  //     randomCard = pairList[Math.floor(Math.random() * (cards.length - 1))];
  //   }
  //   return randomCard;
  // };

     // const chooseRandomCard = () => {
    //   let randomCard;
    //   const rLength = cards.length - 1;
    //   do {
    //     randomCard = pairList[Math.floor(Math.random() * rLength)];
    //   } while (
    //     matchingCards.includes(randomCard.i) &&
    //     turnedCards.includes(randomCard.i)
    //   );
    //   return randomCard;
    // };

    useEffect(() => {
      // push matching to a local list
      let localMatches =[...matchingCards, 100];
      // console.log(localMatches)
      if (gameMode === "Playing vs Computer" && compTurn) {
        setTimeout(() => {
          let randomCard = {i:100, id:100};
          while (localMatches.includes(randomCard.i)) {
          randomCard = pairList[Math.floor(Math.random() * (cards.length - 1))];
    }
          console.log(randomCard)
          computerMove(randomCard);
        }, 700);
        setTimeout(() => {
          let randomCard = {i:100, id:100};
          let localMatches =[...matchingCards, 100];
          while (localMatches.includes(randomCard.i)) {
          randomCard = pairList[Math.floor(Math.random() * (cards.length - 1))];
    }
          console.log(randomCard)
          computerMove(randomCard);
        }, 1500);
      }
    }, [compTurn, matchingCards]);

useEffect(() => {
  setTimeout(() => {
    if (gameMode === "Playing with Friends" && cards.length > 0) {
      // prevent player from playing
      toggleDisable();
      let user = "";
      while (user === "") {
        user = prompt("Welcome! what is your name?");
      }
      // do I need handleUser?
      //can I move this part to chat?
      handleUser(user);
      handleSocketInfo();
      socket.emit("user", user);
      socket.on("user turn", (number) => {
        if (number === 0) {
          setFirstUser(true);
        }
      });
    }
  }, 50);
}, [cards]);

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
  // allow player to play
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
