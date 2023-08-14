import { takeEvery, all, take } from "redux-saga/effects";
import * as ActionCurriculum from '../constant/curriculumConstant';
import * as ActionSection from '../constant/sectionConstant';
import * as ActionSectionDetail from  '../constant/sectionDetailConstant';
import { handleCreateCurriculum, handleDeleteCurriculum, handleEditCurriculum, handleGetCategory, handleGetCurriculum, handleGetOneCurriculum, handleSearchCurriculum } from "./curriculumSaga";
<<<<<<< HEAD
import { handleAddSection, handleDeleteSection, handleGetSection, handleEditSection } from "./sectionSaga";
=======
import { handleAddSection, handleDeleteSection, handleGetSection, handleUpdateSection } from "./sectionSaga";
import { handleAddSectionDetail } from "./sectionDetailSaga";
>>>>>>> 83cd4321747a6df064a464fc4a892b8a3e8af8dc


function* watchAll(){
    yield all([
        takeEvery(ActionCurriculum.GET_DATA_REQ, handleGetCurriculum),
        takeEvery(ActionCurriculum.GET_ONE_DATA_REQ, handleGetOneCurriculum),
        takeEvery(ActionCurriculum.SEARCH_DATA_REQ, handleSearchCurriculum),
        takeEvery(ActionCurriculum.DELETE_DATA_REQ, handleDeleteCurriculum),
        takeEvery(ActionCurriculum.ADD_DATA_REQ, handleCreateCurriculum),
        takeEvery(ActionCurriculum.EDIT_DATA_REQ, handleEditCurriculum),
        takeEvery(ActionCurriculum.GET_CAT_REQ, handleGetCategory),
        // Section
        takeEvery(ActionSection.GET_SECTION_REQUEST, handleGetSection),
        takeEvery(ActionSection.DELETE_SECTION_REQUEST, handleDeleteSection),
        takeEvery(ActionSection.ADD_SECTION_REQUEST, handleAddSection),
<<<<<<< HEAD
        takeEvery(ActionSection.EDIT_SECTION_REQUEST, handleEditSection),
=======
        takeEvery(ActionSection.UPDATE_SECTION_REQUEST, handleUpdateSection),

        // Section Detail
        takeEvery(ActionSectionDetail.ADD_SECTION_DETAIL_REQUEST, handleAddSectionDetail),
>>>>>>> 83cd4321747a6df064a464fc4a892b8a3e8af8dc
    ])
}

export default watchAll