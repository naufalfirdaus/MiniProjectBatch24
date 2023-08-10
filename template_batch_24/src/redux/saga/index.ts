import { takeEvery, all } from "redux-saga/effects";
import { workGetCandidateByProgram, workGetCandidateFetch, workGetPassedCandidateBootcamp } from "./candidateSaga";
import { workCreateBatch, workGetBatchByIdFetch, workGetBatchFetch, workGetByNameAndStatus, workGetTechnologyFetch, workInstructorFetch, workUpdateBatch } from "./batchSaga";

function* watchAll() {
  yield all([
    takeEvery('candidate/getCandidateFetch', workGetCandidateFetch),
    takeEvery('candidate/getPassedCandidateBootcampFetch', workGetPassedCandidateBootcamp),
    takeEvery('candidate/getCandidateByProgramFetch', workGetCandidateByProgram),
    takeEvery('batch/getBatchFetch', workGetBatchFetch),
    takeEvery('batch/getBatchByIdFetch', workGetBatchByIdFetch),
    takeEvery('batch/getByNameAndStatusFetch', workGetByNameAndStatus),
    takeEvery('batch/getTechnologyFetch', workGetTechnologyFetch),
    takeEvery('batch/getInstructorFetch', workInstructorFetch),
    takeEvery('batch/createBatchTry', workCreateBatch),
    takeEvery('batch/updateBatchTry', workUpdateBatch),
  ]);
}

export default watchAll;
