// Entry point for the client side application
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import Routes from './Routes';
import reducers from './reducers';

const axiosInstance = axios.create({
  baseURL: '/api'
});


// Create a redux store with combineReducers. The second parameter is use to define initial state. 
// In this case, it is whatever is in window.INITIAL_STATE, which is the data that came from server side.
const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

// Use hydrate and client side BrowserRouter to render the page/component(s)
// Inputs:  Provider/redux store and Routes array.
//          Note, the Provider is what notifies the application anytime the redux store changes.
// Process: When client side bundle and BrowserRouter boot up in the browser, the BrowserRouter will use the url in address bar for routing.
//          It then matches the route found in Routes array, and renders the page associated with that route.
//          Note: Client side must mount on the same div, with id='root', as the server side page in order to produce the isomorphic behavior. 
//          If rendered page on client does not match exactly as server side, you'll get an html mismatch error.
// Outputs: Rendered page in the browser mounted at element with id = 'root'.

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
