import { call, put } from "redux-saga/effects";
import userApi from "../../pages/api/endPointApi";

import { addPhoneFail, addPhoneSuccess } from "../action/phoneAction";

function* handlePhoneUsers(action: any): any {
  const { payload, id } = action;
  try {
    const result = yield call(userApi.addPhone, payload, id);
    yield put(addPhoneSuccess(result));
  } catch (error) {
    yield put(addPhoneFail(error));
  }
}

// function* handleUpdateEmailUsers(action: any): any {
//   const { payload, id } = action;
//   try {
//     const result = yield call(userApi.updateEmail, payload, id);
//     yield put(UpdateEmailSuccess(result));
//   } catch (error) {
//     yield put(UpdateEmailFailed(error));
//   }
// }

// function* handleDeleteEmailUsers(action: any): any {
//   const { id } = action;
//   try {
//     const result = yield call(userApi.deleteEmail, id);
//     yield put(deleteEmailSuccess(result));
//   } catch (error) {
//     yield put(deleteEmailFailed(error));
//   }
// }

export { handlePhoneUsers };
