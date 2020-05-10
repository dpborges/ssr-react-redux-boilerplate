//***************************************************************************************************** */
// Note: each action creator defines an async function that takes three parms: dispatch, getState, and api,
// and returns another function that calls the api and waits for the response. When the api response is
// completed, it dispatches the action with the specified type name and payload. The reducer listening for
// the specified event will update the store with the payload (in this case, the api response). Note: the 
// caller of fetchUsers() action creator will effectively be call calling the function returned by the action 
// creator that is bound to the 3 parms  that were passed to it: dipatch, getState, api).
//***************************************************************************************************** */

export const FETCH_USERS = 'fetch_users';    /* note, this const can be defined in separate file called actionTypes.js */

// The async  function in all action creators, will be called by redux thunk.
// When redux thunk calls this function, it passes in three arguments. The dispatch function, the 
// getState function, and the axiosInstance (using the parameter name of api). The custom axios instance (aka api),  
// allows us to use the same action creator while passing in a different axios instance depending if we are calling
// action creator from the server or from the client.
export const fetchUsers = () => async (dispatch, getState, api) => {

  const res = await api.get('/users');    /* Note, api is nothing more than our custom axiosInstance created in client.js */
                                          /*       but renamed to api. Instead of calling axios.get , we use api.get instead. */
  dispatch({                              /* call dispatch */
    type: FETCH_USERS,
    payload: res
  });
};

export const FETCH_CURRENT_USER = 'fetch_current_user';  /* note, this const can be defined in separate file called actionTypes.js */

// Returns information about current user, if authenticated, otherise it will return undefined.
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get('/current_user');   /* call api (aka axios custom instance) */

  dispatch({                                    /* call dispatch */
    type: FETCH_CURRENT_USER,
    payload: res
  });
};

export const FETCH_ADMINS = 'fetch_admins';  /* note, this const can be defined in separate file called actionTypes.js */

export const fetchAdmins = () => async (dispatch, getState, api) => {
  const res = await api.get('/admins');       /* call api (aka axios custom instance) */

  dispatch({                                  /* call dispatch */
    type: FETCH_ADMINS,
    payload: res
  });
};
