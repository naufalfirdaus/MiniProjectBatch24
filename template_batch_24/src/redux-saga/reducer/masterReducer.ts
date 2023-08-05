import * as ActionType from "../constant/MasterConstant";

const INIT_STATE = {
  address: [],
  jobType: [],
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

export default MasterReducer;
