import { combineReducers } from "redux"
import { geod } from "./geod"
import { authenticate } from "./authenticate"

  
export const reducers = combineReducers({
    geod,
    authenticate
  });