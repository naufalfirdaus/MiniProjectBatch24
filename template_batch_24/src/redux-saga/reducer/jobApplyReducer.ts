import * as JobApplyAction from "../constant/JobApplyConstant";

const INIT_STATE = {
  resume: {},
  error: null,
};

const JobApplyReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case JobApplyAction.GET_RESUME_REQ:
      return { ...state };
    case JobApplyAction.GET_RESUME_OK:
      return { ...state, resume: action.payload };
    case JobApplyAction.GET_RESUME_FAIL:
      return { ...state, error: action.error };
    case JobApplyAction.JOB_APPLY_REQ:
      return { ...state };
    case JobApplyAction.JOB_APPLY_OK:
      return { ...state, apply: action.payload };
    case JobApplyAction.JOB_APPLY_FAIL:
      return { ...state, error: action.error };
    default:
      return { ...state };
  }
};

export default JobApplyReducer;
