import { call, put } from "redux-saga/effects";
import { getCandidateBatchTraineeeSuccess, getCandidateFail, getCandidateSuccess, getPassedCandidateBootcampSuccess, updateCandidateStatusSuccess } from "../slices/candidateSlices";
import candidateApi from "../../pages/api/candidate";


function* workGetCandidateFetch(action: any): any {
    const { payload } = action;
    try {
        const candidates = yield call(candidateApi.getByStatusAndDate, payload);
        yield put(getCandidateSuccess(candidates));
    } catch (error: any) {
        yield put(getCandidateFail(error));
    }
}

function* workGetPassedCandidateBootcamp(action: any): any {
    const { payload } = action;
    const bootcampCandidates = yield call(candidateApi.getPassedCandidate, payload);
    yield put(getPassedCandidateBootcampSuccess(bootcampCandidates));
}

function* workGetCandidateBatchTrainee(action: any): any {
    const { payload } = action;
    const candidateBatchTrainee = yield call(candidateApi.getCandidateByProgram, payload);
    yield put(getCandidateBatchTraineeeSuccess(candidateBatchTrainee));
}

function* workUpdateCandidateStatus(action: any): any {
    const { payload } = action;
    yield call(candidateApi.UpdateStatus, payload);
    yield put(updateCandidateStatusSuccess());
}


export { workGetCandidateFetch, workGetPassedCandidateBootcamp, workGetCandidateBatchTrainee, workUpdateCandidateStatus };