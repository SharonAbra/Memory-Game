import Game from './components/Game';
import NavBar from './components/NavBar';
import Home from './components/Home';
import {Route, BrowserRouter, Switch} from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <NavBar/>
      <Switch>
          <Route exact path='/'>
              <Home/>
           </Route>
           <Route exact path='/game'>
              <Game/>
           </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
