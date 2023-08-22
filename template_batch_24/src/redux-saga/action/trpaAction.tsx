import * as ActionTrpa from '../constant/trpaConstant';

export const GetTransactionReq = (payload: any) => ({
    type: ActionTrpa.GET_TRANSACTION_REQ,
    payload
})

export const GetTransactionSuccess = (payload: any) => ({
    type: ActionTrpa.GET_TRANSACTION_OK,
    payload
})

export const GetTransactionFailed = (payload: any) => ({
    type: ActionTrpa.GET_TRANSACTION_FAIL,
    payload
})

export const CreateTopupReq = (payload: any) => ({
    type: ActionTrpa.CREATE_TOPUP_REQ,
    payload
})

export const CreateTopupSuccess = (payload: any) => ({
    type: ActionTrpa.CREATE_TOPUP_OK,
    payload
})

export const CreateTopupFailed = (payload: any) => ({
    type: ActionTrpa.CREATE_TOPUP_FAIL,
    payload
})
