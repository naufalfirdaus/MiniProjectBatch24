import * as userAction from "../constant/userConstant";

const INIT_STATE = {
  experience: [],
};

const ExperienceReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case userAction.ADD_EXPERIENCE_REQ:
      return { ...state };
    case userAction.ADD_EXPERIENCE_SUCCESS:
      return addexperience(state, action);
    case userAction.UPDATE_EXPERIENCE_SUCCESS:
      return updateexperience(state, action);
    case userAction.DELETE_EXPERIENCE_SUCCESS:
      return deleteexperience(state, action);
    default:
      return state;
  }
};

const addexperience = (state: any, action: any) => {
  return {
    ...state,
    experience: action.payload,
  };
};

const updateexperience = (state: any, action: any) => {
  return {
    ...state,
    experience: action.payload,
  };
};

const deleteexperience = (state: any, action: any) => {
  return {
    ...state,
    experience: action.payload,
  };
};

export default ExperienceReducer;
