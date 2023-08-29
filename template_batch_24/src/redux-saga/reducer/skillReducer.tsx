import * as userAction from "../constant/userConstant";

const INIT_STATE = {
  skill: [],
};

const SkillReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case userAction.ADD_SKILL_REQ:
      return { ...state };
    case userAction.ADD_SKILL_SUCCESS:
      return addskill(state, action);
    case userAction.UPDATE_SKILL_SUCCESS:
      return updateskill(state, action);
    case userAction.DELETE_SKILL_SUCCESS:
      return deleteskill(state, action);
    default:
      return state;
  }
};

const addskill = (state: any, action: any) => {
  return {
    ...state,
    skill: action.payload,
  };
};

const updateskill = (state: any, action: any) => {
  return {
    ...state,
    skill: action.payload,
  };
};

const deleteskill = (state: any, action: any) => {
  return {
    ...state,
    skill: action.payload,
  };
};

export default SkillReducer;
