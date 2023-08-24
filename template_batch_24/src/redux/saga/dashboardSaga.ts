import { call, put } from "redux-saga/effects";
import dashboardApi from "@/pages/api/dashboard";
import { getChartFetchFail, getChartFetchSuccess, getSummaryFetchFail, getSummaryFetchSuccess } from "../slices/dashboardSlices";

function* workGetSummaryFetch (): any {
    try {
        const summaryData = yield call(dashboardApi.getDashboardSummary);
        yield put(getSummaryFetchSuccess(summaryData));
    } catch (error: any) {
        yield put(getSummaryFetchFail(error))
    }
}

function* workGetChartFetch (action: any): any {
    const {payload } = action;
    try {
        const chartData = yield call(dashboardApi.getDashboardChart, payload);
        yield put(getChartFetchSuccess(chartData));
    } catch (error: any) {
        yield put(getChartFetchFail(error))
    }
}

export { workGetSummaryFetch, workGetChartFetch };