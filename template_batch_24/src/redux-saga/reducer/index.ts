import { combineReducers } from "redux";
import userReducer from "./userReducer";
import employeeReducer from "./employeeReducer";
import loginReducer from "./loginReducer";
import ChangePasswordReducer from "./changePasswordReducer";
import EmailReducer from "./EmailReducer";
import PhoneReducer from "./phoneReducer";
import AddressReducer from "./addressReducer";
import EducationReducer from "./educationReducer";
import candidateReducer from "../slices/candidateSlices";
import batchReducer from "../slices/batchSlices";
import dashboardReducer from "../slices/dashboardSlices";

const rootReducer = combineReducers({
  batchs: batchReducer,
  dashboards: dashboardReducer,
  candidates: candidateReducer,
  user: userReducer,
  employee: employeeReducer,
  login: loginReducer,
  password: ChangePasswordReducer,
  email: EmailReducer,
  phone: PhoneReducer,
  address: AddressReducer,
  education: EducationReducer,
});

export default rootReducer;
