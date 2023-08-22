import { call, put } from 'redux-saga/effects';
import bank from '@/pages/api/bank';
import {
  GetBankSuccess,
  GetBankFail,
  AddBankSuccess,
  AddBankFailed,
  UpdateBankSuccess,
  UpdateBankFailed,
} from '../action/bankAction';

function* handleGetBank(action: any) {
  const { page, searchTerm } = action.payload;

  try {
    const result: any = yield call(bank.getData, page, searchTerm);
    yield put(GetBankSuccess(result));
  } catch (error) {
    yield put(GetBankFail(error));
  }
}

function* handleGetBankSelect() {
  try {
    const result: any = yield call(bank.getSelect);
    yield put(GetBankSuccess(result));
  } catch (error) {
    yield put(GetBankFail(error));
  }
}

function* handleCreateBank(action: any): any {
  const { payload } = action;
  try {
    const result = yield call(bank.createBank, payload);
    yield put(AddBankSuccess(result));
    yield call(handleGetBank, { payload: { page: 1, searchTerm: '' } }); // Menggunakan call dengan argumen yang sesuai
  } catch (error) {
    yield put(AddBankFailed(error));
  }
}

function* handleUpdateBank(action: any): any {
  const { payload } = action;
  try {
    const result = yield call(bank.updateBank, payload, payload.id);
    yield put(UpdateBankSuccess(result));
    yield call(handleGetBank, { payload: { page: 1, searchTerm: '' } });
  } catch (error) {
    yield put(UpdateBankFailed(error));
  }
}

export {
  handleGetBank,
  handleCreateBank,
  handleUpdateBank,
  handleGetBankSelect,
};
