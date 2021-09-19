import React from 'react';
import { connect } from 'react-redux';
import { fetchCards } from '../redux/actions.js'
import CardList from './CardList';

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
    
      if( this.props.multiPlayer === true) { 
      return (
      <div className="game">
        <div className="chatContainer">
          <div className="chat"></div>
          <input type="text"></input>
          <button>SEND</button>
          <button>Start Playing with Friends</button>
        </div>
        <CardList cards={shuffledCards}/>
        </div>
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