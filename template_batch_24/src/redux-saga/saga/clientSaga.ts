import { call, put } from "redux-saga/effects";
import client from "@/pages/api/client";
import { GetClientFail, GetClientSuccess } from "../action/ClientAction";

function* handleGetClient(): any {
  try {
    const result = yield call(client.GetClients);
    yield put(GetClientSuccess(result));
  } catch (error) {
    yield put(GetClientFail(error));
  }
}

export { handleGetClient };
