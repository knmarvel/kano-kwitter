import { combineReducers } from "redux"
import { geod } from "./geod"
import { loginUser, logoutUser } from "./authenticate"
import { createUserRedux, getUserRedux, patchUserRedux } from "./users"

  
export const reducers = combineReducers({
    geod,
    createUserRedux,
    getUserRedux,
    loginUser,
    logoutUser,
    patchUserRedux
  });