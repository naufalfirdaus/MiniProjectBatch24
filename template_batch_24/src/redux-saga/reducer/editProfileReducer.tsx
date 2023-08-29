import * as userAction from '../constant/userConstant';

const INIT_STATE = {
  editProfileLoading: false,
  editProfileSuccess: false,
  editProfileError: null,
};

const editProfileReducer = (state = INIT_STATE, action:any) => {
  switch (action.type) {
    case userAction.USER_EDIT_PROFILE_REQ:
      return {
        ...state,
        editProfileLoading: true,
        editProfileSuccess: false,
        editProfileError: null,
      };
    case userAction.USER_EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        editProfileLoading: false,
        editProfileSuccess: true,
        editProfileError: null,
      };
    case userAction.USER_EDIT_PROFILE_FAIL:
      return {
        ...state,
        editProfileLoading: false,
        editProfileSuccess: false,
        editProfileError: action.payload,
      };
    default:
      return state;
  }
};

export default editProfileReducer;
