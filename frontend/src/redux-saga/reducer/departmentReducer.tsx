import * as ActionType from '../constant/employeeConstant';

const INIT_STATE = {
    department: [],
}

const DepartmentReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.GET_DEPT_REQ:
            return { ...state };
        case ActionType.GET_DEPT_SUCCESS:
            return GetDepartment(state, action)
        default:
            return { ...state };
    }
}

function GetDepartment(state: any, action: any) {
    return {
        ...state,
        department: action.payload.department
    };
};

export default DepartmentReducer
