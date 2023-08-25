import { call, put } from "redux-saga/effects";
import programs from "@/pages/api/programs";
import { AddApplySuccess, AddApplyFailed } from "../action/applyAction";

// function* handleGetRegion(action:any):any {
//     const { payload } = action
//     try {
//         const result = yield call(region.GetData,payload)
//         yield put(GetRegionSuccess(result.data))
//     } catch (error) {
//         yield put(GetRegionFail(error))
//     }
// }

function* handleCreateApply(action: any): any {
  const { userId, progId, payload } = action.payload;
  try {
    const result = yield call(programs.applyRegular, userId, progId, payload);
    console.log("ini adalah payload di saga: ", payload);

    yield put(AddApplySuccess(result.data));
  } catch (error) {
    yield put(AddApplyFailed(error));
  }
}

export { handleCreateApply };
