import React from "react";
import { SocketContext, socket } from './contexts/Socket';
// import useLocalStorage from './hooks/useLocalStorage';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Footer from './components/Footer';
import './components/style.css';

const App = () => {
  // const [id, setId] = useLocalStorage('id')
  return (
    <>
        <SocketContext.Provider value={socket}>
          <NavBar/>
          <Home/>
          <Footer/>
        </SocketContext.Provider>
    </>
  );
}

export default App;
