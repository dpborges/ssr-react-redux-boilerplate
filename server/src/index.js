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

// Configure express to use Http Proxy. When express sees any route prefixed with /api  from the browser, 
// it will route it to the proxy. All client side dispatched API actions will be sent through the proxy.
// Note, when request comes from browser,  the browser automatically sends the cookie.
app.use(
  '/api',
  proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {                              // We are using this options header because we're using the google auth api.
      opts.headers['x-forwarded-host'] = 'localhost:3000';    // When we make a request to google api it launches the google login page.
      return opts;                                            // When google login is done,  it needs to know where to redirect the request.
    }                                                         // This is what the x-forwarded-host header option is for. It tells google,
  })                                                          // when done, redirect request back to  localhost:3000. If you view the 
);                                                            // google auth url, you will seee that "destination" set to locahost:3000. 
                                                              // To review, see end of lesson 71 of the udemy server side course.
//Lets express know what is public folder 
app.use(express.static('public'));     


// Use asterisk to delegate application routing to React Router 
app.get('*', (req, res) => {          

  // Create the store before matching route and loading data for the given page.
  // Note, create store is responsible for creating our custom axios instance for server side,
  // therefore we pass in the "req" object so the custom axios instance can pull of the cookie 
  // from the "req" object and attach it to the axios header.
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
    const context = {};                             /* create empty context to pass to our renderer ... */
    const content = renderer(req, store, context);  /* which in turn gets passed to the Static Router then down to the page as staticContext */

    if (context.url) {                             /* Check context for redirect and set response code before sending back content */
      return res.redirect(301, context.url);
    }
    if (context.notFound) {                        /* Check context for notFound and set response code before sending back content */
      res.status(404);
    }

    res.send(content);                            /* Send back rendered content */
  });
});

/* Tell our express app to listen on port 3000 */
app.listen(3000, () => {     
  console.log('Listening on port 3000');
});
