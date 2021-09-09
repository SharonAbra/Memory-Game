function Header({ moves, bestScore, category}) {
    return (
        <header className = "header">
            <h1 className="gameName">MEMORY GAME</h1>
            <h4 className="instructions">Click on two cards to find a match!</h4>
            <div className="information">
                <span>Category: <i>{category}</i></span>
                <span>Moves: {moves}</span>
                <span>Time Elapsed: {}</span>
                <span>Best Score: {bestScore}</span>
            </div>
        </header>
    );
  }
  
  export default Header;