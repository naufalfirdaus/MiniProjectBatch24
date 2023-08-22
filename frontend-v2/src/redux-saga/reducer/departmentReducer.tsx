import * as ActionType from "../constant/employeeConstant";

const INIT_STATE = {
  departments: [],
};

const DepartementReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ActionType.GET_DEPT_REQ:
      return { ...state };
    case ActionType.GET_DEPT_SUCCESS:
      return GetDepartment(state, action);
    default:
      return { ...state };
  }
};

const GetDepartment = (state: any, action: any) => {
  return {
    ...state,
    departments: action.payload,
  };
};

export default DepartementReducer;