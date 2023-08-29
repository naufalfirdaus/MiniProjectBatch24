import { call, put } from "redux-saga/effects";
import userApi from "../../pages/api/endPointApi";

import {
  UpdateSkillFailed,
  UpdateSkillSuccess,
  addSkillFail,
  addSkillSuccess,
  deleteSkillFailed,
  deleteSkillSuccess,
} from "../action/skillAction";

function* handleSKillUsers(action: any): any {
  const { payload, id } = action;
  try {
    const result = yield call(userApi.addSkill, payload, id);
    yield put(addSkillSuccess(result));
  } catch (error) {
    yield put(addSkillFail(error));
  }
}

function* handleUpdateSkillUsers(action: any): any {
  const { payload, id } = action;
  try {
    const result = yield call(userApi.updateSkill, payload, id);
    yield put(UpdateSkillSuccess(result));
  } catch (error) {
    yield put(UpdateSkillFailed(error));
  }
}

function* handleDeleteskillUsers(action: any): any {
  const { id } = action;
  try {
    const result = yield call(userApi.deleteSkill, id);
    yield put(deleteSkillSuccess(result));
  } catch (error) {
    yield put(deleteSkillFailed(error));
  }
}

export { handleSKillUsers, handleUpdateSkillUsers, handleDeleteskillUsers };
