import CategoryChoice from './CategoryChoice';
import ModeChoice from './ModeChoice';
import Start from './Start'
import Game from './Game';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import MultiRoom from './MultiRoom';

const Home = () => {

return (
      <> 
        <BrowserRouter>
      <Switch>
          <Route exact path='/' component={Start}/>
          <Route exact path='/mode-choice' component={ModeChoice}/>
          <Route exact path='/category-choice' component={CategoryChoice}/>
          <Route exact path='/game/:category' component={Game}/>
          {/* <Route exact path = '/multi-player/:category' component={MultiRoom}/> */}
        </Switch>
      </BrowserRouter>
      </>
    )
}

export default Home;

    