import { takeEvery, all } from "redux-saga/effects";
import { workGetCandidateFetch } from "./candidateSaga";

function* watchAll() {
  yield all([
    takeEvery('candidate/getCandidateFetch', workGetCandidateFetch),
  ]);
}

export default watchAll;
