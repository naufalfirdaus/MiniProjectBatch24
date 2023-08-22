import { call, put } from 'redux-saga/effects';
import usersAcc from '@/pages/api/usersAcc';

import {
  AddUsersFailed,
  AddUsersSuccess,
  GetUsersFail,
  GetUsersSuccess,
  UpdateUsersFailed,
  UpdateUsersSuccess,
  GetUsersSelectSuccess,
  GetUsersSelectFailed,
} from '../action/usersAccountAction';

function* handleGetUsersAcc(action: any) {
  const { page, accNumber } = action.payload;

  try {
    const result = yield call(usersAcc.getData, page, accNumber);
    yield put(GetUsersSuccess(result));
  } catch (error) {
    yield put(GetUsersFail(error));
  }
}

function* handleGetUsersSelect() {
  try {
    const result = yield call(usersAcc.getSelect);
    yield put(GetUsersSelectSuccess(result));
  } catch (error) {
    yield put(GetUsersSelectFailed(error));
  }
}

function* handleCreateUsersAcc(action: any): any {
  const { payload } = action;
  try {
    const result = yield call(usersAcc.createUsers, payload);
    yield put(AddUsersSuccess(result));
    yield call(handleGetUsersAcc, {
      payload: { page: 1, accNumber: payload.user_id },
    });
  } catch (error) {
    yield put(AddUsersFailed(error));
  }
}

function* handleUpdateUsersAcc(action: any): any {
  const { payload } = action;
  try {
    const result = yield call(usersAcc.updateUsers, payload, payload.id);
    yield put(UpdateUsersSuccess(result));
    yield call(handleGetUsersAcc, {
      payload: { page: 1, accNumber: payload.user_id },
    });
  } catch (error) {
    yield put(UpdateUsersFailed(error));
  }
}

export {
  handleGetUsersAcc,
  handleCreateUsersAcc,
  handleUpdateUsersAcc,
  handleGetUsersSelect,
};
