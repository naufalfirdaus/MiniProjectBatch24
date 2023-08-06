import { call, put } from "redux-saga/effects";
import { getBatchFail, getBatchSuccess } from "../slices/batchSlices";
import batchAPI from "../../pages/api/batch";

function* workGetBatchFetch(action: any): any {
    const { payload } = action;
    
    try {
        const batchs = yield call(batchAPI.getAll, payload);
        yield put(getBatchSuccess(batchs));
    } catch (error: any) {
        yield put(getBatchFail(error));
    }
}

export { workGetBatchFetch };