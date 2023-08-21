import * as ActionType from '../constant/employeeConstant';

const INIT_STATE = {
    employee: [],
}

const GET_ONE_STATE = {
    program: [],
}

const EmployeeReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.GET_DATA_REQ:
            return { ...state };
        case ActionType.GET_DATA_SUCCESS:
            return GetEmployee(state, action);
        case ActionType.SEARCH_DATA_REQ:
            return { ...state };
        case ActionType.SEARCH_DATA_SUCCESS:
            return SearchEmployee(state, action);
        case ActionType.ADD_DATA_REQ:
            return { ...state };
        case ActionType.ADD_DATA_SUCCESS:
            return AddEmployee(state, action);
        case ActionType.EDIT_DATA_REQ:
            return { ...state };
        case ActionType.EDIT_DATA_SUCCESS:
            return EditEmployee(state, action);
        case ActionType.DELETE_DATA_REQ:
            return { ...state };
        case ActionType.DELETE_DATA_SUCCESS:
            return DeleteEmployee(action); 
        default:
            return { ...state };
    }
}

const getOneEmployeeReducer = (state = GET_ONE_STATE, action: any) => {
    switch (action.type) {
        case ActionType.GET_ONE_DATA_REQ:
            return { ...state };
        case ActionType.GET_ONE_DATA_SUCCESS:
            return GetOneEmployee(state, action);
        case 'RESET_EMPLOYEE_STATE':
            return GET_ONE_STATE;
        default:
            return { ...state };
    }
}

function GetEmployee(state: any, action: any) {
    return {
        ...state,
        employee: action.payload,
    };
};

function GetOneEmployee(state: any, action: any) {
    return {
        ...state,
        employee: action.payload,
    };
};

function SearchEmployee(state: any, action: any) {
    return {
        ...state,
        employee: action.payload,
    };
};


function AddEmployee(state: any, action: any) {
    return {
        ...state,
       employee: action.payload,
    };
}

function EditEmployee(state: any, action: any) {
    return {
        ...state,
        employee: action.payload,
    };
}

function DeleteEmployee(action: any) {
    const {payload} = action
    return {
        employee: [payload],
    };
}

export {EmployeeReducer, getOneEmployeeReducer}
