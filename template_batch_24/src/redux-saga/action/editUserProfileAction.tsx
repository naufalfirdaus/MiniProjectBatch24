import * as userAction from "../constant/userConstant";

export const userEditProfileReq = (payload: any) => ({
  type: userAction.USER_EDIT_PROFILE_REQ,
  payload,
});
export const userEditProfileSuccess = (payload: any) => ({
  type: userAction.USER_EDIT_PROFILE_SUCCESS,
  payload,
});
export const userEditProfileFail = (payload: any) => ({
  type: userAction.USER_EDIT_PROFILE_FAIL,
  payload,
});
