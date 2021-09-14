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
      return {id: card.id, name: card.name}
    })
    const urlList = cards.map(card => {
      return {id: card.id, url: card.url}
    })
    const shuffledCards = nameList.concat(urlList);
    shuffledCards.sort((a, b) => 0.5 - Math.random());
    return (
        <div className = "grid">
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