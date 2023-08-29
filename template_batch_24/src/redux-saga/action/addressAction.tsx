import * as userAction from "../constant/userConstant";

export const addAddressReq = (payload: any, id: any) => ({
  type: userAction.ADD_ADDRESS_REQ,
  payload,
  id,
});
export const addAddressSuccess = (payload: any) => ({
  type: userAction.ADD_ADDRESS_SUCCESS,
  payload,
});
export const addAddressFail = (payload: any) => ({
  type: userAction.ADD_ADDRESS_FAIL,
  payload,
});

export const UpdateAddressRequest = (payload: any, id: any) => ({
  type: userAction.UPDATE_ADDRESS_REQ,
  payload,
  id,
});

export const UpdateAddressSuccess = (payload: any) => ({
  type: userAction.UPDATE_ADDRESS_SUCCESS,
  payload,
});

export const UpdateAddressFailed = (payload: any) => ({
  type: userAction.UPDATE_ADDRESS_FAIL,
  payload,
});

export const deleteAddressRequest = (id: any) => ({
  type: userAction.DELETE_ADDRESS_REQ,
  id,
});

export const deleteAddressSuccess = (id: any) => ({
  type: userAction.DELETE_ADDRESS_SUCCESS,
  id,
});

export const deleteAddressFailed = (id: any) => ({
  type: userAction.DELETE_ADDRESS_FAIL,
  id,
});
