import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage from './pages/AdminsListPage';

// *********************************************************************************************
// Defines array of routes shared by both client side and server side. The array entry specifies:
// a path, whether path is exact, and whatever properties are exported as part of each page 
// component. As of the base framework, each page exports the 'component' property and the 'loadData'
// function property used for that component.  Note that the App component is the top level 
// component and all other components are nested. Since the App component has no path, it will
// be rendered all the time as the root component. It is up If you look at the React Router Configuration,
// you can see how to set up nested routes, using the  Routes array list, as well. 
// As an Aside, I provided some idea below as how to selectively choose not to render a component 
// on the server or only the client. For example, certain static blog pages render only on server
// side and certain rich UI interactions only on client side. These idea(s) have not been tested.
// *********************************************************************************************

export default [
  {                               /* Start of App component definition */
    ...App,                       /* App component does not have a path, hence it will always be rendered on the screen */
    routes: [                     /* Here we define an array of nested routes below the App component */
      {
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        ...AdminsListPage,
        path: '/admins'
      },
      {
        ...UsersListPage,
        path: '/users'
      },
      {
        ...NotFoundPage          /* When you specify a page without a route, it will behave as your default route if route entered is not found */
      }
    ]
  }                              /* End of App component definition */
];

// *********************************************************************************************
// Aside: If for some reason you need to exclude a route(s) (which translate to rendering) from 
// either client or server, I may want to consider adding a property to the routes array, so I 
// can filter on when rendering the routes. According to the Reactor Router Config documentation, 
// it does not preclude you from adding your own properties, as needed.
// *********************************************************************************************