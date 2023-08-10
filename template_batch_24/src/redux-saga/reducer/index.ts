import { combineReducers } from "redux";
import JobReducer from "./jobReducer";
import ClientReducer from "./clientReducer";
import MasterReducer from "./masterReducer";

const rootReducer = combineReducers({
  jobState: JobReducer,
  clientState: ClientReducer,
  masterState: MasterReducer
});

export default rootReducer;
