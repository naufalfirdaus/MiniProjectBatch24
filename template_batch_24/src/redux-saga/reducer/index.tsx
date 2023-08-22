import { combineReducers } from "redux";
import userReducer from "./userReducer";
import employeeReducer from "./employeeReducer";
import loginReducer from "./loginReducer";
import ChangePasswordReducer from "./changePasswordReducer";
import EmailReducer from "./EmailReducer";
import PhoneReducer from "./phoneReducer";

const rootReducer = combineReducers({
  user: userReducer,
  employee: employeeReducer,
  login: loginReducer,
  password: ChangePasswordReducer,
  email: EmailReducer,
  phone: PhoneReducer,
});

export default rootReducer;
