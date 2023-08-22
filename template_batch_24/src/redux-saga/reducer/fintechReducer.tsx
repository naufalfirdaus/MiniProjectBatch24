import * as ActionType from '../constant/fintechConstant';

const INIT_STATE = {
  fintech: {
    items: [],
  },
};

const FintechReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ActionType.GET_FINTECH_REQ:
      return { ...state };

    case ActionType.GET_FINTECH_SUCCESS:
      return GetFintech(state, action);

    case ActionType.ADD_FINTECH_REQUEST:
      return { ...state };

    case ActionType.ADD_FINTECH_SUCCESS:
      return AddFintechSuccessfully(state, action);

    case ActionType.UPDATE_FINTECH_SUCCESS:
      return UpdateFintechSuccessfully(state, action);

    default:
      return { ...state };
  }
};

const GetFintech = (state: any, action: any) => {
  return {
    ...state,
    fintech: action.payload,
  };
};

const AddFintechSuccessfully = (state: any, action: any) => {
  return {
    ...state,
    items: [...state.fintech.items, action.payload],
  };
};

const UpdateFintechSuccessfully = (state: any, action: any) => {
  return {
    ...state,
    items: [...state.fintech.items, action.payload],
  };
};

export default FintechReducer;
