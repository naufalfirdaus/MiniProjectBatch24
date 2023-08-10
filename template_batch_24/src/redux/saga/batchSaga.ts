import { call, put } from "redux-saga/effects";
import {
  createBatchSuccess,
  createBatchFail,
  getBatchFail,
  getBatchSuccess,
  getTechnologySuccess,
  getInstructorSuccess,
  getBatchByIdSuccess,
  updateBatchSuccess,
  updateBatchFail,
} from "../slices/batchSlices";
import batchAPI from "../../pages/api/batch";

function* workGetBatchFetch(action: any): any {
  const { payload } = action;

  try {
    const batchs = yield call(batchAPI.getAll, payload);
    yield put(getBatchSuccess(batchs));
  } catch (error: any) {
    yield put(getBatchFail(error));
  }
}

function* workGetBatchByIdFetch(action: any): any {
  const { payload } = action;
  try {
    const batch = yield call(batchAPI.getById, payload);
    yield put(getBatchByIdSuccess(batch));
  } catch (error: any) {
    yield put(getBatchFail(error));
  }
}

function* workGetByNameAndStatus(action: any): any {
  const { payload } = action;
  try {
    const batchs = yield call(batchAPI.getByNameAndStatus, payload);
    yield put(getBatchSuccess(batchs));
  } catch (error: any) {
    yield put(getBatchFail(error));
  }
}

function* workGetTechnologyFetch(): any {
  const techs = yield call(batchAPI.getTechnology);
  yield put(getTechnologySuccess(techs));
}

function* workInstructorFetch(): any {
  const instructors = yield call(batchAPI.getInstructors);
  yield put(getInstructorSuccess(instructors));
}

function* workCreateBatch(action: any): any {
  const { payload } = action;
  try {
    yield call(batchAPI.createBatch, payload);
    yield put(createBatchSuccess(""));
  } catch (error: any) {
    console.log(error);
    yield put(createBatchFail(error));
  }
}

function* workUpdateBatch(action: any): any {
  const { payload } = action;
  try {
    yield call(batchAPI.updateBatch, payload);
    yield put(updateBatchSuccess(""));
  } catch (error: any) {
    console.log(error);
    yield put(updateBatchFail(error));
  }
}

export {
  workGetBatchFetch,
  workGetByNameAndStatus,
  workCreateBatch,
  workGetTechnologyFetch,
  workInstructorFetch,
  workGetBatchByIdFetch,
  workUpdateBatch,
};
