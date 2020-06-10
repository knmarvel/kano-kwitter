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

const messageUrl = domain + "/messages"

export const GET_MESSAGES = createActionTypes("GET_MESSAGES")

export const getMessages = getMessagesData => dispatch => {
  dispatch({
    type: GET_MESSAGES.START
  })
  let getMessagesUrl
  if(getMessagesData.username != 'all'){
    getMessagesUrl = `${messageUrl}?limit=${getMessagesData.limit}&offset=${getMessagesData.offset}&username=${getMessagesData.username}`
  }
  else {
    getMessagesUrl = `${messageUrl}?limit=${getMessagesData.limit}&offset=${getMessagesData.offset}`
  }
  return fetch(getMessagesUrl, {
    method: "GET", 
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: GET_MESSAGES.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(dispatch({
        type: GET_MESSAGES.FAIL,
        payload: err
      }));
    });
};
