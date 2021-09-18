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
    return (
      <div className="game">
        <div className="chatContainer">
          <div className="chat"></div>
          <input type="text"></input>
        </div>
        {/* <button onClick={handleSocketInfo}>Start Playing with Friends</button> */}
        <CardList cards={shuffledCards}/>
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCards: (category) => dispatch(fetchCards(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoryGrid);