import * as UserAction from "../constant/UserConstant";

export const GetUserReq = (payload: any) => ({
  type: UserAction.GET_USER_REQ,
  payload
});

export const GetUserSuccess = (payload: any) => ({
  type: UserAction.GET_USER_OK,
  payload
});

export const GetUserFail = (error: any) => ({
  type: UserAction.GET_USER_FAIL,
  error
});
