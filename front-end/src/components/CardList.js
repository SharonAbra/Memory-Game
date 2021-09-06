import React,{useState} from 'react';
import CardBody from './CardBody';
import { Container, Col, Row } from 'react-bootstrap';

const CardList = (props) => {
    const {colors} = props;
    // const doubleArray = colors.concat(colors);
    // const randomColors = doubleArray.sort((a, b) => 0.5 - Math.random());

    // initialize variables with hooks
    const [ turnedCards, setTurnedCards ] = useState([]);
    const [ matchingCards, setMatchingCards ] = useState([]);
    const [ finish, setFinish ] = useState(false);
    const [ moves, setMoves ] = useState(0);
    const [ bestScore, setBestScore ] = useState(
      JSON.parse(localStorage.getItem("bestScore")) 
      // || Number.Positive_INFINITY
      )

    const isInactive = (i) => {
      return matchingCards.includes(i)
    }

    const isTurned = (i) => {
      return turnedCards.includes(i);
    }
    
    const handleCardClick = (id) => {
      if (turnedCards.length === 1) {
        setTurnedCards((current) => [...current, id]);
        setMoves((moves) => moves+1);
      } else {
        setTurnedCards([id])
      }
      
      console.log("turned cards " + turnedCards)
      
    }

    return (
      <>
      <h1>{moves}</h1>
      <Container>
        <Row>
          {
            colors.map((color, i) => {
              return (
                <Col xs={3}>
                  <CardBody
                    key={i}
                    // key is unique for each card
                    color={color.color_name}
                    id={color.color_id}
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
