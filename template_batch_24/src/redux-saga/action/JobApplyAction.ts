import * as JobApplyAction from "../constant/JobApplyConstant";

export const GetResumeReq = (payload: any) => ({
  type: JobApplyAction.GET_RESUME_REQ,
  payload,
});

export const GetResumeSuccess = (payload: any) => ({
  type: JobApplyAction.GET_RESUME_OK,
  payload,
});

export const GetResumeFail = (error: any) => ({
  type: JobApplyAction.GET_RESUME_FAIL,
  error,
});

export const JobApplyReq = (payload: any) => ({
  type: JobApplyAction.JOB_APPLY_REQ,
  payload,
});

export const JobApplySuccess = (payload: any) => ({
  type: JobApplyAction.JOB_APPLY_OK,
  payload,
});

export const JobApplyFail = (error: any) => ({
  type: JobApplyAction.JOB_APPLY_FAIL,
  error,
});

export const ResetJobApply = () => ({
  type: JobApplyAction.JOB_APPLY_RESET,
});
