import { call, put } from "redux-saga/effects";
import User from "@/pages/api/user";
import { setCookie, deleteCookie } from "cookies-next";
import {
  UserSigninFailed,
  UserSigninSuccess,
  UserSignoutFailed,
  UserSignoutSuccess,
  UserImageFailed,
  UserImageSuccess,
  UserDataSuccess,
  UserDataFailed,
} from "../action/UserAction";

function* handleSignin(action: any): any {
  const { payload } = action;
  try {
    const result = yield call(User.signin, payload);
    if (Object.keys(result.data).length === 0) {
      yield put(
        UserSigninFailed({ message: "user or password not match, try again" })
      );
    } else {
      setCookie("access-token", result.data.access_token);
      console.log(result);
      const profile = yield call(User.profile);
      setCookie("profile", JSON.stringify(profile.data));
      console.log(profile.data);
      yield put(UserSigninSuccess(profile.data));
    }
  } catch (error) {
    yield put(UserSigninFailed(error));
  }
}

function* handleSignout() {
  try {
    deleteCookie("access-token");
    deleteCookie("profile");
    yield put(UserSignoutSuccess({ message: "Success Signout" }));
  } catch (error) {
    yield put(UserSignoutFailed(error));
  }
}

function* handleImage(action: any): any {
  const { userId, payload } = action.payload;
  console.log("action payload user image, ", action.payload);

  try {
    const result = yield call(User.uploadImage, userId, payload);
    yield put(UserImageSuccess(result.data));
  } catch (error) {
    yield put(UserImageFailed(error));
  }
}

function* handleData(action: any): any {
  const { payload } = action;
  try {
    const result = yield call(User.getData, payload);
    yield put(UserDataSuccess(result.data));
  } catch (error) {
    yield put(UserDataFailed(error));
  }
}

export { handleSignin, handleSignout, handleImage, handleData };
