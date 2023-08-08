import { takeEvery, all } from "redux-saga/effects";
import { workGetCandidateFetch, workGetPassedCandidateBootcamp } from "./candidateSaga";
import { workCreateBatch, workGetBatchFetch, workGetByNameAndStatus, workGetTechnologyFetch, workInstructorFetch } from "./batchSaga";

function* watchAll() {
  yield all([
    takeEvery('candidate/getCandidateFetch', workGetCandidateFetch),
    takeEvery('candidate/getPassedCandidateBootcampFetch', workGetPassedCandidateBootcamp),
    takeEvery('batch/getBatchFetch', workGetBatchFetch),
    takeEvery('batch/getByNameAndStatusFetch', workGetByNameAndStatus),
    takeEvery('batch/getTechnologyFetch', workGetTechnologyFetch),
    takeEvery('batch/getInstructorFetch', workInstructorFetch),
    takeEvery('batch/createBatchTry', workCreateBatch),
  ]);
}

export default watchAll;
