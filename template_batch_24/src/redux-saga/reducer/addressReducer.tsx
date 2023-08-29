import * as userAction from "../constant/userConstant";

const INIT_STATE = {
  address: [],
};

const AddressReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case userAction.ADD_ADDRESS_REQ:
      return { ...state };
    case userAction.ADD_ADDRESS_SUCCESS:
      return addaddress(state, action);
    case userAction.UPDATE_ADDRESS_SUCCESS:
      return updateaddress(state, action);
    case userAction.DELETE_ADDRESS_SUCCESS:
      return deleteaddress(state, action);
    default:
      return state;
  }
};

const addaddress = (state: any, action: any) => {
  return {
    ...state,
    address: action.payload,
  };
};

const updateaddress = (state: any, action: any) => {
  return {
    ...state,
    address: action.payload,
  };
};

const deleteaddress = (state: any, action: any) => {
  return {
    ...state,
    address: action.payload,
  };
};

export default AddressReducer;
