import * as ActionType from "../constant/MasterConstant";

const INIT_STATE = {
  address: [],
  jobType: [],
  industry: [],
  education: [],
  error: null,
};

const MasterReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ActionType.GET_ADDRESS_REQ:
      return { ...state };
    case ActionType.GET_ADDRESS_OK:
      return GetAddress(state, action);
    case ActionType.GET_ADDRESS_FAILED:
      return { ...state, error: action.error };
    case ActionType.GET_JOB_TYPE_REQ:
      return { ...state };
    case ActionType.GET_JOB_TYPE_OK:
      return GetJobType(state, action);
    case ActionType.GET_JOB_TYPE_FAILED:
      return { ...state, error: action.payload };
    case ActionType.GET_EDUCATION_REQ:
      return { ...state };
    case ActionType.GET_EDUCATION_OK:
      return GetEducation(state, action);
    case ActionType.GET_EDUCATION_FAILED:
      return { ...state, error: action.payload };
    case ActionType.GET_INDUSTRY_REQ:
      return { ...state };
    case ActionType.GET_INDUSTRY_OK:
      return GetIndustry(state, action);
    case ActionType.GET_INDUSTRY_FAILED:
      return { ...state, error: action.payload };
    default:
      return { ...state };
  }
};

const GetAddress = (state: any, action: any) => {
  return {
    ...state,
    address: action.payload,
  };
};

const GetJobType = (state: any, action: any) => {
  return {
    ...state,
    jobType: action.payload,
  };
};

const GetEducation = (state: any, action: any) => {
  return {
    ...state,
    education: action.payload,
  };
};

const GetIndustry = (state: any, action: any) => {
  return {
    ...state,
    industry: action.payload,
  };
};

export default MasterReducer;
