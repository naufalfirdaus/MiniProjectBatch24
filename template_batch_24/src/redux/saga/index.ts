import { takeEvery, all } from "redux-saga/effects";
import { workGetCandidateByProgram, workGetCandidateFetch, workGetPassedCandidateBootcamp } from "./candidateSaga";
import { workCreateBatch, workGetBatchByIdFetch, workGetBatchEvaluation, workGetBatchFetch, workGetBatchTraineeEvaluation, workGetByNameAndStatus, workGetTechnologyFetch, workInstructorFetch, workUpdateBatch, workUpdateBatchStatus, workUpdateTraineeEvaluationReview, workUpdateTraineeEvaluationScore } from "./batchSaga";
import { workGetChartFetch, workGetSummaryFetch } from "./dashboardSaga";

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
    takeEvery('batch/getBatchEvaluationFetch', workGetBatchEvaluation),
    takeEvery('batch/getBatchTraineeEvaluationFetch', workGetBatchTraineeEvaluation),
    takeEvery('batch/updateTraineeEvalutaionScoreTry', workUpdateTraineeEvaluationScore),
    takeEvery('batch/updateTraineeEvalutaionReviewTry', workUpdateTraineeEvaluationReview),
    takeEvery('batch/updateBatchStatusTry', workUpdateBatchStatus),
    takeEvery('dashboard/getSummaryFetch', workGetSummaryFetch),
    takeEvery('dashboard/getChartFetch', workGetChartFetch),
  ]);
}

export default watchAll;
