import { put, call } from "redux-saga/effects";
import user from "@/pages/api/user";
import {
  GetResumeFail,
  GetResumeSuccess,
  JobApplyFail,
  JobApplySuccess,
} from "../action/JobApplyAction";
import job from "@/pages/api/job";
import { getCookie } from "cookies-next";

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
    const token = getCookie("access_token") as string;
    const { payload } = action;
    const result = yield call(job.CreateJobApply, payload, token);
    yield put(JobApplySuccess(result));
  } catch (error) {
    yield put(JobApplyFail(error));
  }
}

export { handleGetResume, handleJobApply };
