import { takeEvery, all } from "redux-saga/effects";
import { workGetCandidateFetch } from "./candidateSaga";
import { workGetBatchFetch, workGetByNameAndStatus } from "./batchSaga";

function* watchAll() {
  yield all([
    takeEvery('candidate/getCandidateFetch', workGetCandidateFetch),
    takeEvery('batch/getBatchFetch', workGetBatchFetch),
    takeEvery('batch/getByNameAndStatusFetch', workGetByNameAndStatus),
  ]);
}

export default watchAll;
