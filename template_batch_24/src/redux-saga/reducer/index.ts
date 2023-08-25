import { combineReducers } from "redux";
import ApplyReducer from "./applyReducer";
import ProgramReducer from "./programReducer";
import UserReducer from "./userReducer";
import LoginReducer from "./loginReducer";

const rootReducer = combineReducers({
  applyState: ApplyReducer,
  programState: ProgramReducer,
  userState: UserReducer,
  loginState: LoginReducer,
});

export default rootReducer;
