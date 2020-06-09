import { combineReducers } from "redux"
import { geod } from "./geod"
import { loginUser, logoutUser } from "./authenticate"
import { createUserRedux, deleteUserRedux, getUserRedux, patchUserRedux, putUserPicRedux } from "./users"
import { getMessagesRedux } from "./messages"
  
export const reducers = combineReducers({
    geod,
    createUserRedux,
    deleteUserRedux,
    getMessagesRedux,
    getUserRedux,
    loginUser,
    logoutUser,
    patchUserRedux,
    putUserPicRedux
  });