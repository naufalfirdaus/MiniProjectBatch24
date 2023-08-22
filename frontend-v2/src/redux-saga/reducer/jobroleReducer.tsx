import * as ActionType from "../constant/employeeConstant";

const INIT_STATE = {
  jobroles: [],
};

const JobRoleReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ActionType.GET_JORO_REQ:
      return { ...state };
    case ActionType.GET_JORO_SUCCESS:
      return GetJobRole(state, action);
    default:
      return { ...state };
  }
};

const GetJobRole = (state: any, action: any) => {
  return {
    ...state,
    jobroles: action.payload,
  };
};

export default JobRoleReducer;