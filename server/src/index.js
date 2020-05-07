import 'babel-polyfill';          /* needed to be able to user async await */
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

// ************************************************************************
// This is our express Server. This file serves as the root file for our
// application on the server side. The matchRoutes function, from 
// react-router-config,returns a list of matched Routes, from the Routes 
// array, that match the req.path provided.
// ************************************************************************

const app = express();    /* create express app */

// Configure express to use Http Proxy and to proxy /api requests to our api server.
// All client side dispatched API actions should be sent through the proxy.
app.use(
  '/api',
  proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:3000';
      return opts;
    }
  })
);

//Lets express know what is public folder 
app.use(express.static('public'));     


// Use asterisk to delegate application routing to React Router 
app.get('*', (req, res) => {          

  // Create the store before matching route and loading data for the given page.
  const store = createStore(req);

  // This block of code uses matchRoutes to return an array of promises (for components) associated 
  // to the req.path and ensures we load the necessary data (via loadData functions) and populate 
  // redux store with result set(s) before calling our renderer function
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null;   // exec loadData for given component; return null for routes with no loadData function */
    })                                                        // Note the store parm is used by loadData function to be able to call store.dispatch
    .map(promise => {                    /* map each promise to another wrapper promise that will force each promise to resolve regardless of whether it */
      if (promise) {                     /* was resolved or rejected. This ensures completion of all promises vs the default  all or nothing approach */                                       
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }
    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

/* Tell our express app to listen on port 3000 */
app.listen(3000, () => {     
  console.log('Listening on port 3000');
});
