import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Start from './Start'
import ModeChoice from './ModeChoice';
import CategoryChoice from './CategoryChoice';
import Game from './Game';

export default function Home() {
return (
      <> 
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Start}/>
          <Route exact path='/mode-choice' component={ModeChoice}/>
          <Route exact path='/category-choice' component={CategoryChoice}/>
          <Route exact path='/game/:urlCategory' component={Game}/>
        </Switch>
      </BrowserRouter>
      </>
    )
}
    