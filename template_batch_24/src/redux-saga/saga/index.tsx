import {takeEvery,all} from 'redux-saga/effects'
import * as ActionRegion from '../constant/regionConstant'
import { handleAddRegion, handleGetRegion } from './regionSaga'
function* watchAll(){
    yield all([
        takeEvery(ActionRegion.GET_DATA_REQ,handleGetRegion),
        takeEvery(ActionRegion.ADD_DATA_REQUEST,handleAddRegion)
    ])
}

export default watchAll