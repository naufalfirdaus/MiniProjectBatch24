import {combineReducers} from 'redux'
import TalentReducer from './talentReducer'
import { EmployeeReducer, getOneEmployeeReducer } from "./employeeReducer";
import SalaryReducer from "./salaryReducer";
import DepartmentReducer from "./departmentReducer";

const rootReducer = combineReducers({
    talentState : TalentReducer,
    employeeState: EmployeeReducer,
    getOneEmployeeState: getOneEmployeeReducer,
    salaryState: SalaryReducer,
    departmentState: DepartmentReducer,
})

export default rootReducer