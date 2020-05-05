import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';

// ***************************************************
// Combines all reducers into the redux store
// Note: this function is called by redux
// ***************************************************

export default combineReducers({
    users:  usersReducer,
    auth:   authReducer,
    admins: adminsReducer
});
