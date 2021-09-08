import {Link} from 'react-router-dom';
const Home = () => {

  return (
        <> 
              <div className="home">
              <h1 className="welcome">Welcome to Memory Game!</h1>
              <h3>Please choose your category:</h3>
              <Link to="/colors" className="btn btn-primary categories">Colors</Link><br></br>
              <Link to="/animals" className="btn btn-primary categories">Animals</Link>
              </div>
        </>
      )
    }
    export default Home;

    