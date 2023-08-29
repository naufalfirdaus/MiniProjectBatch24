import { combineReducers } from "redux";
import userReducer from "./userReducer";
import employeeReducer from "./employeeReducer";
import loginReducer from "./loginReducer";
import ChangePasswordReducer from "./changePasswordReducer";
import EmailReducer from "./EmailReducer";
import PhoneReducer from "./phoneReducer";
import AddressReducer from "./addressReducer";
import EducationReducer from "./educationReducer";
import SkillReducer from "./skillReducer";
import ExperienceReducer from "./experienceReducer";
import editProfileReducer from "./editProfileReducer";

const rootReducer = combineReducers({
  user: userReducer,
  employee: employeeReducer,
  login: loginReducer,
  password: ChangePasswordReducer,
  email: EmailReducer,
  phone: PhoneReducer,
  address: AddressReducer,
  education: EducationReducer,
  skill: SkillReducer,
  experience: ExperienceReducer,
  editProfile: editProfileReducer,
});

export default rootReducer;
