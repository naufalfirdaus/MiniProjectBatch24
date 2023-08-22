import * as ActionEmployee from '../constant/employeeConstant'

// Get All Employee
export const GetEmployeeReq = (payload : any) =>({
    type:ActionEmployee.GET_DATA_REQ,
    payload
})

export const GetEmployeeSuccess = (payload : any) => ({
    type: ActionEmployee.GET_DATA_SUCCESS,
    payload
})

export const GetEmployeeFail = (payload: any) => ({
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

// Get Departement
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

// Get JobRole
export const GetJoroReq = (payload : any) => ({
    type: ActionEmployee.GET_JORO_REQ,
    payload
})

export const GetJoroSuccess = (payload : any) => ({
    type: ActionEmployee.GET_JORO_SUCCESS,
    payload
})

export const GetJoroFailed = (payload : any) => ({
    type: ActionEmployee.GET_JORO_FAILED,
    payload
})