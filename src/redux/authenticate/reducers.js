import { LOGIN_USER, LOGOUT_USER } from "./actions";
import { withAsyncReducer } from '../highOrderReducer'

const initialLoginState = {
  result: null,
  loading: false,
  error: null
};

const initialState = {
  result: null,
  loading: false,
  error: null
};

const getInitStateFromStorage = (key, initialState) => {
  const storedState = JSON.parse(localStorage.getItem(key));
  if (storedState) {
    const unchangedInitialStateProps =
      Object.keys(storedState).every(
        property => initialState[property] !== undefined
      ) &&
      Object.keys(initialState).every(
        property => storedState[property] !== undefined
      );
    if (unchangedInitialStateProps) {
      return storedState;
    }
  }
  return initialState;
};


const loginUserReducer = (
  state = getInitStateFromStorage("loginUser", initialLoginState),
  action
) => {
  switch (action.type) {
    case LOGOUT_USER.SUCCESS:
      return { ...initialState}
    default:
      return state;
  }
};



const initialLogoutState = {
  result: null,
  loading: false,
  error: null
};

export const logoutUserReducer = (state = initialLogoutState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};


export const loginUser = withAsyncReducer(LOGIN_USER, loginUserReducer)
export const logoutUser = withAsyncReducer(LOGOUT_USER, logoutUserReducer)
