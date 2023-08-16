import * as ActionType from '../constant/employeeConstant';

const INIT_STATE = {
    salary: [],
}

const SalaryReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.GET_SAL_REQ:
            return { ...state };
        case ActionType.GET_SAL_SUCCESS:
            return GetSalary(state, action)
        default:
            return { ...state };
    }
}

function GetSalary(state: any, action: any) {
    return {
        ...state,
        salary: action.payload.salary
    };
};

export default SalaryReducer
