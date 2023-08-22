import * as ActionFintech from '../constant/fintechConstant';

export const GetFintechReq = (page: any, searchTerm: any) => ({
  type: ActionFintech.GET_FINTECH_REQ,
  payload: { page, searchTerm },
});

export const GetFintechSelectReq = () => ({
  type: ActionFintech.GET_FINTECH_SELECT_REQ,
});

export const GetFintechSuccess = (payload: any) => ({
  type: ActionFintech.GET_FINTECH_SUCCESS,
  payload,
});

export const GetFintechFail = (payload: any) => ({
  type: ActionFintech.GET_FINTECH_FAILED,
  payload,
});

export const AddFintechReq = (payload: any) => ({
  type: ActionFintech.ADD_FINTECH_REQUEST,
  payload,
});

export const AddFintechSuccess = (payload: any) => ({
  type: ActionFintech.ADD_FINTECH_SUCCESS,
  payload,
});

export const AddFintechFailed = (payload: any) => ({
  type: ActionFintech.ADD_FINTECH_FAILED,
  payload,
});

export const UpdateFintechRequest = (payload: any) => ({
  type: ActionFintech.UPDATE_FINTECH_REQUEST,
  payload,
});

export const UpdateFintechSuccess = (payload: any) => ({
  type: ActionFintech.UPDATE_FINTECH_SUCCESS,
  payload,
});

export const UpdateFintechFailed = (payload: any) => ({
  type: ActionFintech.UPDATE_FINTECH_FAILED,
  payload,
});
