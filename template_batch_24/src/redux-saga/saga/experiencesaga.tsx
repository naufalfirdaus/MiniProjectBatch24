import { call, put } from "redux-saga/effects";
import userApi from "../../pages/api/endPointApi";

import {
  UpdateExperienceFailed,
  UpdateExperienceSuccess,
  addExperienceFail,
  addExperienceSuccess,
  deleteExperienceFailed,
  deleteExperienceSuccess,
} from "../action/experienceAction";

function* handleAddExperienceUsers(action: any): any {
  const { payload, id } = action;
  try {
    const result = yield call(userApi.addExperience, payload, id);
    yield put(addExperienceSuccess(result));
  } catch (error) {
    yield put(addExperienceFail(error));
  }
}

function* handleUpdateExperienceUsers(action: any): any {
  const { payload, id } = action;
  try {
    const result = yield call(userApi.updateExperience, payload, id);
    yield put(UpdateExperienceSuccess(result));
  } catch (error) {
    yield put(UpdateExperienceFailed(error));
  }
}

function* handleDeleteExperienceUsers(action: any): any {
  const { id } = action;
  try {
    const result = yield call(userApi.deleteExperience, id);
    yield put(deleteExperienceSuccess(result));
  } catch (error) {
    yield put(deleteExperienceFailed(error));
  }
}

export {
  handleAddExperienceUsers,
  handleUpdateExperienceUsers,
  handleDeleteExperienceUsers,
};
