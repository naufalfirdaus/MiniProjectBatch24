import * as ActionType from '../constant/usersAccountConstant';
const INIT_STATE = {
  users_acc: {
    items: [],
  },
};

const UsersAccountReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ActionType.GET_USERS_REQ:
      return { ...state };

    case ActionType.GET_USERS_SUCCESS:
      return GetUsers(state, action);

    case ActionType.GET_USERS_SELECT_SUCCESS:
      return GetUsers(state, action);

    case ActionType.ADD_USERS_REQUEST:
      return { ...state };

    case ActionType.ADD_USERS_SUCCESS:
      return AddUsersSuccessfully(state, action);

    case ActionType.UPDATE_USERS_SUCCESS:
      return UpdateUsersSuccessfully(state, action);

    default:
      return { ...state };
  }
};

const GetUsers = (state: any, action: any) => {
  return {
    ...state,
    users_acc: action.payload,
  };
};

const AddUsersSuccessfully = (state: any, action: any) => {
  return {
    ...state,
    items: [...state.users_acc.items, action.payload],
  };
};

const UpdateUsersSuccessfully = (state: any, action: any) => {
  return {
    ...state,
    items: [...state.users_acc.items, action.payload],
  };
};

export default UsersAccountReducer;
