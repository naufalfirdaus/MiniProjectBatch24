import { combineReducers } from "redux";
import ApplyReducer from "./applyReducer";
import ProgramReducer from "./programReducer";
import UserReducer from "./userReducer";

const rootReducer = combineReducers({
  applyState: ApplyReducer,
  programState: ProgramReducer,
  userState: UserReducer,
});

export default rootReducer;
