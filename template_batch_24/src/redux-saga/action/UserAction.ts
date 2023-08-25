import * as userAction from "../constant/userConstant";

// export const UserSigninRequest = (payload: any) => ({
//   type: ActionType.USER_SIGNIN_REQ,
//   // type: ActionType.USER_LOGIN_REQ,
//   payload,
// });

// export const UserSigninSuccess = (payload: any) => ({
//   type: ActionType.USER_SIGNIN_OK,
//   // type: ActionType.USER_LOGIN_OK,
//   payload,
// });

// export const UserSigninFailed = (payload: any) => ({
//   type: ActionType.USER_SIGNIN_FAILED,
//   // type: ActionType.USER_LOGIN_FAIL,
//   payload,
// });

// export const UserSignoutRequest = () => ({
//   type: ActionType.USER_SIGNOUT_REQ,
// });

// export const UserSignoutSuccess = (payload: any) => ({
//   type: ActionType.USER_SIGNOUT_OK,
//   payload,
// });

// export const UserSignoutFailed = (payload: any) => ({
//   type: ActionType.USER_SIGNOUT_FAILED,
//   payload,
// });

export const UserImageRequest = (userId: string, payload: any) => ({
  type: userAction.USER_IMAGE_REQ,
  payload: {userId, payload}
});

export const UserImageSuccess = (payload: any) => ({
  type: userAction.USER_IMAGE_OK,
  payload,
});

export const UserImageFailed = (payload: any) => ({
  type: userAction.USER_IMAGE_FAILED,
  payload,
});

// export const UserDataRequest = (payload: any) => ({
//   type: ActionType.USER_DATA_REQ,
//   payload
// });

// export const UserDataSuccess = (payload: any) => ({
//   type: ActionType.USER_DATA_OK,
//   payload,
// });

// export const UserDataFailed = (payload: any) => ({
//   type: ActionType.USER_DATA_FAILED,
//   payload,
// });

export const getDataOneUserReq = (id:any) =>({
  type : userAction.GET_ONE_USER_REQ,
  id,
})
export const getDataOneUserSuccess = (payload:any) =>({
  type : userAction.GET_ONE_USER_SUCCESS,
  payload
})
export const getDataOneUserFail = (payload:any) =>({
  type : userAction.GET_ONE_USER_FAIL,
  payload
})