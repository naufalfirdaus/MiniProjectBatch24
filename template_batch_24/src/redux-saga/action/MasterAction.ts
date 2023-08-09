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

export const GetEducationReq = () => ({
  type: MasterAction.GET_EDUCATION_REQ,
});

export const GetEducationSuccess = (payload: any) => ({
  type: MasterAction.GET_EDUCATION_OK,
  payload,
});

export const GetEducationFail = (error: any) => ({
  type: MasterAction.GET_EDUCATION_FAILED,
  error,
});

export const GetIndustryReq = () => ({
  type: MasterAction.GET_INDUSTRY_REQ,
});

export const GetIndustrySuccess = (payload: any) => ({
  type: MasterAction.GET_INDUSTRY_OK,
  payload,
});

export const GetIndustryFail = (error: any) => ({
  type: MasterAction.GET_INDUSTRY_FAILED,
  error,
});
