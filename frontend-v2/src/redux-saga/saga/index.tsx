import {takeEvery,all} from 'redux-saga/effects'
import * as ActionRegion from '../constant/talentConstant'
import { handleGetTalent, handleGetOneTalent } from './talentSaga'
import { handleGetEmployee } from './employeeSaga'
import * as ActionEmployee from '../constant/employeeConstant'

function* watchAll(){
    yield all([
        takeEvery(ActionRegion.GET_DATA_REQ, handleGetTalent),
        takeEvery(ActionRegion.GET_ONE_DATA_REQ, handleGetOneTalent),
        takeEvery(ActionEmployee.GET_DATA_REQ, handleGetEmployee),
    ])
}

export default watchAll