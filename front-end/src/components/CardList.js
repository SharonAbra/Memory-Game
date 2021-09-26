import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Col, Row } from 'react-bootstrap';
import CardBody from './CardBody';
import {checkMatch, checkFinish, computerMove, handleEnable} from '../redux/actions.js'

export default function CardList ({ cards }) {

  const dispatch = useDispatch();
  const turnedCards = useSelector(state => state.turnedCards);
  const matchingCards = useSelector(state => state.matchingCards);
  const disable = useSelector(state => state.disable);
  const compTurn = useSelector(state => state.compTurn);
  const gameMode = sessionStorage.getItem("gameMode");
  const pairList = [];
  
  // this will be sent to the card in the props, and will control it's individual css
  const isInactive = (i) => {
    return matchingCards.includes(i)
  }

  // this will be sent to the card in the props, and will control it's individual css
  const isTurned = (i) => {
    return turnedCards.includes(i);
  }

  // when two cards are turned, dispatch the action that checks for a match between two cards.
  useEffect(() => {
    if (turnedCards.length === 2) {
      setTimeout(() => {
        dispatch(checkMatch())
        if (gameMode === "Playing Solo")
          dispatch(handleEnable());
      }, 700);
    }
  }, [turnedCards])

  // when to cards match, dispatch the action that checks if all the board is matched
  useEffect(() => {
    if (cards.length > 0 && matchingCards.length > 0) {
      dispatch(checkFinish());
    }
  }, [matchingCards])

    // function to manage the game vs computer
    useEffect(() => {
    // push matching to a local list with placeholder value
    let localMatches =[...matchingCards, 100];
    let localTurned = [];
    // adding to the pairList length to include placeholder
    if (gameMode === "Playing vs Computer" && compTurn && localMatches.length < pairList.length+1) {
      setTimeout(() => {
        // initialize a placeholder value to enable the while loop its first run
        let randomCard = {i:100, id:100};
        while (localMatches.includes(randomCard.i)) {
          randomCard = pairList[Math.floor(Math.random() * (cards.length - 1))];
        }
        // push first card to prevent the computer from selecting it again.
        localTurned.push(randomCard.i);
        dispatch(computerMove(randomCard));
      }, 700);
      setTimeout(() => {
        // do all of this again for the second card
        let randomCard = {i:100, id:100};
        // let localMatches =[...matchingCards, 100];
        while (localMatches.includes(randomCard.i) || localTurned.includes(randomCard.i)) {
          randomCard = pairList[Math.floor(Math.random() * (cards.length - 1))];
        }
        dispatch(computerMove(randomCard));
      }, 1500);
    }
  }, [compTurn, matchingCards]);
  
  return (
    <Container>
      <Row>
        {
        // determine if the card will hold a text or an image
        cards.map((card, i) => {
          pairList.push({i:i, id:card.id})
          let data = '';
          // undefined means this item holds an image url
          if (card.name === undefined) {
            data = card.url;
          } else {
            // item holds text
            data = card.name;
          }

          return (
            <Col key={i} xs={2}>
              <CardBody
              // key is unique for each card, and is used to control its individual css
                key={i}
                card={data}
                id={card.id}
                type={card.type}
              // id is shared by two identical cards, and is used to determine a match
                i={i}
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
  )
}
