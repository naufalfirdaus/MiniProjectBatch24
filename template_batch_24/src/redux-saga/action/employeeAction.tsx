import * as userAction from '../constant/userConstant';

export const employeeSignupReq = (payload:any) =>({
    type : userAction.EMPLOYEE_SIGNUP_REQ,
    payload
})
export const employeeSignupSuccess = (payload:any) =>({
    type : userAction.EMPLOYEE_SIGNUP_SUCCESS,
    payload
})
export const employeeSignupFail = (payload:any) =>({
    type : userAction.EMPLOYEE_SIGNUP_FAIL,
    payload
})
export const getDataAllEmployeeReq = () =>({
    type : userAction.GET_ALL_EMPLOYEE_REQ,
})
export const getDataAllEmployeeSuccess = (payload:any) =>({
    type : userAction.GET_ALL_EMPLOYEE_SUCCESS,
    payload
})
export const getDataAllEmployeeFail = (payload:any) =>({
    type : userAction.GET_ALL_EMPLOYEE_FAIL,
    payload
})