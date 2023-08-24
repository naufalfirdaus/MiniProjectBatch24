import { call, put } from "redux-saga/effects";
import userApi from "@/pages/api/user";
import { loginFailed, loginSuccess, logoutSuccess } from "../slices/userSlices";
import { deleteCookie, setCookie } from 'cookies-next';

function* workLoginTry (action: any): any {
    const {payload} = action;
    try {
        const result = yield call(userApi.loginEmployee, payload);
        // console.log(result);
        
        if(result.access_token){
            const {access_token, ...userData} = result;
            setCookie('access_token', access_token);
            yield put(loginSuccess(userData))
        } else {
            yield put(loginFailed({message: result.response.data.message}))
        }
    } catch (error: any) {
        yield put(loginFailed(error))
    }
}

function* workLogoutTry (action: any) : any {
    deleteCookie('access_token');
    yield put(logoutSuccess());
}

export { workLoginTry, workLogoutTry };
