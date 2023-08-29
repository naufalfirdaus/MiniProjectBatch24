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
import {
  handleAddressUsers,
  handleDeleteAddressUsers,
  handleUpdateAddressUsers,
} from "./addressSaga";
import {
  handleAddEducationUsers,
  handleDeleteEducationUsers,
  handleUpdateEducationUsers,
} from "./EducationSaga";
import {
  handleDeleteskillUsers,
  handleSKillUsers,
  handleUpdateSkillUsers,
} from "./skillSaga";
import {
  handleAddExperienceUsers,
  handleDeleteExperienceUsers,
  handleUpdateExperienceUsers,
} from "./experiencesaga";
import { editProfile } from "./editProfileSaga";

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
    takeEvery(userAction.DELETE_ADDRESS_REQ, handleDeleteAddressUsers),
    takeEvery(userAction.ADD_EDUCATION_REQ, handleAddEducationUsers),
    takeEvery(userAction.UPDATE_EDUCATION_REQ, handleUpdateEducationUsers),
    takeEvery(userAction.DELETE_EDUCATION_REQ, handleDeleteEducationUsers),
    takeEvery(userAction.ADD_SKILL_REQ, handleSKillUsers),
    takeEvery(userAction.UPDATE_SKILL_REQ, handleUpdateSkillUsers),
    takeEvery(userAction.DELETE_SKILL_REQ, handleDeleteskillUsers),
    takeEvery(userAction.ADD_EXPERIENCE_REQ, handleAddExperienceUsers),
    takeEvery(userAction.UPDATE_EXPERIENCE_REQ, handleUpdateExperienceUsers),
    takeEvery(userAction.DELETE_EXPERIENCE_REQ, handleDeleteExperienceUsers),
    takeEvery(userAction.USER_EDIT_PROFILE_REQ, editProfile),
  ]);
}

export default watchAll;
