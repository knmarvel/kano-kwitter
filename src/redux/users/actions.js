import fetch from 'cross-fetch'

const domain = "https://cjkkwitter.herokuapp.com";
const createActionTypes = actionName => {
  const ACTIONNAME = actionName.toUpperCase();
  return {
    START: ACTIONNAME + ".START",
    SUCCESS: ACTIONNAME + ".SUCCESS",
    FAIL: ACTIONNAME + ".FAIL"
  };
};

const handleJsonResponse = res => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then(result => {
    throw result;
  });
};

const authUrl = domain + "/users"
export const CREATE_USER = createActionTypes("CREATE_USER")

export const createUser = createUserData => dispatch => {
  dispatch({
    type: CREATE_USER.START
  })
  return fetch(authUrl, {
    method: "POST", 
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(createUserData)
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: CREATE_USER.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(dispatch({
        type: CREATE_USER.FAIL,
        payload: err
      }));
    });
};

export const GET_USER = createActionTypes("GET_USER")

export const getUser = getUserData => dispatch => {
  dispatch({
    type: GET_USER.START
  })
  return fetch(`${authUrl}/${getUserData}`, {
    method: "GET", 
    headers: {
      Accept: 'application/json'
    },
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: GET_USER.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(dispatch({
        type: GET_USER.FAIL,
        payload: err
      }));
    });
};

export const PATCH_USER = createActionTypes("PATCH_USER")

export const patchUser = patchUserData => (dispatch, getState) => {
  dispatch({
    type: PATCH_USER.START
  })
  const username = getState().loginUser.result.username;
  const token = getState().loginUser.result.token;

  return fetch(`${authUrl}/${username}`, {
    method: "PATCH", 
    headers: {
      Authorization: "Bearer " + token,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(patchUserData)
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: PATCH_USER.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(dispatch({
        type: PATCH_USER.FAIL,
        payload: err
      }));
    });
};