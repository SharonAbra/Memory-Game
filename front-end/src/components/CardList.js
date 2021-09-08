import React,{useEffect, useState} from 'react';
import CardBody from './CardBody';
import { Container, Col, Row } from 'react-bootstrap';

const CardList = (props) => {
    // retrieve array of cards from props
    const {colors} = props;
    // initialize variables with hooks
    const [ turnedCards, setTurnedCards ] = useState([]);
    const [ turnedCardsId, setTurnedCardsId ] = useState([]);
    const [ matchingCards, setMatchingCards ] = useState([]);
    const [ finish, setFinish ] = useState(false);
    const [ moves, setMoves ] = useState(0);
    const [ bestScore, setBestScore ] = useState(
      JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY);
    
    const isInactive = (i) => {
      return matchingCards.includes(i)
    }

    const isTurned = (i) => {
      return turnedCards.includes(i);
    }
    
    const handleCardClick = (i, id) => {
      if (turnedCards.length === 1) {
        setTurnedCards((current) => [...current, i]);
        setTurnedCardsId((current) => [...current, id]);
        setMoves((moves) => moves + 1);
      } else {
        setTurnedCards([i]);
        setTurnedCardsId([id]);
      }
    }

    const checkMatch = () => {
      const [ cardOneId, cardTwoId ] = turnedCardsId;
      const [ cardOne, cardTwo ] = turnedCards;
      if (cardOneId === cardTwoId) {
        setMatchingCards((current) => [ ...current, cardOne, cardTwo]);
        setTurnedCards([]);
      } else {
        setTimeout(() => {
          setTurnedCards([], 1000);
        })
      }
    }

    useEffect(() => {
      if (turnedCards.length === 2) {
        setTimeout(checkMatch, 700)
      }
    }, [turnedCards])

    useEffect(() => {
      checkFinish();
    }, [matchingCards])

    const checkFinish = () => {
      console.log("checkFinish in action")
      console.log(matchingCards)
      if (matchingCards.length === colors.length) {
        setFinish(true);
        const highestScore = Math.min(moves, bestScore);
        setBestScore(highestScore);
        localStorage.setItem("bestScore", highestScore)
        console.log("checkFinish done")
      }
    }

    return (
      <>
      {/* <h1>Turned Cards: {turnedCards.map(item => <li>{item}</li>)}</h1>
      <h1>Turned Cards ID: {turnedCardsId.map(item => <li>{item}</li>)}</h1>
      <h1>Moves: {moves}</h1>
      <h1>Matching: {matchingCards}</h1>
      <h1>Best Score: {bestScore} moves!</h1> */}
      <Container>
        <Row>
          {
            colors.map((color, i) => {
              return (
                <Col xs={2}>
                  <CardBody
                    key={i}
                    // key is unique for each card
                    color={color.color_name}
                    id={color.color_id}
                    i = {i}
                    // id is shared by two identical cards
                    // isDisabled={shouldDisableAllCards}
                    isInactive={isInactive(i)}
                    isTurned={isTurned(i)}
                    handleCardClick={handleCardClick}
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
  export default CardList;
