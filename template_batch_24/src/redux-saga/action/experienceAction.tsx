import * as userAction from "../constant/userConstant";

export const addExperienceReq = (payload: any, id: any) => ({
  type: userAction.ADD_EXPERIENCE_REQ,
  payload,
  id,
});
export const addExperienceSuccess = (payload: any) => ({
  type: userAction.ADD_EXPERIENCE_SUCCESS,
  payload,
});
export const addExperienceFail = (payload: any) => ({
  type: userAction.ADD_EXPERIENCE_FAIL,
  payload,
});

export const UpdateExperienceRequest = (payload: any, id: any) => ({
  type: userAction.UPDATE_EXPERIENCE_REQ,
  payload,
  id,
});

export const UpdateExperienceSuccess = (payload: any) => ({
  type: userAction.UPDATE_EXPERIENCE_SUCCESS,
  payload,
});

export const UpdateExperienceFailed = (payload: any) => ({
  type: userAction.UPDATE_EXPERIENCE_FAIL,
  payload,
});

export const deleteExperienceRequest = (id: any) => ({
  type: userAction.DELETE_EXPERIENCE_REQ,
  id,
});

export const deleteExperienceSuccess = (id: any) => ({
  type: userAction.DELETE_EXPERIENCE_SUCCESS,
  id,
});

export const deleteExperienceFailed = (id: any) => ({
  type: userAction.DELETE_EXPERIENCE_FAIL,
  id,
});
