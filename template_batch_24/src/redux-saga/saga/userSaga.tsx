import {call,put} from 'redux-saga/effects'
import userApi from '../../pages/api/endPointApi'
import user from "../../pages/api/user";

import { 
     getDataAllUserFail,
     getDataAllUserSuccess,
     getDataOneUserSuccess,
     getDataOneUserFail,
     userSignupSuccess,
     userSignupFail,
     GetUserSuccess,
     GetUserFail,
    } from '../action/userAction'

function* getOneUser(action:any):any {
    const {id} = action
    try {
        const result = yield call(userApi.getOneUser, id)
        const {userPassword, ...oneUSerData} = result.data
        // console.log("DATA ONE USER : ",othersData)
        yield put(getDataOneUserSuccess({oneUSerData}))
    } catch (error) {
        yield put(getDataOneUserFail(error))
    }
}
function* getAllUser():any {
    try {
        const data = yield call(userApi.getAllUser)
        yield put(getDataAllUserSuccess({payload: data}))
    } catch (error) {
        yield put(getDataAllUserFail(error))
    }
}

function* signUpUser(action:any):any {
    const {payload} = action
    // console.log("SAGA SIGNUP",payload)
    try {
        const result = yield call(userApi.userSignUp, payload)
        yield put(userSignupSuccess(result))
    } catch (error) {
        yield put(userSignupFail(error))
    }
}

function* handleGetUser(action: any): any {
    try {
      const { payload } = action;
      
      const result = yield call(user.GetUserApply, payload);
      yield put(GetUserSuccess(result));
    } catch (error) {
      yield put(GetUserFail(error));
    }
  }

export {
    getAllUser,
    signUpUser,
    getOneUser,
    handleGetUser
}