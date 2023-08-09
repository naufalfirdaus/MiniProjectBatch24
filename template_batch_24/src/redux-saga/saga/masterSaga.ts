import { call, put } from "redux-saga/effects";
import master from "@/pages/api/master";
import {
  GetAddressFail,
  GetAddressSuccess,
  GetEducationFail,
  GetEducationSuccess,
  GetIndustryFail,
  GetIndustrySuccess,
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

function* handleGetIndustry(): any {
  try {
    const result = yield call(master.GetIndustry);
    yield put(GetIndustrySuccess(result));
  } catch (error) {
    yield put(GetIndustryFail(error));
  }
}

function* handleGetEducation(): any {
  try {
    const result = yield call(master.GetEducation);
    yield put(GetEducationSuccess(result));
  } catch (error) {
    yield put(GetEducationFail(error));
  }
}

export {
  handleGetAddress,
  handleGetJobType,
  handleGetIndustry,
  handleGetEducation,
};
