import { deleteCookie } from 'cookies-next';
import * as userAction from '../constant/userConstant';

const INIT_STATE = {
    isLoggedIn: false,
    currentUser: null,
};

const loginReducer = (state = INIT_STATE, action:any) => {
    switch (action.type) {
        case userAction.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                currentUser: action.tokenResult,
            };
        case userAction.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                currentUser: null,
            };
        case userAction.USER_LOGOUT:
        deleteCookie('access_token');
        sessionStorage.removeItem('access_token');
        return {
          ...state,
          isLoggedIn: false,
          currentUser: null,
        };
        case userAction.USER_SIGNUP_SET_TOKEN:
            return {
                ...state,
                isLoggedIn: true,
                currentUser: action.payload,
            }
        default:
            return state;
    }
};

export default loginReducer;
