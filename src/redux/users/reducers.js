import { CREATE_USER } from "./actions";
import { withAsyncReducer } from '../highOrderReducer'


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

const createUserReduxReducer = (
  state = getInitStateFromStorage("createUser", initialState),
  action
) => {
  switch(action.type){
    case CREATE_USER.SUCCESS:
      initialState.result = action.payload
      return { ...initialState };
    default:
      return state;
  }
}

export const createUserRedux = withAsyncReducer(CREATE_USER, createUserReduxReducer)