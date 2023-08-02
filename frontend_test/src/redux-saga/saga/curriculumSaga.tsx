import { call, put } from "redux-saga/effects";
import { AddCurriculumFailed, AddCurriculumSuccess, DeleteCurriculumSuccess, GetCurriculumFailed, GetCurriculumSuccess, SearchCurriculumFailed, SearchCurriculumSuccess } from "../action/curriculumAction";
import curriculum from "@/api/curriculum";

function* handleGetCurriculum(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(curriculum.getCurriculum, payload)
        yield put(GetCurriculumSuccess(result.data))
    } catch (error) {
        yield put(GetCurriculumFailed(error))
    }
}

function* handleSearchCurriculum(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(curriculum.searchCurriculum, payload)
        yield put(SearchCurriculumSuccess(result.data))
    } catch (error) {
        yield put(SearchCurriculumFailed(error))
    }
}

function* handleDeleteCurriculum(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(curriculum.deleteCurriculum, payload)
        yield put(DeleteCurriculumSuccess(result))
    } catch (error) {
        yield put(SearchCurriculumFailed(error))
    }
}

export {
    handleGetCurriculum,
    handleSearchCurriculum,
    handleDeleteCurriculum,
}