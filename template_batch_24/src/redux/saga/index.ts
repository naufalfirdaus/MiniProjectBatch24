import { takeEvery, all } from "redux-saga/effects";
import { workGetCandidateFetch } from "./candidateSaga";
import { workGetBatchFetch } from "./batchSaga";

function* watchAll() {
  yield all([
    takeEvery('candidate/getCandidateFetch', workGetCandidateFetch),
    takeEvery('batch/getBatchFetch', workGetBatchFetch),
  ]);
}

export default watchAll;
