import React from 'react';
import { connect } from 'react-redux';
import ErrorBoundary from '../modules/ErrorBoundary.js';
import { fetchCards } from '../redux/actions.js'
import CardList from './CardList';
import Chat from './Chat';
import MultiWelcome from './MultiWelcome';

class MemoryGrid extends React.Component {

  // get the category from the store and fetch the data for the cards
  componentDidMount() {
    this.props.fetchCards(this.props.category);
  }

  render() {
    // each card hold an id, name of item, and a url for an image
    const cards = this.props.cards;
    // create a list of names only
    const nameList = cards.map(card => {
      return {id: card.id, name: card.name, type: 'text'}
    })
    // create a list of urls only
    const urlList = cards.map(card => {
      return {id: card.id, url: card.url, type: 'image'}
    })
    // combine the two lists and shuffle, this will be sent to the child.
    const shuffledCards = nameList.concat(urlList);
    shuffledCards.sort((a, b) => 0.5 - Math.random());
    
      if(sessionStorage.getItem("gameMode") === "Playing with Friends") { 
      return (
        <div className="game">
          <MultiWelcome/>
          <Chat cards={shuffledCards}/>
          <ErrorBoundary>
            <CardList cards={shuffledCards}/>
          </ErrorBoundary>
        </div>
      )
    } else {
      return (
        <ErrorBoundary>
          <CardList cards={shuffledCards}/>
        </ErrorBoundary>
      )
    }   
  }
}

const mapStateToProps = (state) => {
  return {cards: state.cards}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCards: (category) => dispatch(fetchCards(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoryGrid);