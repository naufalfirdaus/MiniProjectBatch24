import * as UserAction from "../constant/UserConstant";

const INIT_STATE = {
  user: {},
  error: null,
};

const UserReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case UserAction.GET_USER_REQ:
      return { ...state };
    case UserAction.GET_USER_OK:
      return { ...state, user: action.payload };
    case UserAction.GET_USER_FAIL:
      return { ...state, error: action.error };
    default:
      return { ...state };
  }
};

export default UserReducer;
