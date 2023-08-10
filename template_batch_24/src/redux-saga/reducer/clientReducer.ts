import * as ActionType from "../constant/ClientConstant";

const INIT_STATE = {
  clients: [],
  error: null,
};

const ClientReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ActionType.GET_CLIENT_REQ:
      return { ...state };
    case ActionType.GET_CLIENT_OK:
      return GetClients(state, action);
    case ActionType.GET_CLIENT_FAIL:
      return { ...state, error: action.error };
    default:
      return { ...state };
  }
};

const GetClients = (state: any, action: any) => {
  return {
    ...state,
    clients: action.payload,
  };
};

export default ClientReducer;
