import { takeEvery, all, take } from "redux-saga/effects";
import * as ActionApply from "../constant/applyConstant";
import * as ActionProgram from "../constant/programsConstant";
import * as userAction from "../constant/userConstant";
import { handleCreateApply } from "./applySaga";
import {
  handleGetDetail,
  handleGetProgram,
  handleGetDashboard,
  handleGetProgress
} from "./programSaga";
// import { handleSignin, handleSignout, handleImage, handleData } from "./userSaga";
import { handleImage, getOneUser } from "./userSaga";
import { loginSaga } from "./loginSaga";

function* watchAll() {
  yield all([
    takeEvery(ActionApply.CREATE_APPLY_REQ, handleCreateApply),
    takeEvery(ActionProgram.GET_PROGRAM_REQ, handleGetProgram),
    takeEvery(ActionProgram.GET_DETAIL_REQ, handleGetDetail),
    takeEvery(ActionProgram.GET_DASHBOARD_REQ, handleGetDashboard),
    takeEvery(ActionProgram.GET_PROGRESS_REQ, handleGetProgress),
    // takeEvery(ActionUser.USER_SIGNIN_REQ, handleSignin),
    // takeEvery(ActionUser.USER_SIGNOUT_REQ, handleSignout),
    takeEvery(userAction.USER_IMAGE_REQ, handleImage),
    // takeEvery(ActionUser.USER_DATA_REQ, handleData),
    takeEvery(userAction.USER_LOGIN_REQ, loginSaga),
    takeEvery(userAction.GET_ONE_USER_REQ, getOneUser),


  ]);
}

export default watchAll;
