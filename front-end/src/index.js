import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './redux/reducer.js';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
const store = createStore(reducer, applyMiddleware(thunk));


ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
