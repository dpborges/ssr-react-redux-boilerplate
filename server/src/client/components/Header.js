import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// *******************************************************************
// This is the Header with our navigation buttons. The /users button 
// is a public route. The /admins button is a private route, the
// Login will show when authenticated, and the Logout button when 
// display when not authenticated.
// *******************************************************************

// Component uses auth prop to determine if user is logged in or not
const Header = ({ auth }) => {

  // Define function to render a conditional auth button that will show 
  // Login or Logout depending on whether user is logged in or not. We 
  // use an anchor tag instead of a Link tag because we want the browser
  // to generate the fully qualified url. When the fully qualified url
  // is clicked, for example, http://localhost:8080/api/logout, it hits 
  // the server, the server will see tha path starts with /api and route
  // the request through proxy. Since we are using gogle auth, the route 
  // will redirect us google authentication.
  const authButton = auth ? (
    <a href="/api/logout">Logout</a>
  ) : (
    <a href="/api/auth/google">Login</a>
  );

  // Link tags are used since we are navigating within our application
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          React SSR
        </Link>
        <ul className="right">
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/admins">Admins</Link>
          </li>
          <li>{authButton}</li>
        </ul>
      </div>
    </nav>
  );
};

// Uses connect to pass the auth state to the component as a prop
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
