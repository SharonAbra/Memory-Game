import {Link} from 'react-router-dom';
const Home = () => {

  return (
        <> 
              <div className="home">
              <h1>Welcome to Memory Game!</h1>
              <h3>Please choose your category</h3>
              <Link to="/colors" className="btn btn-primary">Colors</Link>
              <Link to="/animals" className="btn btn-primary">Animals</Link>
              </div>
        </>
      )
    }
    export default Home;