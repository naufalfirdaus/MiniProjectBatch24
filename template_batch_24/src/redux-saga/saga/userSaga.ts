import { put, call } from "redux-saga/effects";
import user from "@/pages/api/user";
import { GetUserFail, GetUserSuccess } from "../action/UserAction";

function* handleGetUser(action: any): any {
  try {
    const { payload } = action;
    const result = yield call(user.GetUserApply, payload);
    yield put(GetUserSuccess(result));
  } catch (error) {
    yield put(GetUserFail(error));
  }
}

export { handleGetUser };
