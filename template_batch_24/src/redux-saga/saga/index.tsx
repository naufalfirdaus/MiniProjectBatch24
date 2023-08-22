import { takeEvery, all } from 'redux-saga/effects';
import * as userAction from '../constant/userConstant';
import { getAllUser, getOneUser, signUpUser } from './userSaga';
import { signUpEmployee, getAllEmployee } from './employeeSaga';
import { loginSaga } from './loginSaga';
import * as ActionBank from '../constant/bankConstant';
import * as ActionFintech from '../constant/fintechConstant';
import * as ActionUsersAcc from '../constant/usersAccountConstant';
import {
  handleCreateBank,
  handleGetBank,
  handleGetBankSelect,
  handleUpdateBank,
} from './bankSaga';
import {
  handleCreateFintech,
  handleGetFintech,
  handleGetFintechSelect,
  handleUpdateFintech,
} from './fintechSaga';
import {
  handleCreateUsersAcc,
  handleGetUsersAcc,
  handleUpdateUsersAcc,
  handleGetUsersSelect,
} from './usersAccSaga';

function* watchAll() {
  yield all([
    takeEvery(userAction.USER_SIGNUP_REQ, signUpUser),
    takeEvery(userAction.GET_ALL_USER_REQ, getAllUser),
    takeEvery(userAction.GET_ONE_USER_REQ, getOneUser),
    takeEvery(userAction.EMPLOYEE_SIGNUP_REQ, signUpEmployee),
    takeEvery(userAction.GET_ALL_EMPLOYEE_REQ, getAllEmployee),
    takeEvery(userAction.USER_LOGIN_REQ, loginSaga),
    takeEvery(ActionBank.GET_BANK_REQ, handleGetBank),
    takeEvery(ActionBank.ADD_BANK_REQUEST, handleCreateBank),
    takeEvery(ActionBank.UPDATE_BANK_REQUEST, handleUpdateBank),
    takeEvery(ActionBank.GET_BANK_SELECT_REQ, handleGetBankSelect),
    takeEvery(ActionFintech.GET_FINTECH_REQ, handleGetFintech),
    takeEvery(ActionFintech.ADD_FINTECH_REQUEST, handleCreateFintech),
    takeEvery(ActionFintech.UPDATE_FINTECH_REQUEST, handleUpdateFintech),
    takeEvery(ActionFintech.GET_FINTECH_SELECT_REQ, handleGetFintechSelect),
    takeEvery(ActionUsersAcc.GET_USERS_REQ, handleGetUsersAcc),
    takeEvery(ActionUsersAcc.ADD_USERS_REQUEST, handleCreateUsersAcc),
    takeEvery(ActionUsersAcc.UPDATE_USERS_REQUEST, handleUpdateUsersAcc),
    takeEvery(ActionUsersAcc.GET_USERS_SELECT_REQ, handleGetUsersSelect),
  ]);
}

export default watchAll;
