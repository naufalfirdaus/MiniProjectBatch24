import * as ActionType from "../constant/UserConstant";
import { getCookie } from "cookies-next";

const getFromCookies = (key: any) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return getCookie(key);
};

const INIT_STATE = {
  UserProfile: getFromCookies("profile")
    ? JSON.parse(getCookie("profile"))
    : null,
  image: null,
  data: null,
};

const UserReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ActionType.USER_SIGNIN_REQ:
    case ActionType.USER_SIGNOUT_REQ:
    case ActionType.USER_IMAGE_REQ:
    case ActionType.USER_DATA_REQ:
      return state;
    case ActionType.USER_SIGNIN_OK:
      return UserSignin(state, action);
    case ActionType.USER_SIGNOUT_OK:
      return UserSignout(state, action);
    case ActionType.USER_IMAGE_OK:
      return UserImage(state, action);
    case ActionType.USER_DATA_OK:
      return UserData(state, action);
    default:
      return state;
  }
};

const UserSignin = (state: any, action: any) => {
  return {
    ...state,
    UserProfile: action.payload,
  };
};

const UserSignout = (state: any, action: any) => {
  return {
    ...state,
    UserProfile: null,
    UserSignup: null,
  };
};

const UserImage = (state: any, action: any) => {
  return {
    ...state,
    image: [...state.image, action.payload],
  };
};

const UserData = (state: any, action: any) => {
  return {
    ...state,
    data: action.payload,
  };
};

export default UserReducer;
