import { call, put } from "redux-saga/effects";
import { getCandidateFail, getCandidateSuccess } from "../slices/candidateSlices";
import candidateApi from "../../pages/api/candidate";


function* workGetCandidateFetch(action: any): any {
    const { payload } = action;
    try {
        const candidates = yield call(candidateApi.GetByStatus, payload);
        yield put(getCandidateSuccess(candidates));
    } catch (error: any) {
        yield put(getCandidateFail(error));
    }
}

export { workGetCandidateFetch };