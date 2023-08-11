import { put, call } from "redux-saga/effects";
import user from "@/pages/api/user";
import {
  GetResumeFail,
  GetResumeSuccess,
  JobApplyFail,
  JobApplySuccess,
} from "../action/JobApplyAction";
import job from "@/pages/api/job";

function* handleGetResume(action: any): any {
  try {
    const { payload } = action;
    const result = yield call(user.GetUserResume, payload);
    yield put(GetResumeSuccess(result));
  } catch (error) {
    yield put(GetResumeFail(error));
  }
}

function* handleJobApply(action: any): any {
  try {
    const { payload } = action;
    const result = yield call(job.CreateJobApply, payload);
    yield put(JobApplySuccess(result));
  } catch (error) {
    yield put(JobApplyFail(error));
  }
}

export { handleGetResume, handleJobApply };
