import { combineReducers } from "redux";
import { EmployeeReducer } from "./employeeReducer";
import SalaryReducer from "./salaryReducer";
import DepartmentReducer from "./departmentReducer";

const rootReducer = combineReducers({
    employeeState: EmployeeReducer,
    salaryState: SalaryReducer,
    departmentState: DepartmentReducer,
})

export default rootReducer