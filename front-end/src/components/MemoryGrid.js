import React,{useEffect,useState} from 'react';
import { connect } from 'react-redux';
import { fetchCards } from '../redux/actions.js'
import CardList from './CardList';

class MemoryGrid extends React.Component {
  
  componentDidMount() {
    this.props.fetchCards(this.props.category);
  }

  render() {
    return (
        <div className = "grid">
            <CardList cards={this.props.cards}/>
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