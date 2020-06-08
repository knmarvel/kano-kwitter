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

const authUrl = domain + "/auth"

export const LOGIN_USER = createActionTypes("LOGIN_USER");
export const LOGOUT_USER = createActionTypes("LOGOUT_USER");


export const login = loginUserData => dispatch => {
  dispatch({
    type: LOGIN_USER.START
  })

  return fetch(authUrl + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(loginUserData)
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: LOGIN_USER.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(dispatch({ 
        type: LOGIN_USER.FAIL,
        payload: err }));
    });
};


  
export const logout = () => (dispatch, getState) => {
  dispatch({
    type: LOGOUT_USER.START
  });

  const token = getState().loginUser.result.token;

  return fetch(authUrl + "/logout", {
    method: "GET",
    headers: { Authorization: "Bearer " + token,
    "Content-Type": "application/json",
    Accept: "application/json" }
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: LOGOUT_USER.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(
        dispatch({ type: LOGOUT_USER.FAIL, payload: err.message })
      );
    });
};
