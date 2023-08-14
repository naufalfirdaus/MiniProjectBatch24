import { call, put } from "redux-saga/effects";
import { getCandidateByProgramSuccess, getCandidateFail, getCandidateSuccess, getPassedCandidateBootcampSuccess } from "../slices/candidateSlices";
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

function* workGetCandidateByProgram(action: any): any {
    const { payload } = action;
    
    const programCandidates = yield call(candidateApi.getCandidateByProgram, payload);
    yield put(getCandidateByProgramSuccess(programCandidates));
}


export { workGetCandidateFetch, workGetPassedCandidateBootcamp, workGetCandidateByProgram };