import { takeEvery, all } from "redux-saga/effects";
import * as ActionCurriculum from '../constant/curriculumConstant';
import { handleDeleteCurriculum, handleGetCurriculum, handleSearchCurriculum } from "./curriculumSaga";


function* watchAll(){
    yield all([
        takeEvery(ActionCurriculum.GET_DATA_REQ, handleGetCurriculum),
        takeEvery(ActionCurriculum.SEARCH_DATA_REQ, handleSearchCurriculum),
        takeEvery(ActionCurriculum.DELETE_DATA_REQ, handleDeleteCurriculum),
    ])
}

export default watchAll