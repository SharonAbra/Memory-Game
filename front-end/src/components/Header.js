import React,{useEffect, useState} from 'react';
import { connect } from 'react-redux';

function Header(props) {

    const { moves, finish, category} = props

    const [ bestScore, setBestScore ] = useState(
        JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY);

useEffect(() => {
    if (finish === true) {
        const highestScore = Math.min(moves, bestScore);
        setBestScore(highestScore);
        localStorage.setItem("bestScore", highestScore)
    }
}, [finish])
    if (bestScore === Infinity) {
        return (
            <header className ="header">
                <h1 className="gameName">MEMORY GAME</h1>
                <h4 className="instructions">Click on two cards to find a match!</h4>
                <div className="information">
                    <span>Category: <i>{category}</i></span>
                    <span>Moves: {moves}</span>
                </div>
            </header>
        );
    } else {
        return (
            <header className ="header">
                <h1 className="gameName">MEMORY GAME</h1>
                <h4 className="instructions">Click on two cards to find a match!</h4>
                <div className="information">
                    <span>Category: <i>{category}</i></span>
                    <span>Moves: {moves}</span>
                    <span>Best Score: {bestScore}</span>
                </div>
            </header>
        ); 
    }
  }

  const mapStateToProps = (state) => {
    return {category: state.category, moves:state.moves, finish:state.finish}
  }
  
  export default connect(mapStateToProps)(Header);