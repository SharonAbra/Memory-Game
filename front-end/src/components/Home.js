import {Route, BrowserRouter, Switch} from 'react-router-dom';
import CategoryChoice from './CategoryChoice';
import ModeChoice from './ModeChoice';
import Start from './Start'
import Game from './Game';

export default function Home() {
return (
      <> 
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Start}/>
          <Route exact path='/mode-choice' component={ModeChoice}/>
          <Route exact path='/category-choice' component={CategoryChoice}/>
          <Route exact path='/game/:category' component={Game}/>
           {/* <Route path='/game/:category'>
            {sessionStorage.getItem("gameMode") === null ? <Redirect to= '/'/> : <Game/>}
          </Route> */}
        </Switch>
      </BrowserRouter>
      </>
    )
}
    