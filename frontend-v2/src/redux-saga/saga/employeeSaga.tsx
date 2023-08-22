import { call, put } from 'redux-saga/effects'
import employee from '@/pages/api/employee'
import { 
    AddEmployeeFailed,
    AddEmployeeSuccess,
    GetDeptFailed,
    GetDeptSuccess,
    GetEmployeeFail, 
    GetEmployeeSuccess,
    GetJoroFailed,
    GetJoroSuccess,
    GetOneEmployeeFailed,
    GetOneEmployeeSuccess,
    SearchEmployeeFailed,
    SearchEmployeeSuccess, 
} from '../action/employeeAction'

function* handleGetEmployee(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(employee.GetEmployee, payload)
        yield put(GetEmployeeSuccess(result.data))
    } catch (error) {
        yield put(GetEmployeeFail(error))
    }
}

function* handleSearchEmployee(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(employee.SearchEmployee, payload)
        yield put(SearchEmployeeSuccess(result.data))
    } catch (error) {
        yield put(SearchEmployeeFailed(error))
    }
}

function* handleCreateEmployee(action: any): any {
    const { payload } = action
    try {
        const result = yield call(employee.CreateEmployee, payload)
        yield put(AddEmployeeSuccess(result.data))
    } catch (error) {
        yield put(AddEmployeeFailed(error))

    }
}

function* handleGetOneEmployee(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(employee.findOneEmployee, payload)
        yield put(GetOneEmployeeSuccess(result.data))
    } catch (error) {
        yield put(GetOneEmployeeFailed(error))
    }
}

function* handleGetJobRole(): any {
    try {
        const result = yield call(employee.GetJobRole)
        yield put(GetJoroSuccess([result.data]))
    } catch (error) {
        yield put(GetJoroFailed(error))

    }
}

function* handleGetDepartment(): any {
    try {
        const result = yield call(employee.GetDepartment)
        yield put(GetDeptSuccess(result.data))
    } catch (error) {
        yield put(GetDeptFailed(error))
    }
}

export {
    handleGetEmployee,
    handleSearchEmployee,
    handleCreateEmployee,
    handleGetOneEmployee,
    handleGetDepartment,
    handleGetJobRole
}