import { combineReducers } from "redux";
import auth from "./auth.reducer";
import message from "./message.reducer";
import classReducer from './class.reducer';
import register from './register.reducer';
export default combineReducers({
  auth,
  message,
  class: classReducer,
  register
});