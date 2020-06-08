import { createStore, applyMiddleware, compose } from "redux"
import { createBrowserHistory } from "history";
import { reducers } from "./combineReducers"
import { routerMiddleware } from "connected-react-router";
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from "redux-devtools-extension";

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

const loggerMiddleware = createLogger()

const initialState = {
}

export function configureStore() {
    const store = createStore(
      reducers,
      initialState,
      composeWithDevTools(
        applyMiddleware(
          thunkMiddleware,
          loggerMiddleware,
          routerMiddleware(history),
      ),
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      ),
    )
    console.log(store)
    store.subscribe(() => {
      localStorage.setItem("login", JSON.stringify(store.getState().loginUser));
    });
    return store;
  };
  
export const store = configureStore();