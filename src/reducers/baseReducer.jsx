import { combineReducers } from "redux";
import resourceReducer from "../reducers/resourceReducer";

export default combineReducers({
  resReducer: resourceReducer
});
