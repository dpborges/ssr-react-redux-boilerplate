//***************************************************************************************************** */
// Note: each action creator defines an async function that takes three parms: dispatch, getState, and api,
// and returns another function that calls the api and waits for the response. When the api response is
// completed, it dispatches the action with the specified type name and payload. The reducer listening for
// the specified event will update the store with the payload (in this case, the api response). Note: the 
// caller of fetchUsers() action creator will effectively be call calling the function returned by the action 
// creator that is bound to the 3 parms  that were passed to it: dipatch, getState, api).
//***************************************************************************************************** */

export const FETCH_USERS = 'fetch_users';    /* note, this const can be defined in separate file called actionTypes.js */

export const fetchUsers = () => async (dispatch, getState, api) => {

  const res = await api.get('/users');    /* call api */
  
  dispatch({                              /* call dispatch */
    type: FETCH_USERS,
    payload: res
  });
};

export const FETCH_CURRENT_USER = 'fetch_current_user';  /* note, this const can be defined in separate file called actionTypes.js */

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get('/current_user');   /* call api */

  dispatch({                                    /* call dispatch */
    type: FETCH_CURRENT_USER,
    payload: res
  });
};

export const FETCH_ADMINS = 'fetch_admins';  /* note, this const can be defined in separate file called actionTypes.js */

export const fetchAdmins = () => async (dispatch, getState, api) => {
  const res = await api.get('/admins');       /* call api */

  dispatch({                                  /* call dispatch */
    type: FETCH_ADMINS,
    payload: res
  });
};
