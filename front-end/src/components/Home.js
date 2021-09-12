import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { handleVsComp } from '../redux/actions';
const Home = ({handleVsComp}) => {

return (
      <> 
        <div className="home">
          <h1 className="welcome">Welcome to Memory Game!</h1>
          <h3>Please choose game mode:</h3>
          <button>Play solo</button>
          <button onClick={handleVsComp}>Play vs computer</button>
          <button>Play vs friends</button>
          <h3>Please choose your category:</h3>
            <div className="choose">
              <Link to="/colors">Colors</Link>
              <Link to="/animals">Animals</Link>
            </div>
        </div>
      </>
    )
}

const mapDispatchToProps = (dispatch) => {
  return {handleVsComp: () => dispatch(handleVsComp())}
}
  
export default connect(null, mapDispatchToProps)(Home);

    