import Game from './components/Game';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Footer from './components/Footer';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import './components/style.css';

function App() {
  return (
    <>
    <BrowserRouter>
      <NavBar/>
      <Switch>
          <Route exact path='/'>
              <Home/>
           </Route>
           <Route exact path='/:category'>
              <Game/>
           </Route>
        </Switch>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
