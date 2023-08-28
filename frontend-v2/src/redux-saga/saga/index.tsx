import {takeEvery,all} from 'redux-saga/effects'
import * as ActionRegion from '../constant/talentConstant'
import { handleGetTalent, handleGetOneTalent } from './talentSaga'
import { handleAddEmployee, handleGetDepartment, handleGetEmployee, handleGetJobRole, handleGetOneEmployee, handleSearchEmployee } from './employeeSaga'
import * as ActionEmployee from '../constant/employeeConstant'

function* watchAll(){
    yield all([
        takeEvery(ActionRegion.GET_DATA_REQ, handleGetTalent),
        takeEvery(ActionRegion.GET_ONE_DATA_REQ, handleGetOneTalent),
        takeEvery(ActionEmployee.GET_DATA_REQ, handleGetEmployee),
        takeEvery(ActionEmployee.SEARCH_DATA_REQ, handleSearchEmployee),
        takeEvery(ActionEmployee.ADD_DATA_REQ, handleAddEmployee),
        takeEvery(ActionEmployee.GET_ONE_DATA_REQ, handleGetOneEmployee),
        takeEvery(ActionEmployee.GET_JORO_REQ, handleGetJobRole),
        takeEvery(ActionEmployee.GET_DEPT_REQ, handleGetDepartment)
    ])
}

export default watchAll