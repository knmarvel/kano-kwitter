import { CREATE_USER, GET_USER, PATCH_USER, PUTUSERPIC_USER} from "./actions";
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

const getUserReduxReducer = (
  state = getInitStateFromStorage("getUser", initialState),
  action
) => {
  switch(action.type){
    case GET_USER.SUCCESS:
      initialState.result = action.payload
      return { ...initialState };
    default:
      return state;
  }
}

export const getUserRedux = withAsyncReducer(GET_USER, getUserReduxReducer)


const patchUserReduxReducer = (
  state = getInitStateFromStorage("patchUser", initialState),
  action
) => {
  switch(action.type){
    case PATCH_USER.SUCCESS:
      initialState.result = action.payload
      return { ...initialState };
    default:
      return state;
  }
}

export const patchUserRedux = withAsyncReducer(PATCH_USER, patchUserReduxReducer)


const putUserPicReduxReducer = (
  state = getInitStateFromStorage("putUserPic", initialState),
  action
) => {
  switch(action.type){
    case PUTUSERPIC_USER.SUCCESS:
      initialState.result = action.payload
      return { ...initialState };
    default:
      return state;
  }
}

export const putUserPicRedux = withAsyncReducer(PUTUSERPIC_USER, putUserPicReduxReducer)