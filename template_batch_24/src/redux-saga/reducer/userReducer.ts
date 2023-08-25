import * as userAction from "../constant/userConstant";
import { getCookie } from "cookies-next";

const getFromCookies = (key: any) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return getCookie(key);
};

const INIT_STATE = {
  // UserProfile: getFromCookies("profile")
  //   ? JSON.parse(getCookie("profile"))
  //   : null,
  image: null,
  // data: null,
  oneUser: null,
};

const UserReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    // case ActionType.USER_SIGNIN_REQ:
    // case ActionType.USER_SIGNOUT_REQ:
    // case ActionType.USER_DATA_REQ:
    case userAction.USER_IMAGE_REQ:
      return state;
    // case ActionType.USER_SIGNIN_OK:
    //   return UserSignin(state, action);
    // case ActionType.USER_SIGNOUT_OK:
    //   return UserSignout(state, action);
    case userAction.USER_IMAGE_OK:
      return UserImage(state, action);
    // case ActionType.USER_DATA_OK:
    //   return UserData(state, action);
    case userAction.GET_ONE_USER_SUCCESS:
      return getOneUser(state, action);
    case userAction.GET_ONE_USER_FAIL:
      return { ...state };
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

const getOneUser = (state: any, action: any) => {
  const { oneUSerData } = action.payload;
  console.log("GET_ONE_USER_SUCCESS", oneUSerData);
  return {
    ...state,
    // oneUser: [...state.oneUser, oneUSerData],
    oneUser: action.payload,
  };
};

export default UserReducer;
