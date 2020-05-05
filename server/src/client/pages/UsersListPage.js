import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import { Helmet } from 'react-helmet';

class UsersList extends Component {
  componentDidMount() {

    // This will fetch user list and dispatch an action that will update the store.
    // This prop is made available the redux connect function.
    this.props.fetchUsers();

  }
   
  // Helper function that maps thru list users and returns JSX as list of <li> elements
  renderUsers() {
    return this.props.users.map(user => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  // Helper function used to generate JSX tags for Header component
  head() {
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users Loaded`}</title>
        <meta property="og:title" content="Users App" />
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.head()}
        Here's a big list of users:
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

// This function will make the list of users in the redux store, available as a prop
// This function is called by the redux connect function (below). Note; mapStateToProps
// and redux connect function should be made available in event user navigates to UsersListPage
// from another page on the browser. In this case API call will be triggered from browser, not server.
function mapStateToProps(state) {
  return { users: state.users };
}

// This loadData function is made avaiable to Routes.js, which in turn is available
// on server (index.js) via matchedRoutes function.
function loadData(store) {
  return store.dispatch(fetchUsers());
}

// Note, properties exported here are spread out in Routes.js.  Both the loadData
// function property and the component property will be available in the route definition.
// This tells our server (index.js) what load function is associated to this page/component.
// Note that loadData serves as an abstract interface, as it defines interfacce but gets 
// to the specifically for each component/page.
export default {
  loadData,
  component: connect(mapStateToProps, { fetchUsers })(UsersList)
};
