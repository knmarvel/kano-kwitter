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

export const DELETE_USER = createActionTypes("DELETE_USER")

export const deleteUser = () => (dispatch, getState) => {
  dispatch({
    type: DELETE_USER.START
  })
  const username = getState().loginUser.result.username;
  const token = getState().loginUser.result.token;

  return fetch(`${authUrl}/${username}`, {
    method: "DELETE", 
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    },
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: DELETE_USER.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(dispatch({
        type: DELETE_USER.FAIL,
        payload: err
      }));
    });
};

export const GET_ALL_USERS = createActionTypes("GET_ALL_USERS")

export const getAllUsers = (getAllUsersData) => dispatch => {
  dispatch({
    type: GET_ALL_USERS.START
  })
  return fetch(`${authUrl}?limit=${getAllUsersData.limit}&offset=${getAllUsers.offset}`, {
    method: "GET",
    headers: {
      Accept: 'application/json'
    }
  })
  .then(handleJsonResponse)
  .then(result => {
    return dispatch({
      type: GET_ALL_USERS.SUCCESS,
      payload: result
    })
  })
  .catch(err => {
    return Promise.reject(dispatch({
      type: GET_ALL_USERS.FAIL,
      payload: err
    }))
  })
}

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

export const PUTUSERPIC_USER = createActionTypes("PUTUSERPIC_USER")

export const putUserPic = putUserPicData => (dispatch, getState) => {
  dispatch({
    type: PUTUSERPIC_USER.START
  })
  const username = getState().loginUser.result.username;
  const token = getState().loginUser.result.token;

  return fetch(`${authUrl}/${username}/picture`, {
    method: "PUT", 
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    },
    body: new FormData(putUserPicData)
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: PUTUSERPIC_USER.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(dispatch({
        type: PUTUSERPIC_USER.FAIL,
        payload: err
      }));
    });
};