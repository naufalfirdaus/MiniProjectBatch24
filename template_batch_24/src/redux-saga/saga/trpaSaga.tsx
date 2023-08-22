import { call, put } from 'redux-saga/effects'
import transaction from '@/pages/api/transaction';
import { GetTransactionSuccess, GetTransactionFailed, CreateTopupSuccess, CreateTopupFailed } from '../action/trpaAction';

function* handleGetTransaction(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(transaction.getAllTransactions, payload);
        yield put(GetTransactionSuccess(result.data));
    } catch (error) {
        yield put(GetTransactionFailed(error));
    }
}

function* handleCreateTopup(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(transaction.topup, payload);
        yield put(CreateTopupSuccess(result.data));
    } catch (error) {
        yield put(CreateTopupFailed(error));
    }
}

export {
    handleGetTransaction,
    handleCreateTopup
}
