import * as ActionType from '../constant/bankConstant';

const INIT_STATE = {
  bank: {
    items: [],
  },
};

const BankReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ActionType.GET_BANK_REQ:
      return { ...state };

    case ActionType.GET_BANK_SUCCESS:
      return GetBank(state, action);

    case ActionType.GET_BANK_SELECT_REQ:
      return { ...state };

    case ActionType.GET_BANK_SELECT_SUCCESS:
      return GetBank(state, action);

    case ActionType.ADD_BANK_REQUEST:
      return { ...state };

    case ActionType.ADD_BANK_SUCCESS:
      return AddBankSuccessfully(state, action);

    case ActionType.UPDATE_BANK_SUCCESS:
      return UpdateBankSuccessfully(state, action);

    default:
      return { ...state };
  }
};

const GetBank = (state: any, action: any) => {
  return {
    ...state,
    bank: action.payload,
  };
};

const AddBankSuccessfully = (state: any, action: any) => {
  return {
    ...state,
    items: [...state.bank.items, action.payload],
  };
};

const UpdateBankSuccessfully = (state: any, action: any) => {
  return {
    ...state,
    items: [...state.bank.items, action.payload],
  };
};

export default BankReducer;
