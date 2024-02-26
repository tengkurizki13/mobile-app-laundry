import { combineReducers } from "redux";
import requestReducer from "./requestReducer";
import trackReducer from "./trackReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  request: requestReducer,
  track: trackReducer,
  user: userReducer,
});

export default rootReducer;
