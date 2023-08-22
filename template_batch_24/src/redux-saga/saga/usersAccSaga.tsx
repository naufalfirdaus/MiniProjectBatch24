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
  GetUserAccountSourceSuccess,
  GetUserAccountSourceFailed,
  GetUserAccountTargetSuccess,
  GetUserAccountTargetFailed,
} from '../action/usersAccountAction';

function* handleGetUsersAcc(action: any): any {
  const { page, accNumber } = action.payload;

  try {
    const result = yield call(usersAcc.getData, page, accNumber);
    yield put(GetUsersSuccess(result));
  } catch (error) {
    yield put(GetUsersFail(error));
  }
}

function* handleGetUsersSelect(): any {
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

function* handleGetUsacSource(action: any): any {
  const { payload } = action;
  try {
      const result = yield call(usersAcc.getUserAccountByAuthAndBankFintech, payload);
      yield put(GetUserAccountSourceSuccess(result.data));
  } catch (error) {
      yield put(GetUserAccountSourceFailed(error));
  }
}

function* handleGetUsacTarget(action: any): any {
  const { payload } = action;
  try {
      const result = yield call(usersAcc.getUserAccountByAuthAndBankFintech, payload);
      yield put(GetUserAccountTargetSuccess(result.data));
  } catch (error) {
      yield put(GetUserAccountTargetFailed(error));
  }
}

export {
  handleGetUsersAcc,
  handleCreateUsersAcc,
  handleUpdateUsersAcc,
  handleGetUsersSelect,
  handleGetUsacSource,
  handleGetUsacTarget
};
