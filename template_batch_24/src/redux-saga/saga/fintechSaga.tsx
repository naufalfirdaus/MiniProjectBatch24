import { call, put } from 'redux-saga/effects';
import fintech from '@/pages/api/fintech';

import {
  GetFintechSuccess,
  GetFintechFail,
  AddFintechSuccess,
  AddFintechFailed,
  UpdateFintechSuccess,
  UpdateFintechFailed,
} from '../action/fintechAction';

function* handleGetFintech(action: any) {
  const { page, searchTerm } = action.payload;

  try {
    const result = yield call(fintech.getData, page, searchTerm);
    yield put(GetFintechSuccess(result));
  } catch (error) {
    yield put(GetFintechFail(error));
  }
}

function* handleGetFintechSelect() {
  try {
    const result = yield call(fintech.getSelect);
    yield put(GetFintechSuccess(result));
  } catch (error) {
    yield put(GetFintechFail(error));
  }
}

function* handleCreateFintech(action: any): any {
  const { payload } = action;
  try {
    const result = yield call(fintech.createFintech, payload);
    yield put(AddFintechSuccess(result));
    yield call(handleGetFintech, { payload: { page: 1, searchTerm: '' } });
  } catch (error) {
    yield put(AddFintechFailed(error));
  }
}

function* handleUpdateFintech(action: any): any {
  const { payload } = action;
  try {
    const result = yield call(fintech.updateFintech, payload, payload.id);
    yield put(UpdateFintechSuccess(result));
    yield call(handleGetFintech, { payload: { page: 1, searchTerm: '' } });
  } catch (error) {
    yield put(UpdateFintechFailed(error));
  }
}

export {
  handleGetFintech,
  handleCreateFintech,
  handleUpdateFintech,
  handleGetFintechSelect,
};
