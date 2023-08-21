import * as ActionEmployee from '../constant/employeeConstant'

// Get
export const GetEmployeeReq = (payload : any) => ({
    type: ActionEmployee.GET_DATA_REQ,
    payload
})

export const GetEmployeeSuccess = (payload : any) => ({
    type: ActionEmployee.GET_DATA_SUCCESS,
    payload
})

export const GetEmployeeFailed = (payload : any) => ({
    type: ActionEmployee.GET_DATA_FAILED,
    payload
})

// Search
export const SearchEmployeeReq = (payload : any) => ({
    type: ActionEmployee.SEARCH_DATA_REQ,
    payload
})

export const SearchEmployeeSuccess = (payload : any) => ({
    type: ActionEmployee.SEARCH_DATA_SUCCESS,
    payload
})

export const SearchEmployeeFailed = (payload : any) => ({
    type: ActionEmployee.SEARCH_DATA_FAILED,
    payload
})

// Get One
export const GetOneEmployeeReq = (payload : any) => ({
    type: ActionEmployee.GET_ONE_DATA_REQ,
    payload
})

export const GetOneEmployeeSuccess = (payload : any) => ({
    type: ActionEmployee.GET_ONE_DATA_SUCCESS,
    payload
})

export const GetOneEmployeeFailed = (payload : any) => ({
    type: ActionEmployee.GET_ONE_DATA_FAILED,
    payload
})

// Get Salary
export const GetSalReq = (payload : any) => ({
    type: ActionEmployee.GET_SAL_REQ,
    payload
})

export const GetSalSuccess = (payload : any) => ({
    type: ActionEmployee.GET_SAL_SUCCESS,
    payload
})

export const GetSalFailed = (payload : any) => ({
    type: ActionEmployee.GET_SAL_FAILED,
    payload
})

// Get Department
export const GetDeptReq = (payload : any) => ({
    type: ActionEmployee.GET_DEPT_REQ,
    payload
})

export const GetDeptSuccess = (payload : any) => ({
    type: ActionEmployee.GET_DEPT_SUCCESS,
    payload
})

export const GetDeptFailed = (payload : any) => ({
    type: ActionEmployee.GET_DEPT_FAILED,
    payload
})

// Add
export const AddEmployeeReq = (payload : any) => ({
    type: ActionEmployee.ADD_DATA_REQ,
    payload
})

export const AddEmployeeSuccess = (payload : any) => ({
    type: ActionEmployee.ADD_DATA_SUCCESS,
    payload
})

export const AddEmployeeFailed = (payload : any) => ({
    type: ActionEmployee.ADD_DATA_FAILED,
    payload
})

// Edit
export const EditEmployeeReq = (payload : any) => ({
    type: ActionEmployee.EDIT_DATA_REQ,
    payload
})

export const EditEmployeeSuccess = (payload : any) => ({
    type: ActionEmployee.EDIT_DATA_SUCCESS,
    payload
})

export const EditEmployeeFailed = (payload : any) => ({
    type: ActionEmployee.EDIT_DATA_FAILED,
    payload
})

// Delete
export const DeleteEmployeeReq = (payload : any) => ({
    type: ActionEmployee.DELETE_DATA_REQ,
    payload
})

export const DeleteEmployeeSuccess = (payload : any) => ({
    type: ActionEmployee.DELETE_DATA_SUCCESS,
    payload
})

export const DeleteEmployeeFailed = (payload : any) => ({
    type: ActionEmployee.DELETE_DATA_FAILED,
    payload
})

// Reset
export const ResetEmployeeState = () => ({
    type: 'RESET_EMPLOYEE_STATE'
})