import { combineReducers } from "redux";
import JobReducer from "./jobReducer";
import ClientReducer from "./clientReducer";
import MasterReducer from "./masterReducer";
import JobApplyReducer from "./jobApplyReducer";
import userReducer from "./userReducer";
import employeeReducer from "./employeeReducer";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
  jobState: JobReducer,
  jobApplyState: JobApplyReducer,
  clientState: ClientReducer,
  masterState: MasterReducer,
  userState: userReducer,
  employee: employeeReducer,
  login: loginReducer,
});

export default rootReducer;
