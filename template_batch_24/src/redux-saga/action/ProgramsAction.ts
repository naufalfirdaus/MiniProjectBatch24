import * as ProgramAction from "../constant/programsConstant";

// export const GetProgramRequest = (payload: any) => ({
export const GetProgramRequest = (payload: any) => ({
  type: ProgramAction.GET_PROGRAM_REQ,
  payload,
});

export const GetProgramSuccess = (payload: any) => ({
  type: ProgramAction.GET_PROGRAM_OK,
  payload,
});

export const GetProgramFailed = (payload: any) => ({
  type: ProgramAction.GET_PROGRAM_FAILED,
  payload,
});

export const GetDetailRequest = (payload: any) => ({
  type: ProgramAction.GET_DETAIL_REQ,
  payload,
});

export const GetDetailSuccess = (payload: any) => ({
  type: ProgramAction.GET_DETAIL_OK,
  payload,
});

export const GetDetailFailed = (payload: any) => ({
  type: ProgramAction.GET_DETAIL_FAILED,
  payload,
});

export const GetDashboardRequest = (payload: any) => ({
  type: ProgramAction.GET_DASHBOARD_REQ,
  payload,
});

export const GetDashboardSuccess = (payload: any) => ({
  type: ProgramAction.GET_DASHBOARD_OK,
  payload,
});

export const GetDashboardFailed = (payload: any) => ({
  type: ProgramAction.GET_DASHBOARD_FAILED,
  payload,
});

export const GetProgressRequest = (userId: any, progId: any) => ({
  type: ProgramAction.GET_PROGRESS_REQ,
  payload: { userId, progId },
});

export const GetProgressSuccess = (payload: any) => ({
  type: ProgramAction.GET_PROGRESS_OK,
  payload,
});

export const GetProgressFailed = (payload: any) => ({
  type: ProgramAction.GET_PROGRESS_FAILED,
  payload,
});
