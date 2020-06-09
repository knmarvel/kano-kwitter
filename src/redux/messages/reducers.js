import { GET_MESSAGES } from "./actions";
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

const getMessagesReduxReducer = (
  state = getInitStateFromStorage("getMessages", initialState),
  action
) => {
  switch(action.type){
    case GET_MESSAGES.SUCCESS:
      initialState.result = action.payload
      return { ...initialState };
    default:
      return state;
  }
}

export const getMessagesRedux = withAsyncReducer(GET_MESSAGES, getMessagesReduxReducer)


