import React,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

export default function Header() {

    const category = useSelector(state => state.category);
    const moves = useSelector(state => state.moves);
    const finish = useSelector(state=> state.finish);
    const computerMatches = useSelector(state => state.computerMatches);
    const userMatches = useSelector( state => state.userMatches);
    const gameMode = sessionStorage.getItem("gameMode");
    const [ bestScore, setBestScore ] = useState(
        JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY);

    // set new best score to local storage in solo mode
    useEffect(() => {
        if (finish === true && gameMode==="Playing Solo") {
            const highestScore = Math.min(moves, bestScore);
            setBestScore(highestScore);
            localStorage.setItem("bestScore", highestScore)
        }
    }, [finish])

    // in solo mode
    if (gameMode === "Playing Solo") {
        // in case there is no best score yet (first game or storage deleted) - 
        // do not render best score
        if (bestScore === Infinity) {
            return (
                <header className ="header">
                    <h1 className="gameName">MEMORY GAME</h1>
                    <h4 className="instructions">Click on two cards to find a match!</h4>
                    <div className="information">
                        <span>Game Mode:<br></br><b>{gameMode}</b></span>
                        <span>Category:<br></br><b>{category.charAt(0).toUpperCase()+category.slice(1)}</b></span>
                        <span>Moves:<br></br><b>{moves}</b></span>
                    </div>
                </header>
            );
        } else {
            // render with best score
            return (
                <header className ="header">
                    <h1 className="gameName">MEMORY GAME</h1>
                    <h4 className="instructions">Click on two cards to find a match!</h4>
                    <div className="information">
                        <span>Game Mode:<br></br><b>{gameMode}</b></span>
                        <span>Category:<br></br><b>{category.charAt(0).toUpperCase()+category.slice(1)}</b></span>
                        <span>Moves:<br></br><b>{moves}</b></span>
                        <span>Best Score:<br></br><b>{bestScore}</b></span>
                    </div>
                </header>
            )
        }
        
    // in vs computer mode
    } else if (gameMode === "Playing vs Computer") {
                return (
                    <header className ="header">
                        <h1 className="gameName">MEMORY GAME</h1>
                        <h4 className="instructions">Click on two cards to find a match!</h4>
                        <div className="information">
                            <span>Game Mode:<br></br><b>{gameMode}</b></span>
                            <span>Category:<br></br><b>{category.charAt(0).toUpperCase()+category.slice(1)}</b></span>
                            <span>Your Matches:<br></br><b>{userMatches}</b></span>
                            <span>Computer Matches:<br></br><b>{computerMatches}</b></span>
                        </div>
                    </header>
                )
            // in multiplayer mode
            } else {
                return (
                    <header className ="header">
                        <h1 className="gameName">MEMORY GAME</h1>
                        <h4 className="instructions">Click on two cards to find a match!</h4>
                        <div className="information">
                            <span>Game Mode:<br></br><b>{gameMode}</b></span>
                            <span>Category:<br></br><b>{category.charAt(0).toUpperCase()+category.slice(1)}</b></span>
                        </div>
                    </header>
                )
            }
  }