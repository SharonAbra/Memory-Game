import {Link} from 'react-router-dom';
import colors from  './colors.png';
import animals from  './animals.jpg';
const Home = () => {

  return (
        <> 
              <div className="home">
                <h1 className="welcome">Welcome to Memory Game!</h1>
                <h3>Please choose your category:</h3>
                <div className="choose">
                  <Link to="/colors"><img alt="colors" src={colors}></img></Link>
                  <Link to="/animals"><img alt="animals" src={animals}></img></Link>
                </div>
              </div>
        </>
      )
    }
    export default Home;

    