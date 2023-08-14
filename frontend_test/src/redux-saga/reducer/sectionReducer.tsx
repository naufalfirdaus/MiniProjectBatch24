import * as ActionType from '../constant/sectionConstant';

const INIT_STATE = {
    section: [],
}

const SectionReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.GET_SECTION_REQUEST:
            return { ...state };
        case ActionType.GET_SECTION_SUCCESS:
            return GetSection(state, action);
        case ActionType.ADD_SECTION_REQUEST:
            return { ...state };
        case ActionType.ADD_SECTION_SUCCESS:
            return AddSection(state, action);
<<<<<<< HEAD
        case ActionType.EDIT_SECTION_REQUEST:
            return { ...state };
        case ActionType.EDIT_SECTION_SUCCESS:
            return EditSection(state, action);
=======
        case ActionType.UPDATE_SECTION_REQUEST:
            return { ...state };
        case ActionType.UPDATE_SECTION_SUCCESS:
            return UpdateSection(state, action);
>>>>>>> 83cd4321747a6df064a464fc4a892b8a3e8af8dc
        case ActionType.DELETE_SECTION_REQUEST:
            return { ...state };
        case ActionType.DELETE_SECTION_SUCCESS:
            return DeleteSection(action);
        default:
            return { ...state };
    }
}

function GetSection(state: any, action: any) {
    return {
        ...state,
        section: action.payload,
    };
};

function SearchSection(state: any, action: any) {
    return {
        ...state,
        section: action.payload,
    };
};


function AddSection(state: any, action: any) {
    return {
        ...state,
        section: action.payload,
    };
}

function UpdateSection(state: any, action: any) {
    return {
        ...state,
        section: action.payload,
    };
}

function DeleteSection(action: any) {
    const {payload} = action
    return {
        section: [payload],
    };
}

export default SectionReducer

