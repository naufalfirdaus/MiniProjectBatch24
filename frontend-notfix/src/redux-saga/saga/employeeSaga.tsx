import { call, put } from "redux-saga/effects";
import { AddEmployeeFailed, AddEmployeeSuccess, DeleteEmployeeSuccess, EditEmployeeFailed, EditEmployeeSuccess, GetDeptFailed, GetDeptSuccess, GetEmployeeFailed, GetEmployeeSuccess, GetOneEmployeeFailed, GetOneEmployeeSuccess, GetSalFailed, GetSalSuccess, SearchEmployeeFailed, SearchEmployeeSuccess } from "../action/employeeAction";
import employee from "@/pages/api/employee";

function* handleGetEmployee(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(employee.getEmployee, payload)
        yield put(GetEmployeeSuccess(result.data))
    } catch (error) {
        yield put(GetEmployeeFailed(error))
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

function* handleSearchEmployee(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(employee.searchEmployee, payload)
        yield put(SearchEmployeeSuccess(result.data))
    } catch (error) {
        yield put(SearchEmployeeFailed(error))
    }
}

// function* handleDeleteEmployee(action: any): any {
//     const { payload } = action;
//     try {
//         const result = yield call(employee.deleteEmployee, payload)
//         yield put(DeleteEmployeeSuccess(result))
//     } catch (error) {
//         yield put(SearchEmployeeFailed(error))
//     }
// }

// function* handleCreateEmployee(action: any): any {
//     const { payload } = action
//     try {
//         const result = yield call(employee.createEmployee, payload)
//         yield put(AddEmployeeSuccess(result.data))
//     } catch (error) {
//         yield put(AddEmployeeFailed(error))

//     }
// }

// function* handleEditEmployee(action: any): any {
//     const { payload } = action
//     try {
//         const result = yield call(employee.updateEmployee, payload)
//         yield put(EditEmployeeSuccess([result.data]))
//     } catch (error) {
//         yield put(EditEmployeeFailed(error))

//     }
// }

function* handleGetSalary(action: any): any {
    const { payload } = action
    try {
        const result = yield call(employee.getSalary, payload)
        yield put(GetSalSuccess(result.data))
    } catch (error) {
        yield put(GetSalFailed(error))
    }
}

function* handleGetDepartment(action: any): any {
    const { payload } = action
    try {
        const result = yield call(employee.getDepartmentHistory, payload)
        yield put(GetDeptSuccess(result.data))
    } catch (error) {
        yield put(GetDeptFailed(error))
    }
}

export {
    handleGetEmployee,
    handleGetOneEmployee,
    handleSearchEmployee,
    // handleDeleteEmployee,
    // handleCreateEmployee,
    // handleEditEmployee,
    handleGetSalary,
    handleGetDepartment,
}