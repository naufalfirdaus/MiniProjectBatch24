import {takeEvery,all} from 'redux-saga/effects'
import * as ActionRegion from '../constant/talentConstant'
import { handleGetTalent } from './talentSaga'
import * as ActionEmployee from '../constant/employeeConstant';
import { handleGetDepartment, handleGetEmployee, handleGetOneEmployee, handleGetSalary, handleSearchEmployee } from "./employeeSaga";

function* watchAll(){
    yield all([
        takeEvery(ActionRegion.GET_DATA_REQ,handleGetTalent),
        takeEvery(ActionEmployee.GET_DATA_REQ, handleGetEmployee),
        takeEvery(ActionEmployee.GET_ONE_DATA_REQ, handleGetOneEmployee),
        takeEvery(ActionEmployee.SEARCH_DATA_REQ, handleSearchEmployee),
        // takeEvery(ActionEmployee.DELETE_DATA_REQ, handleDeleteEmployee),
        // takeEvery(ActionEmployee.ADD_DATA_REQ, handleCreateEmployee),
        // takeEvery(ActionEmployee.EDIT_DATA_REQ, handleEditEmployee),
        takeEvery(ActionEmployee.GET_SAL_REQ, handleGetSalary),
        takeEvery(ActionEmployee.GET_DEPT_REQ, handleGetDepartment),
    ])
}

export default watchAll