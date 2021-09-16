import CategoryChoice from './CategoryChoice';
import ModeChoice from './ModeChoice';
import Start from './Start'
import Game from './Game';
import {Route, BrowserRouter, Switch} from 'react-router-dom';

const Home = () => {

return (
      <> 
        <BrowserRouter>
      <Switch>
          <Route exact path='/' exact component={Start}/>
          <Route exact path='/mode-choice' exact component={ModeChoice}/>
          <Route exact path='/category-choice' exact component={CategoryChoice}/>
          <Route exact path='/game/:category' exact component={Game}/>
        </Switch>
      </BrowserRouter>
      </>
    )
}
  
export default Home;

    