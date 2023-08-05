import * as ClientAction from "../constant/ClientConstant";

export const GetClientReq = () => ({
  type: ClientAction.GET_CLIENT_REQ,
});

export const GetClientSuccess = (payload: any) => ({
  type: ClientAction.GET_CLIENT_OK,
  payload,
});

export const GetClientFail = (error: any) => ({
  type: ClientAction.GET_CLIENT_FAIL,
  error: error.response?.data,
});
