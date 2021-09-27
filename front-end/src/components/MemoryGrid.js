// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchCards } from '../redux/actions.js'
// import CardList from './CardList';
// import Chat from './Chat';
// import MultiWelcome from './MultiWelcome';

// export default function MemoryGrid () {
//   const dispatch = useDispatch();
//   const category = useSelector(state => state.category);
//   const cards = useSelector( state => state.cards);

//   useEffect(() => {
//     dispatch(fetchCards(category));
//   }, [category])

//     const nameList = cards.map(card => {
//       return {id: card.id, name: card.name, type: 'text'}
//     })
//     const urlList = cards.map(card => {
//       return {id: card.id, url: card.url, type: 'image'}
//     })
//     const shuffledCards = nameList.concat(urlList);
//     shuffledCards.sort((a, b) => 0.5 - Math.random());
    
//       if (sessionStorage.getItem("gameMode") === "Playing with Friends") { 
//       return (
//         <div className="game">
//           <MultiWelcome/>
//           <Chat cards={shuffledCards}/>
//           <CardList cards={shuffledCards}/>
//         </div>
//       )
//     } else {
//       return (
//         <CardList cards={shuffledCards}/>
//       )
//     }   
//   }

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
    
      if(sessionStorage.getItem("gameMode") === "Playing with Friends") { 
      return (
        <div className="game">
          <MultiWelcome/>
          <Chat cards={shuffledCards}/>
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
  return {cards: state.cards}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCards: (category) => dispatch(fetchCards(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoryGrid);