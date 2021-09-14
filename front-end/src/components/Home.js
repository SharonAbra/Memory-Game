import CategoryChoice from './CategoryChoice';
import ModeChoice from './ModeChoice';
import Start from './Start'
import {Route, BrowserRouter, Switch} from 'react-router-dom';

const Home = () => {

return (
      <> 
        <div className="home">
          <h1 className="welcome">Welcome to Memory Game!</h1>
        </div>
        <BrowserRouter>
      <Switch>
          <Route exact path='/' exact component={Start}/>
          <Route exact path='/mode-choice' exact component={ModeChoice}/>
           <Route exact path='/category-choice' exact component={CategoryChoice}/>
        </Switch>
      </BrowserRouter>
      </>
    )
}
  
export default Home;

    