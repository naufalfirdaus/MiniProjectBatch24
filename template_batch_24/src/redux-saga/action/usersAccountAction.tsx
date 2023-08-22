import * as ActionUsers from '../constant/usersAccountConstant';

export const GetUsersReq = (page: any, accNumber: any) => ({
  type: ActionUsers.GET_USERS_REQ,
  payload: { page, accNumber },
});

export const GetUsersSuccess = (payload: any) => ({
  type: ActionUsers.GET_USERS_SUCCESS,
  payload,
});

export const GetUsersSelectReq = () => ({
  type: ActionUsers.GET_USERS_SELECT_REQ,
});

export const GetUsersSelectSuccess = (payload: any) => ({
  type: ActionUsers.GET_USERS_SELECT_SUCCESS,
  payload,
});

export const GetUsersSelectFailed = (payload: any) => ({
  type: ActionUsers.GET_USERS_SELECT_FAILED,
  payload,
});

export const GetUsersFail = (payload: any) => ({
  type: ActionUsers.GET_USERS_FAILED,
  payload,
});

export const AddUsersReq = (payload: any) => ({
  type: ActionUsers.ADD_USERS_REQUEST,
  payload,
});

export const AddUsersSuccess = (payload: any) => ({
  type: ActionUsers.ADD_USERS_SUCCESS,
  payload,
});

export const AddUsersFailed = (payload: any) => ({
  type: ActionUsers.ADD_USERS_FAILED,
  payload,
});

export const UpdateUsersRequest = (payload: any) => ({
  type: ActionUsers.UPDATE_USERS_REQUEST,
  payload,
});

export const UpdateUsersSuccess = (payload: any) => ({
  type: ActionUsers.UPDATE_USERS_SUCCESS,
  payload,
});

export const UpdateUsersFailed = (payload: any) => ({
  type: ActionUsers.UPDATE_USERS_FAILED,
  payload,
});

export const GetUserAccountSourceReq = (payload: any) => ({
  type: ActionUsers.GET_BY_USAC_SOURCE_REQ,
  payload
})


export const GetUserAccountSourceSuccess = (payload: any) => ({
  type: ActionUsers.GET_BY_USAC_SOURCE_OK,
  payload
})

export const GetUserAccountSourceFailed = (payload: any) => ({
  type: ActionUsers.GET_BY_USAC_SOURCE_FAILED,
  payload
})

export const GetUserAccountTargetReq = (payload: any) => ({
  type: ActionUsers.GET_BY_USAC_TARGET_REQ,
  payload
})


export const GetUserAccountTargetSuccess = (payload: any) => ({
  type: ActionUsers.GET_BY_USAC_TARGET_OK,
  payload
})

export const GetUserAccountTargetFailed = (payload: any) => ({
  type: ActionUsers.GET_BY_USAC_TARGET_FAILED,
  payload
})
