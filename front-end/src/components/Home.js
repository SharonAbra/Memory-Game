import CategoryChoice from './CategoryChoice';
import ModeChoice from './ModeChoice';
import {Route, BrowserRouter, Switch, Link} from 'react-router-dom';

const Home = () => {

return (
      <> 
        <div className="home">
          <h1 className="welcome">Welcome to Memory Game!</h1>
          <div className="start"><Link to="/mode-choice" className="startButton">START PLAYING</Link></div>
          <div><img src="https://i.ibb.co/YkzRhDb/cards.png" alt="cards" width="200px"></img></div>
        </div>
        <BrowserRouter>
      <Switch>
          <Route exact path='/mode-choice'>
              <ModeChoice/>
           </Route>
           <Route exact path='/category-choice'>
              <CategoryChoice/>
           </Route>
        </Switch>
      </BrowserRouter>
      </>
    )
}
  
export default Home;

    