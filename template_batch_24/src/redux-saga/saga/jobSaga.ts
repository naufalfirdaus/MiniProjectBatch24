import { put, call } from "redux-saga/effects";
import {
  CreateJobFail,
  CreateJobSuccess,
  GetJobCategoryFail,
  GetJobCategorySuccess,
  GetJobFail,
  GetJobSuccess,
  GetJoponumberFail,
  GetJoponumberSuccess,
  UpdateJobFail,
  UpdateJobSuccess,
} from "../action/JobAction";
import job from "@/pages/api/job";

function* handleGetJobs(): any {
  try {
    const result = yield call(job.GetJobs);
    yield put(GetJobSuccess(result));
  } catch (error) {
    yield put(GetJobFail(error));
  }
}

function* handleGetJoponumber(): any {
  try {
    const jopoNumber = yield call(job.GetJopoNumber);
    yield put(GetJoponumberSuccess(jopoNumber));
  } catch (error) {
    yield put(GetJoponumberFail(error));
  }
}

function* handleGetJobCategory(): any {
  try {
    const result = yield call(job.GetJobCategory);
    yield put(GetJobCategorySuccess(result));
  } catch (error) {
    yield put(GetJobCategoryFail(error));
  }
}

function* handleCreateJob(action: any): any {
  const { payload } = action;

  try {
    const result = yield call(job.CreateJobPost, payload);
    yield put(CreateJobSuccess(result));
  } catch (error) {
    yield put(CreateJobFail(error));
  }
}

function* handleUpdateJob(action: any): any {
  const { id, payload } = action;

  try {
    const result = yield call(job.UpdateJobPost, id, payload);
    yield put(UpdateJobSuccess(result));
  } catch (error) {
    yield put(UpdateJobFail(error));
  }
}

export {
  handleGetJobs,
  handleGetJoponumber,
  handleGetJobCategory,
  handleCreateJob,
  handleUpdateJob,
};
