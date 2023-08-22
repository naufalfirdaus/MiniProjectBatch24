import * as ActionType from "../constant/trpaConstant";

const INIT_STATE = {
    transactions: [],
};

const TransactionReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.GET_TRANSACTION_REQ:
            return { ...state };
        case ActionType.GET_TRANSACTION_OK:
            return GetTransaction(state, action);
        case ActionType.CREATE_TOPUP_REQ:
            return { ...state };
        case ActionType.CREATE_TOPUP_OK:
            return CreateTopup(state, action);
        default:
            return { ...state };
    }
}

const GetTransaction = (state: any, action: any) => {
    return {
        ...state,
        transactions: action.payload,
    }
}

const CreateTopup = (state: any, action: any) => {
    return {
        ...state,
        transactions: [...state.transactions, action.payload],
    }
}


export default TransactionReducer;
