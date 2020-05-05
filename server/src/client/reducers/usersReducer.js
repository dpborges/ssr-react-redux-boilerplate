//*************************************************************************** */
// This is the reducer for fetch users, which simply returns
// the payload. The payload gets merged into the redux store. All reducers
// are combmined and exported from the reducers/index.js  file.
//*************************************************************************** */

import { FETCH_USERS } from '../actions';

// Note, list of users is contained in array, so set initial state to an empty array
export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload.data;
    default:
      return state;
  }
};
