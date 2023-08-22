import * as userAction from "../constant/userConstant";

const INIT_STATE = {
  phone: [],
};

const PhoneReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case userAction.ADD_PHONE_REQ:
      return { ...state };
    case userAction.ADD_PHONE_SUCCESS:
      return addphone(state, action);
    // case userAction.UPDATE_EMAIL_SUCCESS:
    //   return updateemail(state, action);
    // case userAction.DELETE_EMAIL_SUCCESS:
    //   return deleteemail(state, action);
    default:
      return state;
  }
};

const addphone = (state: any, action: any) => {
  return {
    ...state,
    phone: action.payload,
  };
};

// const updateemail = (state: any, action: any) => {
//   return {
//     ...state,
//     email: action.payload,
//   };
// };

// const deleteemail = (state: any, action: any) => {
//   return {
//     ...state,
//     email: action.payload,
//   };
// };

export default PhoneReducer;
