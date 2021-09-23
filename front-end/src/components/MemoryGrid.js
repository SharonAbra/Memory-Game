import React from 'react';
import { connect } from 'react-redux';
import { fetchCards } from '../redux/actions.js'
import CardList from './CardList';
import Chat from './Chat';
import MultiWelcome from './MultiWelcome';


class MemoryGrid extends React.Component {

  componentDidMount() {
    this.props.fetchCards(this.props.category);
  }

  render() {
    const cards = this.props.cards;
    const nameList = cards.map(card => {
      return {id: card.id, name: card.name, type: 'text'}
    })
    const urlList = cards.map(card => {
      return {id: card.id, url: card.url, type: 'image'}
    })
    const shuffledCards = nameList.concat(urlList);
    shuffledCards.sort((a, b) => 0.5 - Math.random());
    
      if( localStorage.getItem("gameMode") === "Playing with Friends") { 
      return (
        <>
          
          <div className="game">
            <MultiWelcome/>
            <Chat/>
            <CardList cards={shuffledCards}/>
          </div>
        </>
      )
    } else {
      return (
        <CardList cards={shuffledCards}/>
      )
    }   
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards, multiPlayer: state.multiPlayer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCards: (category) => dispatch(fetchCards(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoryGrid);