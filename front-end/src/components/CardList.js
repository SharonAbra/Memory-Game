import Finish from './Finish';
import React,{useEffect, useState} from 'react';
import CardBody from './CardBody';
import { Container, Col, Row } from 'react-bootstrap';

const CardList = (props) => {
    // retrieve array of cards from props
    const {cards} = props;
    // initialize variables with hooks
    const [ turnedCards, setTurnedCards ] = useState([]);
    const [ turnedCardsId, setTurnedCardsId ] = useState([]);
    const [ matchingCards, setMatchingCards ] = useState([]);
    const [ finish, setFinish ] = useState(false);
    const [ disable, setDisable ] = useState(false);
    const [ moves, setMoves ] = useState(0);
    const [ bestScore, setBestScore ] = useState(
      JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY);
    
    const isInactive = (i) => {
      return matchingCards.includes(i)
    }

    const isTurned = (i) => {
      return turnedCards.includes(i);
    }

    const disableAll = () => {
      setDisable(true);
    }

    const enableAll = () => {
      setDisable(false)
    }
    
    const handleCardClick = (i, id) => {
      
      if (turnedCards.length === 1) {
        disableAll();
        setTurnedCards((current) => [...current, i]);
        setTurnedCardsId((current) => [...current, id]);
        setMoves((moves) => moves + 1);
      } else {
        setTurnedCards([i]);
        setTurnedCardsId([id]);
      }
    }

    const checkMatch = () => {
      enableAll();
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
      if (cards.length > 0) {
      checkFinish();
      }
    }, [matchingCards])

    const checkFinish = () => {
      if (matchingCards.length === cards.length) {
        const highestScore = Math.min(moves, bestScore);
        setBestScore(highestScore);
        localStorage.setItem("bestScore", highestScore)
        setFinish(true);
      }
    }

    const handleRestart = () => {
      setMatchingCards([]);
      setTurnedCards([]);
      setTurnedCardsId([])
      setFinish(false);
      setMoves(0);
    }

    return (
      <>
      <Container>
        <Row>
          {
            cards.map((card, i) => {
              return (
                <Col xs={4} sm={3} md={2}>
                  <CardBody
                    key={i}
                    // key is unique for each card
                    card={card.name}
                    id={card.id}
                    i = {i}
                    // id is shared by two identical cards
                    isDisabled={disable}
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
      <Finish finish={finish} moves={moves} handleRestart={handleRestart}/>
      </>
    )
  }
  export default CardList;