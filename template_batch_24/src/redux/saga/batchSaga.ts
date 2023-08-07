import { call, put } from "redux-saga/effects";
import { createBatchSuccess, createBatchFail, getBatchFail, getBatchSuccess, getTechnologySuccess } from "../slices/batchSlices";
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

function* workGetByNameAndStatus(action: any): any {
    const { payload } = action;
    
    try {
        const batchs = yield call(batchAPI.getByNameAndStatus, payload);
        yield put(getBatchSuccess(batchs));
    } catch (error: any) {
        yield put(getBatchFail(error));
    }
}

function* workGetTechnologyFetch(): any {
    const techs = yield call(batchAPI.getTechnology);
    yield put(getTechnologySuccess(techs));
}

function* workCreateBatch(action: any): any {
    const { payload } = action;
    
    try {
        const batchs = yield call(batchAPI.createBatch, payload);
        yield put(createBatchSuccess(''));
    } catch (error: any) {
        yield put(createBatchFail(error));
    }
}

export { workGetBatchFetch, workGetByNameAndStatus, workCreateBatch, workGetTechnologyFetch };