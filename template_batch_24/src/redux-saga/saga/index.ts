import { takeEvery, all, take } from "redux-saga/effects";
import * as ActionJob from "../constant/JobConstant";
import * as ActionClient from "../constant/ClientConstant";
import * as ActionMaster from "../constant/MasterConstant";
import * as ActionUser from "../constant/userConstant";
import * as ActionJobApply from "../constant/JobApplyConstant";
import {
  handleCreateJob,
  handleGetJob,
  handleGetJobCategory,
  handleGetJobs,
  handleGetJoponumber,
  handleUpdateJob,
} from "./jobSaga";
import { handleGetClient } from "./clientSaga";
import {
  handleGetAddress,
  handleGetEducation,
  handleGetIndustry,
  handleGetJobType,
} from "./masterSaga";
import { handleGetUser, signUpUser } from "./userSaga";
import { handleCheckApply, handleGetResume, handleJobApply } from "./jobApplySaga";
import { signUpEmployee } from "./employeeSaga";
import { loginSaga } from "./loginSaga";

function* watchAll() {
  yield all([
    takeEvery(ActionJob.GET_JOB_REQ, handleGetJobs),
    takeEvery(ActionJob.GET_JOPONUMBER_REQ, handleGetJoponumber),
    takeEvery(ActionJob.GET_JOBCATEGORY_REQ, handleGetJobCategory),
    takeEvery(ActionJob.CREATE_JOB_REQ, handleCreateJob),
    takeEvery(ActionJob.GET_JOB_BYID_REQ, handleGetJob),
    takeEvery(ActionJob.UPDATE_JOB_REQ, handleUpdateJob),
    takeEvery(ActionClient.GET_CLIENT_REQ, handleGetClient),
    takeEvery(ActionMaster.GET_ADDRESS_REQ, handleGetAddress),
    takeEvery(ActionMaster.GET_JOB_TYPE_REQ, handleGetJobType),
    takeEvery(ActionMaster.GET_INDUSTRY_REQ, handleGetIndustry),
    takeEvery(ActionMaster.GET_EDUCATION_REQ, handleGetEducation),
    takeEvery(ActionJobApply.JOB_APPLY_REQ, handleJobApply),
    takeEvery(ActionUser.GET_USER_REQ, handleGetUser),
    takeEvery(ActionJobApply.GET_RESUME_REQ, handleGetResume),
    takeEvery(ActionUser.USER_SIGNUP_REQ, signUpUser),
    takeEvery(ActionUser.EMPLOYEE_SIGNUP_REQ, signUpEmployee),
    takeEvery(ActionUser.USER_LOGIN_REQ, loginSaga),
    takeEvery(ActionJobApply.CHECK_APPLY_REQ, handleCheckApply),
  ]);
}

export default watchAll;
