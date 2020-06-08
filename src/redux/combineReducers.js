import { combineReducers } from "redux"
import { geod } from "./geod"
import { loginUser, logoutUser } from "./authenticate"
import { createUserRedux } from "./users"

  
export const reducers = combineReducers({
    geod,
    createUserRedux,
    loginUser,
    logoutUser
  });