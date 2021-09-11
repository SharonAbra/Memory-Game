import {Link} from 'react-router-dom';
const Home = () => {

  return (
        <> 
              <div className="home">
                <h1 className="welcome">Welcome to Memory Game!</h1>
                <h3>Please choose your category:</h3>
                <div className="choose">
                  <Link to="/colors">Colors</Link>
                  <Link to="/animals">Animals</Link>
                </div>
              </div>
        </>
      )
    }
    export default Home;

    