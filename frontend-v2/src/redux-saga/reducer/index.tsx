import {combineReducers} from 'redux'
import TalentReducer from './talentReducer'
import TalentDetailReducer from './talentDetailReducer'
import EmployeeReducer from './employeeReducer'
import JobRoleReducer from './jobroleReducer'
import DepartementReducer from './departmentReducer'

const rootReducer = combineReducers({
    talentState : TalentReducer,
    talentDetailState :TalentDetailReducer,
    employeeState :EmployeeReducer,
    jobRoleState :JobRoleReducer,
    departmentState :DepartementReducer,
})

export default rootReducer