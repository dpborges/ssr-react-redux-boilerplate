import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from '../client/reducers';  /* note reducers "is" combineReducers,  as this is importing from index.js */


// This createStore is called from index.js (server side)

export default req => {


  // Create custom axios instance to be used on server side. 
  // The base url is the fully qualified url for the api.
  const axiosInstance = axios.create({
    baseURL: 'http://react-ssr-api.herokuapp.com',
    headers: { cookie: req.get('cookie') || '' }    // pull off cookie from request 
  });

  // Create a redux store with combineReducers, and return it to the caller.
  // Note: the second parameter is the initial state, which is empty at initial creation.
  // The third parameter defines the thunk middleware with our axiosInstance as the extra argument.
  const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );

  return store;
};
