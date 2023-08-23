import { takeEvery, all } from "redux-saga/effects";
import { workGetCandidateBatchTrainee, workGetCandidateFetch, workGetPassedCandidateBootcamp, workUpdateCandidateStatus } from "./candidateSaga";
import { workCreateBatch, workDeleteBatchTry, workGetBatchByIdFetch, workGetBatchEvaluation, workGetBatchFetch, workGetBatchTraineeEvaluation, workGetByNameAndStatus, workGetTechnologyFetch, workInstructorFetch, workUpdateBatch, workUpdateBatchStatus, workUpdateTraineeEvaluationReview, workUpdateTraineeEvaluationScore } from "./batchSaga";
import { workGetChartFetch, workGetSummaryFetch } from "./dashboardSaga";

function* watchAll() {
  yield all([
    takeEvery('candidate/getCandidateFetch', workGetCandidateFetch),
    takeEvery('candidate/getPassedCandidateBootcampFetch', workGetPassedCandidateBootcamp),
    takeEvery('candidate/getCandidateBatchTraineeeFetch', workGetCandidateBatchTrainee),
    takeEvery('candidate/updateCandidateStatusTry', workUpdateCandidateStatus),
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
    takeEvery('batch/deleteBatchTry', workDeleteBatchTry),
    takeEvery('dashboard/getSummaryFetch', workGetSummaryFetch),
    takeEvery('dashboard/getChartFetch', workGetChartFetch),
  ]);
}

export default watchAll;
