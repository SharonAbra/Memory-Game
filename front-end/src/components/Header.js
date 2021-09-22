import React,{useEffect, useState} from 'react';
import { connect } from 'react-redux';

function Header(props) {

    const { moves, finish, category, computerMatches, userMatches} = props;
    const gameMode = localStorage.getItem("gameMode");
    const [ bestScore, setBestScore ] = useState(
        JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY);

useEffect(() => {
    if (finish === true) {
        const highestScore = Math.min(moves, bestScore);
        setBestScore(highestScore);
        localStorage.setItem("bestScore", highestScore)
    }
}, [finish])

if (gameMode === "Playing Solo") {
    if (bestScore === Infinity) {
        return (
            <header className ="header">
                <h1 className="gameName">MEMORY GAME</h1>
                <h4 className="instructions">Click on two cards to find a match!</h4>
                <div className="information">
                    <span>Category: <b>{category.charAt(0).toUpperCase()+category.slice(1)}</b></span>
                    <span>Moves: <b>{moves}</b></span>
                </div>
            </header>
        );
    } else {
        return (
            <header className ="header">
                <h1 className="gameName">MEMORY GAME</h1>
                <h4 className="instructions">Click on two cards to find a match!</h4>
                <div className="information">
                    <span>Category: <b>{category.charAt(0).toUpperCase()+category.slice(1)}</b></span>
                    <span>Moves: <b>{moves}</b></span>
                    <span>Best Score: <b>{bestScore}</b></span>
                </div>
            </header>
        )
    }

} else if (gameMode === "Playing vs Computer") {
            return (
                <header className ="header">
                    <h1 className="gameName">MEMORY GAME</h1>
                    <h4 className="instructions">Click on two cards to find a match!</h4>
                    <div className="information">
                        <span>Category: <b>{category.charAt(0).toUpperCase()+category.slice(1)}</b></span>
                        <span>Your Matches: <b>{userMatches}</b></span>
                        <span>Computer Matches: <b>{computerMatches}</b></span>
                    </div>
                </header>
            )

        } else {
            return (
                <header className ="header">
                    <h1 className="gameName">MEMORY GAME</h1>
                    <h4 className="instructions">Click on two cards to find a match!</h4>
                    <div className="information">
                        <span>Category: <b>{category.charAt(0).toUpperCase()+category.slice(1)}</b></span>
                        {/* <span>Your Matches: <b>{userMatches}</b></span> */}
                    </div>
                </header>
            )
        }
  }
  
  const mapStateToProps = (state) => {
    return {
        category: state.category,
            moves:state.moves, 
            finish:state.finish, 
            vsComp: state.vsComp, 
            computerMatches: state.computerMatches,
            userMatches: state.userMatches
        }
  }
  
  export default connect(mapStateToProps)(Header);