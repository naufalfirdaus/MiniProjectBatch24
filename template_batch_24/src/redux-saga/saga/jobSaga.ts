import { put, call } from "redux-saga/effects";
import {
  CreateJobFail,
  CreateJobSuccess,
  GetJobByIdFail,
  GetJobByIdSuccess,
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
import { getCookie } from "cookies-next";

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
    const token = getCookie("access_token") as string;
    const result = yield call(job.CreateJobPost, payload, token);
    yield put(CreateJobSuccess(result));
  } catch (error) {
    yield put(CreateJobFail(error));
  }
}

function* handleGetJob(action: any): any {
  const { payload } = action;

  try {
    const result = yield call(job.GetJobPostById, payload);
    yield put(GetJobByIdSuccess(result));
  } catch (error) {
    yield put(GetJobByIdFail(error));
  }
}

function* handleUpdateJob(action: any): any {
  const { payload } = action;

  try {
    const token = getCookie("access_token") as string;
    const result = yield call(job.UpdateJobPost, payload.id, payload.formData, token);
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
  handleGetJob,
  handleUpdateJob,
};
