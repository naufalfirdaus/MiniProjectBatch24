import * as MasterAction from "../constant/MasterConstant";

export const GetAddressReq = () => ({
  type: MasterAction.GET_ADDRESS_REQ,
});

export const GetAddressSuccess = (payload: any) => ({
  type: MasterAction.GET_ADDRESS_OK,
  payload,
});

export const GetAddressFail = (error: any) => ({
  type: MasterAction.GET_ADDRESS_FAILED,
  error,
});

export const GetJobTypeReq = () => ({
  type: MasterAction.GET_JOB_TYPE_REQ,
});

export const GetJobTypeSuccess = (payload: any) => ({
  type: MasterAction.GET_JOB_TYPE_OK,
  payload,
});

export const GetJobTypeFail = (error: any) => ({
  type: MasterAction.GET_JOB_TYPE_FAILED,
  error,
});
