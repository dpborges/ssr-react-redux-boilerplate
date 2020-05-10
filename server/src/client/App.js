import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';
import { fetchCurrentUser } from './actions';

// The App component is the application root component and will be called for every route. 
// If so desired, the application component can introduce an application layout component. 
// The App component will also check user authentication status. 

// Any route(s) matched in the matchRoutes process, will be passed into the app component as the route prop.
// Those routes are the collection of the components we need to render inside the app.
const App = ({ route }) => {
  return (
    <div>
      <Header />
      {renderRoutes(route.routes)}   {/* any child components that match, will be turned into Route components by renderRoutes and rendered as part of the app */}
    </div>
  );
};

// Since App component is called by every route, we dispatch the fetchCurrentUser() function.
// This will update the redux auth state.
export default {
  component: App,
  loadData: ({ dispatch }) => dispatch(fetchCurrentUser())   // note: this has a implied return 
};
