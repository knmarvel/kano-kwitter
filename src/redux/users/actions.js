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
