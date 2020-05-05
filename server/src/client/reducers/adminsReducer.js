//*************************************************************************** */
// This is the reducer for list of admins, which simply returns
// the payload. The payload gets merged into the redux store. All reducers
// are combmined and exported from the reducers/index.js  file.
//*************************************************************************** */

import { FETCH_ADMINS } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ADMINS:
      return action.payload.data;
    default:
      return state;
  }
};
