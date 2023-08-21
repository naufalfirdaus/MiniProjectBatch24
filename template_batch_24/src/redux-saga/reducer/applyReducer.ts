import * as ActionType from "../constant/ApplyConstant";

const INIT_STATE = {
  data: [],
};

const ApplyReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ActionType.CREATE_APPLY_REQ:
      return { ...state };
    case ActionType.CREATE_APPLY_OK:
      return CreateApply(state, action);
    default:
      return { ...state };
  }
};

// const GetRegion = (state: any, action: any) => {
//   return {
//     ...state,
//     regions: action.payload,
//   };
// };

const CreateApply = (state:any, action:any) => {
    return {
        ...state,
        data:[...state.data, action.payload]
    }
}

export default ApplyReducer;
