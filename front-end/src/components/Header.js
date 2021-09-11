import { connect } from 'react-redux';

function Header(props) {
    const { moves, bestScore, category } = props
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

  const mapStateToProps = (state) => {
    return {category: state.category, moves:state.moves, bestScore:state.bestScore}
  }
  
  export default connect(mapStateToProps)(Header);