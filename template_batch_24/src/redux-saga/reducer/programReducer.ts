import * as ActionType from "../constant/ProgramsConstant";

const INIT_STATE = {
  program: [],
  detail: null,
  dashboard: [],
  progress: []
};

const ProgramReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ActionType.GET_PROGRAM_REQ:
    case ActionType.GET_DETAIL_REQ:
    case ActionType.GET_DASHBOARD_REQ:
    case ActionType.GET_PROGRESS_REQ:
      return { ...state };
    case ActionType.GET_PROGRAM_OK:
      return GetProgram(state, action);
    case ActionType.GET_DETAIL_OK:
      return GetDetail(state, action);
    case ActionType.GET_DASHBOARD_OK:
      return GetDashboard(state, action);
    case ActionType.GET_PROGRESS_OK:
      return GetProgress(state, action);
    default:
      return { ...state };
  }
};

const GetProgram = (state: any, action: any) => {
  return {
    ...state,
    program: action.payload,
  };
};

const GetDetail = (state: any, action: any) => {
  return {
    ...state,
    detail: action.payload,
  };
};

const GetDashboard = (state: any, action: any) => {
  return {
    ...state,
    dashboard: action.payload,
  };
};

const GetProgress = (state: any, action: any) => {
  return {
    ...state,
    progress: action.payload,
  };
};

export default ProgramReducer;
