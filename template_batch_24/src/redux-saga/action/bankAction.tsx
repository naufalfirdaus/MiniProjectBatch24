import * as ActionBank from '../constant/bankConstant';

export const GetBankReq = (page: any, searchTerm: any) => ({
  type: ActionBank.GET_BANK_REQ,
  payload: { page, searchTerm },
});

export const GetBankSelectReq = () => ({
  type: ActionBank.GET_BANK_SELECT_REQ,
});

export const GetBankSuccess = (payload: any) => ({
  type: ActionBank.GET_BANK_SUCCESS,
  payload,
});

export const GetBankFail = (payload: any) => ({
  type: ActionBank.GET_BANK_FAILED,
  payload,
});

export const AddBankReq = (payload: any) => ({
  type: ActionBank.ADD_BANK_REQUEST,
  payload,
});

export const AddBankSuccess = (payload: any) => ({
  type: ActionBank.ADD_BANK_SUCCESS,
  payload,
});

export const AddBankFailed = (payload: any) => ({
  type: ActionBank.ADD_BANK_FAILED,
  payload,
});

export const UpdateBankRequest = (payload: any) => ({
  type: ActionBank.UPDATE_BANK_REQUEST,
  payload,
});

export const UpdateBankSuccess = (payload: any) => ({
  type: ActionBank.UPDATE_BANK_SUCCESS,
  payload,
});

export const UpdateBankFailed = (payload: any) => ({
  type: ActionBank.UPDATE_BANK_FAILED,
  payload,
});
