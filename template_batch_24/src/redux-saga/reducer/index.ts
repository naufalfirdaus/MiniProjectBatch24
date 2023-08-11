import { combineReducers } from "redux";
import JobReducer from "./jobReducer";
import ClientReducer from "./clientReducer";
import MasterReducer from "./masterReducer";
import JobApplyReducer from "./jobApplyReducer";
import UserReducer from "./userReducer";

const rootReducer = combineReducers({
  jobState: JobReducer,
  jobApplyState: JobApplyReducer,
  clientState: ClientReducer,
  masterState: MasterReducer,
  userState: UserReducer
});

export default rootReducer;
