import { call, put } from "redux-saga/effects";
import programs from "@/pages/api/programs";
import {
  GetProgramSuccess,
  GetProgramFailed,
  GetDetailSuccess,
  GetDetailFailed,
  GetDashboardSuccess,
  GetDashboardFailed,
  GetProgressSuccess,
  GetProgressFailed
} from "../action/programsAction";

// function* handleGetProgram(action: any): any {
function* handleGetProgram(action: any): any {
  const { payload } = action;
  try {
    const result = yield call(programs.getProgram, payload);

    yield put(GetProgramSuccess(result.data));
  } catch (error) {
    yield put(GetProgramFailed(error));
  }
}

function* handleGetDetail(action: any): any {
  const { payload } = action;
  try {
    const result = yield call(programs.getDetail, payload);
    
    yield put(GetDetailSuccess(result.data));
  } catch (error) {
    yield put(GetDetailFailed(error));
  }
}

function* handleGetDashboard(action: any): any {
  const { payload } = action;
  try {
    const result = yield call(programs.getDashboard, payload);
    
    yield put(GetDashboardSuccess(result.data));
  } catch (error) {
    yield put(GetDashboardFailed(error));
  }
}

function* handleGetProgress(action: any): any {
  const { userId, progId } = action.payload;
  
  try {
    console.log("ini progId di saga ", progId);
    const result = yield call(programs.getProgress, userId, progId);
    
    yield put(GetProgressSuccess(result.data));
  } catch (error) {
    yield put(GetProgressFailed(error));
  }
}

export { handleGetProgram, handleGetDetail, handleGetDashboard, handleGetProgress };
