import * as ActionType from "../constant/employeeConstant";

const INIT_STATE = {
  employees: [],
  users: []
};

const EmployeeReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ActionType.GET_DATA_REQ:
      return { ...state };
    case ActionType.GET_DATA_SUCCESS:
      return GetEmployee(state, action);
      case ActionType.SEARCH_DATA_REQ:
        return { ...state };
    case ActionType.SEARCH_DATA_SUCCESS:
        return SearchEmployee(state, action);
    case ActionType.ADD_DATA_REQ:
        return { ...state };
    case ActionType.ADD_DATA_SUCCESS:
        return AddEmployee(state, action);
        case ActionType.GET_ONE_DATA_REQ:
          return { ...state };
      case ActionType.GET_ONE_DATA_SUCCESS:
          return GetOneEmployee(state, action);
    default:
      return { ...state };
  }
};

const GetEmployee = (state: any, action: any) => {
  return {
    ...state,
    employees: action.payload,
  };
};

function SearchEmployee(state: any, action: any) {
  return {
      ...state,
      employees: action.payload,
  };
};

function AddEmployee(state: any, action: any) {
  return {
      ...state,
      employees: action.payload,
  };
}

function GetOneEmployee(state: any, action: any) {
  return {
      ...state,
      employees: action.payload,
  };
};



export default EmployeeReducer;