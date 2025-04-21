import { combineReducers } from "redux";
import staffAuthReducer from "./staffAuthReducer";

const allReducers = combineReducers({
  staffAuth: staffAuthReducer,
});

export default allReducers;
