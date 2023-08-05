import { call, put } from "redux-saga/effects";
import master from "@/pages/api/master";
import {
  GetAddressFail,
  GetAddressSuccess,
  GetJobTypeFail,
  GetJobTypeSuccess,
} from "../action/MasterAction";

function* handleGetAddress(): any {
  try {
    const result = yield call(master.GetAddress);
    yield put(GetAddressSuccess(result));
  } catch (error) {
    yield put(GetAddressFail(error));
  }
}

function* handleGetJobType(): any {
  try {
    const result = yield call(master.GetJobType);
    yield put(GetJobTypeSuccess(result));
  } catch (error) {
    yield put(GetJobTypeFail(error));
  }
}

export { handleGetAddress, handleGetJobType };
