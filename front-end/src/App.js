import Game from './components/Game';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Footer from './components/Footer';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import './components/style.css';

function App() {
  return (
    <>
      <NavBar/>
      <Home/>
      <Footer/>
    </>
  );
}

export default App;
