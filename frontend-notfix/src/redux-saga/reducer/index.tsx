import { combineReducers } from "redux";
import { EmployeeReducer, getOneEmployeeReducer } from "./employeeReducer";
import SalaryReducer from "./salaryReducer";
import DepartmentReducer from "./departmentReducer";

const rootReducer = combineReducers({
    employeeState: EmployeeReducer,
    getOneEmployeeState: getOneEmployeeReducer,
    salaryState: SalaryReducer,
    departmentState: DepartmentReducer,
})

export default rootReducer