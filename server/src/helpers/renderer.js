import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config'; /* helper function used to convert routes array to a list or React Route components */
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import Routes from '../client/Routes';

// ********************************************************************
// The renderer.js file renders the React component(s) associated with a
// given route, saves it in the 'content' variable, injects the 'content'
// variable into the html template, and returns the html page as a string.
// Caller:  index.js, to render page after matching route
// Input:   req.path
// Process: React rendering
// Output:  String version of HTML Page
// ********************************************************************


export default (req, store, context) => {

  // The renderToString function is using the server side StaticRouter to render the page/component(s) that 
  // are associated to the route specified in req.path and saves output in 'content' variable. 
  // Inputs:  Provider/redux store and Routes array; in addition you need to pass the StaticRouter required 'context' prop.
  //          Context prop is used to handle Redirects, or to communicate information to a page before rendering it.
  //          Note, the Provider is what notifies the application anytime the redux store changes. In the case of the,
  //          server, this only happens one time. After page is loaded on browser, redux behaves as it would normally on browser.. 
  //          that is, re-rendering the app every time redux store changes.
  // Process: When client side bundle and BrowserRouter boot up in the browser, the BrowserRouter will use the url in address bar for routing.
  //          It then matches the route found in Routes array, and renders the page associated with that route.
  // Outputs: Rendered page in the browser mounted at element with id = 'root'.

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  // Helmet's renderStatic() function pulls the header tags that were specified on the page rendered 
  // via renderToString above. The tags can then be injected into HTML template that is returned to the user. 

  const helmet = Helmet.renderStatic();


  // Return the HTML along with header tags and the client bundle. Note that the server side HTML
  // defines a div with and id of "root". Also note that the single function call to meta.title.toString(), 
  // will provide all meta tags specifed on the rendered page.
  // Lastly, add script to pass data from server side to client as INITIAL_STATE. Use serialize to prevent
  // XSS (cross site scripting) security issues. This converts javascript characters like < > and escapes them
  // so they are not executed.

  return `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
};
