import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// RequireAuth takes as a parameter a ChildComponent. This ChildComponent can be any of your application pages.
// It will check if user is authenticated. If auth is false it means user is not authenticate, so it will redirect user to home page.
// If auth is null, it means we have not fetched user's auth state, so render a loading message or spinner.
// When auth state is not null or true, then we will default to rendering the page and pass along all the props that were
// passed to HOC from the actual page component.
// Note that the {...props} passed in with ChildComponent, are the props that were passed to the requireAuth HOC from the connect function.
// ...those in turn get passed on to the ChildComponent
// Because we are using a Static Router on the server side, the <Redirect> below does not do anything because StaticRouter does not support
// Redirect. But what it does do is set these 3 properties in the context: action, location, and url. So to get Redirect to work on server 
// side, we must inspect the context. If we see url show up in the context, it means a Redirect was attempted on server side. If you look
// at code in index.js, you'll see how to check and to handle the redirect on the server side.

export default ChildComponent => {
  class RequireAuth extends Component {
    render() {
      switch (this.props.auth) {
        case false:
          return <Redirect to="/" />;
        case null:
          return <div>Loading...</div>;
        default:
          return <ChildComponent {...this.props} />;
      }
    }
  }

  // Use redux connect and mapStateToProps, to make our auth redux state available as a prop to this component.
  function mapStateToProps({ auth }) {
    return { auth };
  }

  return connect(mapStateToProps)(RequireAuth);
};
