import { takeEvery, all } from "redux-saga/effects";
import * as userAction from "../constant/userConstant";
import { getAllUser, getOneUser, signUpUser } from "./userSaga";
import { signUpEmployee, getAllEmployee } from "./employeeSaga";
import { loginSaga } from "./loginSaga";
import { handleChangePasswordUsers } from "./changePasswordSaga";
import {
  handleAddEmailUsers,
  handleDeleteEmailUsers,
  handleUpdateEmailUsers,
} from "./EmailSaga";
import {
  handleDeletePhoneUsers,
  handlePhoneUsers,
  handleUpdatePhoneUsers,
} from "./phoneSaga";
import { handleAddressUsers, handleUpdateAddressUsers } from "./addressSaga";
import {
  handleAddEducationUsers,
  handleDeleteEducationUsers,
  handleUpdateEducationUsers,
} from "./EducationSaga";

function* watchAll() {
  yield all([
    takeEvery(userAction.USER_SIGNUP_REQ, signUpUser),
    takeEvery(userAction.GET_ALL_USER_REQ, getAllUser),
    takeEvery(userAction.GET_ONE_USER_REQ, getOneUser),
    takeEvery(userAction.EMPLOYEE_SIGNUP_REQ, signUpEmployee),
    takeEvery(userAction.GET_ALL_EMPLOYEE_REQ, getAllEmployee),
    takeEvery(userAction.USER_LOGIN_REQ, loginSaga),
    takeEvery(userAction.CHANGE_PASSWORD_REQ, handleChangePasswordUsers),
    takeEvery(userAction.ADD_EMAIL_REQ, handleAddEmailUsers),
    takeEvery(userAction.UPDATE_EMAIL_REQ, handleUpdateEmailUsers),
    takeEvery(userAction.DELETE_EMAIL_REQ, handleDeleteEmailUsers),
    takeEvery(userAction.ADD_PHONE_REQ, handlePhoneUsers),
    takeEvery(userAction.UPDATE_PHONE_REQ, handleUpdatePhoneUsers),
    takeEvery(userAction.DELETE_PHONE_REQ, handleDeletePhoneUsers),
    takeEvery(userAction.ADD_ADDRESS_REQ, handleAddressUsers),
    takeEvery(userAction.UPDATE_ADDRESS_REQ, handleUpdateAddressUsers),
    takeEvery(userAction.ADD_EDUCATION_REQ, handleAddEducationUsers),
    takeEvery(userAction.UPDATE_EDUCATION_REQ, handleUpdateEducationUsers),
    takeEvery(userAction.DELETE_EDUCATION_REQ, handleDeleteEducationUsers),
  ]);
}

export default watchAll;
