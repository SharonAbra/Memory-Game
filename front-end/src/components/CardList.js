import { connect } from 'react-redux';
import { checkMatch, checkFinish, computerMove} from '../redux/actions.js'
import React,{ useEffect } from 'react';
import CardBody from './CardBody';
import { Container, Col, Row } from 'react-bootstrap';

const CardList = (props) => {
    
    const { cards, turnedCards, matchingCards, disable, checkMatch, checkFinish, vsComp, computerMove, compTurn } = props;

    const isInactive = (i) => {
      return matchingCards.includes(i)
    }

    const isTurned = (i) => {
      return turnedCards.includes(i);
    }

    useEffect(() => {
      if (turnedCards.length === 2) {
        setTimeout(checkMatch, 700)
    }
    }, [turnedCards])

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
      if (vsComp && compTurn) {
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
                // <Col xs={4} sm={3} md={2}>
                <Col xs={2}>
                  <CardBody
                    key={i}
                    // key is unique for each card
                    card={data}
                    id={card.id}
                    i = {i}
                    // id is shared by two identical cards
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
      compTurn: state.compTurn
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      checkMatch: () => dispatch(checkMatch()),
      checkFinish: () => dispatch(checkFinish()),
      computerMove: (i) => dispatch(computerMove(i))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(CardList);