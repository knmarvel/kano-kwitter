import { createStore } from "redux"
import { reducers } from "./combineReducers"

export function configureStore(initialState = {
  authenticate: {
    user: null,
    isAuthenticated: false}
}) {
    const store = createStore(
      reducers,
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    return store;
  };
  
export const store = configureStore();