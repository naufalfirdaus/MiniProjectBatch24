import * as ActionType from '../constant/curriculumConstant';

const INIT_STATE = {
    curriculum: [],
}

const CurriculumReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.GET_DATA_REQ:
            return { ...state };
        case ActionType.GET_DATA_SUCCESS:
            return GetCurriculum(state, action);
        case ActionType.SEARCH_DATA_REQ:
            return { ...state };
        case ActionType.SEARCH_DATA_SUCCESS:
            return SearchCurriculum(state, action);
        case ActionType.ADD_DATA_REQ:
            return { ...state };
        case ActionType.ADD_DATA_SUCCESS:
            return AddCurriculum(state, action);
        case ActionType.DELETE_DATA_REQ:
            return { ...state };
        case ActionType.DELETE_DATA_SUCCESS:
            return DeleteCurriculum(action);
        default:
            return { ...state };
    }
}

function GetCurriculum(state: any, action: any) {
    return {
        ...state,
        curriculum: action.payload,
    };
};

function SearchCurriculum(state: any, action: any) {
    return {
        ...state,
        curriculum: action.payload,
    };
};


function AddCurriculum(state: any, action: any) {
    const {payload} = action
    return {
        ...state,
        curriculum: [...state.curriculum, payload],
    };
}

function DeleteCurriculum(action: any) {
    const {payload} = action
    return {
        curriculum: [payload],
    };
}

export default CurriculumReducer

