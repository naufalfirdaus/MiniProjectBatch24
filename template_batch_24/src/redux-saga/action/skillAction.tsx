import * as userAction from "../constant/userConstant";

export const addSkillReq = (payload: any, id: any) => ({
  type: userAction.ADD_SKILL_REQ,
  payload,
  id,
});
export const addSkillSuccess = (payload: any) => ({
  type: userAction.ADD_SKILL_SUCCESS,
  payload,
});
export const addSkillFail = (payload: any) => ({
  type: userAction.ADD_SKILL_FAIL,
  payload,
});

export const UpdateSkillRequest = (payload: any, id: any) => ({
  type: userAction.UPDATE_SKILL_REQ,
  payload,
  id,
});

export const UpdateSkillSuccess = (payload: any) => ({
  type: userAction.UPDATE_SKILL_SUCCESS,
  payload,
});

export const UpdateSkillFailed = (payload: any) => ({
  type: userAction.UPDATE_SKILL_FAIL,
  payload,
});

export const deleteSkillRequest = (id: any) => ({
  type: userAction.DELETE_SKILL_REQ,
  id,
});

export const deleteSkillSuccess = (id: any) => ({
  type: userAction.DELETE_SKILL_SUCCESS,
  id,
});

export const deleteSkillFailed = (id: any) => ({
  type: userAction.DELETE_SKILL_FAIL,
  id,
});
