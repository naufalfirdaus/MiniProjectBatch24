import * as JobAction from "../constant/JobConstant";

export const GetJoponumberReq = () => ({
  type: JobAction.GET_JOPONUMBER_REQ,
});

export const GetJoponumberSuccess = (payload: any) => ({
  type: JobAction.GET_JOPONUMBER_OK,
  payload,
});

export const GetJoponumberFail = (error: any) => ({
  type: JobAction.GET_JOPONUMBER_FAILED,
  error: error.response.data,
});

export const GetJobCategoryReq = () => ({
  type: JobAction.GET_JOBCATEGORY_REQ,
});

export const GetJobCategorySuccess = (payload: any) => ({
  type: JobAction.GET_JOBCATEGORY_OK,
  payload,
});

export const GetJobCategoryFail = (error: any) => ({
  type: JobAction.GET_JOBCATEGORY_FAILED,
  error: error.response.data,
});

export const CreateJobReq = (payload: any) => ({
  type: JobAction.CREATE_JOB_REQ,
  payload,
});

export const CreateJobSuccess = (payload: any) => ({
  type: JobAction.CREATE_JOB_OK,
  payload,
});

export const CreateJobFail = (error: any) => ({
  type: JobAction.CREATE_JOB_FAILED,
  error: error.response.data,
});

export const GetJobReq = () => ({
  type: JobAction.GET_JOB_REQ,
});

export const GetJobSuccess = (payload: any) => ({
  type: JobAction.GET_JOB_OK,
  payload,
});
export const GetJobFail = (error: any) => ({
  type: JobAction.GET_JOB_FAILED,
  error,
});

export const UpdateJobReq = (payload: any) => ({
  type: JobAction.UPDATE_JOB_REQ,
  payload,
});

export const UpdateJobSuccess = (payload: any) => ({
  type: JobAction.UPDATE_JOB_OK,
  payload,
});

export const UpdateJobFail = (error: any) => ({
  type: JobAction.UPDATE_JOB_FAILED,
  error: error.response.data,
});
