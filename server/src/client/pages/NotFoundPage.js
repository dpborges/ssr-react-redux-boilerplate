import React from 'react';

// Page used when route not found in our Routes.js file. Adding this page to Routes.js will display the text below if route is not found.
// The other thing we want to do, is attach a 404 status code to the response. For this, we take the help of the static context.
// When a page is called by the StaticRouter (from renderer.js) it will be passed an empty staticContext. The page can then set a property 
// on the static context, such as notFound, so that you check it in index.js before sending back response, and set appropriate response code.
// Note the Router passes the context to the page  as staticContext.

const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return <h1>Ooops, route not found.</h1>;
};

export default {
  component: NotFoundPage
};


