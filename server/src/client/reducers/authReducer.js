//*************************************************************************** */
// This is the reducer for authenticated user, which simply returns
// the payload or false. The payload gets merged into the redux store. All reducers
// are combmined and exported from the reducers/index.js  file.
//*************************************************************************** */


import { FETCH_CURRENT_USER } from '../actions';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      return action.payload.data || false;
    default:
      return state;
  }
}
